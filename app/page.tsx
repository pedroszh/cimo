import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Calculator } from "@/components/sections/calculator";
import { Differentials } from "@/components/sections/differentials";
import { FeatureStory } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductShot } from "@/components/sections/product-shot";
import { Profiles } from "@/components/sections/profiles";
import { Vertice } from "@/components/sections/vertice";

/**
 * Os quatro recursos (FeatureStory) ficam espalhados entre as seções,
 * alternando o lado da imagem.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductShot />
        <FeatureStory index={0} id="recursos" intro />
        <Profiles />
        <FeatureStory index={1} flip />
        <HowItWorks />
        <FeatureStory index={2} />
        <Vertice />
        <FeatureStory index={3} flip />
        <Calculator />
        <Differentials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
