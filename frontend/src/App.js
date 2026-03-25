import { Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import ChatPage from './pages/ChatPage';
import LegalAidPage from './pages/LegalAidPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar />
        <Disclaimer />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/legal-aid" element={<LegalAidPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;
