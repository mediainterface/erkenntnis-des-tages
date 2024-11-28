import { Profile } from '@/common/types/tables/profiles/profile.type'
import { CloseOutlined, QuestionOutlined, SmileOutlined } from '@ant-design/icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Avatar, Button, Card, Flex, Tooltip, Tour, TourProps, Typography, theme } from 'antd'
import Input from 'antd/es/input/Input'
import React, { useImperativeHandle } from 'react'

type EdtInputProps = {
  profile: Profile
  style?: React.CSSProperties
}

export type EdtInputHandle = {
  getEdtInput: () => { edt: string } & Pick<Profile, 'user_id'>
}

export const EdtInput = React.forwardRef<EdtInputHandle, EdtInputProps>((props, ref) => {
  const { profile } = props
  const [edtInput, setEdtInput] = React.useState('')
  const [showEmojiSelection, setShowEmojiSelection] = React.useState(false)
  const [isEdtInputTourOpen, setIsEdtInputTourOpen] = React.useState(false)

  const emojiButtonRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const {
    token: { colorErrorText, colorTextDisabled },
  } = theme.useToken()

  const handleEdtInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdtInput(event.target.value)
  }

  useImperativeHandle(ref, () => ({
    getEdtInput: () => ({ edt: edtInput, user_id: profile.user_id }),
  }))

  const handleEmojiSelection = (emoji: { native: string }): void => {
    setEdtInput(edtInput + emoji.native)
  }

  const edtInputTourSteps: TourProps['steps'] = [
    {
      title: 'Bessere Emojis!!',
      description:
        'Hier kannst du aus mehreren Emojies auswählen. Die Suche funktioniert aktuell nur in English, sry :(',
      target: () => emojiButtonRef.current,
    },
    {
      title: 'Edt Eingabe',
      description: 'Hier kannst du die Emojis oder einen Text einfügen',
      target: () => inputRef.current,
    },
  ]

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Card style={{ width: '300px' }}>
          <Flex vertical gap={'middle'}>
            <Flex align="center" justify="space-between">
              <Flex align="center" justify="left" gap={8}>
                <Avatar src={profile.avatar_url} />
                <Typography.Title level={4}>{profile.username}</Typography.Title>
              </Flex>
              <Tooltip title="Wie geht das hier?">
                <Button
                  onClick={() => {
                    setIsEdtInputTourOpen(true)
                  }}
                  icon={<QuestionOutlined style={{ color: colorTextDisabled }} />}
                  shape="circle"
                  type="text"
                />
              </Tooltip>
            </Flex>
            <Flex gap={'small'}>
              <Tooltip title="tolle icons :)">
                <Button
                  ref={emojiButtonRef}
                  onClick={() => {
                    setShowEmojiSelection(!showEmojiSelection)
                  }}
                  shape={'circle'}
                  icon={showEmojiSelection ? <CloseOutlined style={{ color: colorErrorText }} /> : <SmileOutlined />}
                />
              </Tooltip>
              <div ref={inputRef}>
                <Input value={edtInput} onChange={handleEdtInputChange} />
              </div>
            </Flex>
          </Flex>
        </Card>
        {showEmojiSelection && (
          <div style={{ position: 'absolute', left: '-355px', top: '0' }}>
            <Picker data={data} onEmojiSelect={handleEmojiSelection} theme={'dark'} locale={'de'} />
          </div>
        )}
      </div>
      <Tour open={isEdtInputTourOpen} steps={edtInputTourSteps} onClose={() => setIsEdtInputTourOpen(false)} />
    </>
  )
})
