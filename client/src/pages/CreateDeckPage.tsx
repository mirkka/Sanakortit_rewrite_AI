import { useMutation } from '@apollo/client/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateDeckForm from '../components/CreateDeckForm'
import { CURRENT_USER_ID } from '../constants/user'
import { CREATE_DECK, GET_DECKS } from '../graphql/deck'

const CreateDeckPage: React.FC = () => {
  const navigate = useNavigate()

  const [createDeck, { loading }] = useMutation(CREATE_DECK, {
    optimisticResponse: ({ userId, name }) => ({
      createDeck: {
        __typename: 'Deck' as const,
        deckId: crypto.randomUUID(),
        name,
        userId: userId as string,
        numberOfCards: 0,
        lastStudied: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    update: (cache, { data }) => {
      if (!data) return
      const existing = cache.readQuery({ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } })
      if (!existing) return
      cache.writeQuery({
        query: GET_DECKS,
        variables: { userId: CURRENT_USER_ID },
        data: { getDecks: [...existing.getDecks, data.createDeck] },
      })
    },
    refetchQueries: [{ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } }],
    awaitRefetchQueries: true,
  })

  const handleSubmit = async (name: string) => {
    await createDeck({ variables: { userId: CURRENT_USER_ID, name } })
    navigate('/')
  }

  const handleCancel = () => navigate('/')

  return <CreateDeckForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
}

export default CreateDeckPage
