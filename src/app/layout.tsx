import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'notus OS - Personal Branding & Content Management Platform',
  description: 'Premium SaaS platform for managing personal branding, content creation, and multi-channel distribution in B2B agencies.',
  keywords: 'personal branding, content management, B2B agency, SaaS, marketing automation',
  authors: [{ name: 'notus' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
} 