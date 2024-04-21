import { Profile } from '@/common/types/tables/profile.type'
import { Avatar, Flex } from 'antd'
import Input from 'antd/es/input/Input'

type EdtInputProps = {
  profile: Profile
}

export const EdtInput: React.FC<EdtInputProps> = (props) => {
  const { profile } = props
  return (
    <>
      <Flex justify={'space-evenly'} align={'center'}>
        <Avatar src={profile.avatar_url} />
        <Input placeholder="Icons" />
      </Flex>
    </>
  )
}

