import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export function Contact() {
  return (
    <section className="py-8 md:py-24 bg-sky-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-navy">
            Contactez-nous dès aujourd'hui
          </h2>
          <p className="text-base md:text-xl text-navy/70 max-w-2xl">
            Prêt à optimiser votre point de vente ? Notre équipe d'experts est à votre
            disposition pour un accompagnement sur-mesure.
          </p>
        </div>
  
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Email */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
              <Mail className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-navy">Email</h3>
            <a
              href="mailto:contact@my-pdv.com"
              className="text-navy/70 hover:text-sky-500 transition-colors"
            >
              contact@my-pdv.com
            </a>
          </div>
  
          {/* Phone */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
              <Phone className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-navy">Téléphone</h3>
            <a
              href="tel:+33185096780"
              className="text-navy/70 hover:text-sky-500 transition-colors"
            >
              +33 1 85 09 67 80
            </a>
            <p className="text-sm text-navy/50">9h - 19h, Lundi au Vendredi</p>
          </div>
        </div>
  
        {/* CTA Button */}
        <div className="mt-8 md:mt-12 text-center">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/contact">Contactez-nous dès aujourd'hui</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
