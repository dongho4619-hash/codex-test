import { useMemo, useState } from 'react';
import { createWord, getAccuracy } from '../utils/storage';

const emptyForm = { word: '', meaning: '', partOfSpeech: '', example: '', difficulty: '보통', status: '미암기' };

export default function Vocabulary({ words, setWords }) {
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return words;
    return words.filter((word) => word.word.toLowerCase().includes(q) || word.meaning.toLowerCase().includes(q));
  }, [words, query]);

  const addWord = (event) => {
    event.preventDefault();
    if (!form.word.trim() || !form.meaning.trim()) return;
    setWords((prev) => [createWord(form), ...prev]);
    setForm(emptyForm);
  };

  const updateStatus = (id, status) => setWords((prev) => prev.map((word) => word.id === id ? { ...word, status } : word));

  return <section className="page"><div className="section-title"><h2>단어장</h2><input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="단어 또는 뜻으로 검색" /></div>
    <form className="word-form" onSubmit={addWord}>
      <input value={form.word} onChange={(e) => setForm({ ...form, word: e.target.value })} placeholder="TOEFL 단어" />
      <input value={form.meaning} onChange={(e) => setForm({ ...form, meaning: e.target.value })} placeholder="뜻" />
      <input value={form.partOfSpeech} onChange={(e) => setForm({ ...form, partOfSpeech: e.target.value })} placeholder="품사" />
      <input value={form.example} onChange={(e) => setForm({ ...form, example: e.target.value })} placeholder="예문" />
      <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}><option>쉬움</option><option>보통</option><option>어려움</option></select>
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>미암기</option><option>복습중</option><option>암기완료</option></select>
      <button type="submit">단어 추가</button>
    </form>
    <div className="word-grid">{filtered.map((word) => <article className="word-card" key={word.id}><div><h3>{word.word}</h3><p>{word.meaning}</p></div><span>{word.partOfSpeech}</span><p className="example">{word.example}</p><div className="meta"><b>{word.difficulty}</b><select value={word.status} onChange={(e) => updateStatus(word.id, e.target.value)}><option>미암기</option><option>복습중</option><option>암기완료</option></select><em>정답률 {getAccuracy(word)}%</em></div></article>)}</div>
  </section>;
}
