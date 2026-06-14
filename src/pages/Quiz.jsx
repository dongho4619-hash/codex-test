import { useMemo, useState } from 'react';
import { getAccuracy } from '../utils/storage';

const today = () => new Date().toISOString().slice(0, 10);

export default function Quiz({ words, setWords }) {
  const [mode, setMode] = useState('wordToMeaning');
  const [currentId, setCurrentId] = useState(words[0]?.id || '');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const current = useMemo(() => words.find((word) => word.id === currentId) || words[0], [words, currentId]);

  const nextQuestion = () => {
    if (!words.length) return;
    const next = words[Math.floor(Math.random() * words.length)];
    setCurrentId(next.id); setAnswer(''); setResult(null);
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (!current) return;
    const expected = mode === 'wordToMeaning' ? current.meaning : current.word;
    const correct = mode === 'wordToMeaning' ? expected.toLowerCase().includes(answer.trim().toLowerCase()) : expected.toLowerCase() === answer.trim().toLowerCase();
    setResult({ correct, expected });
    setWords((prev) => prev.map((word) => word.id === current.id ? { ...word, correctCount: word.correctCount + (correct ? 1 : 0), wrongCount: word.wrongCount + (correct ? 0 : 1), lastReviewed: today(), status: correct && word.status === '미암기' ? '복습중' : word.status } : word));
  };

  if (!current) return <section className="page"><h2>퀴즈를 만들 단어가 없습니다.</h2></section>;
  return <section className="page quiz-page"><div className="section-title"><h2>단어 퀴즈</h2><select value={mode} onChange={(e) => { setMode(e.target.value); setResult(null); }}><option value="wordToMeaning">영어 단어를 보고 뜻 맞히기</option><option value="meaningToWord">뜻을 보고 영어 단어 맞히기</option></select></div><div className="quiz-card"><span>문제</span><h3>{mode === 'wordToMeaning' ? current.word : current.meaning}</h3><form onSubmit={checkAnswer}><input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="정답 입력" autoFocus /><button>정답 확인</button></form>{result && <div className={result.correct ? 'result correct' : 'result wrong'}>{result.correct ? '정답입니다!' : '오답입니다.'} 정답: {result.expected}</div>}<button className="secondary" onClick={nextQuestion}>다음 문제</button></div><div className="card"><h3>복습 기록</h3><p>맞힌 횟수: {current.correctCount}회 · 틀린 횟수: {current.wrongCount}회 · 마지막 복습 날짜: {current.lastReviewed || '아직 없음'} · 정답률: {getAccuracy(current)}%</p></div></section>;
}
