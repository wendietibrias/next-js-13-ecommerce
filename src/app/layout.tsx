import './globals.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProviderRedux from '@/layout/ProviderRedux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <ProviderRedux>
             {children}
          </ProviderRedux>
        </body>
      </html>
  )
}
