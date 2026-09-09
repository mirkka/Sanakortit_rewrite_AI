import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import React from 'react'
import * as styles from './StudyCard.module.scss'

interface Props {
  text: string
  textTranslation: string
  isFlipped: boolean
  isFinished: boolean
  loading: boolean
  onFlip: () => void
  onDifficulty: (weight: number) => void
  onFinish: () => void
  onEditCard: () => void
}

const StudyCard: React.FC<Props> = ({ text, textTranslation, isFlipped, isFinished, loading, onFlip, onDifficulty, onFinish, onEditCard }) => {
  const difficultyButtons = [
    { label: 'Done', weight: 0, className: styles.difficultyDone },
    { label: 'Good', weight: 1, className: styles.difficultyGood },
    { label: 'Medium', weight: 2, className: styles.difficultyMedium },
    { label: 'Hard', weight: 3, className: styles.difficultyHard },
  ]

  if (isFinished) {
    return (
      <div className={styles.finishedContainer}>
        <div className={styles.finishedEmoji}>🎉</div>
        <p className={styles.finishedText}>You have finished the deck!</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Button size="small" disabled={loading} onClick={onEditCard}>Edit card</Button>
        <Button className={styles.topAction} type="text" icon={<CloseOutlined />} disabled={loading} onClick={onFinish}>Exit study</Button>
      </div>

      <div className={styles.cardArea}>
        <div className={styles.word}>{text}</div>
        {isFlipped && (
          <>
            <Divider className={styles.divider} />
            <div className={styles.translation}>{textTranslation}</div>
          </>
        )}
      </div>

      <div className={styles.bottomBar}>
        {isFlipped ? (
          <div className={styles.difficultyGrid}>
            {difficultyButtons.map(({ label, weight, className }) => (
              <Button
                key={weight}
                className={`${styles.difficultyButton} ${className}`}
                disabled={loading}
                loading={loading && false}
                onClick={() => onDifficulty(weight)}
              >
                {label}
              </Button>
            ))}
          </div>
        ) : (
          <Button type="primary" className={styles.flipButton} disabled={loading} onClick={onFlip}>
            Flip card
          </Button>
        )}
      </div>
    </div>
  )
}

export default StudyCard
