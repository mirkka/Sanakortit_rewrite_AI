import { useMutation, useQuery } from '@apollo/client/react'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StudyCard from '../components/StudyCard'
import { CURRENT_USER_ID } from '../constants/user'
import { GET_CARDS_FOR_DECK, MARK_CARD_DIFFICULTY } from '../graphql/card'
import { GET_DECKS } from '../graphql/deck'
import { pickWeightedCard } from '../services/studyService'
import { AppDispatch } from '../store'
import { selectCards, setCards, updateCardWeight } from '../store/cardSlice'
import { flipCard, resetStudy, selectCurrentCard, selectIsFlipped, setCurrentCard } from '../store/studySlice'

const StudyPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const cards = useSelector(selectCards)
  const currentCard = useSelector(selectCurrentCard)
  const isFlipped = useSelector(selectIsFlipped)

  const remainingCards = cards.filter((c) => c.weight > 0)
  const isFinished = cards.length > 0 && remainingCards.length === 0

  const { data, loading, error } = useQuery(GET_CARDS_FOR_DECK, {
    variables: { userId: CURRENT_USER_ID, deckId: deckId! },
  })

  const [markDifficulty] = useMutation(MARK_CARD_DIFFICULTY, {
    refetchQueries: [{ query: GET_DECKS, variables: { userId: CURRENT_USER_ID } }],
  })

  useEffect(() => {
    dispatch(resetStudy())
  }, [deckId, dispatch])

  useEffect(() => {
    if (!data) return
    dispatch(setCards(data.getCardsForDeck))
    const nonDone = data.getCardsForDeck.filter((c) => c.weight > 0)
    if (nonDone.length > 0) dispatch(setCurrentCard(pickWeightedCard(nonDone)))
  }, [data, dispatch])

  useEffect(() => {
    if (!isFinished) return
    const timer = setTimeout(() => navigate('/'), 2000)
    return () => clearTimeout(timer)
  }, [isFinished, navigate])

  if (loading) return <Spin />
  if (error) return <p>Error loading cards: {error.message}</p>

  const handleDifficulty = async (weight: number) => {
    if (!currentCard) return

    const updatedRemaining = remainingCards
      .map((c) => (c.cardId === currentCard.cardId ? { ...c, weight } : c))
      .filter((c) => c.weight > 0)

    await markDifficulty({
      variables: { userId: CURRENT_USER_ID, deckId: deckId!, cardId: currentCard.cardId, weight },
    })
    dispatch(updateCardWeight({ cardId: currentCard.cardId, weight }))

    if (updatedRemaining.length > 0) dispatch(setCurrentCard(pickWeightedCard(updatedRemaining)))
  }

  return (
    <StudyCard
      text={currentCard?.text ?? ''}
      textTranslation={currentCard?.textTranslation ?? ''}
      isFlipped={isFlipped}
      isFinished={isFinished}
      onFlip={() => dispatch(flipCard())}
      onDifficulty={handleDifficulty}
      onFinish={() => navigate('/')}
      onEditCard={() => navigate(`/study/${deckId}/edit-card/${currentCard?.cardId}`)}
    />
  )
}

export default StudyPage
