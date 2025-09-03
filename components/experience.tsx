"use client"

import { Tag, Battery, Wifi } from "lucide-react"

export function Experience() {
  const experienceItems = [
    {
      icon: <Tag className="h-12 w-12 text-navy" />,
      title: "Étiquettes Électroniques",
      description:
        "Nous réalisons un audit complet de votre parc EEG, vous conseillons pour le choix optimal de vos étiquettes électroniques et nous occupons de leur installation complète sur-mesure.",
    },
    {
      icon: <Battery className="h-12 w-12 text-navy" />,
      title: "Remplacement de Piles",
      description:
        "MyPDV vous accompagne dans le remplacement des piles de vos étiquettes électroniques avec des solutions optimisées pour prolonger leur durée de vie et maximiser votre ROI.",
    },
    {
      icon: <Wifi className="h-12 w-12 text-navy" />,
      title: "Installation Réseaux",
      description:
        "MyPDV réalise l'installation complète de votre infrastructure réseau avec câblage RJ45 ultra-performant, optimisation de la connectivité et maintenance préventive pour garantir une performance réseau maximale et durable.",
    },
  ]

  return (
    <section id="experience" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-navy">
            Nous sommes prêts à partager notre maîtrise technique
          </h2>
          <p className="text-xl text-navy/70 max-w-3xl">
            Tout ce qu'il faut pour créer et piloter des points de vente modernes, connectés et rentables dès
            aujourd'hui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {experienceItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center space-y-4">
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
              <p className="text-navy/70">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-orange-500 rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                L'accompagnement expert au service des directeurs de magasin
              </h3>
              <p className="text-white/90 mb-6">
                MyPDV est le fidèle compagnon du directeur de magasin, proposant des solutions complètes pour
                l'installation des étiquettes électroniques et le câblage réseau ultra-performant.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold mr-3 mt-0.5">
                    ✓
                  </div>
                  <p className="text-white/90">
                    Avec plus de 13 millions d'étiquettes électroniques installées dans 1200 magasins, MyPDV garantit un
                    savoir-faire de qualité et un ROI immédiat.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold mr-3 mt-0.5">
                    ✓
                  </div>
                  <p className="text-white/90">
                    MyPDV réalise des audits complets et conseille sur le choix des produits en fonction des besoins
                    spécifiques de chaque magasin pour une performance client optimale.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold mr-3 mt-0.5">
                    ✓
                  </div>
                  <p className="text-white/90">
                    Fort de 20 ans d'expérience en GMS, MyPDV s'impose comme votre partenaire de confiance pour les
                    directeurs de magasin.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-white mb-2">1200+</div>
                  <div className="text-white/90">Magasins installés</div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-white mb-2">13M+</div>
                  <div className="text-white/90">Étiquettes installées</div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <div className="text-white/90">Ans d'expérience</div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-white mb-2">30K+</div>
                  <div className="text-white/90">Professionnels formés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
