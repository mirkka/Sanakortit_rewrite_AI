import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import AuthCallbackGate from './components/AuthCallbackGate'
import RequireAuth from './components/RequireAuth'
import AddCardPage from './pages/AddCardPage'
import CreateDeckPage from './pages/CreateDeckPage'
import DeckListPage from './pages/DeckListPage'
import EditCardPage from './pages/EditCardPage'
import EditDeckPage from './pages/EditDeckPage'
import SignInPage from './pages/SignInPage'
import StudyPage from './pages/StudyPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><AuthCallbackGate><RequireAuth><DeckListPage /></RequireAuth></AuthCallbackGate></AppLayout>} />
      <Route path="/sign-in" element={<AppLayout><SignInPage /></AppLayout>} />
      <Route path="/create-deck" element={<AppLayout><RequireAuth><CreateDeckPage /></RequireAuth></AppLayout>} />
      <Route path="/decks/:deckId/add-card" element={<AppLayout><RequireAuth><AddCardPage /></RequireAuth></AppLayout>} />
      <Route path="/study/:deckId" element={<RequireAuth><StudyPage /></RequireAuth>} />
      <Route path="/study/:deckId/edit-card/:cardId" element={<AppLayout><RequireAuth><EditCardPage /></RequireAuth></AppLayout>} />
      <Route path="/decks/:deckId/edit" element={<AppLayout><RequireAuth><EditDeckPage /></RequireAuth></AppLayout>} />
    </Routes>
  )
}

export default App
