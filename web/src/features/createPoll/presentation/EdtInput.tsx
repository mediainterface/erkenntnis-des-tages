import { Profile } from '@/common/types/tables/profiles/profile.type'
import { Avatar, Flex } from 'antd'
import Input from 'antd/es/input/Input'
import React, { useImperativeHandle } from 'react'

type EdtInputProps = {
  profile: Profile
  style?: React.CSSProperties
}

export type EdtInputHandle = {
  getEdtInput: () => string
}

export const EdtInput = React.forwardRef<EdtInputHandle, EdtInputProps>((props, ref) => {
  const { profile, style } = props
  const [edtInput, setEdtInput] = React.useState('')

  const handleEdtInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdtInput(event.target.value)
  }

  useImperativeHandle(ref, () => ({
    getEdtInput: () => edtInput,
  }))

  return (
    <Flex justify={'space-evenly'} align={'center'} style={style}>
      <Avatar src={profile.avatar_url} />
      <Input placeholder="Icons" value={edtInput} onChange={handleEdtInputChange} />
    </Flex>
  )
})

