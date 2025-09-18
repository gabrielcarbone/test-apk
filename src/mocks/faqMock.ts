import type { FAQCategory, FAQResponse } from '../types/faqTypes';
import { withMockDelay } from './mockUtils';

const mockFAQData: FAQCategory[] = [
  {
    id: 1,
    category: "Siniestros y asistencia",
    questions: [
      {
        id: 1,
        question: "¿Cómo reporto un siniestro?",
        answer: "Puedes reportar un siniestro llamando al 0800-888-9908 las 24 horas o a través de nuestra app MisSeguros. Es importante reportar el siniestro lo antes posible para agilizar el proceso."
      },
      {
        id: 2,
        question: "¿Qué documentos necesito para un reclamo?",
        answer: "Necesitas tu DNI, póliza de seguro, denuncia policial (si corresponde), certificados médicos (en caso de lesiones) y cualquier documentación relacionada al incidente como fotos o testigos."
      },
      {
        id: 3,
        question: "¿Cuánto tiempo tarda el proceso de reclamo?",
        answer: "El tiempo de procesamiento varía según la complejidad del caso. Generalmente, los casos simples se resuelven en 15-30 días hábiles, mientras que casos más complejos pueden tomar hasta 60 días."
      }
    ]
  },
  {
    id: 2,
    category: "Contratación de seguros",
    questions: [
      {
        id: 4,
        question: "¿Cómo puedo contratar un seguro?",
        answer: "Puedes contratar online a través de nuestra web, por teléfono llamando al 0800-888-9908, visitando una de nuestras sucursales, o a través de uno de nuestros agentes autorizados."
      },
      {
        id: 5,
        question: "¿Qué información necesito para contratar?",
        answer: "Necesitas tu DNI, CUIL/CUIT, información del bien a asegurar (patente del vehículo, dirección de la propiedad, etc.) y datos de contacto actualizados."
      },
      {
        id: 6,
        question: "¿Desde cuándo tengo cobertura?",
        answer: "La cobertura comienza desde el momento que se acepta la propuesta y se efectúa el primer pago, siempre que no existan cláusulas de carencia específicas en tu póliza."
      }
    ]
  },
  {
    id: 3,
    category: "Información sobre coberturas",
    questions: [
      {
        id: 7,
        question: "¿Qué cubre mi seguro de auto?",
        answer: "Las coberturas varían según el plan contratado. Generalmente incluyen daños a terceros, robo e incendio total, cristales, y servicios de asistencia al viajero. Consulta tu póliza para detalles específicos."
      },
      {
        id: 8,
        question: "¿El seguro cubre daños por granizo?",
        answer: "Sí, los daños por granizo están cubiertos en la mayoría de nuestros planes de seguro automotor. Verifica en tu póliza las condiciones específicas y franquicias aplicables."
      }
    ]
  },
  {
    id: 4,
    category: "App MisSeguros",
    questions: [
      {
        id: 9,
        question: "¿Cómo descargo la app?",
        answer: "Puedes descargar MisSeguros desde Google Play Store o Apple App Store. Busca 'MisSeguros Nación Seguros' y descarga la app oficial."
      },
      {
        id: 10,
        question: "¿Qué puedo hacer en la app?",
        answer: "En la app puedes consultar tus pólizas, reportar siniestros, pagar cuotas, solicitar asistencia, ver tu carnet digital, y gestionar tus datos personales."
      }
    ]
  },
  {
    id: 5,
    category: "Gestiones",
    questions: [
      {
        id: 11,
        question: "¿Cómo cambio mis datos personales?",
        answer: "Puedes cambiar tus datos a través de la app MisSeguros, llamando al 0800-888-9908, o visitando una sucursal con tu DNI actualizado."
      },
      {
        id: 12,
        question: "¿Puedo agregar un conductor adicional?",
        answer: "Sí, puedes agregar conductores adicionales. Esto puede implicar un ajuste en la prima. Contacta a tu agente o llama al 0800-888-9908 para más información."
      }
    ]
  },
  {
    id: 6,
    category: "Pagos",
    questions: [
      {
        id: 13,
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos débito automático, transferencia bancaria, pago en sucursales bancarias, Rapipago, Pago Fácil, y pago online con tarjeta de crédito o débito."
      },
      {
        id: 14,
        question: "¿Qué pasa si me atraso en el pago?",
        answer: "Si te atrasas en el pago, tu póliza puede quedar suspendida después del período de gracia. Te recomendamos ponerte al día lo antes posible para mantener tu cobertura activa."
      },
      {
        id: 15,
        question: "¿Puedo cambiar la fecha de vencimiento?",
        answer: "Sí, en algunos casos es posible cambiar la fecha de vencimiento de tu póliza. Contacta a tu agente o llama al 0800-888-9908 para evaluar tu situación particular."
      }
    ]
  }
];

export const getMockFAQs = (): Promise<FAQResponse> => {
  return withMockDelay(() => ({
    success: true,
    data: mockFAQData,
    message: "FAQs obtenidas exitosamente"
  }));
};