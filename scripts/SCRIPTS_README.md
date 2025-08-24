# 🎵 GitHub Repository Management Scripts

This directory contains PowerShell scripts for managing the Audiotivist GitHub repository via the GitHub API.

## 📋 Available Scripts

### 🎯 **Main Scripts**

#### `edit_repository_details.ps1`
**Complete repository management script**
- Updates description, homepage, and settings
- Sets repository topics (24 optimized tags)
- Retrieves current repository statistics
- **Usage**: `.\edit_repository_details.ps1`

#### `setup_github_simple.ps1`
**Complete repository setup script**
- Updates repository about section
- Creates custom labels for issues
- Creates initial issues
- **Usage**: `.\setup_github_simple.ps1`

### 🏷️ **Specialized Scripts**

#### `update_topics_only.ps1`
**Topics-only update script**
- Updates only the repository topics
- 24 optimized topics for better discoverability
- **Usage**: `.\update_topics_only.ps1`

#### `create_labels.ps1`
**Custom labels creation**
- Creates specialized labels for issues
- Color-coded and categorized
- **Usage**: `.\create_labels.ps1`

#### `create_issues.ps1`
**Initial issues creation**
- Creates predefined issues for the project
- Includes bug reports and feature requests
- **Usage**: `.\create_issues.ps1`

#### `create_discussion.ps1`
**GitHub discussion creation**
- Creates welcome discussion using template
- **Usage**: `.\create_discussion.ps1`

## 🔧 Prerequisites

### GitHub Token Setup
1. **Generate a Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select scopes: `repo`, `user`, `user:email`

2. **Set Environment Variable**:
   ```powershell
   $env:GITHUB_TOKEN="your_token_here"
   ```

## 🎯 Repository Topics

The scripts use 24 optimized topics for maximum discoverability:

### 🎵 **Audio-Visual**
- `vj`, `audio-visual`, `live-performance`, `video-mixing`
- `music`, `visualization`, `web-audio`, `real-time`

### 🎨 **Creative & Technical**
- `generative-graphics`, `creative-coding`, `digital-art`
- `interactive-media`, `creative-technology`, `multimedia`

### ⚡ **Technologies**
- `threejs`, `p5js`, `tonejs`, `react`, `webgl`

### 🎪 **Performance**
- `performance-tools`, `live-events`, `digital-performance`

### 📦 **Project Type**
- `starter-kit`, `open-source`

## 🚀 Quick Start

1. **Set your GitHub token**:
   ```powershell
   $env:GITHUB_TOKEN="your_token_here"
   ```

2. **Run the main script**:
   ```powershell
   .\edit_repository_details.ps1
   ```

3. **Or run individual scripts**:
   ```powershell
   .\update_topics_only.ps1
   .\create_labels.ps1
   .\create_issues.ps1
   ```

## 📊 Repository Statistics

After running the scripts, you can view:
- **Stars**: Current star count
- **Forks**: Number of forks
- **Watchers**: Number of watchers
- **Topics**: All applied topics
- **Settings**: Repository configuration

## 🔗 Links

- **Repository**: https://github.com/michaelgermini/audiotivist
- **Live Demo**: https://audiotivist.vercel.app/
- **Issues**: https://github.com/michaelgermini/audiotivist/issues
- **Discussions**: https://github.com/michaelgermini/audiotivist/discussions

---

**Note**: These scripts require PowerShell and a valid GitHub Personal Access Token with appropriate permissions.
