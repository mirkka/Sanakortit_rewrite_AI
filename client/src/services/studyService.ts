import _ from 'lodash'
import { Card } from '../store/cardSlice'

export const pickWeightedCard = (cards: Card[]): Card =>
  _.sample(_.flatMap(cards, (card) => _.times(card.weight, () => card)))!
