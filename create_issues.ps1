# Create GitHub Issues for Audiotivist
# Usage: .\create_issues.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "🎵 Creating GitHub Issues for Audiotivist..." -ForegroundColor Green

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Issues to create
$issues = @(
    @{
        title = "🐛 Fix MP4 video playback performance issues"
        body = @"
## Bug Report

### Description
Some MP4 files have performance issues during playback.

### Expected Behavior
- Smooth video playback
- No frame drops
- Consistent performance

### Current Behavior
- Occasional stuttering
- Frame drops on larger files
- Memory usage spikes

### Steps to Reproduce
1. Upload an MP4 file
2. Play the video
3. Observe performance issues

### Environment
- Browser: Chrome/Firefox/Safari
- File size: >50MB
- Format: MP4

### Additional Notes
This is a known limitation in v1.0.0 that we're actively working on.
"@
        labels = @("bug", "performance", "video")
    },
    @{
        title = "💡 Add export functionality for video projects"
        body = @"
## Feature Request

### Description
Add ability to export mixed video projects.

### Use Case
- Save final mixed videos
- Share projects with others
- Archive performances

### Proposed Features
- Export as MP4/WebM
- Quality settings
- Resolution options
- Audio export

### Priority
Medium - Would greatly enhance usability

### Labels
enhancement, export, video
"@
        labels = @("enhancement", "export", "video")
    },
    @{
        title = "🎨 Add more visual effects and transitions"
        body = @"
## Feature Request

### Description
Expand the visual effects library with more creative options.

### Current Effects
- Basic effects (brightness, contrast)
- Distortion effects
- Audio-reactive effects

### Requested Effects
- More transition types
- Advanced color grading
- Particle systems
- 3D transformations
- Custom shader support

### Priority
High - Core feature for VJ software

### Labels
enhancement, effects, visual
"@
        labels = @("enhancement", "effects", "visual")
    },
    @{
        title = "📱 Improve mobile/responsive interface"
        body = @"
## Enhancement

### Description
Improve the interface for mobile devices and smaller screens.

### Current Issues
- Interface elements too small on mobile
- Touch controls need improvement
- Layout not optimized for tablets

### Proposed Improvements
- Responsive design improvements
- Touch-friendly controls
- Mobile-optimized layout
- Gesture support

### Priority
Medium - Important for accessibility

### Labels
enhancement, mobile, ui/ux
"@
        labels = @("enhancement", "mobile", "ui/ux")
    }
)

# Create each issue
foreach ($issue in $issues) {
    try {
        $issueData = @{
            title = $issue.title
            body = $issue.body
            labels = $issue.labels
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/issues" -Headers $headers -Method Post -Body $issueData
        
        Write-Host "✅ Issue created: $($response.title)" -ForegroundColor Green
        Write-Host "🔗 URL: $($response.html_url)" -ForegroundColor Cyan
        
    } catch {
        Write-Host "❌ Failed to create issue: $($issue.title)" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "🎵 Issues creation completed!" -ForegroundColor Green
