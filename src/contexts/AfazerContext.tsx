import { createContext, ReactNode, useContext, useState } from "react";
import { Prioridade } from "../Enums/Prioridade";

interface LoadingContextData {
  afazerNome: string;
  prioridade: Prioridade;

  setAfazerNome: React.Dispatch<React.SetStateAction<string>>;
  setPrioridade: React.Dispatch<React.SetStateAction<Prioridade>>;
}

interface AfazerProviderProps {
  children: ReactNode;
}

const AfazerContext = createContext({} as LoadingContextData);

export function AfazerProvider({ children }: AfazerProviderProps) {
  const [afazerNome, setAfazerNome] = useState('');
  const [prioridade, setPrioridade] = useState<Prioridade>(Prioridade.MEDIA);

  return (
    <AfazerContext.Provider
      value={{
        afazerNome, setAfazerNome, prioridade, setPrioridade
      }}>
      {children}
    </AfazerContext.Provider>
  );
}

export function useAfazerContext() {
  return useContext(AfazerContext);
}