const navItems = [
  ['dashboard', '대시보드', '📊'],
  ['vocabulary', '단어장', '📚'],
  ['review', '오늘의 복습', '🗓️'],
  ['quiz', '단어 퀴즈', '🧠']
];

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-icon">🎓</span>
        <div>
          <h1>TOEFL Vocab</h1>
          <p>개인 단어 학습 앱</p>
        </div>
      </div>
      <div className="nav-links">
        {navItems.map(([key, label, icon]) => (
          <button key={key} className={currentPage === key ? 'active' : ''} onClick={() => onNavigate(key)}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>
    </nav>
  );
}
