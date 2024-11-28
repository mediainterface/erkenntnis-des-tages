import { Profile } from '@/common/types/tables/profiles/profile.type'
import { CloseOutlined, SmileOutlined } from '@ant-design/icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Avatar, Button, Card, Flex, Tooltip, theme } from 'antd'
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

  const {
    token: { colorErrorText },
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

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Card style={{ width: '300px' }}>
        <Flex vertical gap={'middle'}>
          <Card.Meta avatar={<Avatar src={profile.avatar_url} />} title={profile.username} />
          <Flex gap={'small'}>
            <Tooltip title="tolle icons :)">
              <Button
                onClick={() => {
                  setShowEmojiSelection(!showEmojiSelection)
                }}
                shape={'circle'}
                icon={showEmojiSelection ? <CloseOutlined style={{ color: colorErrorText }} /> : <SmileOutlined />}
              />
            </Tooltip>
            <Input value={edtInput} onChange={handleEdtInputChange} />
          </Flex>
        </Flex>
      </Card>
      {showEmojiSelection && (
        <div style={{ position: 'absolute', left: '-355px', top: '0' }}>
          <Picker data={data} onEmojiSelect={handleEmojiSelection} theme={'dark'} locale={'de'} />
        </div>
      )}
    </div>
  )
})
