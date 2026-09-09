import { useMutation } from '@apollo/client/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AddCardForm from '../components/AddCardForm'
import { ADD_CARD } from '../graphql/card'
import { GET_DECKS } from '../graphql/deck'
import { selectDecks } from '../store/deckSlice'

const AddCardPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()

  const decks = useSelector(selectDecks)
  const deck = decks.find((d) => d.deckId === deckId)

  const [addCard, { loading }] = useMutation(ADD_CARD, {
    optimisticResponse: ({ deckId: dId, text, textTranslation }) => ({
      addCard: {
        __typename: 'Card' as const,
        cardId: crypto.randomUUID(),
        deckId: dId as string,
        text,
        textTranslation,
        weight: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    refetchQueries: [{ query: GET_DECKS }],
  })

  const handleSubmit = async (text: string, textTranslation: string) => {
    await addCard({ variables: { deckId: deckId!, text, textTranslation } })
  }

  const handleCancel = () => navigate('/')

  return <AddCardForm deckName={deck?.name ?? ''} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
}

export default AddCardPage
