# Automated Railway Deployment Script for Passive Income Site
# This script handles the complete deployment process

Write-Host "=== Passive Income Site - Automated Railway Deployment ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if gh is authenticated
Write-Host "Step 1: Checking GitHub CLI authentication..." -ForegroundColor Yellow
$ghAuthStatus = & "C:\Program Files\GitHub CLI\gh.exe" auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "GitHub CLI not authenticated. Please authenticate first:" -ForegroundColor Red
    Write-Host "Run: gh auth login --web" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ GitHub CLI authenticated" -ForegroundColor Green
Write-Host ""

# Step 2: Create GitHub repository
Write-Host "Step 2: Creating GitHub repository..." -ForegroundColor Yellow
$repoName = "passive-income-site"
$repoExists = & "C:\Program Files\GitHub CLI\gh.exe" repo view $repoName 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Repository already exists, skipping creation" -ForegroundColor Yellow
} else {
    & "C:\Program Files\GitHub CLI\gh.exe" repo create $repoName --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create repository" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✓ GitHub repository ready" -ForegroundColor Green
Write-Host ""

# Step 3: Push to GitHub
Write-Host "Step 3: Pushing code to GitHub..." -ForegroundColor Yellow
git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    $username = & "C:\Program Files\GitHub CLI\gh.exe" api user -q .login
    git remote add origin "https://github.com/$username/$repoName.git"
}
git push -u origin master --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to push to GitHub" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Code pushed to GitHub" -ForegroundColor Green
Write-Host ""

# Step 4: Install Railway CLI
Write-Host "Step 4: Installing Railway CLI..." -ForegroundColor Yellow
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue
if (-not $railwayInstalled) {
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Railway CLI" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✓ Railway CLI installed" -ForegroundColor Green
Write-Host ""

# Step 5: Login to Railway
Write-Host "Step 5: Logging into Railway..." -ForegroundColor Yellow
Write-Host "Please complete the Railway authentication in your browser..." -ForegroundColor Cyan
railway login
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to login to Railway" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Logged into Railway" -ForegroundColor Green
Write-Host ""

# Step 6: Initialize Railway project
Write-Host "Step 6: Initializing Railway project..." -ForegroundColor Yellow
railway init
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to initialize Railway project" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Railway project initialized" -ForegroundColor Green
Write-Host ""

# Step 7: Link to GitHub repository
Write-Host "Step 7: Linking Railway to GitHub repository..." -ForegroundColor Yellow
$username = & "C:\Program Files\GitHub CLI\gh.exe" api user -q .login
railway link
Write-Host "✓ Railway linked to GitHub" -ForegroundColor Green
Write-Host ""

# Step 8: Set environment variables
Write-Host "Step 8: Setting environment variables..." -ForegroundColor Yellow
railway variables set PORT=3000
railway variables set NODE_ENV=production
Write-Host "✓ Environment variables set" -ForegroundColor Green
Write-Host ""

# Step 9: Deploy to Railway
Write-Host "Step 9: Deploying to Railway..." -ForegroundColor Yellow
railway up
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to deploy to Railway" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Deployed to Railway" -ForegroundColor Green
Write-Host ""

# Step 10: Get deployment URL
Write-Host "Step 10: Getting deployment URL..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
$domain = railway domain
Write-Host ""
Write-Host "=== DEPLOYMENT COMPLETE ===" -ForegroundColor Green
Write-Host ""
Write-Host "Your site is now live at:" -ForegroundColor Cyan
Write-Host $domain -ForegroundColor White
Write-Host ""
Write-Host "GitHub Repository: https://github.com/$username/$repoName" -ForegroundColor Cyan
Write-Host ""

# Made with Bob
