const fs = require('fs');

// Load French articles
const frenchData = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

// Translation mappings
const translations = {
  categories: {
    'Développement Web': 'Web Development',
    'Marketing Digital': 'Digital Marketing',
    'E-commerce': 'E-commerce',
    'Freelancing': 'Freelancing'
  },
  commonPhrases: {
    'Découvrez tout ce qu\'il faut savoir sur': 'Discover everything you need to know about',
    'pour réussir au Sénégal en 2026': 'to succeed in 2026',
    'pour réussir en 2026': 'to succeed in 2026',
    'Dans cet article complet, nous explorons en profondeur ce sujet essentiel pour votre succès dans le domaine': 'In this comprehensive article, we explore in depth this essential topic for your success in the field of',
    'Le marché sénégalais offre des opportunités uniques dans ce domaine': 'The market offers unique opportunities in this field',
    'Avec une population jeune et connectée, les possibilités sont immenses pour ceux qui savent saisir les bonnes stratégies': 'With a young and connected population, the possibilities are immense for those who know how to seize the right strategies',
    'Avant de vous lancer, il est crucial de comprendre les bases': 'Before you start, it is crucial to understand the basics',
    'Une fondation solide vous permettra de construire un succès durable et d\'éviter les erreurs coûteuses que font la plupart des débutants': 'A solid foundation will allow you to build lasting success and avoid the costly mistakes that most beginners make',
    'Une fois les bases maîtrisées, passez au niveau supérieur avec ces techniques avancées': 'Once you have mastered the basics, move to the next level with these advanced techniques',
    'Ces stratégies sont utilisées par les professionnels qui génèrent des résultats exceptionnels': 'These strategies are used by professionals who generate exceptional results',
    'Les bons outils font toute la différence': 'The right tools make all the difference',
    'Voici une sélection des meilleures ressources disponibles, testées et approuvées par des professionnels du secteur': 'Here is a selection of the best resources available, tested and approved by industry professionals',
    'Rien ne vaut des exemples réels pour illustrer les concepts': 'Nothing beats real examples to illustrate concepts',
    'Découvrez comment d\'autres ont réussi en appliquant ces principes dans le contexte sénégalais': 'Discover how others have succeeded by applying these principles',
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
    'du développement web': 'web development',
    'du marketing digital': 'digital marketing',
    'de l\'e-commerce': 'e-commerce',
    'du freelancing': 'freelancing'
  }
};

// Translate text
function translateText(text) {
  let translated = text;
  
  // Replace common phrases
  for (const [fr, en] of Object.entries(translations.commonPhrases)) {
    translated = translated.replace(new RegExp(fr, 'gi'), en);
  }
  
  return translated;
}

// Translate categories
const englishCategories = frenchData.categories.map(cat => ({
  name: translations.categories[cat.name] || cat.name,
  slug: cat.slug,
  description: translateText(cat.description)
}));

// Translate articles
const englishArticles = frenchData.articles.map(article => {
  // Translate title
  let title = article.title;
  title = title.replace(/Comment Créer/gi, 'How to Create');
  title = title.replace(/Les Meilleurs/gi, 'The Best');
  title = title.replace(/Guide Complet/gi, 'Complete Guide');
  title = title.replace(/Tout Savoir/gi, 'Everything You Need to Know');
  title = title.replace(/Stratégies/gi, 'Strategies');
  title = title.replace(/Techniques/gi, 'Techniques');
  title = title.replace(/Conseils/gi, 'Tips');
  title = title.replace(/Astuces/gi, 'Tricks');
  title = title.replace(/pour/gi, 'for');
  title = title.replace(/vs/gi, 'vs');
  title = title.replace(/Quand/gi, 'When');
  title = title.replace(/Utiliser/gi, 'to Use');
  title = title.replace(/Chaque/gi, 'Each');
  title = title.replace(/Technologie/gi, 'Technology');
  title = title.replace(/Site Web/gi, 'Website');
  title = title.replace(/Professionnel/gi, 'Professional');
  title = title.replace(/Frameworks/gi, 'Frameworks');
  title = title.replace(/JavaScript/gi, 'JavaScript');
  title = title.replace(/TypeScript/gi, 'TypeScript');
  title = title.replace(/Développeurs/gi, 'Developers');
  
  // Translate slug
  let slug = article.slug;
  slug = slug.replace(/comment-creer/g, 'how-to-create');
  slug = slug.replace(/les-meilleurs/g, 'the-best');
  slug = slug.replace(/guide-complet/g, 'complete-guide');
  slug = slug.replace(/tout-savoir/g, 'everything-you-need-to-know');
  slug = slug.replace(/strategies/g, 'strategies');
  slug = slug.replace(/techniques/g, 'techniques');
  slug = slug.replace(/conseils/g, 'tips');
  slug = slug.replace(/astuces/g, 'tricks');
  slug = slug.replace(/site-web/g, 'website');
  slug = slug.replace(/professionnel/g, 'professional');
  slug = slug.replace(/developpeurs/g, 'developers');
  
  return {
    id: article.id,
    title: title,
    slug: slug,
    category: translations.categories[article.category] || article.category,
    excerpt: translateText(article.excerpt),
    content: translateText(article.content),
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

console.log('✅ Translation complete!');
console.log(`Translated ${englishArticles.length} articles`);
console.log('File saved: ./data/articles-en.json');

// Made with Bob
