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


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)

      setTimeout(() => {
        startVideo()
      }, 100) // Délai très court pour la transition
    }, 1500) // Réduit de 3000ms à 1500ms

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
    <section className="py-6 md:py-20 lg:py-28 bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Contenu textuel */}
          <div className="flex flex-col space-y-3 md:space-y-8 lg:order-1">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-navy leading-tight">
              My PDV, votre expert en étiquetage électronique
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl text-navy/80">
              15 ans d'expertise • 1200+ magasins équipés • Solutions sur-mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                asChild
                size="default"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base"
              >
                <Link href="/contact">Contactez-nous dès aujourd'hui</Link>
              </Button>
              <Button
                asChild
                size="default"
                variant="outline"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 bg-transparent text-sm md:text-base"
              >
                <Link href="/#services">Découvrez nos services sur-mesure</Link>
              </Button>
            </div>
          </div>

          {/* Zone vidéo avec écran de chargement - Centrée */}
          {/* Zone vidéo avec article au-dessus */}
                    <div className="relative lg:order-2 flex flex-col items-center gap-4">
            {/* Article BFM TV - AU-DESSUS de la vidéo */}
            <a
              href="https://www.bfmtv.com/economie/professionnels/retail-my-pdv-l-expert-francais-qui-garantit-la-fiabilite-derriere-chaque-etiquette-electronique_AB-202510020482.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border-2 border-orange-500 rounded-lg p-3 md:p-4 hover:shadow-lg transition-shadow group w-full max-w-[400px] lg:max-w-none"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src="https://tfh2ceao6hcwdtya.public.blob.vercel-storage.com/My-PDV-etiquette-electronique-2148126.webp"
                      alt="My PDV sur BFM Business"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">BFM Business</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-navy mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">
                    My PDV : l'expert français qui garantit la fiabilité derrière chaque étiquette électronique
                  </h3>
                  <p className="text-xs text-navy/60 mb-2 line-clamp-2">
                    Depuis plusieurs années, My-PDV a installé plus de 13 millions d'étiquettes dans 1 200 magasins.
                    Carrefour, Monoprix, Intermarché, Leclerc, Casino...
                  </p>
                  <span className="text-xs text-orange-500 font-medium inline-block group-hover:underline">
                    Lire la suite →
                  </span>
                </div>
              </div>
            </a>
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-navy/5 aspect-video max-h-[200px] md:max-h-[300px] lg:max-h-none w-full max-w-[400px] lg:max-w-none">
              {/* Écran de chargement "VU À LA TV" */}
              {showSplash && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white transition-opacity duration-500 p-2 md:p-4">
                  <div className="text-center max-w-full">
                    <div className="relative w-full max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px] mx-auto">
                      <Image
                        src="/images/vulatele.jpeg"
                        alt="Vu à la TV"
                        width={300}
                        height={300}
                        className="w-full h-auto animate-pulse"
                        priority
                      />
                    </div>
                    <p className="text-navy font-semibold text-xs sm:text-sm md:text-base lg:text-lg mt-1 md:mt-2">
                      My PDV - Vu à la télévision
                    </p>
                    <div className="flex justify-center mt-1 md:mt-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 border-b-2 border-orange-500"></div>
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
                  src="https://tfh2ceao6hcwdtya.public.blob.vercel-storage.com/Promotion-video.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {/* Contrôles vidéo (visibles seulement après le splash) */}
              {!showSplash && (
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 flex gap-1 sm:gap-2">
                  <button
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 md:p-2 transition-colors shadow-lg"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-navy rounded-sm"></div>
                    ) : (
                      <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-navy" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 md:p-2 transition-colors shadow-lg"
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-navy" />
                    ) : (
                      <Volume2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-navy" />
                    )}
                  </button>
                </div>
              )}

              {/* Overlay informatif - Plus petit sur mobile */}
              {!showSplash && isMuted && (
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-4 md:left-4 bg-navy/80 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full text-xs">
                  🔊
                </div>
              )}
            </div>

            {/* Texte sous la vidéo - Plus compact */}
            <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center text-navy/60 text-xs md:text-sm whitespace-nowrap">
              {showSplash ? "Chargement..." : "My PDV en action - 15 ans d'expertise"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
