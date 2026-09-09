import { LoadingOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client/react'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeckList from '../components/DeckList'
import { DELETE_DECK, GET_DECKS, RESET_DECK } from '../graphql/deck'
import { AppDispatch } from '../store'
import { selectDecks, setDecks } from '../store/deckSlice'

const DeckListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const decks = useSelector(selectDecks)
  const [deletingDeckId, setDeletingDeckId] = useState<string | null>(null)

  const [resetDeck] = useMutation(RESET_DECK, {
    refetchQueries: [{ query: GET_DECKS }],
    awaitRefetchQueries: true,
  })

  const [deleteDeck] = useMutation(DELETE_DECK, {
    refetchQueries: [{ query: GET_DECKS }],
    awaitRefetchQueries: true,
  })

  const { data, loading, error } = useQuery(GET_DECKS)

  useEffect(() => {
    if (data) dispatch(setDecks(data.getDecks))
  }, [data, dispatch])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )
  if (error) return <p>Error loading decks: {error.message}</p>

  return (
    <DeckList
      decks={decks}
      onAddCard={(deckId) => navigate(`/decks/${deckId}/add-card`)}
      onAddDeck={() => navigate('/create-deck')}
      onStartStudy={(deckId) => navigate(`/study/${deckId}`)}
      onRestartStudy={async (deckId) => {
        await resetDeck({ variables: { deckId } })
        navigate(`/study/${deckId}`)
      }}
      onEditDeck={(deckId) => navigate(`/decks/${deckId}/edit`)}
      onDeleteDeck={async (deckId) => {
        setDeletingDeckId(deckId)
        try {
          await deleteDeck({ variables: { deckId } })
        } finally {
          setDeletingDeckId(null)
        }
      }}
      deletingDeckId={deletingDeckId}
    />
  )
}

export default DeckListPage
