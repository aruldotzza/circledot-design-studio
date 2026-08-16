import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { WorkPage } from './pages/WorkPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

const MainRouter: React.FC = () => {
  const { currentPath } = useNavigation();

  const renderContent = () => {
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/how-we-work') {
      return <HowWeWorkPage />;
    }
    if (currentPath === '/work') {
      return <WorkPage />;
    }
    if (currentPath === '/services') {
      return <ServicesPage />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // Default Home Page
    return <HomePage />;
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans overflow-x-clip transition-colors duration-300">
      <Navigation />
      <main>{renderContent()}</main>
      <Footer />
      <EnquiryModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <MainRouter />
      </NavigationProvider>
    </ThemeProvider>
  );
};

export default App;
