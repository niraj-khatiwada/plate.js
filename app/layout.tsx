import type { Metadata } from 'next'
import '../styles/global.css'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Script Editor Final Draft',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
