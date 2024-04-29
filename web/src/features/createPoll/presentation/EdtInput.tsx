import { Profile } from '@/common/types/tables/profiles/profile.type'
import { Avatar, Flex, Form } from 'antd'
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

  const handleEdtInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdtInput(event.target.value)
  }

  useImperativeHandle(ref, () => ({
    getEdtInput: () => ({ edt: edtInput, user_id: profile.user_id }),
  }))

  return (
    <Form.Item>
      <Flex justify={'space-evenly'} align={'center'} gap={'middle'}>
        <Avatar src={profile.avatar_url} />
        <Input placeholder="Icons" addonBefore={profile.username} value={edtInput} onChange={handleEdtInputChange} />
      </Flex>
    </Form.Item>
  )
})

