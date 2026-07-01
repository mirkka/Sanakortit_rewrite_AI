import { Button, Space, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

const DIFFICULTY_BUTTONS = [
  { label: 'Done', weight: 0 },
  { label: 'Good', weight: 1 },
  { label: 'Medium', weight: 2 },
  { label: 'Hard', weight: 3 },
]

interface Props {
  text: string
  textTranslation: string
  isFlipped: boolean
  isFinished: boolean
  onFlip: () => void
  onDifficulty: (weight: number) => void
  onFinish: () => void
  onEditCard: () => void
}

const StudyCard: React.FC<Props> = ({ text, textTranslation, isFlipped, isFinished, onFlip, onDifficulty, onFinish, onEditCard }) => {
  if (isFinished) {
    return <Text>You have finished the deck</Text>
  }

  return (
    <Space direction="vertical">
      <Text>{text}</Text>
      {isFlipped ? (
        <>
          <Text>{textTranslation}</Text>
          <Space>
            {DIFFICULTY_BUTTONS.map(({ label, weight }) => (
              <Button key={weight} onClick={() => onDifficulty(weight)}>{label}</Button>
            ))}
          </Space>
        </>
      ) : (
        <Button onClick={onFlip}>Flip card</Button>
      )}
      <Button onClick={onEditCard}>Edit card</Button>
      <Button onClick={onFinish}>Finish study</Button>
    </Space>
  )
}

export default StudyCard
