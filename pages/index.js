import { useState, useEffect } from 'react';

export default function Home() {
  const [theme, setTheme] = useState(null); // null = intro, 'silver' or 'liquid'
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  useEffect(() => {
    if (theme && activeTab === 'home') {
      fetchTweets();
    }
  }, [theme, activeTab]);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tweets');
      if (response.ok) {
        const data = await response.json();
        setTweets(data.worldTrending || []);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // INTRO SCREEN
  // ═══════════════════════════════════════════════════════════════

  if (!theme) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#fff',
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .logo-text {
            font-size: 48px;
            font-weight: 900;
            background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: float 3s ease-in-out infinite;
            margin-bottom: 20px;
            letter-spacing: -2px;
          }
          .subtitle {
            font-size: 14px;
            color: #888;
            margin-bottom: 60px;
            text-align: center;
          }
          .theme-btn {
            width: 100%;
            max-width: 280px;
            padding: 20px;
            margin: 12px 0;
            background: rgba(255, 255, 255, 0.06);
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 16px;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
          .theme-btn:hover {
            background: rgba(0, 212, 255, 0.15);
            border-color: #00d4ff;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
            transform: translateY(-2px);
          }
          .theme-icon {
            font-size: 32px;
            margin-bottom: 8px;
          }
          .theme-desc {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
          }
        `}</style>

        <div className="logo-text">Tweetify</div>
        <div className="subtitle">✨ Choose Your Theme ✨</div>

        <button 
          className="theme-btn"
          onClick={() => setTheme('silver')}
          style={{ marginTop: '40px' }}
        >
          <div className="theme-icon">🌙</div>
          <div>Silver Tweets</div>
          <div className="theme-desc">Y2K Glossy • Dark Mode Only</div>
        </button>

        <button 
          className="theme-btn"
          onClick={() => setTheme('liquid')}
        >
          <div className="theme-icon">💧</div>
          <div>Liquid Tweets</div>
          <div className="theme-desc">Glass Effect • Day/Night Toggle</div>
        </button>

        <div style={{ fontSize: '12px', color: '#555', marginTop: '80px', textAlign: 'center' }}>
          <div>Twitter to Telegram Bridge</div>
          <div style={{ marginTop: '4px' }}>Real-time Tweet Updates</div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // SILVER THEME (Y2K Glossy - Dark Mode Only)
  // ═══════════════════════════════════════════════════════════════

  if (theme === 'silver') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <style jsx>{`
          .header { padding: 16px; background: rgba(0, 0, 0, 0.6); border-bottom: 1px solid rgba(0, 212, 255, 0.1); }
          .logo { font-size: 24px; font-weight: 900; text-align: center; background: linear-gradient(135deg, #00d4ff, #0099ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; }
          .category-btn { padding: 16px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 12px; color: #fff; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.3s; backdrop-filter: blur(10px); }
          .category-btn:active { background: rgba(0, 212, 255, 0.15); border-color: #00d4ff; }
          .heart { text-align: center; padding: 30px; font-size: 80px; }
          .live-text { text-align: center; font-size: 18px; font-weight: 700; color: #00d4ff; letter-spacing: 2px; }
          .trending { padding: 16px; }
          .trending-title { font-size: 14px; font-weight: 700; color: #00d4ff; margin-bottom: 12px; }
          .trending-item { background: rgba(255, 255, 255, 0.06); padding: 12px; border-radius: 8px; margin-bottom: 8px; font-size: 12px; color: #aaa; border-left: 3px solid #00d4ff; }
          .nav { display: flex; justify-content: space-around; padding: 12px; border-top: 1px solid rgba(0, 212, 255, 0.1); position: sticky; bottom: 0; background: rgba(0, 0, 0, 0.8); }
          .nav-btn { background: none; border: none; color: #666; cursor: pointer; font-size: 20px; transition: color 0.3s; }
          .nav-btn.active { color: #00d4ff; }
        `}</style>

        <div className="header">
          <div className="logo">Tweetify</div>
        </div>

        {activeTab === 'home' && (
          <div>
            <div className="category-grid">
              <button className="category-btn">😂 Funny</button>
              <button className="category-btn">🤪 Unhinged</button>
              <button className="category-btn">🏛️ Political</button>
              <button className="category-btn">➕ Extra</button>
            </div>

            <div className="heart">
              <div style={{ fontSize: '60px', marginBottom: '10px' }}>💎</div>
              <div className="live-text">LIVE TWEETS</div>
            </div>

            <div className="trending">
              <div className="trending-title">📌 Trending Threads</div>
              {loading ? (
                <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>Loading tweets...</div>
              ) : tweets.length > 0 ? (
                tweets.slice(0, 3).map((tweet, idx) => (
                  <div key={idx} className="trending-item">
                    @{tweet.username} • {tweet.time}
                  </div>
                ))
              ) : (
                <div className="trending-item">No tweets available</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Search coming soon</div>}
        {activeTab === 'notif' && <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Notifications</div>}
        {activeTab === 'profile' && <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Profile</div>}

        <div className="nav">
          <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>🏠</button>
          <button className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>🔍</button>
          <button className={`nav-btn ${activeTab === 'notif' ? 'active' : ''}`} onClick={() => setActiveTab('notif')}>🔔</button>
          <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>👤</button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // LIQUID THEME (Glass Effect - Dark/Light Mode)
  // ═══════════════════════════════════════════════════════════════

  const colors = isDark ? {
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    card: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(0, 212, 255, 0.2)',
    text: '#fff',
    textSecondary: '#aaa',
    accent: '#00d4ff',
  } : {
    bg: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0f7 100%)',
    card: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(0, 100, 200, 0.2)',
    text: '#1a1a1a',
    textSecondary: '#666',
    accent: '#0066ff',
  };

  return (
    <div style={{
      background: colors.bg,
      minHeight: '100vh',
      color: colors.text,
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style jsx>{`
        .liquid-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${colors.border};
        }
        .liquid-logo {
          font-size: 20px;
          font-weight: 900;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mode-toggle {
          background: ${colors.card};
          border: 1px solid ${colors.border};
          color: ${colors.text};
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }
        .liquid-card {
          background: ${colors.card};
          border: 1px solid ${colors.border};
          border-radius: 14px;
          padding: 14px;
          margin: 10px;
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        .liquid-card:active { background: rgba(0, 212, 255, 0.15); }
        .tweet-text { font-size: 13px; color: ${colors.text}; line-height: 1.6; }
        .tweet-meta { font-size: 11px; color: ${colors.textSecondary}; margin-top: 8px; }
        .nav { display: flex; justify-content: space-around; padding: 12px; border-top: 1px solid ${colors.border}; background: ${colors.card}; backdrop-filter: blur(20px); position: sticky; bottom: 0; }
        .nav-btn { background: none; border: none; color: ${colors.textSecondary}; cursor: pointer; font-size: 20px; transition: color 0.3s; }
        .nav-btn.active { color: ${colors.accent}; }
      `}</style>

      <div className="liquid-header">
        <div className="liquid-logo">✨ Tweetify</div>
        <button className="mode-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {activeTab === 'home' && (
        <div style={{ paddingBottom: '60px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
              Loading tweets...
            </div>
          ) : tweets.length > 0 ? (
            tweets.map((tweet, idx) => (
              <div key={idx} className="liquid-card">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.accent}, #0099ff)`,
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{tweet.user}</div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary }}>{tweet.time}</div>
                  </div>
                </div>
                <div className="tweet-text">{tweet.text}</div>
                <div className="tweet-meta">💬 {tweet.likes} ❤️ {tweet.retweets} 🔁</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
              No tweets yet
            </div>
          )}
        </div>
      )}

      {activeTab === 'search' && <div style={{ padding: '20px', textAlign: 'center', color: colors.textSecondary }}>Search</div>}
      {activeTab === 'notif' && <div style={{ padding: '20px', textAlign: 'center', color: colors.textSecondary }}>Notifications</div>}
      {activeTab === 'profile' && <div style={{ padding: '20px', textAlign: 'center', color: colors.textSecondary }}>Profile</div>}

      <div className="nav">
        <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>🏠</button>
        <button className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>🔍</button>
        <button className={`nav-btn ${activeTab === 'notif' ? 'active' : ''}`} onClick={() => setActiveTab('notif')}>🔔</button>
        <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>👤</button>
      </div>
    </div>
  );
}
