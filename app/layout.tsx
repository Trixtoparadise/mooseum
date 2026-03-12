import './globals.css';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import localFont from 'next/font/local';
import type { Metadata } from "next";
import { Cascadia_Mono } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

const brownBagLunch = localFont({
  src: "../public/fonts/BrownBagLunch.ttf",
  variable: '--font-brownbaglunch'
}); 

const gangOfThree = localFont({
  src: "../public/fonts/GangOfThree.ttf",
  variable: '--font-gangofthree'
})

const cascadiaMono = Cascadia_Mono({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "MOOSEUM",
  description: "A digital mooseum.",
};

export default function DashboardLayout({ 
  children, }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={`${brownBagLunch.variable} ${gangOfThree.variable} ${cascadiaMono.className}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href='/favicon.ico' sizes='any' />
        </head>
        <body className="bg-pixel-grid">
          <AppRouterCacheProvider
            options={{ key: 'css'}}
          >
            <header className='bg-primary text-secondary medium'>
                <Navbar />
            </header>
            <div className="min-h-screen bg-hero">
              <main className="grow flex">{children}</main>
            </div>
            <Footer />
          </AppRouterCacheProvider>
        </body>
      </html>
    )
  }
