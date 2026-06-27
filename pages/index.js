import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');
  const [notification, setNotification] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Initialize Telegram Web App if available
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    setNotification('✅ Refreshed!');
    setTimeout(() => setNotification(''), 2000);
  };

  const dummyTweets = [
    {
      id: 1,
      user: '@BBCBreaking',
      text: 'BREAKING: Latest news update from around the world. Stay informed with real-time coverage.',
      time: '2 min ago',
      likes: 48200,
      retweets: 19400,
    },
    {
      id: 2,
      user: '@Reuters',
      text: 'Major developments in international news. Full coverage and analysis available now.',
      time: '8 min ago',
      likes: 31500,
      retweets: 14200,
    },
  ];

  const iranTweets = [
    {
      id: 10,
      user: '@IranIntl_Fa',
      text: 'توضیحات روز از ایران و جهان. اخبار فوری و تحلیل‌های خبری.',
      time: '4 min ago',
      likes: 21400,
      retweets: 9800,
    },
    {
      id: 11,
      user: '@bbcpersian',
      text: 'بررسی اتفاقات مهم در ایران. اخبار موثر و معتبر برای شما.',
      time: '11 min ago',
      likes: 18700,
      retweets: 8200,
    },
  ];

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .bot-name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .bot-handle {
          font-size: 12px;
          color: #4fc3f7;
        }
        .live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          background: rgba(76,175,80,0.2);
          color: #81c784;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 700;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          background: #81c784;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .refresh-btn {
          background: rgba(79,195,247,0.15);
          border: 1px solid rgba(79,195,247,0.3);
          color: #4fc3f7;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .refresh-btn:active {
          background: rgba(79,195,247,0.25);
        }
        
        .tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }
        .tab {
          flex: 1;
          padding: 10px 12px;
          background: rgba(255,255,255,0.05);
          border: none;
          color: #888;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .tab.active {
          color: #4fc3f7;
          background: rgba(79,195,247,0.1);
          border-bottom-color: #4fc3f7;
        }
        
        .tweet-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 12px;
          margin: 8px 16px;
        }
        .tweet-header {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          background: #4fc3f7;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tweet-meta {
          flex: 1;
        }
        .tweet-name {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }
        .tweet-handle {
          font-size: 11px;
          color: #4fc3f7;
        }
        .tweet-time {
          font-size: 10px;
          color: #555;
          margin-left: auto;
        }
        .tweet-text {
          font-size: 13px;
          line-height: 1.5;
          color: #d0d0d0;
          margin-bottom: 8px;
        }
        .tweet-stats {
          display: flex;
          gap: 12px;
          font-size: 10px;
          color: #555;
        }
        
        .notification {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          background: #4fc3f7;
          color: #000;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 999;
          animation: slideDown 0.3s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div>
            <div className="bot-name">Tweet1fy</div>
            <div className="bot-handle">@Tweet1fy_bot</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="live-badge">
              <span className="status-dot" />
              LIVE
            </div>
            <button className="refresh-btn" onClick={handleRefresh}>⟳ Refresh</button>
          </div>
        </div>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'trending' ? 'active' : ''}`} 
            onClick={() => setActiveTab('trending')}
          >
            🌍 Trending
          </button>
          <button 
            className={`tab ${activeTab === 'iran' ? 'active' : ''}`} 
            onClick={() => setActiveTab('iran')}
          >
            🇮🇷 Iran
          </button>
          <button 
            className={`tab ${activeTab === 'news' ? 'active' : ''}`} 
            onClick={() => setActiveTab('news')}
          >
            📰 News
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Content */}
      <div style={{ paddingBottom: 20 }}>
        {activeTab === 'trending' && (
          <div>
            <h2 style={{ color: '#4fc3f7', fontSize: 14, padding: '16px', marginBottom: 0 }}>🌍 World Trending</h2>
            <p style={{ color: '#555', fontSize: 11, padding: '0 16px' }}>Top trending topics globally</p>
            {dummyTweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card">
                <div className="tweet-header">
                  <div className="avatar" />
                  <div className="tweet-meta">
                    <div className="tweet-name">{tweet.user}</div>
                  </div>
                  <div className="tweet-time">{tweet.time}</div>
                </div>
                <div className="tweet-text">{tweet.text}</div>
                <div className="tweet-stats">
                  <span>💬 {(tweet.likes / 1000).toFixed(1)}K</span>
                  <span>🔁 {(tweet.retweets / 1000).toFixed(1)}K</span>
                  <span>❤️ Like</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'iran' && (
          <div>
            <h2 style={{ color: '#ef5350', fontSize: 14, padding: '16px', marginBottom: 0 }}>🇮🇷 Iran Timeline</h2>
            <p style={{ color: '#555', fontSize: 11, padding: '0 16px' }}>Top Iran content</p>
            {iranTweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card" style={{ borderLeft: '3px solid #ef5350' }}>
                <div className="tweet-header">
                  <div className="avatar" />
                  <div className="tweet-meta">
                    <div className="tweet-name">{tweet.user}</div>
                  </div>
                  <div className="tweet-time">{tweet.time}</div>
                </div>
                <div className="tweet-text">{tweet.text}</div>
                <div className="tweet-stats">
                  <span>💬 {(tweet.likes / 1000).toFixed(1)}K</span>
                  <span>🔁 {(tweet.retweets / 1000).toFixed(1)}K</span>
                  <span>❤️ Like</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div>
            <h2 style={{ color: '#4fc3f7', fontSize: 14, padding: '16px', marginBottom: 0 }}>📰 Today's News</h2>
            <p style={{ color: '#555', fontSize: 11, padding: '0 16px' }}>Breaking news updated every 15 min</p>
            {dummyTweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card">
                <div className="tweet-header">
                  <div className="avatar" />
                  <div className="tweet-meta">
                    <div className="tweet-name">{tweet.user}</div>
                  </div>
                  <div className="tweet-time">{tweet.time}</div>
                </div>
                <div className="tweet-text">{tweet.text}</div>
                <div className="tweet-stats">
                  <span>💬 {(tweet.likes / 1000).toFixed(1)}K</span>
                  <span>🔁 {(tweet.retweets / 1000).toFixed(1)}K</span>
                  <span>❤️ Like</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '20px 16px', textAlign: 'center', color: '#555', fontSize: 11, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div>Powered by <strong style={{ color: '#4fc3f7' }}>@Tweet1fy_bot</strong></div>
        <div style={{ marginTop: 6 }}>🌍 World + 🇮🇷 Iran Coverage</div>
      </div>
    </div>
  );
}
