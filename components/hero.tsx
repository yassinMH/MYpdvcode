"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play } from "lucide-react"

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-navy">
              Vos étiquettes, notre savoir-faire
            </h1>
            <p className="text-xl md:text-2xl text-navy/80">
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

          {/* Vidéo promotionnelle */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-navy/5">
              <video
                ref={videoRef}
                className="w-full h-auto"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/mission_1.jpg" // Image de fallback
              >
                <source src="/images/Promotion-video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {/* Contrôles vidéo */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={togglePlay}
                  className="bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <div className="w-4 h-4 bg-navy rounded-sm"></div>
                  ) : (
                    <Play className="h-4 w-4 text-navy" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                  aria-label={isMuted ? "Activer le son" : "Couper le son"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-navy" /> : <Volume2 className="h-4 w-4 text-navy" />}
                </button>
              </div>

              {/* Overlay informatif */}
              {isMuted && (
                <div className="absolute top-4 left-4 bg-navy/80 text-white px-3 py-1 rounded-full text-sm">
                  Cliquez sur 🔊 pour activer le son
                </div>
              )}
            </div>

            {/* Texte sous la vidéo */}
            <p className="text-center text-navy/60 mt-4 text-sm">
              Découvrez My PDV en action - 15 ans d'expertise en étiquetage électronique
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
