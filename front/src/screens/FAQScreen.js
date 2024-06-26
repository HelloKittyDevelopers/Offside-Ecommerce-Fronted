import React, { useState } from 'react';

const faqData = [
  {
    question: "¿Cómo puedo hacer un pedido?",
    answer: "Para hacer un pedido, simplemente añade los artículos a tu carrito y sigue las instrucciones de pago en nuestra página de checkout."
  },
  {
    question: "¿Cuáles son las opciones de envío?",
    answer: "Manejamos envíos nacionales e internacionales. Ofrecemos varias opciones de envío, incluyendo envío estándar y express. Puedes seleccionar tu opción preferida durante el proceso de checkout."
  },
  {
    question: "¿Puedo devolver un artículo?",
    answer: "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El artículo debe estar en su estado original y sin usar."
  },
  {
    question: "¿Puedo pagar con tarjeta?",
    answer: "Sí, recibimos tarjetas de crédito y tarjetas débito. Además, manejamos pagos contra entrega y en puntos físicos."
  }
  // Añadir más preguntas y respuestas aquí
];

function FAQScreen() {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const toggleAnswer = index => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Preguntas Frecuentes</h1>
      {faqData.map((item, index) => (
        <div key={index} className="mb-3">
          <h2
            className="h5 mb-2"
            onClick={() => toggleAnswer(index)}
            style={{ cursor: 'pointer' }}
          >
            {item.question}
          </h2>
          {visibleIndex === index && (
            <div className="alert alert-secondary">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQScreen;
