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

// Load articles data for both languages
const articlesDataFr = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'articles.json'), 'utf8'));
const articlesDataEn = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'articles-en.json'), 'utf8'));

// Load translations
const translations = {
  en: JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'en.json'), 'utf8')),
  fr: JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'fr.json'), 'utf8'))
};

// Helper function to get articles data based on language
function getArticlesData(lang) {
  return lang === 'en' ? articlesDataEn : articlesDataFr;
}

// Language detection middleware
app.use((req, res, next) => {
  // 1. Check URL parameter (?lang=en or ?lang=fr)
  let lang = req.query.lang;
  
  // 2. Check cookie
  if (!lang && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    lang = cookies.lang;
  }
  
  // 3. Check Accept-Language header (browser language)
  if (!lang) {
    const acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage) {
      // Parse Accept-Language header
      const languages = acceptLanguage.split(',').map(l => {
        const parts = l.trim().split(';');
        const code = parts[0].split('-')[0]; // Get language code (en, fr, etc.)
        return code;
      });
      
      // Find first supported language
      lang = languages.find(l => ['en', 'fr'].includes(l));
    }
  }
  
  // 4. Default to English
  if (!lang || !['en', 'fr'].includes(lang)) {
    lang = 'en';
  }
  
  // Set language in response locals
  res.locals.lang = lang;
  res.locals.t = translations[lang];
  
  // Set cookie for future visits (1 year)
  res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
  
  next();
});

// Helper function to get articles by category
function getArticlesByCategory(category, lang) {
  const articlesData = getArticlesData(lang);
  return articlesData.articles.filter(article => article.category === category);
}

// Helper function to get recent articles
function getRecentArticles(limit = 10, lang = 'fr') {
  const articlesData = getArticlesData(lang);
  return articlesData.articles.slice(0, limit);
}

// Routes
app.get('/', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  const recentArticles = getRecentArticles(12, res.locals.lang);
  
  res.render('index', {
    title: res.locals.t.site.title,
    recentArticles,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/blog', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedArticles = articlesData.articles.slice(start, end);
  const totalPages = Math.ceil(articlesData.articles.length / perPage);

  res.render('blog', {
    title: res.locals.t.nav.blog,
    articles: paginatedArticles,
    currentPage: page,
    totalPages,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/category/:slug', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  const categorySlug = req.params.slug;
  const category = articlesData.categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return res.status(404).render('404', {
      title: res.locals.t.errors.notFound,
      lang: res.locals.lang,
      t: res.locals.t
    });
  }

  const categoryArticles = getArticlesByCategory(category.name, res.locals.lang);
  
  res.render('category', {
    title: `${category.name} - ${res.locals.t.nav.blog}`,
    category: category,
    articles: categoryArticles,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/article/:slug', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  const articleSlug = req.params.slug;
  const article = articlesData.articles.find(art => art.slug === articleSlug);
  
  if (!article) {
    return res.status(404).render('404', {
      title: res.locals.t.errors.notFound,
      lang: res.locals.lang,
      t: res.locals.t
    });
  }

  const relatedArticles = articlesData.articles
    .filter(art => art.category === article.category && art.slug !== article.slug)
    .slice(0, 3);
  
  res.render('article', {
    title: article.title,
    article,
    relatedArticles,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/about', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  
  res.render('about', {
    title: res.locals.t.nav.about,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/contact', (req, res) => {
  const articlesData = getArticlesData(res.locals.lang);
  
  res.render('contact', {
    title: res.locals.t.nav.contact,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

// Language switcher
app.get('/lang/:code', (req, res) => {
  const lang = req.params.code;
  if (['en', 'fr'].includes(lang)) {
    res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
  }
  // Redirect back to referrer or home
  const referer = req.headers.referer || '/';
  res.redirect(referer);
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
    title: res.locals.t.errors.notFound,
    categories: articlesData.categories,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`🌍 Multi-language support: EN, FR`);
});

// Made with Bob