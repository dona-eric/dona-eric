import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'category'],
  }
});

let cache = {
  data: null,
  timestamp: null,
};
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 heures

router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    // Utiliser le cache s'il est valide
    if (cache.data && cache.timestamp && (now - cache.timestamp < CACHE_DURATION)) {
      return res.json({ posts: cache.data, cached_at: new Date(cache.timestamp).toISOString() });
    }

    const feed = await parser.parseURL('https://medium.com/feed/@koulodjiric');
    
    const posts = feed.items.map((item, index) => {
      // Extraire un résumé (excerpt) du contenu HTML
      const content = item['content:encoded'] || item.content || '';
      const textContent = content.replace(/<[^>]+>/g, '').trim();
      const excerpt = textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;

      // Medium ne fournit pas les vues/likes via RSS public. On génère un mock basé sur l'ordre pour faire vivre l'UI
      const mockViews = Math.floor(Math.random() * 5000) + 1000 - (index * 100);
      const mockLikes = Math.floor(mockViews * 0.1);

      return {
        id: item.guid || item.id || String(Math.random()),
        title: item.title,
        excerpt: excerpt,
        source: 'medium',
        pub_date: new Date(item.pubDate).getTime() / 1000,
        score: Math.floor(Math.random() * 40) + 60, // Score arbitraire > 60 pour les badges
        tags: item.categories || [],
        raw_metrics: {
          views: Math.max(100, mockViews),
          likes: Math.max(10, mockLikes),
          comments: Math.floor(mockLikes * 0.05)
        },
        url: item.link
      };
    });

    // Trier du plus récent au plus ancien
    posts.sort((a, b) => b.pub_date - a.pub_date);

    cache = {
      data: posts,
      timestamp: now,
    };

    res.json({ posts: cache.data, cached_at: new Date(cache.timestamp).toISOString() });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles Medium:', error);
    // Si erreur mais on a du cache, on renvoie le cache obsolète
    if (cache.data) {
      return res.json({ posts: cache.data, cached_at: new Date(cache.timestamp).toISOString(), stale: true });
    }
    res.status(500).json({ error: 'Impossible de récupérer les articles' });
  }
});

export default router;
