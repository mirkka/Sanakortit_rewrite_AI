import { Button, Form, Input } from 'antd'
import React from 'react'

interface Props {
  initialText: string
  initialTextTranslation: string
  onSubmit: (text: string, textTranslation: string) => void
  onCancel: () => void
  loading: boolean
}

const EditCardForm: React.FC<Props> = ({ initialText, initialTextTranslation, onSubmit, onCancel, loading }) => {
  const handleFinish = (values: { text: string; textTranslation: string }) => {
    onSubmit(values.text, values.textTranslation)
  }

  return (
    <Form
      onFinish={handleFinish}
      layout="vertical"
      initialValues={{ text: initialText, textTranslation: initialTextTranslation }}
    >
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

export default EditCardForm
