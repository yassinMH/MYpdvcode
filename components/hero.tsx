"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play } from "lucide-react"

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Afficher l'image "VU À LA TV" pendant 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      // Démarrer la vidéo après l'écran de chargement
      setTimeout(() => {
        if (videoRef.current && videoLoaded) {
          videoRef.current.play()
          setIsPlaying(true)
        }
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [videoLoaded])

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

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-navy">
              My PDV, votre expert en étiquetage électronique
            </h1>
            <p className="text-xl md:text-2xl text-navy/80">
              15 ans d'expertise • 1200+ magasins équipés • Solutions sur-mesure
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

          {/* Zone vidéo avec écran de chargement */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-navy/5 aspect-video">
              {/* Écran de chargement "VU À LA TV" */}
              {showSplash && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white transition-opacity duration-500">
                  <div className="text-center">
                    <Image
                      src="/images/vulatele.jpeg"
                      alt="Vu à la TV"
                      width={300}
                      height={300}
                      className="mx-auto mb-4 animate-pulse"
                    />
                    <p className="text-navy font-semibold text-lg">My PDV - Vu à la télévision</p>
                    <div className="flex justify-center mt-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vidéo promotionnelle */}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  showSplash ? "opacity-0" : "opacity-100"
                }`}
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoad}
                onError={(e) => {
                  console.error("Erreur de chargement vidéo:", e)
                }}
              >
                <source src="/videos/promotion-video.mp4" type="video/mp4" />
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Promotion%20video-YxWBP9uHpndA0sva33mmiJDmeY1d9I.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {/* Contrôles vidéo (visibles seulement après le splash) */}
              {!showSplash && (
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
              )}

              {/* Overlay informatif */}
              {!showSplash && isMuted && (
                <div className="absolute top-4 left-4 bg-navy/80 text-white px-3 py-1 rounded-full text-sm">
                  Cliquez sur 🔊 pour activer le son
                </div>
              )}
            </div>

            {/* Texte sous la vidéo */}
            <p className="text-center text-navy/60 mt-4 text-sm">
              {showSplash
                ? "Chargement de la vidéo promotionnelle..."
                : "Découvrez My PDV en action - 15 ans d'expertise en étiquetage électronique"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
