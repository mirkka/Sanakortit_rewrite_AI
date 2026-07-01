import { Button, Form, Input } from 'antd'
import React from 'react'

interface Props {
  initialName: string
  onSubmit: (name: string) => void
  onCancel: () => void
  loading: boolean
}

const EditDeckForm: React.FC<Props> = ({ initialName, onSubmit, onCancel, loading }) => {
  const handleFinish = (values: { name: string }) => {
    onSubmit(values.name)
  }

  return (
    <Form onFinish={handleFinish} layout="vertical" initialValues={{ name: initialName }}>
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

export default EditDeckForm
