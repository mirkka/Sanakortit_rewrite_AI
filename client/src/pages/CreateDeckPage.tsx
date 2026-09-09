import { useMutation } from '@apollo/client/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateDeckForm from '../components/CreateDeckForm'
import { CREATE_DECK, GET_DECKS } from '../graphql/deck'

const CreateDeckPage: React.FC = () => {
  const navigate = useNavigate()

  const [createDeck, { loading }] = useMutation(CREATE_DECK, {
    optimisticResponse: ({ name }) => ({
      createDeck: {
        __typename: 'Deck' as const,
        deckId: crypto.randomUUID(),
        name,
        userId: '',
        numberOfCards: 0,
        lastStudied: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    update: (cache, { data }) => {
      if (!data) return
      const existing = cache.readQuery({ query: GET_DECKS })
      if (!existing) return
      cache.writeQuery({
        query: GET_DECKS,
        data: { getDecks: [...existing.getDecks, data.createDeck] },
      })
    },
    refetchQueries: [{ query: GET_DECKS }],
    awaitRefetchQueries: true,
  })

  const handleSubmit = async (name: string) => {
    await createDeck({ variables: { name } })
    navigate('/')
  }

  const handleCancel = () => navigate('/')

  return <CreateDeckForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
}

export default CreateDeckPage
