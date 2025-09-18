import faqService from "../../src/services/faqService";
import { FAQResponse } from "../../src/types/faqTypes";

describe("FAQ Service", () => {
  describe("getAllFAQs", () => {
    test("should return FAQ data with success status", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      expect(response).toHaveProperty("success");
      expect(response).toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("should return FAQ categories with correct structure", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      expect(response.data.length).toBeGreaterThan(0);

      // Verificar estructura de cada categoría
      response.data.forEach(category => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("category");
        expect(category).toHaveProperty("questions");
        expect(typeof category.id).toBe("number");
        expect(typeof category.category).toBe("string");
        expect(Array.isArray(category.questions)).toBe(true);
      });
    });

    test("should return questions with correct structure", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      const firstCategory = response.data[0];
      expect(firstCategory.questions.length).toBeGreaterThan(0);

      // Verificar estructura de cada pregunta
      firstCategory.questions.forEach(question => {
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("question");
        expect(question).toHaveProperty("answer");
        expect(typeof question.id).toBe("number");
        expect(typeof question.question).toBe("string");
        expect(typeof question.answer).toBe("string");
        expect(question.question.length).toBeGreaterThan(0);
        expect(question.answer.length).toBeGreaterThan(0);
      });
    });

    test("should return expected FAQ categories", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      const categoryNames = response.data.map(cat => cat.category);
      
      expect(categoryNames).toContain("Siniestros y asistencia");
      expect(categoryNames).toContain("Contratación de seguros");
      expect(categoryNames).toContain("Información sobre coberturas");
      expect(categoryNames).toContain("App MisSeguros");
      expect(categoryNames).toContain("Gestiones");
      expect(categoryNames).toContain("Pagos");
    });

    test("should return unique question IDs", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      const allQuestionIds: number[] = [];
      response.data.forEach(category => {
        category.questions.forEach(question => {
          allQuestionIds.push(question.id);
        });
      });

      const uniqueIds = [...new Set(allQuestionIds)];
      expect(uniqueIds.length).toBe(allQuestionIds.length);
    });

    test("should return unique category IDs", async () => {
      const response: FAQResponse = await faqService.getAllFAQs();

      const categoryIds = response.data.map(cat => cat.id);
      const uniqueIds = [...new Set(categoryIds)];
      expect(uniqueIds.length).toBe(categoryIds.length);
    });

    test("should handle mock delay properly", async () => {
      const startTime = Date.now();
      await faqService.getAllFAQs();
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Debe tomar al menos 500ms (considerando el mock delay)
      expect(duration).toBeGreaterThan(500);
    });

    test("should return consistent data on multiple calls", async () => {
      const response1 = await faqService.getAllFAQs();
      const response2 = await faqService.getAllFAQs();

      expect(response1.data.length).toBe(response2.data.length);
      expect(response1.success).toBe(response2.success);
      
      // Verificar que las categorías son las mismas
      response1.data.forEach((category, index) => {
        expect(category.id).toBe(response2.data[index].id);
        expect(category.category).toBe(response2.data[index].category);
        expect(category.questions.length).toBe(response2.data[index].questions.length);
      });
    });
  });
});