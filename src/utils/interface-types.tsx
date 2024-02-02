export interface Profile {
  [key: string]: string | number | null;
}

export interface TitleCount {
  title: string;
  count: number;
}

export interface LocationCount {
  location: string;
  count: number;
}

export interface SkillCount {
  skill: string;
  count: number;
}


export type PrevMatchesState = {
  desiredTitleMatch: number;
  UGDegreeMatch: number;
  selectedCompanySizeMatch: number;
  selectedCompanySectorMatch: number;
  ugDegreeAndUGTierMatch: number;
  ugDegreeAndDesiredMatch: number;
  UGTierMatch: number;
};
