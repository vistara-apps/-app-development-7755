import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ConversationView from './components/ConversationView';
import AgentManagement from './components/AgentManagement';
import Analytics from './components/Analytics';
import CustomerOnboarding from './components/CustomerOnboarding';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  if (!isOnboarded) {
    return <CustomerOnboarding onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversation/:id" element={<ConversationView />} />
            <Route path="/agents" element={<AgentManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;