import { getAccuracy } from '../utils/storage';

export default function Dashboard({ words }) {
  const total = words.length;
  const mastered = words.filter((word) => word.status === '암기완료').length;
  const learning = words.filter((word) => word.status === '복습중').length;
  const todayReview = words.filter((word) => word.status === '미암기' || word.status === '복습중').length;
  const attempts = words.reduce((sum, word) => sum + word.correctCount + word.wrongCount, 0);
  const correct = words.reduce((sum, word) => sum + word.correctCount, 0);
  const accuracy = attempts === 0 ? 0 : Math.round((correct / attempts) * 100);
  const difficultWords = [...words].sort((a, b) => getAccuracy(a) - getAccuracy(b)).slice(0, 5);

  return (
    <section className="page">
      <div className="hero"><h2>오늘도 TOEFL 단어를 꾸준히 복습해요</h2><p>첫 화면은 대시보드입니다. localStorage에 자동 저장됩니다.</p></div>
      <div className="stats-grid">
        <Stat label="전체 단어 수" value={total} />
        <Stat label="암기완료 단어 수" value={mastered} />
        <Stat label="복습중 단어 수" value={learning} />
        <Stat label="오늘 복습할 단어 수" value={todayReview} />
        <Stat label="전체 정답률" value={`${accuracy}%`} />
      </div>
      <div className="card"><h3>우선 복습 추천</h3><div className="mini-list">{difficultWords.map((word) => <div key={word.id}><strong>{word.word}</strong><span>{word.meaning}</span><em>{getAccuracy(word)}%</em></div>)}</div></div>
    </section>
  );
}

function Stat({ label, value }) { return <div className="stat-card"><span>{label}</span><strong>{value}</strong></div>; }
