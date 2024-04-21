import { Avatar, Flex } from 'antd'
import gravatar from 'gravatar'
export const Navbar: React.FC = () => {
  const gravatarUrl = gravatar.url('mail@jonascurth.de')
  const userName = 'Marlelele'
  return (
    <>
      <Flex justify={'flex-end'} align={'flex-start'}>
        {userName}
        <Avatar src={gravatarUrl} />
      </Flex>
    </>
  )
}
