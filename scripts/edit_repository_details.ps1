# Edit Repository Details - Audiotivist
# Usage: .\edit_repository_details.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "🎵 Editing Audiotivist Repository Details..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Step 1: Update Repository Basic Info
Write-Host "Step 1: Updating Repository Basic Info..." -ForegroundColor Yellow
try {
    $repoData = @{
        name = "audiotivist"
        description = "Modern web-based audio-visual performance platform for VJs, musicians, and digital artists"
        homepage = "https://audiotivist.vercel.app/"
        has_issues = $true
        has_projects = $true
        has_wiki = $true
        has_discussions = $true
        default_branch = "main"
        allow_squash_merge = $true
        allow_merge_commit = $true
        allow_rebase_merge = $true
        delete_branch_on_merge = $true
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Patch -Body $repoData
    Write-Host "✅ Repository basic info updated!" -ForegroundColor Green
    Write-Host "📝 Description: $($response.description)" -ForegroundColor Cyan
    Write-Host "🌐 Homepage: $($response.homepage)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Failed to update repository basic info: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 2: Update Topics
Write-Host "Step 2: Updating Repository Topics..." -ForegroundColor Yellow
try {
    $topicsData = @{
        names = @(
            "vj", 
            "audio-visual", 
            "live-performance", 
            "video-mixing", 
            "generative-graphics", 
            "threejs", 
            "p5js", 
            "tonejs", 
            "react", 
            "webgl", 
            "music", 
            "visualization", 
            "creative-coding", 
            "digital-art", 
            "performance-tools", 
            "web-audio", 
            "real-time", 
            "interactive-media", 
            "creative-technology", 
            "multimedia", 
            "live-events", 
            "digital-performance",
            "starter-kit",
            "open-source"
        )
    } | ConvertTo-Json

    $topicsResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/topics" -Headers $headers -Method Put -Body $topicsData
    Write-Host "✅ Topics updated successfully!" -ForegroundColor Green
    Write-Host "🏷️ Total Topics: $($topicsResponse.names.Count)" -ForegroundColor Cyan
    Write-Host "📋 Topics: $($topicsResponse.names -join ', ')" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Failed to update topics: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Get Current Repository Info
Write-Host "Step 3: Getting Current Repository Info..." -ForegroundColor Yellow
try {
    $currentRepo = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Get
    Write-Host "✅ Current repository info retrieved!" -ForegroundColor Green
    Write-Host "📊 Stars: $($currentRepo.stargazers_count)" -ForegroundColor Cyan
    Write-Host "🍴 Forks: $($currentRepo.forks_count)" -ForegroundColor Cyan
    Write-Host "👀 Watchers: $($currentRepo.watchers_count)" -ForegroundColor Cyan
    Write-Host "📅 Created: $($currentRepo.created_at)" -ForegroundColor Cyan
    Write-Host "🔄 Updated: $($currentRepo.updated_at)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Failed to get repository info: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎵 Repository Details Update Completed!" -ForegroundColor Green
Write-Host "🌐 Repository: https://github.com/michaelgermini/audiotivist" -ForegroundColor Cyan
Write-Host "🎬 Live Demo: https://audiotivist.vercel.app/" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
