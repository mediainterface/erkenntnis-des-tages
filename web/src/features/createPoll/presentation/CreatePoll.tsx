import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Button, Flex, Tour, TourProps, theme } from 'antd'
import React from 'react'

import { TABLE_NAME } from '@/common/constants/table-name.constants'

import { NewPoll } from '@/common/types/tables/polls/new-poll.type'

import { User } from '@supabase/supabase-js'
import { generatePath, useNavigate } from 'react-router-dom'

import { NewPollOption } from '@/common/types/tables/poll_options/new-poll-option.type'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'

import { Loader } from '@/common/components/loader/Loader'
import { SmileOutlined } from '@ant-design/icons'
import { generateOrder } from '../helper/creatPollHelper'
import { EdtInput, EdtInputHandle } from './EdtInput'

export const CreatePoll: React.FC = () => {
  const [profiles, setProfiles] = React.useState<Profile[]>([])
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [hasCreatedAPoll, setHasCreatedAPoll] = React.useState(false)
  const navigate = useNavigate()

  const edtInputRef = React.useRef(null)
  const startPollRef = React.useRef(null)
  const [isTourOpen, setIsTourOpen] = React.useState(false)

  const {
    token: { paddingXS },
  } = theme.useToken()

  const howToCreatePollSteps: TourProps['steps'] = [
    {
      title: 'Erkenntnisse eintragen',
      description:
        'Hier kannst du die Erkenntnisse iconinifizerien, beachte dabei, dass nur ausgefüllte Felder bei der Abstimmung berücksichtigt werden.',
      target: () => edtInputRef.current,
    },
    {
      title: 'Umfrage erstellen',
      description: 'Ist alles fertig? Jetzt kannst du die Umfrage starten, viel Glück! :)',
      target: () => startPollRef.current,
    },
  ]

  const getProfiles = React.useCallback(async () => {
    try {
      // get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('cannot get current user')
      }
      setCurrentUser(user)

      setProfiles(
        await generateOrder(user.id).catch((error) => {
          throw error
        }),
      )
    } catch (error) {
      alert(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    getProfiles()
  }, [getProfiles])

  const childRefs = React.useRef<EdtInputHandle[]>([])

  const handleCreateNewPoll = async () => {
    const newPoll: NewPoll = {
      created_at: new Date().toISOString(),
      is_closed: false,
      user_id: currentUser?.id ?? '',
    }

    const { data, error } = await supabase.from(TABLE_NAME.polls).insert(newPoll).select()
    if (!data || error) {
      console.error(error)
      alert(error?.message)
      return
    }
    const createPollResponse = data as Poll[]

    const allEdts = childRefs.current.map((ref) => ref.getEdtInput()).filter((input) => input.edt !== '')

    const pollOptions: NewPollOption[] = allEdts.map((edt) => {
      const userId = profiles.find((profile) => profile.user_id === edt.user_id)?.user_id ?? ''
      return {
        content: edt.edt,
        created_at: createPollResponse[0].created_at,
        poll_id: createPollResponse[0].id,
        user_id: userId,
      }
    })

    const { data: pollOptionsResponse, error: pollOptionsError } = await supabase
      .from(TABLE_NAME.poll_options)
      .insert(pollOptions)
      .select()

    if (!pollOptionsResponse || pollOptionsError) {
      console.error(pollOptionsError)
      alert(pollOptionsError?.message)
      return
    }
    setHasCreatedAPoll(true)

    navigate(generatePath(ROUTING_PATH.vote, { pollId: createPollResponse[0].id }))
  }

  return profiles.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Flex align="center" justify="center" style={{ paddingBottom: paddingXS }}>
        <Button
          style={{ width: '300px' }}
          block
          type="default"
          onClick={() => {
            setIsTourOpen(true)
          }}
          icon={<SmileOutlined />}
          iconPosition="end"
        >
          How to
        </Button>
      </Flex>
      <Flex vertical gap={'large'} wrap={'wrap'} align={'center'}>
        <Flex vertical gap={'middle'} ref={edtInputRef}>
          {profiles.map((profile, index) => (
            <EdtInput key={profile.user_id} profile={profile} ref={(el) => (childRefs.current[index] = el!)} />
          ))}
        </Flex>
        <Button
          ref={startPollRef}
          style={{ alignSelf: 'center' }}
          type={'primary'}
          onClick={handleCreateNewPoll}
          disabled={hasCreatedAPoll}
        >
          Umfrage starten
        </Button>
      </Flex>
      <Tour
        open={isTourOpen}
        onClose={() => {
          setIsTourOpen(false)
        }}
        steps={howToCreatePollSteps}
        placement="left"
      />
    </>
  )
}
