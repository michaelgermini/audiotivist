# Create GitHub Discussion for Audiotivist
# Usage: .\create_discussion.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "🎵 Creating Audiotivist Discussion..." -ForegroundColor Green

# Discussion content
$discussionBody = @"
# Welcome to Audiotivist! 🎵

Welcome to the Audiotivist community! 🎵✨

This is the official discussion space for Audiotivist - a modern audio-visual production and performance software.

## What is Audiotivist?

Audiotivist is designed for VJs, musicians, and content creators who need an efficient workflow for mixing video and generative graphics in real-time.

## Key Features

- 🎥 **Advanced Video Mixing** with multi-layer support
- 🎨 **Generative Graphics** using P5.js and Three.js
- 🎵 **Audio Integration** with Tone.js and real-time analysis
- 🎛️ **Performance Interface** optimized for live performances

## Getting Started

1. **Try the live demo**: https://audiotivist.vercel.app/
2. **Clone the repository**: `git clone https://github.com/michaelgermini/audiotivist.git`
3. **Install dependencies**: `npm install`
4. **Start development**: `npm run dev`

## Discussion Topics

Feel free to discuss:
- 🐛 Bug reports and issues
- 💡 Feature requests and ideas
- 🎨 Custom effects and modifications
- 🎵 Audio-visual performance techniques
- 🤝 Collaboration opportunities

## Important Note

This is the **first version (v1.0.0)** with known limitations. We're actively working on improvements and welcome your feedback!

## Contact

- **Email**: michael@germini.info
- **Issues**: https://github.com/michaelgermini/audiotivist/issues

Let's create amazing audio-visual experiences together! 🚀

---

**Audiotivist** - Create, mix, perform! 🎵✨
"@

# API request data
$discussionData = @{
    title = "Welcome to Audiotivist! 🎵"
    body = $discussionBody
    category_id = 1  # General category
} | ConvertTo-Json

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

try {
    # Create discussion
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/discussions" -Headers $headers -Method Post -Body $discussionData
    
    Write-Host "✅ Discussion created successfully!" -ForegroundColor Green
    Write-Host "🔗 Discussion URL: $($response.html_url)" -ForegroundColor Cyan
    Write-Host "📝 Discussion ID: $($response.id)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Failed to create discussion" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response: $errorBody" -ForegroundColor Red
    }
}
