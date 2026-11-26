import './globals.css'

export const metadata = {
  title: 'Soulful Weddings — Wedding Films, Made to Be Felt.',
  description: 'Concept website for Soulful Weddings, Chandigarh.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}