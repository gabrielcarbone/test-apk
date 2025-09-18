import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { QuestionsProvider } from '../context/QuestionsContext';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  defaultOpen = false, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-item ${className}`}>
      <button 
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="accordion-content-inner">
          <QuestionsProvider>
            {children}
          </QuestionsProvider>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;