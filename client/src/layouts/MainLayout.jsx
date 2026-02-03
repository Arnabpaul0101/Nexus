import Navigation from '../components/Navigation.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      <Navigation />
      <main className="pt-20 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
