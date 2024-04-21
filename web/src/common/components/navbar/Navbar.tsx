import { Avatar, Flex, Typography } from 'antd'
import gravatar from 'gravatar'
export const Navbar: React.FC = () => {
  const gravatarUrl = gravatar.url('mail@jonascurth.de')
  const userName = 'Marlelele'
  const greeting = 'Hello'
  const text = `${greeting} ${userName}`
  return (
    <>
      <Flex justify={'flex-end'} align={'flex-start'}>
        <Typography style={{ color: 'hotpink', marginTop: '5px', marginRight: '10px' }}>{text}</Typography>

        <Avatar src={gravatarUrl} />
      </Flex>
    </>
  )
}
