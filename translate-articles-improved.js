const fs = require('fs');

// Load French articles
const frenchData = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

// Comprehensive translation dictionary
const titleTranslations = {
  'Comment Créer un Site Web Professionnel en 2026': 'How to Create a Professional Website in 2026',
  'Les Meilleurs Frameworks JavaScript en 2026': 'The Best JavaScript Frameworks in 2026',
  'CSS Grid vs Flexbox: Quand Utiliser Chaque Technologie': 'CSS Grid vs Flexbox: When to Use Each Technology',
  'TypeScript pour les Développeurs JavaScript': 'TypeScript for JavaScript Developers',
  'Guide Complet du SEO en 2026': 'Complete SEO Guide in 2026',
  'Marketing sur les Réseaux Sociaux: Stratégies Gagnantes': 'Social Media Marketing: Winning Strategies',
  'Email Marketing: Techniques Avancées': 'Email Marketing: Advanced Techniques',
  'Google Ads vs Facebook Ads: Comparaison Complète': 'Google Ads vs Facebook Ads: Complete Comparison',
  'Content Marketing: Créer du Contenu qui Convertit': 'Content Marketing: Creating Content that Converts',
  'Analytics et Métriques: Mesurer Votre Succès': 'Analytics and Metrics: Measuring Your Success',
  'Créer une Boutique en Ligne Rentable': 'Creating a Profitable Online Store',
  'Dropshipping: Guide du Débutant': 'Dropshipping: Beginner\'s Guide',
  'Optimisation du Taux de Conversion': 'Conversion Rate Optimization',
  'Gestion des Stocks pour E-commerce': 'Inventory Management for E-commerce',
  'Paiements en Ligne: Solutions et Sécurité': 'Online Payments: Solutions and Security',
  'Devenir Freelance: Guide Complet': 'Becoming a Freelancer: Complete Guide',
  'Trouver des Clients en Freelance': 'Finding Clients as a Freelancer',
  'Fixer Vos Tarifs en Freelance': 'Setting Your Freelance Rates',
  'Gérer Votre Temps en Freelance': 'Managing Your Time as a Freelancer',
  'Outils Essentiels pour Freelances': 'Essential Tools for Freelancers'
};

// Common word translations
const wordTranslations = {
  // Articles and prepositions
  'un': 'a',
  'une': 'a',
  'le': 'the',
  'la': 'the',
  'les': 'the',
  'du': 'of the',
  'de': 'of',
  'des': 'of the',
  'en': 'in',
  'pour': 'for',
  'sur': 'on',
  'avec': 'with',
  'dans': 'in',
  'par': 'by',
  'au': 'to the',
  'aux': 'to the',
  
  // Common verbs
  'créer': 'create',
  'faire': 'make',
  'utiliser': 'use',
  'développer': 'develop',
  'apprendre': 'learn',
  'comprendre': 'understand',
  'gérer': 'manage',
  'optimiser': 'optimize',
  'améliorer': 'improve',
  'trouver': 'find',
  'devenir': 'become',
  'fixer': 'set',
  
  // Common nouns
  'site': 'site',
  'web': 'web',
  'professionnel': 'professional',
  'professionnelle': 'professional',
  'guide': 'guide',
  'complet': 'complete',
  'complète': 'complete',
  'stratégies': 'strategies',
  'techniques': 'techniques',
  'conseils': 'tips',
  'astuces': 'tricks',
  'outils': 'tools',
  'ressources': 'resources',
  'exemples': 'examples',
  'erreurs': 'errors',
  'succès': 'success',
  'débutant': 'beginner',
  'avancé': 'advanced',
  'avancée': 'advanced',
  'essentiel': 'essential',
  'essentiels': 'essential',
  'essentielles': 'essential',
  
  // Tech terms
  'développement': 'development',
  'marketing': 'marketing',
  'digital': 'digital',
  'commerce': 'commerce',
  'boutique': 'store',
  'ligne': 'online',
  'clients': 'clients',
  'tarifs': 'rates',
  'temps': 'time',
  'gestion': 'management',
  'stocks': 'inventory',
  'paiements': 'payments',
  'sécurité': 'security',
  'conversion': 'conversion',
  'taux': 'rate',
  'métriques': 'metrics',
  'contenu': 'content',
  'réseaux': 'networks',
  'sociaux': 'social',
  'email': 'email',
  
  // Adjectives
  'meilleurs': 'best',
  'meilleures': 'best',
  'gagnantes': 'winning',
  'rentable': 'profitable',
  'nouveau': 'new',
  'nouvelle': 'new',
  'bon': 'good',
  'bonne': 'good',
  'grand': 'great',
  'grande': 'great'
};

// Translate title intelligently
function translateTitle(title) {
  // Check if we have a direct translation
  if (titleTranslations[title]) {
    return titleTranslations[title];
  }
  
  // Otherwise, translate word by word
  let translated = title;
  
  // Replace whole words only (with word boundaries)
  for (const [fr, en] of Object.entries(wordTranslations)) {
    const regex = new RegExp(`\\b${fr}\\b`, 'gi');
    translated = translated.replace(regex, en);
  }
  
  // Capitalize first letter of each major word
  translated = translated.split(' ').map((word, index) => {
    if (index === 0 || word.length > 3) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  }).join(' ');
  
  return translated;
}

// Translate slug
function translateSlug(slug) {
  let translated = slug;
  
  const slugTranslations = {
    'comment-creer': 'how-to-create',
    'les-meilleurs': 'the-best',
    'guide-complet': 'complete-guide',
    'tout-savoir': 'everything-to-know',
    'quand-utiliser': 'when-to-use',
    'chaque': 'each',
    'pour-les': 'for',
    'sur-les': 'on',
    'reseaux-sociaux': 'social-media',
    'en-ligne': 'online',
    'du-debutant': 'beginners',
    'devenir': 'becoming',
    'trouver-des': 'finding',
    'fixer-vos': 'setting-your',
    'gerer-votre': 'managing-your',
    'site-web': 'website',
    'professionnel': 'professional',
    'developpement': 'development',
    'developpeurs': 'developers',
    'marketing': 'marketing',
    'digital': 'digital',
    'strategies': 'strategies',
    'gagnantes': 'winning',
    'techniques': 'techniques',
    'avancees': 'advanced',
    'comparaison': 'comparison',
    'complete': 'complete',
    'creer-du': 'creating',
    'contenu-qui': 'content-that',
    'convertit': 'converts',
    'metriques': 'metrics',
    'mesurer-votre': 'measuring-your',
    'succes': 'success',
    'boutique': 'store',
    'rentable': 'profitable',
    'optimisation-du': 'optimization',
    'taux-de': 'rate',
    'conversion': 'conversion',
    'gestion-des': 'management',
    'stocks': 'inventory',
    'paiements': 'payments',
    'solutions-et': 'solutions-and',
    'securite': 'security',
    'freelance': 'freelancer',
    'clients-en': 'clients-as',
    'tarifs-en': 'rates',
    'temps-en': 'time-as',
    'outils': 'tools',
    'essentiels': 'essential',
    'freelances': 'freelancers'
  };
  
  for (const [fr, en] of Object.entries(slugTranslations)) {
    translated = translated.replace(new RegExp(fr, 'g'), en);
  }
  
  return translated;
}

// Translate content
function translateContent(content) {
  let translated = content;
  
  const contentTranslations = {
    'Comment Créer un Site Web Professionnel en 2026': 'How to Create a Professional Website in 2026',
    'Dans cet article complet, nous explorons en profondeur ce sujet essentiel pour votre succès dans le domaine': 'In this comprehensive article, we explore in depth this essential topic for your success in the field of',
    'du développement web': 'web development',
    'du marketing digital': 'digital marketing',
    'de l\'e-commerce': 'e-commerce',
    'du freelancing': 'freelancing',
    'Le marché offre des opportunités uniques dans ce domaine': 'The market offers unique opportunities in this field',
    'Avec une population jeune et connectée, les possibilités sont immenses pour ceux qui savent saisir les bonnes stratégies': 'With a young and connected population, the possibilities are immense for those who know how to seize the right strategies',
    'Avant de vous lancer, il est crucial de comprendre les bases': 'Before you start, it is crucial to understand the basics',
    'Une fondation solide vous permettra de construire un succès durable et d\'éviter les erreurs coûteuses que font la plupart des débutants': 'A solid foundation will allow you to build lasting success and avoid the costly mistakes that most beginners make',
    'Une fois les bases maîtrisées, passez au niveau supérieur avec ces techniques avancées': 'Once you have mastered the basics, move to the next level with these advanced techniques',
    'Ces stratégies sont utilisées par les professionnels qui génèrent des résultats exceptionnels': 'These strategies are used by professionals who generate exceptional results',
    'Les bons outils font toute la différence': 'The right tools make all the difference',
    'Voici une sélection des meilleures ressources disponibles, testées et approuvées par des professionnels du secteur': 'Here is a selection of the best resources available, tested and approved by industry professionals',
    'Rien ne vaut des exemples réels pour illustrer les concepts': 'Nothing beats real examples to illustrate concepts',
    'Découvrez comment d\'autres ont réussi en appliquant ces principes': 'Discover how others have succeeded by applying these principles',
    'Apprenez des erreurs des autres pour économiser temps et argent': 'Learn from the mistakes of others to save time and money',
    'Ces pièges sont fréquents mais facilement évitables avec les bonnes connaissances': 'These pitfalls are common but easily avoidable with the right knowledge',
    'Passez à l\'action avec ce plan détaillé': 'Take action with this detailed plan',
    'Suivez ces étapes dans l\'ordre pour maximiser vos chances de succès et obtenir des résultats mesurables rapidement': 'Follow these steps in order to maximize your chances of success and get measurable results quickly',
    'Vous avez maintenant toutes les clés en main pour réussir': 'You now have all the keys to success',
    'L\'important est de passer à l\'action dès aujourd\'hui': 'The important thing is to take action today',
    'Commencez petit, testez, apprenez, et ajustez votre approche au fur et à mesure': 'Start small, test, learn, and adjust your approach as you go',
    'Introduction et Contexte': 'Introduction and Context',
    'Les Fondamentaux à Maîtriser': 'Fundamentals to Master',
    'Stratégies Avancées': 'Advanced Strategies',
    'Outils et Ressources Recommandés': 'Recommended Tools and Resources',
    'Études de Cas et Exemples Concrets': 'Case Studies and Concrete Examples',
    'Erreurs Courantes à Éviter': 'Common Mistakes to Avoid',
    'Plan d\'Action Étape par Étape': 'Step-by-Step Action Plan',
    'Conclusion et Prochaines Étapes': 'Conclusion and Next Steps',
    'Découvrez tout ce qu\'il faut savoir sur': 'Discover everything you need to know about',
    'pour réussir en 2026': 'to succeed in 2026'
  };
  
  for (const [fr, en] of Object.entries(contentTranslations)) {
    translated = translated.replace(new RegExp(fr, 'g'), en);
  }
  
  return translated;
}

// Translate categories
const englishCategories = [
  {
    name: 'Web Development',
    slug: 'developpement-web',
    description: 'Learn modern web technologies and best development practices'
  },
  {
    name: 'Digital Marketing',
    slug: 'marketing-digital',
    description: 'Strategies and techniques to succeed in your online marketing'
  },
  {
    name: 'E-commerce',
    slug: 'e-commerce',
    description: 'Everything about online sales and e-commerce store management'
  },
  {
    name: 'Freelancing',
    slug: 'freelancing',
    description: 'Tips to succeed as a freelancer'
  }
];

// Category name translations
const categoryTranslations = {
  'Développement Web': 'Web Development',
  'Marketing Digital': 'Digital Marketing',
  'E-commerce': 'E-commerce',
  'Freelancing': 'Freelancing'
};

// Translate articles
const englishArticles = frenchData.articles.map(article => {
  return {
    id: article.id,
    title: translateTitle(article.title),
    slug: translateSlug(article.slug),
    category: categoryTranslations[article.category] || article.category,
    excerpt: translateContent(article.excerpt),
    content: translateContent(article.content),
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    tags: article.tags
  };
});

// Create English data
const englishData = {
  categories: englishCategories,
  articles: englishArticles
};

// Save to file
fs.writeFileSync('./data/articles-en.json', JSON.stringify(englishData, null, 2));

console.log('✅ Improved translation complete!');
console.log(`Translated ${englishArticles.length} articles`);
console.log('File saved: ./data/articles-en.json');

// Made with Bob
