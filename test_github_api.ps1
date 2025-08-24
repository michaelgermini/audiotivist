# Test GitHub API Configuration
# Usage: .\test_github_api.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ GITHUB_TOKEN found" -ForegroundColor Green

# Test API connection
try {
    $headers = @{
        "Authorization" = "token $env:GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get
    
    Write-Host "✅ GitHub API connection successful" -ForegroundColor Green
    Write-Host "👤 Connected as: $($response.login)" -ForegroundColor Cyan
    
    # Test repository access
    $repoResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Get
    
    Write-Host "✅ Repository access confirmed" -ForegroundColor Green
    Write-Host "📁 Repository: $($repoResponse.full_name)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ GitHub API test failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
