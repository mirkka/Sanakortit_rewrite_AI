import { Button, Form, Input } from 'antd'
import React from 'react'
import * as formStyles from '../styles/forms.module.scss'

interface Props {
  deckName: string
  onSubmit: (text: string, textTranslation: string) => void
  onCancel: () => void
  loading: boolean
}

const AddCardForm: React.FC<Props> = ({ deckName, onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm()
  const text = Form.useWatch('text', form)
  const textTranslation = Form.useWatch('textTranslation', form)

  const handleFinish = (values: { text: string; textTranslation: string }) => {
    onSubmit(values.text, values.textTranslation)
    form.resetFields()
  }

  return (
    <div className={formStyles.page}>
      <div className={formStyles.pageTitle}>
        <div>Add card to deck </div>
        <div className={formStyles.deckName}>{deckName}</div>
      </div>
      <Form form={form} onFinish={handleFinish} layout="vertical" className={`${formStyles.form} ${formStyles.defaultFont}`}>
        <Form.Item name="text" rules={[{ required: true, message: 'Please enter the word' }]}>
          <Input placeholder="Word or phrase" />
        </Form.Item>
        <Form.Item name="textTranslation" rules={[{ required: true, message: 'Please enter the translation' }]}>
          <Input placeholder="Translation" />
        </Form.Item>
        <div className={formStyles.actions}>
          <Button onClick={onCancel}>Close</Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!text || !textTranslation}>
            Add
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddCardForm
