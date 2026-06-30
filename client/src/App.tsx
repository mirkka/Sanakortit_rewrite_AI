import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HelloQuery from './components/HelloQuery';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloQuery />} />
    </Routes>
  );
};

export default App;
