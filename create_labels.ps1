# Create Custom GitHub Labels for Audiotivist
# Usage: .\create_labels.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "🎵 Creating Custom Labels for Audiotivist..." -ForegroundColor Green

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Custom labels to create
$labels = @(
    @{
        name = "🎵 audio"
        color = "1d76db"
        description = "Audio-related features and bugs"
    },
    @{
        name = "🎥 video"
        color = "d73a4a"
        description = "Video-related features and bugs"
    },
    @{
        name = "🎨 visual"
        color = "7057ff"
        description = "Visual effects and graphics"
    },
    @{
        name = "⚡ performance"
        color = "ff9500"
        description = "Performance improvements and optimizations"
    },
    @{
        name = "📱 mobile"
        color = "0e8a16"
        description = "Mobile and responsive design"
    },
    @{
        name = "🔧 enhancement"
        color = "a2eeef"
        description = "New features and improvements"
    },
    @{
        name = "🐛 bug"
        color = "d73a4a"
        description = "Something isn't working"
    },
    @{
        name = "📚 documentation"
        color = "0075ca"
        description = "Documentation improvements"
    },
    @{
        name = "🚀 vj-tool"
        color = "5319e7"
        description = "VJ-specific features"
    },
    @{
        name = "🎭 live-performance"
        color = "fbca04"
        description = "Live performance features"
    },
    @{
        name = "🔄 real-time"
        color = "c2e0c6"
        description = "Real-time processing features"
    },
    @{
        name = "🎪 generative"
        color = "bfdadc"
        description = "Generative graphics and effects"
    }
)

# Create each label
foreach ($label in $labels) {
    try {
        $labelData = @{
            name = $label.name
            color = $label.color
            description = $label.description
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/labels" -Headers $headers -Method Post -Body $labelData
        
        Write-Host "✅ Label created: $($response.name)" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Failed to create label: $($label.name)" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "🎵 Labels creation completed!" -ForegroundColor Green
