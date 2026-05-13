const fs = require('fs');
const path = require('path');

const categories = [
  {
    name: "Développement Web",
    slug: "developpement-web",
    description: "Apprenez les technologies web modernes et les meilleures pratiques de développement"
  },
  {
    name: "Marketing Digital",
    slug: "marketing-digital",
    description: "Stratégies et techniques pour réussir votre marketing en ligne au Sénégal"
  },
  {
    name: "E-commerce",
    slug: "e-commerce",
    description: "Tout sur la vente en ligne et la gestion d'une boutique e-commerce"
  },
  {
    name: "Freelancing",
    slug: "freelancing",
    description: "Conseils pour réussir en tant que freelance au Sénégal"
  }
];

const authors = [
  "Amadou Diallo", "Fatou Sall", "Moussa Ndiaye", "Aïssatou Ba", "Ibrahima Sarr",
  "Cheikh Diop", "Mariama Cissé", "Ousmane Diallo", "Aminata Touré", "Mamadou Sy",
  "Khady Ndiaye", "Abdoulaye Fall", "Seynabou Diop", "Modou Gueye", "Ndeye Fatou Seck",
  "Alioune Badara Dieng", "Binta Sow", "Pape Samba Diop", "Rokhaya Diagne", "Souleymane Kane"
];

const articleTemplates = {
  "Développement Web": [
    { title: "Comment Créer un Site Web Professionnel en 2026", tags: ["web design", "développement", "tutoriel"] },
    { title: "Les Meilleurs Frameworks JavaScript en 2026", tags: ["javascript", "frameworks", "react", "vue"] },
    { title: "CSS Grid vs Flexbox: Quand Utiliser Chaque Technologie", tags: ["css", "flexbox", "grid", "layout"] },
    { title: "TypeScript pour les Développeurs JavaScript", tags: ["typescript", "javascript", "programmation"] },
    { title: "API REST vs GraphQL: Quel Choix pour Votre Projet?", tags: ["api", "rest", "graphql", "backend"] },
    { title: "Next.js 15: Nouveautés et Meilleures Pratiques", tags: ["nextjs", "react", "framework"] },
    { title: "Sécurité Web: Protéger Votre Application en 2026", tags: ["sécurité", "web", "protection"] },
    { title: "Progressive Web Apps: Guide Complet", tags: ["pwa", "mobile", "web"] },
    { title: "Optimisation des Performances Web", tags: ["performance", "optimisation", "vitesse"] },
    { title: "Docker pour Développeurs Web", tags: ["docker", "devops", "conteneurs"] },
    { title: "Git et GitHub: Maîtriser le Versioning", tags: ["git", "github", "versioning"] },
    { title: "Tests Automatisés avec Jest et Cypress", tags: ["tests", "jest", "cypress"] },
    { title: "Tailwind CSS: Design System Moderne", tags: ["tailwind", "css", "design"] },
    { title: "Node.js: Backend JavaScript Performant", tags: ["nodejs", "backend", "javascript"] },
    { title: "MongoDB vs PostgreSQL: Choisir sa Base de Données", tags: ["database", "mongodb", "postgresql"] },
    { title: "WebSockets: Communication Temps Réel", tags: ["websockets", "temps réel", "communication"] },
    { title: "Authentification JWT: Sécuriser Votre API", tags: ["jwt", "authentification", "sécurité"] },
    { title: "Déploiement Continu avec GitHub Actions", tags: ["ci/cd", "github actions", "déploiement"] },
    { title: "Accessibilité Web: Standards WCAG", tags: ["accessibilité", "wcag", "a11y"] },
    { title: "Micro-frontends: Architecture Moderne", tags: ["architecture", "micro-frontends", "scalabilité"] },
    { title: "Serverless: Applications Sans Serveur", tags: ["serverless", "cloud", "lambda"] },
    { title: "WebAssembly: Performance Native sur le Web", tags: ["webassembly", "wasm", "performance"] },
    { title: "Design Patterns en JavaScript", tags: ["design patterns", "javascript", "architecture"] },
    { title: "Animations Web avec Framer Motion", tags: ["animations", "framer motion", "ui"] },
    { title: "Headless CMS: Strapi vs Contentful", tags: ["cms", "headless", "strapi"] }
  ],
  "Marketing Digital": [
    { title: "Guide Complet du SEO Local au Sénégal", tags: ["seo", "marketing local", "google my business"] },
    { title: "Stratégies Facebook Ads pour le Marché Sénégalais", tags: ["facebook ads", "publicité", "marketing"] },
    { title: "Email Marketing au Sénégal: Guide Complet 2026", tags: ["email marketing", "newsletter", "automation"] },
    { title: "Instagram Marketing pour Entreprises Sénégalaises", tags: ["instagram", "social media", "marketing"] },
    { title: "Content Marketing: Créer du Contenu qui Convertit", tags: ["content marketing", "seo", "stratégie"] },
    { title: "Google Analytics 4: Maîtriser l'Analyse Web", tags: ["analytics", "google", "données"] },
    { title: "Marketing d'Influence au Sénégal", tags: ["influenceurs", "marketing", "social media"] },
    { title: "TikTok Marketing: Nouvelle Opportunité", tags: ["tiktok", "marketing", "vidéo"] },
    { title: "WhatsApp Business: Vendre via Messagerie", tags: ["whatsapp", "messaging", "vente"] },
    { title: "Publicité Google Ads: Guide Pratique", tags: ["google ads", "publicité", "sem"] },
    { title: "Marketing Automation: Gagner du Temps", tags: ["automation", "marketing", "productivité"] },
    { title: "Stratégie de Contenu pour Réseaux Sociaux", tags: ["contenu", "social media", "stratégie"] },
    { title: "Conversion Rate Optimization (CRO)", tags: ["cro", "conversion", "optimisation"] },
    { title: "Retargeting: Récupérer les Visiteurs Perdus", tags: ["retargeting", "publicité", "conversion"] },
    { title: "Marketing Vidéo: YouTube et Réseaux Sociaux", tags: ["vidéo", "youtube", "marketing"] },
    { title: "Chatbots Marketing: Automatiser les Conversations", tags: ["chatbots", "automation", "service client"] },
    { title: "LinkedIn Marketing B2B au Sénégal", tags: ["linkedin", "b2b", "marketing"] },
    { title: "Podcast Marketing: Créer et Promouvoir", tags: ["podcast", "audio", "marketing"] },
    { title: "Marketing Mobile: Stratégies pour Smartphones", tags: ["mobile", "marketing", "apps"] },
    { title: "Community Management: Gérer sa Communauté", tags: ["community", "social media", "engagement"] },
    { title: "Growth Hacking: Croissance Rapide", tags: ["growth hacking", "croissance", "startup"] },
    { title: "Marketing par SMS au Sénégal", tags: ["sms", "marketing", "mobile"] },
    { title: "Webinaires: Générer des Leads Qualifiés", tags: ["webinaire", "leads", "b2b"] },
    { title: "Marketing de Contenu Visuel", tags: ["visuel", "design", "marketing"] },
    { title: "Stratégie Omnicanal: Unifier l'Expérience", tags: ["omnicanal", "stratégie", "expérience client"] }
  ],
  "E-commerce": [
    { title: "Lancer sa Boutique E-commerce au Sénégal: Guide 2026", tags: ["e-commerce", "boutique en ligne", "entrepreneuriat"] },
    { title: "Dropshipping au Sénégal: Opportunités et Défis", tags: ["dropshipping", "e-commerce", "business en ligne"] },
    { title: "Optimiser les Paiements Mobile Money pour E-commerce", tags: ["mobile money", "paiement", "wave", "orange money"] },
    { title: "Logistique E-commerce: Solutions pour le Sénégal", tags: ["logistique", "livraison", "e-commerce"] },
    { title: "Marketplace vs Boutique Propre: Quel Modèle Choisir?", tags: ["marketplace", "boutique", "stratégie"] },
    { title: "Shopify vs WooCommerce: Comparaison Complète", tags: ["shopify", "woocommerce", "plateforme"] },
    { title: "Photographie Produit pour E-commerce", tags: ["photo", "produit", "visuel"] },
    { title: "Descriptions Produits qui Vendent", tags: ["copywriting", "produit", "vente"] },
    { title: "Gestion des Stocks E-commerce", tags: ["stocks", "inventaire", "gestion"] },
    { title: "Service Client E-commerce Excellence", tags: ["service client", "satisfaction", "fidélisation"] },
    { title: "Cross-selling et Upselling: Augmenter le Panier", tags: ["vente", "stratégie", "revenue"] },
    { title: "Programmes de Fidélité E-commerce", tags: ["fidélité", "rétention", "clients"] },
    { title: "Sécurité E-commerce: Protéger Vos Clients", tags: ["sécurité", "protection", "confiance"] },
    { title: "Analytics E-commerce: Métriques Essentielles", tags: ["analytics", "métriques", "données"] },
    { title: "Email Marketing pour E-commerce", tags: ["email", "marketing", "automation"] },
    { title: "Retours et Remboursements: Politique Optimale", tags: ["retours", "politique", "satisfaction"] },
    { title: "Marketplace Amazon: Vendre à l'International", tags: ["amazon", "international", "export"] },
    { title: "Packaging E-commerce: Créer l'Expérience", tags: ["packaging", "unboxing", "branding"] },
    { title: "Saisonnalité E-commerce: Maximiser les Pics", tags: ["saisonnalité", "stratégie", "ventes"] },
    { title: "Mobile Commerce: Optimiser pour Smartphones", tags: ["mobile", "commerce", "optimisation"] },
    { title: "Avis Clients: Générer et Gérer", tags: ["avis", "réputation", "confiance"] },
    { title: "Réseaux Sociaux pour E-commerce", tags: ["social media", "vente", "marketing"] },
    { title: "Subscription E-commerce: Revenus Récurrents", tags: ["subscription", "récurrent", "modèle"] },
    { title: "Personnalisation E-commerce avec IA", tags: ["ia", "personnalisation", "expérience"] },
    { title: "Expansion Internationale E-commerce", tags: ["international", "expansion", "croissance"] }
  ],
  "Freelancing": [
    { title: "Devenir Freelance au Sénégal: Par Où Commencer?", tags: ["freelance", "travail indépendant", "carrière"] },
    { title: "Trouver des Clients sur Upwork: Stratégies Gagnantes", tags: ["upwork", "freelance", "clients"] },
    { title: "Gérer Plusieurs Clients Freelance Simultanément", tags: ["gestion", "productivité", "freelance"] },
    { title: "Négocier ses Tarifs Freelance: Techniques Avancées", tags: ["négociation", "tarifs", "freelance"] },
    { title: "Portfolio Freelance: Attirer les Meilleurs Clients", tags: ["portfolio", "présentation", "clients"] },
    { title: "Fiverr: Réussir sur la Plateforme", tags: ["fiverr", "freelance", "plateforme"] },
    { title: "Contrats Freelance: Se Protéger Légalement", tags: ["contrats", "légal", "protection"] },
    { title: "Facturation Freelance: Outils et Bonnes Pratiques", tags: ["facturation", "comptabilité", "outils"] },
    { title: "Productivité Freelance: Travailler Efficacement", tags: ["productivité", "organisation", "efficacité"] },
    { title: "Networking Freelance: Construire son Réseau", tags: ["networking", "réseau", "contacts"] },
    { title: "Spécialisation Freelance: Devenir Expert", tags: ["spécialisation", "expertise", "niche"] },
    { title: "Marketing Personnel Freelance", tags: ["marketing", "personal branding", "visibilité"] },
    { title: "Gestion du Temps Freelance", tags: ["temps", "gestion", "organisation"] },
    { title: "Revenus Passifs pour Freelances", tags: ["revenus passifs", "automatisation", "scalabilité"] },
    { title: "Santé Mentale Freelance: Éviter le Burnout", tags: ["santé mentale", "bien-être", "équilibre"] },
    { title: "Transition Salarié vers Freelance", tags: ["transition", "carrière", "changement"] },
    { title: "Freelance Remote: Travailler de Partout", tags: ["remote", "nomade digital", "liberté"] },
    { title: "Outils Essentiels pour Freelances", tags: ["outils", "logiciels", "productivité"] },
    { title: "Impôts et Taxes Freelance au Sénégal", tags: ["impôts", "taxes", "fiscal"] },
    { title: "Assurance et Protection Sociale Freelance", tags: ["assurance", "protection", "sécurité"] },
    { title: "Scaling Freelance: Passer à l'Agence", tags: ["scaling", "croissance", "agence"] },
    { title: "Communication Client Freelance", tags: ["communication", "clients", "relations"] },
    { title: "Propositions Freelance qui Gagnent", tags: ["propositions", "pitching", "vente"] },
    { title: "Testimonials: Obtenir des Recommandations", tags: ["testimonials", "recommandations", "preuve sociale"] },
    { title: "Freelance Niches Rentables en 2026", tags: ["niches", "opportunités", "tendances"] }
  ]
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateContent(title, category) {
  const intro = `<p>${title} - Dans cet article complet, nous explorons en profondeur ce sujet essentiel pour votre succès dans le domaine du ${category.toLowerCase()}.</p>`;
  
  const sections = [
    `<h2>Introduction et Contexte</h2><p>Le marché sénégalais offre des opportunités uniques dans ce domaine. Avec une population jeune et connectée, les possibilités sont immenses pour ceux qui savent saisir les bonnes stratégies.</p>`,
    `<h2>Les Fondamentaux à Maîtriser</h2><p>Avant de vous lancer, il est crucial de comprendre les bases. Une fondation solide vous permettra de construire un succès durable et d'éviter les erreurs coûteuses que font la plupart des débutants.</p>`,
    `<h2>Stratégies Avancées</h2><p>Une fois les bases maîtrisées, passez au niveau supérieur avec ces techniques avancées. Ces stratégies sont utilisées par les professionnels qui génèrent des résultats exceptionnels.</p>`,
    `<h2>Outils et Ressources Recommandés</h2><p>Les bons outils font toute la différence. Voici une sélection des meilleures ressources disponibles, testées et approuvées par des professionnels du secteur.</p>`,
    `<h2>Études de Cas et Exemples Concrets</h2><p>Rien ne vaut des exemples réels pour illustrer les concepts. Découvrez comment d'autres ont réussi en appliquant ces principes dans le contexte sénégalais.</p>`,
    `<h2>Erreurs Courantes à Éviter</h2><p>Apprenez des erreurs des autres pour économiser temps et argent. Ces pièges sont fréquents mais facilement évitables avec les bonnes connaissances.</p>`,
    `<h2>Plan d'Action Étape par Étape</h2><p>Passez à l'action avec ce plan détaillé. Suivez ces étapes dans l'ordre pour maximiser vos chances de succès et obtenir des résultats mesurables rapidement.</p>`,
    `<h2>Conclusion et Prochaines Étapes</h2><p>Vous avez maintenant toutes les clés en main pour réussir. L'important est de passer à l'action dès aujourd'hui. Commencez petit, testez, apprenez, et ajustez votre approche au fur et à mesure.</p>`
  ];
  
  return intro + sections.join('');
}

function generateArticles() {
  const articles = [];
  let articleId = 1;
  const startDate = new Date('2026-05-12');
  
  categories.forEach(category => {
    const templates = articleTemplates[category.name];
    
    templates.forEach((template, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() - articleId);
      
      articles.push({
        id: articleId,
        title: template.title,
        slug: generateSlug(template.title),
        category: category.name,
        excerpt: `Découvrez tout ce qu'il faut savoir sur ${template.title.toLowerCase()} pour réussir au Sénégal en 2026.`,
        content: generateContent(template.title, category.name),
        author: authors[Math.floor(Math.random() * authors.length)],
        date: date.toISOString().split('T')[0],
        readTime: `${Math.floor(Math.random() * 8) + 8} min`,
        tags: template.tags
      });
      
      articleId++;
    });
  });
  
  return articles;
}

const data = {
  categories: categories,
  articles: generateArticles()
};

fs.writeFileSync(
  path.join(__dirname, 'data', 'articles.json'),
  JSON.stringify(data, null, 2)
);

console.log(`✅ Generated ${data.articles.length} articles successfully!`);

// Made with Bob
