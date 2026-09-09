import { Button, Form, Input } from 'antd'
import React from 'react'
import * as formStyles from '../styles/forms.module.scss'

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
    <div className={formStyles.page}>
      <p className={formStyles.pageTitle}>Edit card</p>
      <Form
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ text: initialText, textTranslation: initialTextTranslation }}
        className={`${formStyles.form} ${formStyles.defaultFont}`}
      >
        <Form.Item name="text" rules={[{ required: true, message: 'Please enter the word' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="textTranslation" rules={[{ required: true, message: 'Please enter the translation' }]}>
          <Input />
        </Form.Item>
        <div className={formStyles.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
        </div>
      </Form>
    </div>
  )
}

export default EditCardForm
