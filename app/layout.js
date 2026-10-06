import './globals.css';
import SiteAnimations from '../components/animations/SiteAnimations';
import WhatsAppFloat from '../components/WhatsAppFloat';

export const metadata = {
  title: {
    default: 'Sikuru Support Service',
    template: '%s | Sikuru Support Service',
  },
  description:
    'Personalised NDIS support services for individuals and families across Perth, Western Australia.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6f1118',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppFloat />
        <SiteAnimations />
      </body>
    </html>
  );
}
