# 🚀 Deployment Guide

This guide covers different deployment options for the Moiz Amjad Portfolio website.

## 📋 Pre-deployment Checklist

- [ ] All environment variables are configured
- [ ] EmailJS is set up and tested
- [ ] Build process runs without errors
- [ ] Performance optimizations are applied
- [ ] SEO meta tags are configured
- [ ] Accessibility guidelines are followed
- [ ] Mobile responsiveness is verified

## 🌟 Vercel (Recommended)

Vercel is the recommended deployment platform as it's built by the creators of Next.js.

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your variables:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be available at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record: `your-domain.com` → `cname.vercel-dns.com`
   - Or A record: `your-domain.com` → `76.76.19.61`

## 🔷 Netlify

### Drag & Drop Deployment

1. **Build the project**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag the `out` folder to the deploy area

### Git-based Deployment

1. **Connect Repository**
   - Sign up/login to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add your EmailJS credentials

### Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## ☁️ AWS Amplify

### Console Deployment

1. **AWS Amplify Console**
   - Visit AWS Amplify Console
   - Click "Connect app"
   - Choose GitHub and select your repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   - Add variables in the Amplify console

### Amplify CLI

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure
amplify configure

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

## 🐙 GitHub Pages

GitHub Pages requires static export since it doesn't support server-side rendering.

### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "export": "next build && next export",
       "deploy": "npm run export && gh-pages -d out"
     }
   }
   ```

3. **Configure next.config.js**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 🌐 Traditional Hosting

For shared hosting or VPS deployment.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_EMAILJS_SERVICE_ID=${NEXT_PUBLIC_EMAILJS_SERVICE_ID}
      - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}
      - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}
    restart: unless-stopped
```

### Deploy with Docker

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 --env-file .env portfolio

# Or use docker-compose
docker-compose up -d
```

## 📊 Performance Optimization for Production

### Environment Variables

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Build Optimization

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

### CDN Configuration

For static assets, consider using a CDN:

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.example.com' 
    : '',
}
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files
- Use different credentials for production
- Rotate API keys regularly

### Headers
The `next.config.js` already includes security headers:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ]
}
```

## 📈 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics
Add to environment variables:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache
   rm -rf .next
   npm run build
   ```

2. **Environment Variable Issues**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Restart development server after changes
   - Check for typos in variable names

3. **3D Rendering Issues**
   - Ensure WebGL is supported
   - Check for memory leaks in 3D components
   - Monitor performance on lower-end devices

4. **EmailJS Not Working**
   - Verify all credentials are correct
   - Check EmailJS dashboard for quota limits
   - Ensure CORS is configured properly

### Performance Issues
```bash
# Check bundle size
npm run build

# Analyze performance
npm install --save-dev webpack-bundle-analyzer
```

## 📞 Support

If you encounter issues during deployment:

1. Check the [troubleshooting section](#troubleshooting)
2. Review deployment platform documentation
3. Create an issue in the repository
4. Contact the maintainer

---

Happy deploying! 🎉 