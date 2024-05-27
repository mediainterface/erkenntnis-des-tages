import React from 'react';
import { Form, Input, Button, Checkbox, message, Flex, Card } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { supabase } from '@/supabase'
import StyledLayout from "@/common/components/layout/styled/StyledLayout.tsx";


export const LoginForm = ({ onLoginSuccess }) => {
  const onFinish = async (values) => {
    const { email, password } = values;
    const { error, session } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      message.error('Login failed: ' + error.message);
    } else {
      message.success('Login successful!');
      onLoginSuccess(session);
    }
  }

  return (
    <StyledLayout>
      <Flex style={{height:'100vh', justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
      <Card style={{ width: 300 }}>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </Card>
      </Flex>
    </StyledLayout>
  )
}


