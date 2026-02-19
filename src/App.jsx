import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import SubmissionForm from './components/SubmissionForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-white pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none" />

      <main className="relative z-10">
        <Hero />
        <About />
        <Categories />
        <SubmissionForm />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}

export default App;
