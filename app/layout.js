// app/layout.js
import AuthProvider from "../context/AuthProvider";
import './globals.css';
import HeaderWrapper from '../components/HeadWrapper';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <HeaderWrapper>
            {children}
          </HeaderWrapper>
        </body>
      </AuthProvider>
    </html>
  );
}
