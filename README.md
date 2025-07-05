# 🚀 Moiz Amjad - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring stunning 3D animations, immersive visual effects, and a comprehensive showcase of my software engineering journey.

## ✨ Features

### 🎨 **Visual & UI Features**
- **Modern Design**: Clean, professional interface with glassmorphism effects
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach, optimized for all devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **3D Environment**: React Three Fiber integration with immersive backgrounds

### 🐉 **3D & Interactive Elements**
- **Realistic Dragons**: 15+ procedurally generated dragons with realistic flight patterns
- **Flying Objects**: 40+ magical elements (butterflies, orbs, geometric shapes, sparkles)
- **OpenGL Backgrounds**: 4 variants (particles, geometric, waves, minimal)
- **Interactive Particles**: 2000+ particles with physics-based movement
- **Dynamic Lighting**: Advanced lighting systems for 3D scenes

### 📱 **User Experience**
- **Welcome Screen**: Animated word-by-word text reveal with 3D effects
- **Progressive Loading**: Lazy-loaded components for optimal performance
- **Smooth Scrolling**: Buttery smooth navigation between sections
- **Hover Effects**: Ultra-responsive hover animations (80ms transitions)
- **Loading States**: Elegant loading indicators maintaining layout integrity

### 🏗️ **Technical Features**
- **Next.js 14**: Latest App Router with TypeScript support
- **Performance Optimized**: Lazy loading, code splitting, and memoization
- **PWA Ready**: Service worker, offline support, and app manifest
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

### 📧 **Contact & Communication**
- **EmailJS Integration**: Functional contact form with real-time validation
- **Form Validation**: Real-time email validation with error handling
- **Success/Error States**: User-friendly feedback for form submissions
- **Multiple Contact Methods**: Email, LinkedIn, GitHub integration

### 📊 **Content Sections**
- **Hero Section**: Dynamic typewriter effect with rotating phrases
- **About Me**: Personal bio with animated statistics and social links
- **Experience**: Timeline layout with progressive scroll-based rendering
- **Projects**: Featured projects with hover effects and technology tags
- **Skills**: Interactive skill categories with 3D card rotations
- **Education**: Academic achievements with animated icons and stats
- **Awards**: Enhanced award cards with individual styling

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety throughout the application
- **ESLint & Prettier**: Code quality and formatting enforcement
- **Organized Structure**: Modular architecture with clear separation of concerns
- **Environment Variables**: Secure API key management
- **Documentation**: Comprehensive setup and development guides

### ⚡ **Performance Features**
- **Bundle Optimization**: Tree-shaking and code splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Caching Strategy**: Service worker with cache-first approach
- **Resource Preloading**: Critical resource hints and preloading
- **Reduced Motion**: Respects user accessibility preferences

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Drei
- **Icons**: Lucide React

### **Backend & Services**
- **Email Service**: EmailJS
- **Deployment**: Vercel (recommended)
- **Analytics**: Ready for Google Analytics/Vercel Analytics

### **Development Tools**
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Version Control**: Git

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moiz-Amjad/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 EmailJS Setup

### 1. Create EmailJS Account
- Visit [EmailJS](https://www.emailjs.com/)
- Sign up for a free account

### 2. Create Email Service
- Add your email service (Gmail, Outlook, etc.)
- Note the Service ID

### 3. Create Email Template
- Create a new template with these variables:
  - `{{user_name}}` - Sender's name
  - `{{user_email}}` - Sender's email
  - `{{message}}` - Message content
- Note the Template ID

### 4. Get Public Key
- Go to Account → API Keys
- Copy your Public Key

### 5. Update Environment Variables
Add your credentials to `.env`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx          # Main page component
├── components/            # React components
│   ├── sections/         # Page sections
│   │   ├── About.tsx     # About section
│   │   ├── Contact.tsx   # Contact form
│   │   ├── Education.tsx # Education & awards
│   │   ├── Experience.tsx# Work experience
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Projects.tsx  # Projects showcase
│   │   └── Skills.tsx    # Skills & technologies
│   ├── three/            # 3D components
│   │   ├── Dragon.tsx    # Dragon components
│   │   ├── FlyingObjects.tsx
│   │   ├── OpenGLBackground.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── RealisticDragon.tsx
│   ├── Footer.tsx        # Site footer
│   ├── Navigation.tsx    # Navigation bar
│   ├── ThemeProvider.tsx # Theme context
│   ├── TypeWriter.tsx    # Typewriter effect
│   └── WelcomeScreen.tsx # Loading screen
├── constants/             # Application constants
│   └── index.ts          # Site config, navigation, data
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts# localStorage hook
├── lib/                   # Utility libraries
│   └── emailjs.ts        # EmailJS integration
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared interfaces
├── utils/                 # Utility functions
│   └── index.ts          # Helper functions
├── public/               # Static assets
│   ├── icons/           # App icons
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS config
└── tsconfig.json       # TypeScript config
```

## 🎨 Customization

### **Personal Information**
Update your details in `constants/index.ts`:
```typescript
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other details
}
```

### **Projects & Experience**
Modify the data arrays in `constants/index.ts`:
```typescript
export const PROJECTS_DATA = [
  {
    id: 'project-1',
    title: 'Your Project',
    description: 'Project description',
    technologies: ['Tech1', 'Tech2'],
  },
  // ... more projects
]
```

### **Theme Colors**
Customize colors in `constants/index.ts`:
```typescript
export const THEME_COLORS = {
  primary: '#8B5CF6',    # Purple
  secondary: '#3B82F6',  # Blue
  accent: '#10B981',     # Green
}
```

### **3D Scene Configuration**
Adjust 3D elements in `constants/index.ts`:
```typescript
export const THREE_CONFIG = {
  dragons: {
    count: 15,     # Number of dragons
    speed: 0.2,    # Animation speed
  },
  particles: {
    count: 2000,   # Particle count
  },
}
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Drag and drop build folder
- **AWS Amplify**: Connect GitHub repository
- **GitHub Pages**: Use `next export` for static export

### **Build Commands**
```bash
# Production build
npm run build

# Start production server
npm start

# Export static site
npm run export
```

## 🧪 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### **Code Quality**
- **ESLint**: Configured for Next.js and TypeScript
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict mode enabled
- **Husky**: Git hooks for quality checks (if configured)

### **Performance Monitoring**
- Use Next.js built-in analytics
- Monitor Core Web Vitals
- Check bundle size with `@next/bundle-analyzer`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Moiz-Amjad/portfolio/issues).

## 📞 Contact

- **Email**: moiz.amjad37@gmail.com
- **LinkedIn**: [Moiz Amjad](https://linkedin.com/in/moiz-amjad)
- **GitHub**: [Moiz-Amjad](https://github.com/Moiz-Amjad)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [Moiz Amjad](https://github.com/Moiz-Amjad) 