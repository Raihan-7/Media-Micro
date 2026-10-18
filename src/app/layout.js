import './globals.css';

export const metadata = {
  title: 'Data Structure Simulator — Micro Teaching',
  description: 'Media Pembelajaran Interaktif Queue (FIFO) & Stack (LIFO)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}