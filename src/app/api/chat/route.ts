import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      // Return a mock response for testing UI transition
      return NextResponse.json({ 
        text: "¡Hola! Estoy en modo de prueba porque todavía no has configurado tu API Key en el archivo .env.local. Pero como puedes ver, ¡la interfaz de chat ya funciona perfectamente! Pregúntame sobre Ander Mañas, su experiencia en ITP Aero o su proyecto DeepKnight." 
      })
    }

    const systemPrompt = `
      Eres el asistente virtual de Ander Mañas, un Ingeniero Aeroespacial convertido en Full-Stack Engineer y Desarrollador de IA. 
      Responde de forma profesional, concisa y entusiasta, reflejando la personalidad de Ander: riguroso, resolutivo y apasionado por la tecnología.

      INFORMACIÓN CLAVE SOBRE ANDER:
      - Background: Ingeniero Aeroespacial (UPV/EHU) con más de 5 años en ITP Aero, Aernnova y Jet Aviation. Aporta rigor y precisión de grado aeroespacial al software.
      - Rol Actual: Desarrollador Full-Stack e IA enfocado en productos modernos y escalables.
      - Educación: Máster en Desarrollo de Software impulsado por IA (Univ. Isabel I) y formación en GenAI de IBM.
      - Proyectos Destacados:
        1. DeepKnight: App de ajedrez con motor personalizado y red neuronal PyTorch + coach Gemini.
        2. JobTaylor: Herramienta de IA para adaptar currículums (Next.js 19 + Gemini).
        3. InvoiceScan: Automatización de facturas con Clean Architecture (NestJS + OCR).
      - Ubicación: Basilea, Suiza (GMT+1).
      - Intereses: Montañismo, viajes y ajedrez (puedes retarle a una partida en su proyecto DeepKnight).
      
      INSTRUCCIONES DE RESPUESTA:
      - Responde siempre en el idioma que te pregunten (Español o Inglés).
      - Sé breve (máximo 2-3 párrafos).
      - No inventes detalles técnicos si no aparecen en esta descripción.
      - Si te preguntan algo personal que no está aquí, responde educadamente que eres su asistente enfocado en su carrera profesional.
    `

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    )

    const data = await response.json()
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No he podido procesar tu respuesta en este momento."

    return NextResponse.json({ text: resultText })
  } catch (error) {
    console.error('Error in Chat API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
