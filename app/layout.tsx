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
          <meta name="theme-color" content="#8B5DCF" />
        </head>
        <body>
          <AppRouterCacheProvider
            options={{ key: 'css'}}
          >
            <div className="flex flex-col min-h-screen">
              <header className='bg-primary text-secondary'>
                  <Navbar />
              </header>
              <main className='text-center align-middle'>{children}</main>
            </div>
            <Footer />
          </AppRouterCacheProvider>
        </body>
      </html>
    )
  }
