import { createContext, useContext, useState, type ReactNode } from 'react';

interface AppState {
  selectedInterests: number[];
  answers: Record<number, number>;
  setSelectedInterests: (interests: number[]) => void;
  setAnswers: (answers: Record<number, number>) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const resetAll = () => {
    setSelectedInterests([]);
    setAnswers({});
  };

  return (
    <AppContext.Provider
      value={{ selectedInterests, answers, setSelectedInterests, setAnswers, resetAll }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
