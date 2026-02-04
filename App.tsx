import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ElectricalSection } from './components/ElectricalSection';
import { UdtSection } from './components/UdtSection';
import { CertificatesSection } from './components/CertificatesSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-industrial-900 text-gray-100 font-sans selection:bg-industrial-accent selection:text-industrial-900 scroll-smooth">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Why Us Intro */}
        <section className="py-20 bg-industrial-800 border-b border-gray-800">
          <div className="container mx-auto px-4 text-center">
             <h3 className="text-2xl md:text-3xl font-light text-gray-300 mb-10">
                Dlaczego warto wybrać <span className="font-bold text-white">jedno źródło</span> usług?
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="p-6 bg-industrial-900/50 rounded-xl border border-gray-800">
                   <div className="text-5xl font-display font-bold text-industrial-accent mb-4">01</div>
                   <h4 className="text-xl font-bold text-white mb-3">Synergia Działań</h4>
                   <p className="text-lg text-gray-400 leading-relaxed">Łączymy relokację maszyn z ich podłączeniem elektrycznym i dozorem UDT. Oszczędzasz czas na koordynacji firm.</p>
                </div>
                <div className="p-6 bg-industrial-900/50 rounded-xl border border-gray-800">
                   <div className="text-5xl font-display font-bold text-industrial-accent mb-4">02</div>
                   <h4 className="text-xl font-bold text-white mb-3">Optymalizacja Kosztów</h4>
                   <p className="text-lg text-gray-400 leading-relaxed">Jeden dostawca to mniejsze koszty logistyczne i lepsze warunki handlowe na pakiet usług.</p>
                </div>
                <div className="p-6 bg-industrial-900/50 rounded-xl border border-gray-800">
                   <div className="text-5xl font-display font-bold text-industrial-accent mb-4">03</div>
                   <h4 className="text-xl font-bold text-white mb-3">Jakość ISO 9001</h4>
                   <p className="text-lg text-gray-400 leading-relaxed">Posiadamy certyfikowane procesy zarządzania jakością, co gwarantuje bezpieczeństwo i terminowość.</p>
                </div>
             </div>
          </div>
        </section>

        <ServicesSection />
        
        <ElectricalSection />

        <UdtSection />
        
        <CertificatesSection />

        <FaqSection />
        
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;