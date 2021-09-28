import { createContext, ReactNode, useContext, useState } from "react";
import { Prioridade } from "../Enums/Prioridade";
import { AfazerModel } from "../models/Afazer/AfazerModel";

interface LoadingContextData {
  afazerId: number;
  afazerNome: string;
  afazerPrioridade: Prioridade;
  afazerList: AfazerModel[];

  setAfazerId: React.Dispatch<React.SetStateAction<number>>;
  setAfazerNome: React.Dispatch<React.SetStateAction<string>>;
  setAfazerPrioridade: React.Dispatch<React.SetStateAction<Prioridade>>;
  setAfazerList: React.Dispatch<React.SetStateAction<AfazerModel[]>>;
}

interface AfazerProviderProps {
  children: ReactNode;
}

const AfazerContext = createContext({} as LoadingContextData);

export function AfazerProvider({ children }: AfazerProviderProps) {
  const [afazerNome, setAfazerNome] = useState('');
  const [afazerPrioridade, setAfazerPrioridade] = useState<number>(0);
  const [afazerId, setAfazerId] = useState<number>(1);
  const [afazerList, setAfazerList] = useState<AfazerModel[]>([]);

  return (
    <AfazerContext.Provider
      value={{
        afazerId, setAfazerId, afazerNome, setAfazerNome, afazerPrioridade, setAfazerPrioridade, afazerList, setAfazerList
      }}>
      {children}
    </AfazerContext.Provider>
  );
}

export function useAfazerContext() {
  return useContext(AfazerContext);
}