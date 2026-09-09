import { orderBy } from 'lodash'
import { DateTime } from 'luxon'
import { Deck } from '../store/deckSlice'

export const sortDecksAlphabetically = (decks: Deck[]): Deck[] =>
  orderBy(decks, [(d) => d.name.toLowerCase()], ['asc'])

export const formatLastStudied = (lastStudied: string | null): string => {
  if (!lastStudied) return '-'
  return DateTime.fromISO(lastStudied).toFormat('d.M.yyyy')
}
