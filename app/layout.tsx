import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Moiz Amjad - Software Engineer Portfolio',
  description: 'Full-stack software engineer specializing in modern web technologies, AI/ML, and scalable applications. View my projects and experience.',
  keywords: ['software engineer', 'full-stack developer', 'React', 'Next.js', 'TypeScript', 'AI/ML', 'portfolio'],
  authors: [{ name: 'Moiz Amjad' }],
  creator: 'Moiz Amjad',
  publisher: 'Moiz Amjad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://moizamjad.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Moiz Amjad - Software Engineer Portfolio',
    description: 'Full-stack software engineer specializing in modern web technologies, AI/ML, and scalable applications.',
    url: 'https://moizamjad.dev',
    siteName: 'Moiz Amjad Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moiz Amjad - Software Engineer Portfolio',
    description: 'Full-stack software engineer specializing in modern web technologies, AI/ML, and scalable applications.',
    creator: '@moizamjad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//api.emailjs.com" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Resource hints for better performance */}
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/framework.js" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance hints */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Moiz Amjad",
              "jobTitle": "Software Engineer",
              "url": "https://moizamjad.dev",
              "sameAs": [
                "https://www.linkedin.com/in/moiz-amjad/",
                "https://github.com/Moiz-Amjad"
              ],
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "Machine Learning",
                "Full-stack Development"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of Massachusetts Boston"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
} 