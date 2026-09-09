import { Button, Form, Input } from 'antd'
import React from 'react'
import * as formStyles from '../styles/forms.module.scss'

interface Props {
  initialName: string
  onSubmit: (name: string) => void
  onCancel: () => void
  loading: boolean
}

const EditDeckForm: React.FC<Props> = ({ initialName, onSubmit, onCancel, loading }) => {
  const [form] = Form.useForm()
  const name = Form.useWatch('name', form)
  const handleFinish = (values: { name: string }) => onSubmit(values.name)

  return (
    <div className={formStyles.page}>
      <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={{ name: initialName }} className={formStyles.form}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please enter a deck name' }]}>
          <Input />
        </Form.Item>
        <div className={formStyles.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!name}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default EditDeckForm
