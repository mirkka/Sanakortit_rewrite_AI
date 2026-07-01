import { Button, Form, Input } from 'antd'
import React from 'react'

interface Props {
  onSubmit: (text: string, textTranslation: string) => void
  onCancel: () => void
  loading: boolean
}

const AddCardForm: React.FC<Props> = ({ onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm()

  const handleFinish = (values: { text: string; textTranslation: string }) => {
    onSubmit(values.text, values.textTranslation)
    form.resetFields()
  }

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please enter the text' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="textTranslation" label="Translation" rules={[{ required: true, message: 'Please enter the translation' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>OK</Button>
      </Form.Item>
    </Form>
  )
}

export default AddCardForm
