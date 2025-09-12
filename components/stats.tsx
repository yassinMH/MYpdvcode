"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

export function Stats() {
  const stats = [
    {
      value: 1200,
      label: "magasins installés",
      description:
        "MyPDV a déployé des solutions d'étiquetage électronique dans plus de 1200 magasins. Nous offrons des installations sur-mesure et un suivi personnalisé à chaque étape, garantissant des solutions rapides, fiables et adaptées aux besoins spécifiques de chaque client pour un ROI immédiat.",
    },
    {
      value: 13,
      suffix: "M",
      label: "d'étiquettes installées",
      description:
        "Avec plus de 13 millions d'étiquettes électroniques installées, chaque installation est réalisée avec soin pour assurer une gestion optimale des prix et des informations, tout en réduisant les erreurs humaines et en maximisant la performance client.",
    },
    {
      value: 15,
      label: "ans d'expérience",
      description:
        "Fort de 15 ans d'expérience, MyPDV offre un savoir-faire reconnu dans l'installation d'étiquettes électroniques. Cette longue expérience nous permet de proposer des solutions adaptées, fiables et innovantes, en phase avec les évolutions du marché.",
    },
    {
      value: 30000,
      display: "30K",
      label: "professionnels de GMS formés",
      description:
        "Nous accompagnons vos chefs de rayon et ELS à l'utilisation optimale de l'outil. À quoi bon disposer d'un outil ultra-performant sans une formation adéquate pour l'exploiter pleinement ? C'est pourquoi nous prenons le temps d'accompagner les professionnels dans son utilisation sur-mesure.",
    },
    {
      value: 1068,
      label: "km de câbles installés",
      description:
        "Notre réseau de câblage garantit une connectivité ultra-performante pour vos étiquettes électroniques. Chaque installation est réalisée avec précision, sans perturber l'activité de votre magasin. Notre maîtrise technique assure une infrastructure fiable et durable.",
    },
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-8 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-navy">Notre Savoir-Faire en Chiffres</h2>
          <p className="text-base md:text-xl text-navy/70 max-w-2xl">
            Des résultats concrets qui témoignent de notre accompagnement expert et de votre ROI
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} animate={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, animate }: { stat: any; animate: boolean }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (animate) {
      const duration = 2000 // ms
      const steps = 50
      const stepValue = stat.value / steps
      let current = 0

      countRef.current = setInterval(() => {
        current += stepValue
        if (current >= stat.value) {
          setCount(stat.value)
          if (countRef.current) clearInterval(countRef.current)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
    } else {
      setCount(0)
    }

    return () => {
      if (countRef.current) {
        clearInterval(countRef.current)
      }
    }
  }, [animate, stat.value])

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3 md:p-6">
        <div className="flex flex-col items-center text-center space-y-1 md:space-y-2">
          <div className="text-2xl md:text-4xl font-bold text-orange-500">
            {stat.display || count}
            {stat.suffix && <span>{stat.suffix}</span>}
          </div>
          <div className="text-sm md:text-xl font-medium text-navy">{stat.label}</div>
          <p className="text-navy/70 mt-1 md:mt-2 text-xs md:text-base">{stat.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
