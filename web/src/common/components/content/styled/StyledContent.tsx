import { Layout } from 'antd'
import styled from 'styled-components'

const StyledContent = styled(Layout.Content)`
  padding: var(--ant-padding-lg);
  overflow-y: auto;
  max-width: var(--content-width);
  width: 100%;
  align-self: center;
  position: relative;
`
export default StyledContent
