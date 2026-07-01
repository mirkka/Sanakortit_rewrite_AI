import { useMutation, useQuery } from '@apollo/client/react'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeckList from '../components/DeckList'
import { CURRENT_USER_ID } from '../constants/user'
import { GET_DECKS, RESET_DECK } from '../graphql/deck'
import { AppDispatch } from '../store'
import { selectDecks, setDecks } from '../store/deckSlice'

const DeckListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const decks = useSelector(selectDecks)

  const [resetDeck] = useMutation(RESET_DECK, {
    refetchQueries: [{ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } }],
    awaitRefetchQueries: true,
  })

  const { data, loading, error } = useQuery(GET_DECKS, {
    variables: { userId: CURRENT_USER_ID },
  })

  useEffect(() => {
    if (data) dispatch(setDecks(data.getDecks))
  }, [data, dispatch])

  if (loading) return <Spin />
  if (error) return <p>Error loading decks: {error.message}</p>

  return (
    <DeckList
      decks={decks}
      onAddCard={(deckId) => navigate(`/decks/${deckId}/add-card`)}
      onAddDeck={() => navigate('/create-deck')}
      onStartStudy={(deckId) => navigate(`/study/${deckId}`)}
      onRestartStudy={async (deckId) => {
        await resetDeck({ variables: { userId: CURRENT_USER_ID, deckId } })
        navigate(`/study/${deckId}`)
      }}
      onEditDeck={(deckId) => navigate(`/decks/${deckId}/edit`)}
    />
  )
}

export default DeckListPage
