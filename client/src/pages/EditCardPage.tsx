import { useMutation, useQuery } from '@apollo/client/react'
import { Spin } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditCardForm from '../components/EditCardForm'
import { GET_CARDS_FOR_DECK, UPDATE_CARD } from '../graphql/card'

const EditCardPage: React.FC = () => {
  const { deckId, cardId } = useParams<{ deckId: string; cardId: string }>()
  const navigate = useNavigate()
  const backToStudy = () => navigate(`/study/${deckId}`)

  const { data, loading: queryLoading } = useQuery(GET_CARDS_FOR_DECK, {
    variables: { deckId: deckId! },
  })

  const [updateCard, { loading: mutationLoading }] = useMutation(UPDATE_CARD, {
    refetchQueries: [{ query: GET_CARDS_FOR_DECK, variables: { deckId: deckId! } }],
    awaitRefetchQueries: true,
  })

  if (queryLoading) return <Spin />

  const card = data?.getCardsForDeck.find((c) => c.cardId === cardId)
  if (!card) return <p>Card not found</p>

  const handleSubmit = async (text: string, textTranslation: string) => {
    await updateCard({ variables: { deckId: deckId!, cardId: cardId!, text, textTranslation } })
    backToStudy()
  }

  return (
    <EditCardForm
      initialText={card.text}
      initialTextTranslation={card.textTranslation}
      onSubmit={handleSubmit}
      onCancel={backToStudy}
      loading={mutationLoading}
    />
  )
}

export default EditCardPage
