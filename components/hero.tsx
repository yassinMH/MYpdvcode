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

  // Afficher l'image "VU À LA TV" pendant 3 secondes puis démarrer la vidéo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      // Démarrer la vidéo immédiatement après que l'image disparaisse
      setTimeout(() => {
        startVideo()
      }, 100) // Délai très court pour la transition
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Fonction pour démarrer la vidéo de manière fiable
  const startVideo = async () => {
    if (videoRef.current) {
      try {
        // S'assurer que la vidéo est prête
        if (videoRef.current.readyState >= 2) {
          await videoRef.current.play()
          setIsPlaying(true)
        } else {
          // Si la vidéo n'est pas encore prête, attendre qu'elle le soit
          videoRef.current.addEventListener(
            "canplay",
            async () => {
              try {
                await videoRef.current?.play()
                setIsPlaying(true)
              } catch (error) {
                console.log("Autoplay bloqué par le navigateur:", error)
              }
            },
            { once: true },
          )
        }
      } catch (error) {
        console.log("Autoplay bloqué par le navigateur:", error)
        // La vidéo ne peut pas démarrer automatiquement, mais elle sera prête au clic
      }
    }
  }

  // Démarrer la vidéo dès que possible si l'image a déjà disparu
  useEffect(() => {
    if (!showSplash && videoLoaded && !isPlaying) {
      startVideo()
    }
  }, [showSplash, videoLoaded, isPlaying])

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
    // Si l'image a déjà disparu, démarrer la vidéo immédiatement
    if (!showSplash) {
      startVideo()
    }
  }

  const handleVideoPlay = () => {
    setIsPlaying(true)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
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
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white transition-opacity duration-500 p-4">
                  <div className="text-center max-w-full">
                    <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto">
                      <Image
                        src="/images/vulatele.jpeg"
                        alt="Vu à la TV"
                        width={300}
                        height={300}
                        className="w-full h-auto animate-pulse"
                        priority
                      />
                    </div>
                    <div className="flex justify-center mt-2 sm:mt-4">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-orange-500"></div>
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
                preload="auto"
                onLoadedData={handleVideoLoad}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
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
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-1 sm:gap-2">
                  <button
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors shadow-lg"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-navy rounded-sm"></div>
                    ) : (
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 text-navy" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors shadow-lg"
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3 sm:h-4 sm:w-4 text-navy" />
                    ) : (
                      <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-navy" />
                    )}
                  </button>
                </div>
              )}

              {/* Overlay informatif */}
              {!showSplash && isMuted && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-navy/80 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                  Cliquez sur 🔊 pour activer le son
                </div>
              )}
            </div>

            {/* Texte sous la vidéo */}
            <p className="text-center text-navy/60 mt-4 text-xs sm:text-sm">
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
