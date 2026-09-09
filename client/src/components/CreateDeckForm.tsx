import { Button, Form, Input } from 'antd'
import React from 'react'
import * as formStyles from '../styles/forms.module.scss'

interface Props {
  onSubmit: (name: string) => void
  onCancel: () => void
  loading: boolean
}

const CreateDeckForm: React.FC<Props> = ({ onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm()
  const name = Form.useWatch('name', form)
  const handleFinish = (values: { name: string }) => onSubmit(values.name)

  return (
    <div className={formStyles.page}>
      <Form form={form} onFinish={handleFinish} layout="vertical" className={formStyles.form}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please enter a deck name' }]}>
          <Input placeholder="Deck name - e.g. Finnish vocabulary" />
        </Form.Item>
        <div className={formStyles.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!name}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateDeckForm
