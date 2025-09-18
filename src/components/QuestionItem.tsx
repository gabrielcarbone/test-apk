import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useQuestionsContext } from '../context/QuestionsContext';

interface QuestionItemProps {
  questionId: number;
  question: string;
  answer: string;
  className?: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ 
  questionId,
  question, 
  answer, 
  className = '' 
}) => {
  const { openQuestionId, setOpenQuestionId } = useQuestionsContext();
  const isOpen = openQuestionId === questionId;

  const handleToggle = () => {
    setOpenQuestionId(isOpen ? null : questionId);
  };

  return (
    <div className={`question-item ${className}`}>
      <button 
        className="question-header"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className="question-text">{question}</span>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      
      <div className={`question-answer ${isOpen ? 'open' : 'closed'}`}>
        <div className="question-answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;