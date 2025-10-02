"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Mail, Loader2,Phone , Clock, CheckCircle, Users, Zap } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [charCount, setCharCount] = useState({
    name: 0,
    email: 0,
    subject: 0,
    message: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setCharCount((prev) => ({ ...prev, [name]: value.length }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Utiliser la Server Action pour envoyer l'email
      const result = await sendEmail(formData)

      if (result.success) {
        toast({
          title: "Message envoyé",
          description: result.message,
        })
        // Réinitialiser le formulaire
        setFormData({ name: "", email: "", subject: "", message: "" })
        setCharCount({ name: 0, email: 0, subject: 0, message: 0 })
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error)
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Contactez notre équipe d'experts</h1>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto">
            Nous sommes à votre disposition pour répondre à vos questions et vous accompagner dans vos projets
            d'optimisation de point de vente.
          </p>
        </div>

        {/* Section d'informations de contact enrichie */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-sky-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-navy mb-2">Email</h3>
            <a
              href="mailto:contact@my-pdv.com"
              className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
            >
              contact@my-pdv.com
            </a>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-navy mb-2">Téléphone</h3>
            <a
              href="tel:+33185096780"
              className="text-navy/70 hover:text-green-600 transition-colors"
            >
              +33 1 85 09 67 80
            </a>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-navy mb-2">Disponibilité</h3>
            <p className="text-navy/70">Lundi - Vendredi</p>
            <p className="text-navy/70">9h00 - 19h00</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-navy mb-2">Réponse</h3>
            <p className="text-navy/70">Sous 24h</p>
            <p className="text-navy/70">en moyenne</p>
          </div>



        {/* Section des avantages */}
        <div className="bg-gradient-to-r from-sky-50 to-orange-50 p-8 rounded-lg mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">Pourquoi nous choisir ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Réactivité</h3>
                <p className="text-navy/70 text-sm">
                  Réponse rapide à vos demandes et intervention dans les meilleurs délais.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Expertise</h3>
                <p className="text-navy/70 text-sm">
                  15 ans d'expérience et plus de 1200 magasins équipés avec succès.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Accompagnement</h3>
                <p className="text-navy/70 text-sm">
                  Suivi personnalisé de votre projet de A à Z avec formation incluse.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-navy mb-4">Formulaire de contact</h2>
              <p className="text-navy/70">
                Partagez-nous vos besoins et nous vous proposerons une solution adaptée à votre entreprise.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nom *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={128}
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">{charCount.name} sur 128 caractères maximum</div>
                </div>
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={128}
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">{charCount.email} sur 128 caractères maximum</div>
                </div>
                <div>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Objet *"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={128}
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">{charCount.subject} sur 128 caractères maximum</div>
                </div>
                <div>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    maxLength={1024}
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">{charCount.message} sur 1024 caractères maximum</div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-auto bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
