import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');
  const [isDark, setIsDark] = useState(true);
  const [notification, setNotification] = useState('');
  const [tweets, setTweets] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tweets');
      if (response.ok) {
        const data = await response.json();
        setTweets(data);
        setNotification('✨ Fresh tweets loaded!');
        setTimeout(() => setNotification(''), 2500);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Show dummy data if API fails
      setTweets({
        worldTrending: [
          { id: 1, user: '@BBCBreaking', name: 'BBC Breaking', text: 'Latest breaking news', time: 'now', likes: 45000, retweets: 18000, views: '2.1M' },
          { id: 2, user: '@Reuters', name: 'Reuters', text: 'Major developments happening', time: '5 min ago', likes: 32000, retweets: 14000, views: '1.4M' },
        ],
        iranTimeline: [
          { id: 10, user: '@IranIntl_Fa', name: 'Iran International', text: 'اخبار فوری', time: '2 min ago', likes: 21000, retweets: 9500, views: '1.1M' },
          { id: 11, user: '@bbcpersian', name: 'BBC Persian', text: 'توضیحات روز', time: '8 min ago', likes: 18500, retweets: 8000, views: '900K' },
        ],
        news: [
          { id: 20, user: '@BreakingNews', name: 'Breaking News', text: 'Today top stories', time: '1 min ago', likes: 56000, retweets: 22000, views: '3.2M' },
        ],
      });
    }
    setLoading(false);
  };

  const colors = isDark ? {
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    card: 'rgba(255, 255, 255, 0.06)',
    cardBorder: 'rgba(200, 220, 255, 0.1)',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    accent: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    accentLight: 'rgba(0, 212, 255, 0.1)',
  } : {
    bg: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0f7 100%)',
    card: 'rgba(255, 255, 255, 0.8)',
    cardBorder: 'rgba(100, 150, 255, 0.2)',
    text: '#1a1a1a',
    textSecondary: '#666666',
    accent: 'linear-gradient(135deg, #006fee 0%, #0099ff 100%)',
    accentLight: 'rgba(0, 111, 238, 0.08)',
  };

  const TweetCard = ({ tweet, topicColor = '#00d4ff' }) => (
    <div style={{
      background: colors.card,
      border: `1.5px solid ${colors.cardBorder}`,
      borderRadius: '16px',
      padding: '14px',
      margin: '10px 14px',
      backdropFilter: 'blur(10px)',
      boxShadow: isDark ? '0 8px 32px rgba(0, 212, 255, 0.08)' : '0 8px 32px rgba(0, 100, 200, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${topicColor}, ${topicColor}dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          flexShrink: 0,
          boxShadow: `0 4px 15px ${topicColor}40`,
        }}>
          {tweet.user.charAt(1).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: colors.text }}>{tweet.user}</div>
              <div style={{ fontSize: '11px', color: colors.textSecondary }}>{tweet.name}</div>
            </div>
            <div style={{ fontSize: '10px', color: colors.textSecondary, whiteSpace: 'nowrap' }}>{tweet.time}</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '13px', lineHeight: '1.6', color: colors.text, marginBottom: '10px' }}>
        {tweet.text}
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        fontSize: '11px',
        color: colors.textSecondary,
        borderTop: `1px solid ${colors.cardBorder}`,
        paddingTop: '8px',
      }}>
        <span>💬 {(tweet.likes / 1000).toFixed(1)}K</span>
        <span>🔁 {(tweet.retweets / 1000).toFixed(1)}K</span>
        <span>❤️ {tweet.views || 'Like'}</span>
      </div>
    </div>
  );

  return (
    <div style={{
      background: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glossy background effect */}
      <div style={{
        position: 'fixed',
        top: '-50%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: isDark ? 'rgba(0, 212, 255, 0.05)' : 'rgba(0, 100, 200, 0.05)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <style jsx>{`
        * { box-sizing: border-box; }
        
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${colors.cardBorder};
          padding: 14px;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .bot-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bot-name {
          font-size: 18px;
          font-weight: 800;
          background: ${colors.accent};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .mode-toggle {
          background: ${colors.accentLight};
          border: 1.5px solid ${colors.cardBorder};
          color: ${colors.text};
          width: 40px;
          height: 40px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .mode-toggle:active {
          transform: scale(0.95);
          background: ${colors.accentLight};
        }

        .tabs {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .tab {
          flex: 1;
          padding: '8px 12px;
          background: ${colors.accentLight};
          border: 1.5px solid transparent;
          color: ${colors.text};
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          white-space: nowrap;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .tab.active {
          border-color: #00d4ff;
          background: rgba(0, 212, 255, 0.15);
          color: #00d4ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .notification {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          color: #000;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 999;
          animation: slideDown 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .section-header {
          padding: 16px 14px 8px;
          font-size: 15px;
          font-weight: 700;
          background: ${colors.accentLight};
          margin-top: 12px;
          border-radius: 12px;
          margin-left: 14px;
          margin-right: 14px;
        }

        .loading {
          text-align: center;
          padding: 40px 20px;
          color: ${colors.textSecondary};
        }

        .loader {
          display: inline-block;
          width: 30px;
          height: 30px;
          border: 3px solid ${colors.accentLight};
          border-radius: 50%;
          border-top-color: #00d4ff;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div className="bot-title">
            <span style={{ fontSize: '20px' }}>✨</span>
            <div className="bot-name">Tweet1fy</div>
          </div>
          <button className="mode-toggle" onClick={() => setIsDark(!isDark)} title="Toggle dark/light mode">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="tabs">
          <button className={`tab ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => setActiveTab('trending')}>
            🌍 Trending
          </button>
          <button className={`tab ${activeTab === 'iran' ? 'active' : ''}`} onClick={() => setActiveTab('iran')}>
            🇮🇷 Iran
          </button>
          <button className={`tab ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}>
            📰 News
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Content */}
      <div style={{ paddingBottom: 30 }}>
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p style={{ marginTop: '16px' }}>Loading tweets...</p>
          </div>
        ) : tweets ? (
          <>
            {activeTab === 'trending' && (
              <div>
                <div className="section-header">🌍 World Trending</div>
                <p style={{ padding: '0 14px', fontSize: '11px', color: colors.textSecondary, marginTop: '4px' }}>
                  Top trending topics globally
                </p>
                {tweets.worldTrending?.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} topicColor="#00d4ff" />
                ))}
              </div>
            )}

            {activeTab === 'iran' && (
              <div>
                <div className="section-header">🇮🇷 Iran Timeline</div>
                <p style={{ padding: '0 14px', fontSize: '11px', color: colors.textSecondary, marginTop: '4px' }}>
                  Top Iran content • Filtered accounts
                </p>
                {tweets.iranTimeline?.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} topicColor="#ff6b6b" />
                ))}
              </div>
            )}

            {activeTab === 'news' && (
              <div>
                <div className="section-header">📰 Today's News</div>
                <p style={{ padding: '0 14px', fontSize: '11px', color: colors.textSecondary, marginTop: '4px' }}>
                  Breaking news • Updated every 15 min
                </p>
                {tweets.news?.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} topicColor="#4ecca3" />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px 14px',
        textAlign: 'center',
        color: colors.textSecondary,
        fontSize: '11px',
        borderTop: `1px solid ${colors.cardBorder}`,
        backdropFilter: 'blur(10px)',
      }}>
        <div>Powered by <strong style={{ color: '#00d4ff' }}>@Tweet1fy_bot</strong></div>
        <div style={{ marginTop: 6 }}>✨ Y2K Glossy Design • Real-time Updates</div>
      </div>
    </div>
  );
}
