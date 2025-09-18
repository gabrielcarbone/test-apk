import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TextCustom from "../components/TextCustom";
import AccordionItem from "../components/AccordionItem";
import QuestionItem from "../components/QuestionItem";
import { getStoredFaqs } from "../services/faqService";
import { QuestionsProvider } from "../context/QuestionsContext";
import type { FAQCategory } from "../types/faqTypes";
import "./PreguntasFrecuentes.css";

const PreguntasFrecuentes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqData, setFaqData] = useState<FAQCategory[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = () => {
      try {
        const storedFaqs = getStoredFaqs();
        if (storedFaqs) {
          setFaqData(storedFaqs);
        } else {
          console.warn("No hay FAQs almacenadas en el almacenamiento local");
          setFaqData([]);
        }
      } catch (error) {
        console.error("Error cargando FAQs desde el almacenamiento local:", error);
        setFaqData([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filtrar datos localmente solo si hay término de búsqueda
  const displayData = faqData ? (searchTerm.trim()
    ? faqData
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqData) : [];

  return (
    <QuestionsProvider>
      <div className="screen">
        <div className="search-input">
          <Search size={20} />
          <TextCustom
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Cargando preguntas frecuentes...</p>
          </div>
        ) : (
          <>
            <div className="faq-accordion-container">
              {displayData.length === 0 ? (
                <div className="no-results">
                  <p>No se encontraron preguntas frecuentes para tu búsqueda.</p>
                </div>
              ) : (
                displayData.map((category) => (
                  <AccordionItem
                    key={category.id}
                    title={category.category}
                    className="faq-category-accordion"
                  >
                    <div className="questions-container">
                      {category.questions.map((question) => (
                        <QuestionItem
                          key={question.id}
                          questionId={question.id}
                          question={question.question}
                          answer={question.answer}
                          className="faq-question"
                        />
                      ))}
                    </div>
                  </AccordionItem>
                ))
              )}
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <h4>Débito automático</h4>
                <p>
                  Configurá el débito automático para no olvidarte de pagar tu
                  seguro
                </p>
              </div>
              <div className="contact-method">
                <h4>Online</h4>
                <p>Gestioná tu seguro desde nuestra web o app MisSeguros</p>
              </div>
              <div className="contact-method">
                <h4>0800-888-9908</h4>
                <p>Atención telefónica las 24 horas, los 365 días del año</p>
              </div>
            </div>
          </>
        )}
      </div>
    </QuestionsProvider>
  );
};

export default PreguntasFrecuentes;
