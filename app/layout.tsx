import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Crest & Core | Phonics for Kids',
  description:
    'Fun and engaging phonics classes that help children build strong reading, spelling, pronunciation, and confidence skills.',
  keywords: [
    'phonics classes',
    'online phonics classes',
    'phonics for kids',
    'reading classes for kids',
    'kids learning',
    'reading skills',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}