# Simple Repository About Update
# Usage: .\update_about_simple.ps1

Write-Host "🎵 Audiotivist Repository About Update" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN not found!" -ForegroundColor Red
    Write-Host "Please set your GitHub token first:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Token found, proceeding..." -ForegroundColor Green

# Repository data
$repoData = @{
    name = "audiotivist"
    description = "Modern web-based audio-visual performance platform for VJs, musicians, and digital artists"
    homepage = "https://audiotivist.vercel.app/"
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

Write-Host "🔄 Updating repository..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Patch -Body $repoData
    
    Write-Host "✅ Repository updated successfully!" -ForegroundColor Green
    Write-Host "📝 Description: $($response.description)" -ForegroundColor Cyan
    Write-Host "🌐 Homepage: $($response.homepage)" -ForegroundColor Cyan
    Write-Host "🔗 Repository: https://github.com/michaelgermini/audiotivist" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Failed to update repository" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response: $errorBody" -ForegroundColor Red
    }
    
    Write-Host "💡 Make sure your token has the correct permissions:" -ForegroundColor Yellow
    Write-Host "   - repo (Full control of private repositories)" -ForegroundColor Yellow
    Write-Host "   - user (Update ALL user data)" -ForegroundColor Yellow
}
