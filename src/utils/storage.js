import { sampleWords } from '../data/sampleWords';

const STORAGE_KEY = 'toefl-vocabulary-words';

export function loadWords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleWords;
  } catch {
    return sampleWords;
  }
}

export function saveWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function createWord(values) {
  return {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
    word: values.word.trim(),
    meaning: values.meaning.trim(),
    partOfSpeech: values.partOfSpeech.trim(),
    example: values.example.trim(),
    difficulty: values.difficulty,
    status: values.status,
    correctCount: 0,
    wrongCount: 0,
    lastReviewed: ''
  };
}

export function getAccuracy(word) {
  const total = word.correctCount + word.wrongCount;
  return total === 0 ? 0 : Math.round((word.correctCount / total) * 100);
}
