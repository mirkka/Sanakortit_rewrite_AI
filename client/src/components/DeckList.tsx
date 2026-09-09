import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Spin, Tag } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { formatLastStudied, sortDecksAlphabetically } from '../services/deckService'
import { Deck } from '../store/deckSlice'
import * as styles from './DeckList.module.scss'

const PAGE_SIZE = 10

interface Props {
  decks: Deck[]
  onAddCard: (deckId: string) => void
  onAddDeck: () => void
  onStartStudy: (deckId: string) => void
  onRestartStudy: (deckId: string) => void
  onEditDeck: (deckId: string) => void
  onDeleteDeck: (deckId: string) => void
  deletingDeckId?: string | null
}

const STATUS_CLASS: Record<string, string> = {
  Finished: styles.statusFinished,
  Good: styles.statusGood,
  Medium: styles.statusMedium,
  Hard: styles.statusHard,
}

const DeckList: React.FC<Props> = ({
  decks,
  onAddCard,
  onAddDeck,
  onStartStudy,
  onRestartStudy,
  onEditDeck,
  onDeleteDeck,
  deletingDeckId,
}) => {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const sorted = sortDecksAlphabetically(decks)
  const displayed = sorted.slice(0, displayCount)

  return (
    <>
      <InfiniteScroll
        dataLength={displayed.length}
        next={() => setDisplayCount((c) => c + PAGE_SIZE)}
        hasMore={displayCount < sorted.length}
        loader={<Spin indicator={<LoadingOutlined spin />} size="large" style={{ display: 'block', textAlign: 'center', padding: 16 }} />}
        className={styles.list}
      >
        {displayed.map((deck) => (
          <div key={deck.deckId} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.deckName}>{deck.name}</h2>
              {deck.status && (
                <Tag className={`${styles.statusTag} ${STATUS_CLASS[deck.status] ?? ''}`}>
                  {deck.status}
                </Tag>
              )}
            </div>
            <p className={styles.meta}>
              {deck.numberOfCards} {deck.numberOfCards === 1 ? 'card' : 'cards'}
              {deck.lastStudied ? ` · Last studied ${formatLastStudied(deck.lastStudied)}` : ''}
            </p>
            {deck.status === 'Finished' ? (
              <Button type="primary" className={styles.studyButton} onClick={() => onRestartStudy(deck.deckId)}>
                Restart study
              </Button>
            ) : (
              <Button
                type="primary"
                className={styles.studyButton}
                disabled={deck.numberOfCards === 0}
                onClick={() => onStartStudy(deck.deckId)}
              >
                Start study
              </Button>
            )}
            <div className={styles.secondaryActions}>
              <Button size="small" disabled={Boolean(deletingDeckId)} onClick={() => onAddCard(deck.deckId)}>Add card</Button>
              <Button size="small" disabled={Boolean(deletingDeckId)} onClick={() => onEditDeck(deck.deckId)}>Edit deck</Button>
              <Popconfirm
                title="Delete this deck?"
                description="This will also delete all cards in it."
                onConfirm={() => onDeleteDeck(deck.deckId)}
              >
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  loading={deletingDeckId === deck.deckId}
                  disabled={Boolean(deletingDeckId)}
                  aria-label="Delete deck"
                />
              </Popconfirm>
            </div>
          </div>
        ))}
      </InfiniteScroll>
      <Button className={styles.addButton} onClick={onAddDeck}>+ New deck</Button>
    </>
  )
}

export default DeckList
