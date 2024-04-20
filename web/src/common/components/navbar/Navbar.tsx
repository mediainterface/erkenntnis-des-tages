import { Avatar } from 'antd'
import gravatar from 'gravatar'
export const Navbar: React.FC = () => {
  const gravatarUrl = gravatar.url('mail@jonascurth.de')
  console.log(gravatarUrl)
  return (
    <>
      <Avatar src={gravatarUrl} />
      <div>{gravatarUrl}</div>
    </>
  )
}
