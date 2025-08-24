# Enhanced Repository Update for Audiotivist
# Usage: .\update_repo_enhanced.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "Updating Audiotivist Repository with Enhanced Description and Topics..." -ForegroundColor Green

# Enhanced repository data
$repoData = @{
    name = "audiotivist"
    description = "Modern web-based audio-visual performance platform for VJs, musicians, and digital artists"
    homepage = "https://audiotivist.vercel.app/"
    topics = @(
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
    has_issues = $true
    has_projects = $true
    has_wiki = $true
    has_discussions = $true
    default_branch = "main"
} | ConvertTo-Json

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

try {
    # Update repository
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Patch -Body $repoData
    
    Write-Host "Repository updated successfully!" -ForegroundColor Green
    Write-Host "Description: $($response.description)" -ForegroundColor Cyan
    Write-Host "Homepage: $($response.homepage)" -ForegroundColor Cyan
    Write-Host "Topics: $($response.topics -join ', ')" -ForegroundColor Cyan
    Write-Host "Total Topics: $($response.topics.Count)" -ForegroundColor Yellow
    
} catch {
    Write-Host "Failed to update repository: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response: $errorBody" -ForegroundColor Red
    }
}
