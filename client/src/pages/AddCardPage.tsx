import { useMutation } from '@apollo/client/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddCardForm from '../components/AddCardForm'
import { CURRENT_USER_ID } from '../constants/user'
import { ADD_CARD } from '../graphql/card'
import { GET_DECKS } from '../graphql/deck'

const AddCardPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()

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
    refetchQueries: [{ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } }],
  })

  const handleSubmit = async (text: string, textTranslation: string) => {
    await addCard({ variables: { userId: CURRENT_USER_ID, deckId: deckId!, text, textTranslation } })
  }

  const handleCancel = () => navigate('/')

  return <AddCardForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
}

export default AddCardPage
