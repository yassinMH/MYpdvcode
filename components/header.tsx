"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-shadow ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="My PDV Logo" width={150} height={50} />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-navy hover:text-sky-500 transition-colors font-medium">
            Accueil
          </Link>
          <Link href="/#services" className="text-navy hover:text-sky-500 transition-colors font-medium">
            Services
          </Link>
          <Link href="/#experience" className="text-navy hover:text-sky-500 transition-colors font-medium">
            Expérience
          </Link>
          <Link href="/#about" className="text-navy hover:text-sky-500 transition-colors font-medium">
            À propos
          </Link>
          <Link href="/contact" className="text-navy hover:text-sky-500 transition-colors font-medium">
            Contactez-nous
          </Link>
        </nav>
        <div className="hidden md:block">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-white">
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="text-navy hover:text-sky-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/#services"
              className="text-navy hover:text-sky-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#experience"
              className="text-navy hover:text-sky-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Expérience
            </Link>
            <Link
              href="/#about"
              className="text-navy hover:text-sky-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-navy hover:text-sky-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactez-nous
            </Link>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white w-full">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contactez-nous
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
