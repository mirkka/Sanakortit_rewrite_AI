import { Button, Space, Table } from 'antd'
import React from 'react'
import { formatLastStudied, sortDecksAlphabetically } from '../services/deckService'
import { Deck } from '../store/deckSlice'

interface Props {
  decks: Deck[]
  onAddCard: (deckId: string) => void
  onAddDeck: () => void
  onStartStudy: (deckId: string) => void
  onRestartStudy: (deckId: string) => void
  onEditDeck: (deckId: string) => void
}

const DeckList: React.FC<Props> = ({ decks, onAddCard, onAddDeck, onStartStudy, onRestartStudy, onEditDeck }) => {
  const sorted = sortDecksAlphabetically(decks)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cards',
      dataIndex: 'numberOfCards',
      key: 'numberOfCards',
    },
    {
      title: 'Last Studied',
      dataIndex: 'lastStudied',
      key: 'lastStudied',
      render: (lastStudied: string | null) => formatLastStudied(lastStudied),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string | null) => status ?? '-',
    },
    {
      title: '',
      key: 'actions',
      render: (_: unknown, deck: Deck) => (
        <Space>
          {deck.status === 'Finished'
            ? <Button onClick={() => onRestartStudy(deck.deckId)}>Restart Study</Button>
            : <Button onClick={() => onStartStudy(deck.deckId)}>Start Study</Button>
          }
          <Button onClick={() => onAddCard(deck.deckId)}>Add Card</Button>
          <Button onClick={() => onEditDeck(deck.deckId)}>Edit Deck</Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table dataSource={sorted} columns={columns} rowKey="deckId" />
      <Button type="primary" onClick={onAddDeck}>Add Deck</Button>
    </>
  )
}

export default DeckList
