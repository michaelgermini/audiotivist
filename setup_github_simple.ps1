# Complete GitHub Repository Setup for Audiotivist (Simplified)
# Usage: .\setup_github_simple.ps1

# Check if token is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "GITHUB_TOKEN not found in environment variables" -ForegroundColor Red
    Write-Host "Please set your GitHub token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN="your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "Setting up Audiotivist GitHub Repository..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Step 1: Update Repository About
Write-Host "Step 1: Updating Repository About..." -ForegroundColor Yellow
try {
    $repoData = @{
        name = "audiotivist"
        description = "Modern audio-visual production and performance software for VJs and musicians"
        homepage = "https://audiotivist.vercel.app/"
        topics = @("vj", "audio-visual", "live-performance", "video-mixing", "generative-graphics", "threejs", "p5js", "tonejs", "react", "webgl", "music", "visualization")
        has_issues = $true
        has_projects = $true
        has_wiki = $true
        has_discussions = $true
        default_branch = "main"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Patch -Body $repoData
    Write-Host "Repository About updated!" -ForegroundColor Green
} catch {
    Write-Host "Failed to update repository: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 2: Create Custom Labels
Write-Host "Step 2: Creating Custom Labels..." -ForegroundColor Yellow
try {
    $labels = @(
        @{name = "audio"; color = "1d76db"; description = "Audio-related features and bugs"},
        @{name = "video"; color = "d73a4a"; description = "Video-related features and bugs"},
        @{name = "visual"; color = "7057ff"; description = "Visual effects and graphics"},
        @{name = "performance"; color = "ff9500"; description = "Performance improvements"},
        @{name = "mobile"; color = "0e8a16"; description = "Mobile and responsive design"},
        @{name = "enhancement"; color = "a2eeef"; description = "New features and improvements"},
        @{name = "bug"; color = "d73a4a"; description = "Something isn't working"},
        @{name = "documentation"; color = "0075ca"; description = "Documentation improvements"},
        @{name = "vj-tool"; color = "5319e7"; description = "VJ-specific features"},
        @{name = "live-performance"; color = "fbca04"; description = "Live performance features"},
        @{name = "real-time"; color = "c2e0c6"; description = "Real-time processing features"},
        @{name = "generative"; color = "bfdadc"; description = "Generative graphics and effects"}
    )

    foreach ($label in $labels) {
        $labelData = @{
            name = $label.name
            color = $label.color
            description = $label.description
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/labels" -Headers $headers -Method Post -Body $labelData | Out-Null
    }
    Write-Host "Custom labels created!" -ForegroundColor Green
} catch {
    Write-Host "Failed to create labels: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Create Initial Issues
Write-Host "Step 3: Creating Initial Issues..." -ForegroundColor Yellow
try {
    $issues = @(
        @{
            title = "Fix MP4 video playback performance issues"
            body = "## Bug Report`n`n### Description`nSome MP4 files have performance issues during playback.`n`n### Expected Behavior`n- Smooth video playback`n- No frame drops`n- Consistent performance`n`n### Current Behavior`n- Occasional stuttering`n- Frame drops on larger files`n- Memory usage spikes`n`n### Additional Notes`nThis is a known limitation in v1.0.0 that we're actively working on."
            labels = @("bug", "performance", "video")
        },
        @{
            title = "Add export functionality for video projects"
            body = "## Feature Request`n`n### Description`nAdd ability to export mixed video projects.`n`n### Use Case`n- Save final mixed videos`n- Share projects with others`n- Archive performances`n`n### Proposed Features`n- Export as MP4/WebM`n- Quality settings`n- Resolution options`n- Audio export`n`n### Priority`nMedium - Would greatly enhance usability"
            labels = @("enhancement", "export", "video")
        },
        @{
            title = "Add more visual effects and transitions"
            body = "## Feature Request`n`n### Description`nExpand the visual effects library with more creative options.`n`n### Requested Effects`n- More transition types`n- Advanced color grading`n- Particle systems`n- 3D transformations`n- Custom shader support`n`n### Priority`nHigh - Core feature for VJ software"
            labels = @("enhancement", "effects", "visual")
        }
    )

    foreach ($issue in $issues) {
        $issueData = @{
            title = $issue.title
            body = $issue.body
            labels = $issue.labels
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/issues" -Headers $headers -Method Post -Body $issueData
        Write-Host "Issue created: $($response.title)" -ForegroundColor Green
    }
} catch {
    Write-Host "Failed to create issues: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "GitHub Repository Setup Completed!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Repository About updated" -ForegroundColor Green
Write-Host "Custom labels created" -ForegroundColor Green
Write-Host "Initial issues created" -ForegroundColor Green
Write-Host "Repository: https://github.com/michaelgermini/audiotivist" -ForegroundColor Cyan
Write-Host "Live Demo: https://audiotivist.vercel.app/" -ForegroundColor Cyan
