import { Button, Form, Input } from 'antd'
import React from 'react'

interface Props {
  onSubmit: (name: string) => void
  onCancel: () => void
  loading: boolean
}

const CreateDeckForm: React.FC<Props> = ({ onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm()

  const handleFinish = (values: { name: string }) => {
    onSubmit(values.name)
  }

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="name" label="Deck name" rules={[{ required: true, message: 'Please enter a deck name' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>OK</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateDeckForm
