# 🎵 Manual GitHub Repository Update Guide

Since the automated scripts aren't working properly, here's how to manually update your GitHub repository's About section.

## 🔧 Step 1: Set GitHub Token

First, set your GitHub Personal Access Token:

```powershell
$env:GITHUB_TOKEN="your_token_here"
```

## 🎯 Step 2: Update Repository About

Run this command to update the repository:

```powershell
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

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

Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist" -Headers $headers -Method Patch -Body $repoData
```

## 🏷️ Step 3: Update Topics

Run this command to update the topics:

```powershell
$topicsData = @{
    names = @(
        "vj", "audio-visual", "live-performance", "video-mixing", 
        "generative-graphics", "threejs", "p5js", "tonejs", 
        "react", "webgl", "music", "visualization", 
        "creative-coding", "digital-art", "performance-tools", 
        "web-audio", "real-time", "interactive-media", 
        "creative-technology", "multimedia", "live-events", 
        "digital-performance", "starter-kit", "open-source"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.github.com/repos/michaelgermini/audiotivist/topics" -Headers $headers -Method Put -Body $topicsData
```

## 🌐 Manual Update via GitHub Web Interface

If the API doesn't work, you can update manually:

1. **Go to**: https://github.com/michaelgermini/audiotivist
2. **Click** the gear icon (⚙️) next to "About"
3. **Update Description**:
   ```
   Modern web-based audio-visual performance platform for VJs, musicians, and digital artists
   ```
4. **Update Website**:
   ```
   https://audiotivist.vercel.app/
   ```
5. **Add Topics** (separated by spaces):
   ```
   vj audio-visual live-performance video-mixing generative-graphics threejs p5js tonejs react webgl music visualization creative-coding digital-art performance-tools web-audio real-time interactive-media creative-technology multimedia live-events digital-performance starter-kit open-source
   ```

## 📊 Expected Result

After updating, your repository should show:

- **Description**: "Modern web-based audio-visual performance platform for VJs, musicians, and digital artists"
- **Website**: https://audiotivist.vercel.app/
- **Topics**: 24 topics for maximum discoverability

## 🔗 Links

- **Repository**: https://github.com/michaelgermini/audiotivist
- **Live Demo**: https://audiotivist.vercel.app/
- **Issues**: https://github.com/michaelgermini/audiotivist/issues
- **Discussions**: https://github.com/michaelgermini/audiotivist/discussions
