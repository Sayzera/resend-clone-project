import "@/app/globals.css"
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

import { cn } from "@/lib/utils"
import 'rsuite/dist/rsuite.min.css';


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        {children}

      </body>
    </html>
  )
}

