// app/page.tsx (actualizado para usar los nuevos componentes) <Particles density={0.7} speed={0.8} opacity={0.65}/>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Trustbar from "@/components/Trustbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import CaseStudies from "@/components/CaseStudies";
import Testimonios from "@/components/Testimonios";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import ParticlesGlass from "@/components/ParticlesGlass";

export default function Page() {
  return (
    <>
      <Header />
      <ParticlesGlass density={0.75} speed={0.95} opacity={0.7} />
      <main>
        <Hero />
        <Trustbar />
        <Services />
        <Process />
        <Stack />
        <CaseStudies />
        <Testimonios />
        <Pricing />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
