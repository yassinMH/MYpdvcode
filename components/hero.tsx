import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-navy max-w-3xl">
            Vos étiquettes, notre savoir-faire
          </h1>
          <p className="text-xl md:text-2xl text-navy/80 max-w-2xl">
            Votre partenaire pour des points de vente connectés et ultra-performants
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/contact">Contactez-nous dès aujourd'hui</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sky-500 text-sky-500 hover:bg-sky-50 bg-transparent"
            >
              <Link href="/#services">Découvrez nos services sur-mesure</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
