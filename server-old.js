const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load articles data
const articlesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'articles.json'), 'utf8'));

// Helper function to get articles by category
function getArticlesByCategory(category) {
  return articlesData.articles.filter(article => article.category === category);
}

// Helper function to get recent articles
function getRecentArticles(limit = 10) {
  return articlesData.articles.slice(0, limit);
}

// Routes
app.get('/', (req, res) => {
  const recentArticles = getRecentArticles(12);
  res.render('index', {
    title: 'Tech & Digital au Sénégal - Votre Guide Complet',
    recentArticles,
    categories: articlesData.categories
  });
});

app.get('/blog', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedArticles = articlesData.articles.slice(start, end);
  const totalPages = Math.ceil(articlesData.articles.length / perPage);

  res.render('blog', {
    title: 'Blog - Tous les Articles',
    articles: paginatedArticles,
    currentPage: page,
    totalPages,
    categories: articlesData.categories
  });
});

app.get('/category/:slug', (req, res) => {
  const categorySlug = req.params.slug;
  const category = articlesData.categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return res.status(404).render('404', { title: 'Catégorie non trouvée' });
  }

  const categoryArticles = getArticlesByCategory(category.name);
  
  res.render('category', {
    title: `${category.name} - Articles`,
    category,
    articles: categoryArticles,
    categories: articlesData.categories
  });
});

app.get('/article/:slug', (req, res) => {
  const articleSlug = req.params.slug;
  const article = articlesData.articles.find(art => art.slug === articleSlug);
  
  if (!article) {
    return res.status(404).render('404', { title: 'Article non trouvé' });
  }

  const relatedArticles = articlesData.articles
    .filter(art => art.category === article.category && art.slug !== article.slug)
    .slice(0, 3);

  res.render('article', {
    title: article.title,
    article,
    relatedArticles,
    categories: articlesData.categories
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'À Propos',
    categories: articlesData.categories
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    categories: articlesData.categories
  });
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Homepage
  sitemap += '  <url>\n';
  sitemap += `    <loc>${req.protocol}://${req.get('host')}/</loc>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>1.0</priority>\n';
  sitemap += '  </url>\n';
  
  // Blog page
  sitemap += '  <url>\n';
  sitemap += `    <loc>${req.protocol}://${req.get('host')}/blog</loc>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>0.9</priority>\n';
  sitemap += '  </url>\n';
  
  // Categories
  articlesData.categories.forEach(category => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${req.protocol}://${req.get('host')}/category/${category.slug}</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });
  
  // Articles
  articlesData.articles.forEach(article => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${req.protocol}://${req.get('host')}/article/${article.slug}</loc>\n`;
    sitemap += `    <lastmod>${article.date}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  res.send(sitemap);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page non trouvée',
    categories: articlesData.categories
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

// Made with Bob
