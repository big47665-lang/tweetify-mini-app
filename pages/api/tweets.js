export default async function handler(req, res) {
  // Return tweet data from your bot
  const tweets = {
    worldTrending: [...],
    iranTimeline: [...],
    news: [...]
  };
  res.status(200).json(tweets);
}
