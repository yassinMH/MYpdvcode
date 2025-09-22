import { Tag, Users,FileCheck, LineChart, Search, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function Services() {
  const services = [
    {
      icon: <Tag className="h-10 w-10 text-orange-500" />,
      title: "Installer des étiquettes électroniques",
      description:
        "Installation et maintenance sur-mesure d'étiquettes électroniques pour une gestion optimale des prix et un ROI immédiat.",
    },
    {
      icon: <Wifi className="h-10 w-10 text-sky-500" />,
      title: "Optimiser votre installation réseau",
      description:
        "Installation et maintenance de câblage RJ45 pour une connectivité ultra-performante dès aujourd'hui.",
    },
    {
      icon: <Image src="/images/thing-icon.png" alt="Thing Icon" width={40} height={40} className="w-10 h-10" />,
      title: "Remplacer vos piles d'étiquettes électroniques",
      description:
        "Solutions complètes et sur-mesure pour le remplacement des piles de vos étiquettes électroniques avec optimisation de leur durée de vie.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-orange-500" />,
      title: "Audit de votre parc EEG",
      description:
      "Audit complet de votre parc EEG avec contrôle de vos installations et de votre matériel. En cas de problème, nos rapports d’expertise assure votre protection juridique.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-sky-500" />,
      title: "Conseil",
      description:
        "Nous vous accompagnons dans le choix du matériel le plus adapté à vos besoins. Nos experts vous guident pour optimiser vos investissements et maximiser votre ROI",
    },
    {
      icon: <Search className="h-10 w-10 text-navy" />,
      title: "Former vos équipes à l'excellence",
      description:
        "Formation complète et sur-mesure de vos équipes à l'utilisation des outils et technologies installés pour une performance client optimale.",
    },
  ]

  return (
    <section id="services" className="py-8 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-navy">Nos Services Sur-Mesure</h2>
          <p className="text-base md:text-xl text-navy/70 max-w-2xl">
            Des solutions complètes et ultra-performantes pour optimiser votre point de vente dès aujourd'hui
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-1 md:pb-2">
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-sm md:text-xl leading-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs md:text-base text-navy/70">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
