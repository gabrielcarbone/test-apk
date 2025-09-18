import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface QuestionsContextType {
  openQuestionId: number | null;
  setOpenQuestionId: (id: number | null) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestionsContext must be used within a QuestionsProvider');
  }
  return context;
};

interface QuestionsProviderProps {
  children: ReactNode;
}

export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({ children }) => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  return (
    <QuestionsContext.Provider value={{ openQuestionId, setOpenQuestionId }}>
      {children}
    </QuestionsContext.Provider>
  );
};