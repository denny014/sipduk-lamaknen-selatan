
import { GoogleGenAI } from "@google/genai";
import { Resident } from "./types";

export class GeminiService {
  /**
   * Analyzes population data using Gemini AI.
   * Following the SDK guidelines, we initialize GoogleGenAI inside the method
   * and use the correct model for text-based analysis.
   */
  async analyzePopulation(data: Resident[]): Promise<string> {
    const summary = data.map(r => ({
      desa: r.village,
      gender: r.gender,
      pekerjaan: r.occupation,
      pendidikan: r.education,
      umur: this.calculateAge(r.birthDate)
    }));

    const prompt = `Analisis data kependudukan berikut untuk Kecamatan Lamaknen Selatan:
    ${JSON.stringify(summary)}
    
    Berikan laporan ringkas (maks 3 paragraf) dalam Bahasa Indonesia tentang:
    1. Tren demografi utama.
    2. Potensi ekonomi berdasarkan pekerjaan mayoritas.
    3. Rekomendasi program pembangunan desa.`;

    try {
      // Initialize inside the method to ensure we use the latest API key from the environment
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using 'gemini-3-pro-preview' for complex data analysis tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });
      // response.text is a property, not a method
      return response.text || "Gagal mendapatkan analisis.";
    } catch (error) {
      console.error("AI Analysis Error:", error);
      return "Terjadi kesalahan saat menghubungi asisten AI.";
    }
  }

  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}

export const geminiService = new GeminiService();
