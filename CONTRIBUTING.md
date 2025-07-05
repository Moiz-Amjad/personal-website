# 🤝 Contributing to Moiz Amjad Portfolio

Thank you for considering contributing to this project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Guidelines](#component-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Performance Guidelines](#performance-guidelines)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful** and inclusive in all interactions
- **Be constructive** in feedback and discussions
- **Focus on the code** and technical aspects
- **Help others learn** and grow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your EmailJS credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `perf/description` - Performance improvements

### Example:
```bash
git checkout -b feature/add-blog-section
git checkout -b fix/contact-form-validation
```

## 🎨 Code Style Guidelines

### TypeScript
- Use **strict TypeScript** - no `any` types
- Define interfaces for all props and data structures
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```typescript
// ✅ Good
interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  onSelect: (id: string) => void
}

// ❌ Avoid
const ProjectCard = (props: any) => {
  // ...
}
```

### React Components
- Use **functional components** with hooks
- Implement **React.memo** for performance-critical components
- Keep components **small and focused**
- Use **custom hooks** for reusable logic

```typescript
// ✅ Good
const ProjectCard = memo(({ title, description }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
})

// Add display name for debugging
ProjectCard.displayName = 'ProjectCard'
```

### File Organization
```
components/
├── sections/           # Page sections
├── ui/                # Reusable UI components
├── three/             # 3D components
└── layout/            # Layout components

utils/                 # Utility functions
types/                 # Type definitions
constants/             # Application constants
hooks/                 # Custom hooks
lib/                   # External library integrations
```

### CSS/Styling
- Use **Tailwind CSS** classes
- Create **custom CSS** only when necessary
- Follow **mobile-first** responsive design
- Use **CSS variables** for theme values

```typescript
// ✅ Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-gray-800">

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

## 🧩 Component Guidelines

### Component Structure
```typescript
'use client' // Only if needed

import { memo } from 'react'
import type { ComponentProps } from '@/types'

interface ComponentNameProps {
  // Define all props with types
}

/**
 * Component description
 * @param props - Component props
 */
function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Hooks at the top
  
  // Event handlers
  
  // Render helpers (if needed)
  
  return (
    // JSX
  )
}

// Memoize if performance-critical
export default memo(ComponentName)
```

### Performance Best Practices
- Use **React.memo** for expensive components
- Implement **lazy loading** for heavy components
- Use **useMemo** and **useCallback** appropriately
- Avoid **unnecessary re-renders**

```typescript
// ✅ Good - Memoized expensive component
const ThreeScene = memo(({ objects }: ThreeSceneProps) => {
  const memoizedObjects = useMemo(() => 
    generateObjects(objects), [objects]
  )
  
  return <Canvas>{memoizedObjects}</Canvas>
})
```

### 3D Component Guidelines
- Keep **frame rates** at 60fps
- Use **instancing** for multiple similar objects
- Implement **LOD (Level of Detail)** for complex models
- Add **performance monitoring** for 3D scenes

## 📝 Commit Convention

Use **Conventional Commits** format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:
```bash
feat(contact): add email validation to contact form
fix(navigation): resolve mobile menu overlay issue
docs(readme): update installation instructions
perf(three): optimize dragon rendering performance
```

## 🔍 Pull Request Process

### Before Submitting
1. **Test your changes** thoroughly
2. **Run linting** and fix any issues
3. **Update documentation** if needed
4. **Add tests** for new features
5. **Check performance** impact

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Performance tested (especially for 3D components)
- [ ] Mobile responsiveness verified
- [ ] Accessibility guidelines followed

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with screen readers
- [ ] Performance tested

## Screenshots
Add screenshots if applicable
```

## ⚡ Performance Guidelines

### General Performance
- **Minimize bundle size** - use dynamic imports
- **Optimize images** - use Next.js Image component
- **Lazy load** non-critical components
- **Preload** critical resources

### 3D Performance
- **Limit polygon count** in 3D models
- **Use efficient materials** and textures
- **Implement frustum culling** for off-screen objects
- **Monitor frame rates** and memory usage

### Animation Performance
- **Use transform** properties for animations
- **Avoid animating** layout properties
- **Use will-change** sparingly
- **Implement reduced motion** support

## 🧪 Testing

### Manual Testing
- Test on **multiple browsers** (Chrome, Firefox, Safari)
- Test on **different devices** (mobile, tablet, desktop)
- Test **accessibility** with keyboard navigation
- Test **performance** with dev tools

### Automated Testing (Future)
- Unit tests for utility functions
- Component tests for UI components
- E2E tests for critical user flows
- Performance tests for 3D components

## 📞 Getting Help

- **Create an issue** for bugs or feature requests
- **Start a discussion** for questions or ideas
- **Join our community** (if applicable)
- **Contact maintainers** directly for urgent issues

## 🎯 Areas for Contribution

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- Browser compatibility

### Medium Priority
- New 3D effects or animations
- Additional sections or features
- Code organization improvements
- Documentation enhancements

### Low Priority
- Visual design tweaks
- Additional themes
- Extra configuration options
- Development tooling improvements

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Thank you for contributing! 🙏 