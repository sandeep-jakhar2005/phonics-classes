import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Phonics Classes',
  description: 'Fun phonics learning for kids',
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