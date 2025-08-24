# Update Repository Topics Only
# Usage: .\update_topics_only.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "Updating Audiotivist Repository Topics..." -ForegroundColor Green

# Topics data
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

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

try {
    # Update topics using PUT method
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/topics" -Headers $headers -Method Put -Body $topicsData
    
    Write-Host "Topics updated successfully!" -ForegroundColor Green
    Write-Host "Topics: $($response.names -join ', ')" -ForegroundColor Cyan
    Write-Host "Total Topics: $($response.names.Count)" -ForegroundColor Yellow
    
} catch {
    Write-Host "Failed to update topics: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response: $errorBody" -ForegroundColor Red
    }
}
