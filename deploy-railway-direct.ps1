# Déploiement Direct Railway - Passive Income Site
# Ce script déploie directement sur Railway sans GitHub

Write-Host "=== DÉPLOIEMENT RAILWAY - PASSIVE INCOME SITE ===" -ForegroundColor Cyan
Write-Host ""

# Vérifier si nous sommes dans le bon dossier
if (-not (Test-Path "server.js")) {
    Write-Host "❌ Erreur: Veuillez exécuter ce script depuis le dossier passive-income-site" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dossier du projet détecté" -ForegroundColor Green
Write-Host ""

# Étape 1: Vérifier Railway CLI
Write-Host "📦 Étape 1: Vérification de Railway CLI..." -ForegroundColor Yellow
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue

if (-not $railwayInstalled) {
    Write-Host "Railway CLI n'est pas installé. Installation..." -ForegroundColor Yellow
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation de Railway CLI" -ForegroundColor Red
        Write-Host "Installez manuellement: npm install -g @railway/cli" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Railway CLI installé" -ForegroundColor Green
} else {
    Write-Host "✅ Railway CLI déjà installé" -ForegroundColor Green
}
Write-Host ""

# Étape 2: Login Railway
Write-Host "🔐 Étape 2: Connexion à Railway..." -ForegroundColor Yellow
Write-Host "Une page web va s'ouvrir pour vous connecter à Railway." -ForegroundColor Cyan
Write-Host "Si vous n'avez pas de compte, créez-en un (gratuit, pas de carte requise)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Appuyez sur Entrée pour continuer..." -ForegroundColor Yellow
$null = Read-Host

railway login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Échec de la connexion à Railway" -ForegroundColor Red
    Write-Host "Réessayez: railway login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Connecté à Railway" -ForegroundColor Green
Write-Host ""

# Étape 3: Initialiser le projet
Write-Host "📦 Étape 3: Initialisation du projet Railway..." -ForegroundColor Yellow

# Vérifier si déjà initialisé
if (Test-Path ".railway") {
    Write-Host "⚠️  Projet déjà initialisé. Voulez-vous réinitialiser? (o/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "o" -or $response -eq "O") {
        Remove-Item -Recurse -Force .railway
        railway init
    }
} else {
    railway init
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Échec de l'initialisation" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projet initialisé" -ForegroundColor Green
Write-Host ""

# Étape 4: Configurer les variables d'environnement
Write-Host "🔐 Étape 4: Configuration des variables..." -ForegroundColor Yellow

railway variables set NODE_ENV=production
railway variables set PORT=3000

Write-Host "✅ Variables configurées" -ForegroundColor Green
Write-Host ""

# Étape 5: Déployer
Write-Host "🚀 Étape 5: Déploiement de l'application..." -ForegroundColor Yellow
Write-Host "Cela peut prendre 2-3 minutes..." -ForegroundColor Cyan
Write-Host ""

railway up

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Échec du déploiement" -ForegroundColor Red
    Write-Host "Vérifiez les logs: railway logs" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
Write-Host ""

# Étape 6: Obtenir l'URL
Write-Host "🌐 Étape 6: Récupération de l'URL..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

railway status

Write-Host ""
Write-Host "=== DÉPLOIEMENT TERMINÉ! ===" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Ouvrir le dashboard: railway open" -ForegroundColor Yellow
Write-Host "2. Copier l'URL de votre site" -ForegroundColor Yellow
Write-Host "3. Configurer Google AdSense avec cette URL" -ForegroundColor Yellow
Write-Host "4. Ajouter votre Publisher ID dans Railway variables:" -ForegroundColor Yellow
Write-Host "   railway variables set ADSENSE_CLIENT_ID=ca-pub-VOTRE-ID" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Commandes utiles:" -ForegroundColor Cyan
Write-Host "- railway logs          : Voir les logs" -ForegroundColor White
Write-Host "- railway open          : Ouvrir le dashboard" -ForegroundColor White
Write-Host "- railway status        : Voir le statut" -ForegroundColor White
Write-Host "- railway variables     : Voir les variables" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Votre site de revenus passifs est maintenant en ligne!" -ForegroundColor Green
Write-Host ""

# Made with Bob
