import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCardPage from './pages/AddCardPage'
import CreateDeckPage from './pages/CreateDeckPage'
import DeckListPage from './pages/DeckListPage'
import EditCardPage from './pages/EditCardPage'
import EditDeckPage from './pages/EditDeckPage'
import StudyPage from './pages/StudyPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DeckListPage />} />
      <Route path="/create-deck" element={<CreateDeckPage />} />
      <Route path="/decks/:deckId/add-card" element={<AddCardPage />} />
      <Route path="/study/:deckId" element={<StudyPage />} />
      <Route path="/study/:deckId/edit-card/:cardId" element={<EditCardPage />} />
      <Route path="/decks/:deckId/edit" element={<EditDeckPage />} />
    </Routes>
  )
}

export default App
