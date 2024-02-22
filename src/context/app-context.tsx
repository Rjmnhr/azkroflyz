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
  ugDegreeAndCompanyMatch: number;
  setUgDegreeAndCompanyMatch: Dispatch<SetStateAction<number>>;
  desiredTitle: string;
  setDesiredTitle: Dispatch<SetStateAction<string>>;
  desiredTitleMatch: number;
  setDesiredTitleMatch: Dispatch<SetStateAction<number>>;
  isInputsEntered: boolean;
  setIsInputsEntered: Dispatch<SetStateAction<boolean>>;
  selectedCompanySizePrevMatch: number;
  setSelectedCompanySizePrevMatch: Dispatch<SetStateAction<number>>;
  selectedCompanySectorPrevMatch: number;
  setSelectedCompanySectorPrevMatch: Dispatch<SetStateAction<number>>;
  UGDegreePrevMatch: number;
  setUGDegreePrevMatch: Dispatch<SetStateAction<number>>;
  UGTierPrevMatch: number;
  setUGTierPrevMatch: Dispatch<SetStateAction<number>>;
  ugDegreeAndUGTierPrevMatch: number;
  setUgDegreeAndUGTierPrevMatch: Dispatch<SetStateAction<number>>;
  ugDegreeAndDesiredPrevMatch: number;
  setUgDegreeAndDesiredPrevMatch: Dispatch<SetStateAction<number>>;
  selectedCompanies: string[];
  setSelectedCompanies: Dispatch<SetStateAction<string[]>>;
  byFactor: string;
  setByFactor: Dispatch<SetStateAction<string>>;
  displayFactor: string;
  setDisplayFactor: Dispatch<SetStateAction<string>>;
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
  const [ugDegreeAndCompanyMatch, setUgDegreeAndCompanyMatch] =
    useState<number>(0);
  const [desiredTitle, setDesiredTitle] = useState<string>("");
  const [desiredTitleMatch, setDesiredTitleMatch] = useState<number>(0);
  const [isInputsEntered, setIsInputsEntered] = useState<boolean>(false);
  const [selectedCompanySizePrevMatch, setSelectedCompanySizePrevMatch] =
    useState<number>(1);
  const [selectedCompanySectorPrevMatch, setSelectedCompanySectorPrevMatch] =
    useState<number>(0);

  const [UGDegreePrevMatch, setUGDegreePrevMatch] = useState<number>(0);
  const [UGTierPrevMatch, setUGTierPrevMatch] = useState<number>(0);
  const [ugDegreeAndDesiredPrevMatch, setUgDegreeAndDesiredPrevMatch] =
    useState<number>(0);
  const [ugDegreeAndUGTierPrevMatch, setUgDegreeAndUGTierPrevMatch] =
    useState<number>(0);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [byFactor, setByFactor] = useState<string>("title");
  const [displayFactor, setDisplayFactor] = useState<string>("");

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
    desiredTitle,
    setDesiredTitle,
    isInputsEntered,
    setIsInputsEntered,
    desiredTitleMatch,
    setDesiredTitleMatch,
    selectedCompanySizePrevMatch,
    setSelectedCompanySizePrevMatch,
    selectedCompanySectorPrevMatch,
    setSelectedCompanySectorPrevMatch,
    UGDegreePrevMatch,
    setUGDegreePrevMatch,
    UGTierPrevMatch,
    setUGTierPrevMatch,
    ugDegreeAndUGTierPrevMatch,
    setUgDegreeAndUGTierPrevMatch,
    ugDegreeAndDesiredPrevMatch,
    setUgDegreeAndDesiredPrevMatch,
    selectedCompanies,
    setSelectedCompanies,
    byFactor,
    setByFactor,
    displayFactor,
    setDisplayFactor,
    ugDegreeAndCompanyMatch,
    setUgDegreeAndCompanyMatch,
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
