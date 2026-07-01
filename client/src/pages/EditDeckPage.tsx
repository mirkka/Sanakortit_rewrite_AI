import { useMutation } from '@apollo/client/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditDeckForm from '../components/EditDeckForm'
import { CURRENT_USER_ID } from '../constants/user'
import { GET_DECKS, UPDATE_DECK } from '../graphql/deck'
import { selectDecks } from '../store/deckSlice'

const EditDeckPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const backToList = () => navigate('/')

  const decks = useSelector(selectDecks)
  const deck = decks.find((d) => d.deckId === deckId)

  const [updateDeck, { loading }] = useMutation(UPDATE_DECK, {
    refetchQueries: [{ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } }],
    awaitRefetchQueries: true,
  })

  if (!deck) return <p>Deck not found</p>

  const handleSubmit = async (name: string) => {
    await updateDeck({ variables: { userId: CURRENT_USER_ID, deckId: deckId!, name } })
    backToList()
  }

  return (
    <EditDeckForm
      initialName={deck.name}
      onSubmit={handleSubmit}
      onCancel={backToList}
      loading={loading}
    />
  )
}

export default EditDeckPage
