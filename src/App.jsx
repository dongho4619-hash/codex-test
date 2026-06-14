import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Vocabulary from './pages/Vocabulary';
import Review from './pages/Review';
import Quiz from './pages/Quiz';
import { loadWords, saveWords } from './utils/storage';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [words, setWords] = useState(loadWords);
  useEffect(() => saveWords(words), [words]);
  const pages = { dashboard: <Dashboard words={words} />, vocabulary: <Vocabulary words={words} setWords={setWords} />, review: <Review words={words} />, quiz: <Quiz words={words} setWords={setWords} /> };
  return <><Navbar currentPage={page} onNavigate={setPage} /><main>{pages[page]}</main></>;
}
