import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Experience } from "@/components/experience"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Experience />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
