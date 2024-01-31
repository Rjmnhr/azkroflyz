import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AppContextProps {
  storedDataString: string;
  setStoredDataString: Dispatch<SetStateAction<string>>;
  selectedCompanySizeMatch: number;
  setSelectedCompanySizeMatch: Dispatch<SetStateAction<number>>;
  selectedCompanySectorMatch: number;
  setSelectedCompanySectorMatch: Dispatch<SetStateAction<number>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  UGDegreeMatch: number;
  setUGDegreeMatch: Dispatch<SetStateAction<number>>;
  UGTierMatch: number;
  setUGTierMatch: Dispatch<SetStateAction<number>>;
  ugDegreeAndUGTierMatch: number;
  setUgDegreeAndUGTierMatch: Dispatch<SetStateAction<number>>;
  ugDegreeAndDesiredMatch: number;
  setUgDegreeAndDesiredMatch: Dispatch<SetStateAction<number>>;
}

const MyContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [storedDataString, setStoredDataString] = useState("");
  const [selectedCompanySizeMatch, setSelectedCompanySizeMatch] =
    useState<number>(0);
  const [selectedCompanySectorMatch, setSelectedCompanySectorMatch] =
    useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [UGDegreeMatch, setUGDegreeMatch] = useState<number>(0);
  const [UGTierMatch, setUGTierMatch] = useState<number>(0);
  const [ugDegreeAndUGTierMatch, setUgDegreeAndUGTierMatch] =
    useState<number>(0);
  const [ugDegreeAndDesiredMatch, setUgDegreeAndDesiredMatch] =
    useState<number>(0);

  const value: AppContextProps = {
    storedDataString,
    setStoredDataString,
    selectedCompanySizeMatch,
    setSelectedCompanySizeMatch,
    selectedCompanySectorMatch,
    setSelectedCompanySectorMatch,
    totalCount,
    setTotalCount,
    UGDegreeMatch,
    setUGDegreeMatch,
    UGTierMatch,
    setUGTierMatch,
    ugDegreeAndUGTierMatch,
    setUgDegreeAndUGTierMatch,
    ugDegreeAndDesiredMatch,
    setUgDegreeAndDesiredMatch,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = (): AppContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an AppContextProvider"
    );
  }
  return context;
};
