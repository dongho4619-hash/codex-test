import { getAccuracy } from '../utils/storage';

export default function Review({ words }) {
  const reviewWords = words.filter((word) => word.status === '미암기' || word.status === '복습중');
  return <section className="page"><div className="section-title"><h2>오늘의 복습</h2><p>{reviewWords.length}개 단어를 복습하세요.</p></div><div className="review-list">{reviewWords.map((word) => <article className="review-card" key={word.id}><div><h3>{word.word}</h3><p>{word.meaning}</p><small>{word.example}</small></div><div><span>{word.status}</span><b>{getAccuracy(word)}%</b><small>마지막 복습: {word.lastReviewed || '아직 없음'}</small></div></article>)}</div></section>;
}
