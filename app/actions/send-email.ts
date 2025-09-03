"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Schéma de validation pour le formulaire
const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  subject: z.string().min(1, { message: "Le sujet est requis" }),
  message: z.string().min(1, { message: "Le message est requis" }),
})

type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Valider les données du formulaire
    const validatedFields = formSchema.parse(formData)

    // Configurer le transporteur d'email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || "smtp.gmail.com",
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASSWORD || "",
      },
      // Ajouter des options pour améliorer la délivrabilité
      tls: {
        rejectUnauthorized: false, // Utile pour certains serveurs SMTP
      },
    })

    // Créer un modèle d'email HTML plus professionnel et optimisé contre le spam
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau contact My PDV</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #f0f0f0;
          }
          .header img {
            max-width: 200px;
            height: auto;
          }
          .content {
            padding: 20px 0;
          }
          .message-box {
            background-color: #f9f9f9;
            border-left: 4px solid #1a2b5f;
            padding: 15px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 30px;
            border-top: 1px solid #f0f0f0;
            padding-top: 20px;
          }
          h1 {
            color: #1a2b5f;
            font-size: 24px;
          }
          h2 {
            color: #0ea5e9;
            font-size: 18px;
            margin-top: 25px;
          }
          .info-label {
            font-weight: bold;
            color: #1a2b5f;
            display: inline-block;
            width: 80px;
          }
          .info-value {
            display: inline-block;
          }
          .button {
            display: inline-block;
            background-color: #0ea5e9;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau message de contact</h1>
          </div>
          
          <div class="content">
            <p>Un nouveau message a été envoyé depuis le formulaire de contact du site My PDV.</p>
            
            <h2>Informations sur l'expéditeur</h2>
            <p><span class="info-label">Nom:</span> <span class="info-value">${validatedFields.name}</span></p>
            <p><span class="info-label">Email:</span> <span class="info-value"><a href="mailto:${
              validatedFields.email
            }">${validatedFields.email}</a></span></p>
            <p><span class="info-label">Sujet:</span> <span class="info-value">${validatedFields.subject}</span></p>
            
            <h2>Message</h2>
            <div class="message-box">
              ${validatedFields.message.replace(/\n/g, "<br>")}
            </div>
            
            <a href="mailto:${
              validatedFields.email
            }?subject=Re: ${encodeURIComponent(validatedFields.subject)}" class="button">Répondre</a>
          </div>
          
          <div class="footer">
            <p>Ce message a été envoyé automatiquement depuis le site My PDV. Ne pas répondre à cet email.</p>
            <p>&copy; ${new Date().getFullYear()} My PDV. Tous droits réservés.</p>
            <p>My PDV - 908 Broadway, San Francisco, CA 94133</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Préparer l'email avec des en-têtes améliorés pour éviter le spam
    const mailOptions = {
      from: {
        name: "Formulaire de Contact My PDV",
        address: process.env.EMAIL_FROM || "noreply@my-pdv.com",
      },
      to: "contact@my-pdv.com",
      replyTo: validatedFields.email,
      subject: `Contact My PDV: ${validatedFields.subject}`,
      text: `
        Nouveau message de contact
        
        Nom: ${validatedFields.name}
        Email: ${validatedFields.email}
        Sujet: ${validatedFields.subject}
        
        Message:
        ${validatedFields.message}
        
        Ce message a été envoyé depuis le formulaire de contact du site My PDV.
      `,
      html: emailHtml,
      // Ajouter des en-têtes pour améliorer la délivrabilité
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "List-Unsubscribe": "<mailto:unsubscribe@my-pdv.com>",
        "X-Mailer": "My PDV Website Mailer",
        "X-Report-Abuse": "Please report abuse to abuse@my-pdv.com",
        "Feedback-ID": "web-form-123:my-pdv",
        "X-Spam-Status": "No",
      },
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Votre message a été envoyé avec succès!" }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Veuillez vérifier les informations saisies.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
    }
  }
}
