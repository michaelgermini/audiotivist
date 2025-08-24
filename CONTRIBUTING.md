# Contributing Guide

Thank you for your interest in contributing to **Audiotivist**! This document will guide you through the contribution process.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**
- A code editor (VS Code recommended)

### Installation
```bash
# Fork and clone the repository
git clone https://github.com/michaelgermini/audiotivist.git
cd audiotivist

# Install dependencies
npm install

# Start development mode
npm run dev
```

## 📋 Types of Contributions

### 🐛 Report a Bug
- Use the "Bug Report" template
- Include clear reproduction steps
- Add screenshots if possible
- Specify your environment (OS, browser, version)

### ✨ Propose a Feature
- Use the "Feature Request" template
- Clearly describe the need
- Explain why this feature would be useful
- Propose a solution if possible

### 🔧 Improve Code
- Create a branch for your feature
- Follow code conventions
- Add tests if applicable
- Update documentation

## 🛠️ Development Workflow

### 1. Create a Branch
```bash
# From main branch
git checkout -b feature/feature-name
# or
git checkout -b fix/bug-name
```

### 2. Develop
- Write clean and documented code
- Follow ESLint conventions
- Test your changes locally
- Commit regularly with clear messages

### 3. Test
```bash
# Check code
npm run lint

# Format code
npm run format

# Test application
npm run dev
```

### 4. Commit
```bash
# Add files
git add .

# Commit with descriptive message
git commit -m "feat: add new feature X"
git commit -m "fix: fix bug in Y"
git commit -m "docs: update documentation Z"
```

### 5. Push and Create PR
```bash
git push origin feature/feature-name
```

## 📝 Code Conventions

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

feat(video): add WebM format support
fix(audio): fix latency issue
docs(readme): update installation instructions
style(ui): improve play button design
refactor(mixer): simplify mixing logic
test(effects): add tests for visual effects
```

Available types:
- `feat` : New feature
- `fix` : Bug fix
- `docs` : Documentation
- `style` : Formatting, missing semicolons, etc.
- `refactor` : Code refactoring
- `test` : Adding or modifying tests
- `chore` : Maintenance tasks

### Code Style
- **JavaScript/React** : Follow ESLint rules
- **CSS** : Use CSS variables for colors
- **File names** : PascalCase for React components
- **Variable names** : camelCase
- **Constant names** : UPPER_SNAKE_CASE

### Component Structure
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'

// 2. Main component
const MyComponent = ({ prop1, prop2, onAction }) => {
  // 3. States and hooks
  const [state, setState] = useState(initialValue)
  
  // 4. Effects
  useEffect(() => {
    // logic
  }, [dependencies])
  
  // 5. Functions
  const handleClick = () => {
    // logic
  }
  
  // 6. Render
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  )
}

// 7. Export
export default MyComponent
```

## 🧪 Testing

### Manual Tests
- Test on different browsers (Chrome, Firefox, Safari, Edge)
- Check responsiveness on mobile/tablet
- Test with different video formats
- Verify performance with large files

### Automated Tests
```bash
# Run tests (when implemented)
npm test

# Code coverage
npm run test:coverage
```

## 📚 Documentation

### Code
- Comment complex functions
- Use JSDoc for public APIs
- Explain non-obvious algorithms

### README
- Update README if you add features
- Add usage examples
- Document new configuration options

### CHANGELOG
- Add your changes to CHANGELOG.md
- Follow existing format
- Use appropriate categories

## 🎯 Contribution Areas

### High Priority
- **Performance** : Video/audio optimizations
- **Stability** : Critical bug fixes
- **Accessibility** : Accessibility improvements
- **Tests** : Unit/integration test additions

### Medium Priority
- **New features** : Visual effects, audio controls
- **UI/UX** : Interface improvements
- **Documentation** : Guides, tutorials, examples

### Low Priority
- **Refactoring** : Existing code improvements
- **Minor optimizations** : Non-critical performance
- **New dependencies** : New library integrations

## 🤝 Review Process

### Before Submitting
- [ ] Code linted and formatted
- [ ] Tests pass
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Feature manually tested

### During Review
- Respond to comments quickly
- Make requested changes
- Add tests if necessary
- Explain your design choices

### After Review
- Merge only after approval
- Delete branch after merge
- Celebrate your contribution! 🎉

## 🆘 Need Help?

- **Issues** : [GitHub Issues](https://github.com/michaelgermini/audiotivist/issues)
- **Discussions** : [GitHub Discussions](https://github.com/michaelgermini/audiotivist/discussions)
- **Email** : contact@audiotivist.com

## 📄 License

By contributing, you agree that your contributions will be under the same MIT license as the project.

---

**Thank you for contributing to Audiotivist!** 🎵✨
