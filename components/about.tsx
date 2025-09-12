"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Target, Award, Users, Zap } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 9

  // Images pour le slideshow (utilisation des vraies images de My PDV)
  const missionImages = [
    "/images/mission_1.jpg",
    "/images/mission_2.jpg",
    "/images/mission_3.jpg",
    "/images/mission_4.jpg",
    "/images/mission_5.jpg",
    "/images/mission_6.jpg",
    "/images/mission_7.jpg",
    "/images/mission_8.jpg",
    "/images/mission_9.jpg",
  ]

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Rotation automatique des diapositives
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const values = [
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Excellence",
      description:
        "Nous visons l'excellence dans chaque installation et service que nous fournissons pour votre performance client.",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Innovation",
      description:
        "Nous restons à la pointe des technologies pour offrir les solutions les plus innovantes et ultra-performantes.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Partenariat",
      description:
        "Nous construisons des relations durables avec nos clients, basées sur la confiance et l'accompagnement expert.",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Fiabilité",
      description: "Nos clients peuvent compter sur nous pour des installations rapides, durables et un ROI immédiat.",
    },
  ]

  return (
    <section id="about" className="py-8 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-navy">Notre Mission Sur-Mesure</h2>
            <div className="space-y-3 text-navy/70">
              <p>
                Chez MyPDV, nous nous engageons à fournir des solutions d'étiquetage électronique et d'aménagement de
                magasin sur-mesure qui transforment l'expérience d'achat et optimisent les opérations commerciales pour
                un ROI immédiat.
              </p>
              <p>
                Notre objectif est de vous aider à créer des espaces de vente davantage connectés, ultra-performants et
                rentables dès aujourd'hui. Pour nous, chaque point de vente est unique, qu'il s'agisse d'un magasin de
                proximité ou d'une enseigne mythique comme La grande épicerie de Paris.
              </p>
              <p>
                Nous croyons fermement que la technologie doit être au service de l'humain, c'est pourquoi nous
                accordons une importance particulière à la formation sur-mesure de vos équipes et à l'accompagnement
                expert dans la prise en main de nos solutions ultra-performantes.
              </p>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            {/* Slideshow */}
            <div className="relative w-full h-full">
              {missionImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Notre mission ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Contrôles du slideshow */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6 text-navy" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6 text-navy" />
              </button>

              {/* Indicateurs de diapositive */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-navy" : "bg-white/50"}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-sky-600 rounded-t-3xl">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-3 md:space-x-4">
                <div className="w-12 h-12 rounded-full bg-sky-700 flex items-center justify-center flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
