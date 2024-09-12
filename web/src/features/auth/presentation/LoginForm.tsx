import StyledLayout from '@/common/components/layout/styled/StyledLayout.tsx'
import { supabase } from '@/supabase'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Session } from '@supabase/supabase-js'
import { Button, Card, Flex, Form, Input, message } from 'antd'
import React from 'react'

type LoginFormPropsType = {
  onSuccess: (session: Session | null) => void
}

export const LoginForm: React.FC<LoginFormPropsType> = (props) => {
  const { onSuccess } = props

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      message.error('Login failed: ' + error.message)
    } else {
      message.success('Login erfolgreich!')
      onSuccess(session)
    }
  }

  return (
    <StyledLayout>
      <Flex style={{ height: '100vh', justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
        <Card style={{ width: 300 }}>
          <Form name="login_form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </StyledLayout>
  )
}
