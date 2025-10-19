/**
 * University Data Types
 * TypeScript interfaces for university data from backend API
 */

export interface UniversityStats {
  public: boolean;
  coed: boolean;
  undergraduates: string;
  men334?: string;
  women666?: string;
  graduatestudents?: string;
}

export interface AdmissionRequirement {
  Subject: string;
  Req: string;
  Reco: string;
}

export interface TestScore {
  Subject: string;
  'Required Units': string;
  'Due in Admissions Office': string;
}

export interface AdmissionFactor {
  Factor: string;
  'Very Important'?: string;
  Important?: string;
  Considered?: string;
  'Not Considered'?: string;
}

export interface ScoreDistribution {
  range: string;
  percentage: string;
}

export interface EthnicityData {
  label: string;
  value: string;
}

export interface Sport {
  Sports: string;
  Women?: string;
  Men?: string;
}

export interface UniversityOverview {
  collegeName: string;
  website: string;
  description: string;
  stats: UniversityStats;
}

export interface UniversityAdmissions {
  headerCards: {
    deadline: string;
    daysLeft: string | null;
    admissionsAddress: string;
    admissionsPhone: string;
  };
  freshmanadmissionreqs: {
    highschoolgraduation: string;
    table: AdmissionRequirement[];
    examinations: TestScore[];
  };
  selectionofstudents: {
    table: AdmissionFactor[];
  };
  profileoffalladmission: {
    overalladmissionrate: string[];
    men?: string;
    studentsenrolled: string[];
    [key: string]: unknown; // For SAT/ACT score distributions
  };
}

export interface UniversityFinancials {
  quickStats: {
    selectedState: string;
    costofattendance: string;
    'tuition&fees': string;
    'room&board': string;
    'books&supplies': string;
    otherexpenses: string;
    scholarshipFinder: string;
  };
  applyingforfinancialaid?: {
    table: Array<{
      'Forms Required': string;
      Cost: string;
    }>;
  };
}

export interface UniversityAcademic {
  generalInformation: {
    academiccalendarsystem: string;
    summersession: string;
  };
  undergraduateeducation: {
    mostpopulardisciplines: string[];
    specialprograms: string[];
    studyabroad: string;
    onlinedegrees: string;
  };
  facultyandinstruction: {
    'full-timefaculty': string;
    'part-timefaculty': string;
    'full-timefacultywithph.d./terminaldegree': string;
    regularclasssize: Array<{
      range: string;
      percentage: string;
    }>;
  };
  undergraduateMajors: string[];
  mastersPrograms?: string[];
  doctoralPrograms?: string[];
}

export interface UnityCampusLife {
  quickStats: {
    location: string;
    [key: string]: string;
  };
  locationandsetting: {
    [key: string]: string;
  };
  housing: {
    collegehousing: string;
    typesofhousing: string;
    studentsincollegehousing: string;
    freshmanhousingguarantee: string;
    'studentslivingoffcampus/commuting': string;
  };
  sportsrecreation: {
    mascot: string;
    schoolcolors: string;
    intramuralsports: string;
    table: Sport[];
  };
}

export interface UniversityStudents {
  studentbody: {
    coeducational: string;
    allundergraduates: string[];
    men: string;
    'full-timeundergraduates': string;
    internationalstudents: string;
    averageage: string;
    allgraduatestudents: string;
    ethnicity: EthnicityData[];
  };
  undergraduateretentiongraduation: {
    studentsgraduatingwithin4years: string;
    studentsgraduatingwithin5years: string;
    studentsgraduatingwithin6years: string;
  };
}

export interface UniversityPages {
  Overview: UniversityOverview;
  Admissions: UniversityAdmissions;
  Financials: UniversityFinancials;
  Academic: UniversityAcademic;
  'Campus Life': UnityCampusLife;
  Students: UniversityStudents;
}

export interface UniversityData {
  id: string;
  slug: string;
  scrapedAt: string;
  pages: UniversityPages;
  country: string;
  uploadedAt: string;
  searchName: string;
  location: string;
}

export interface UniversityApiResponse {
  success: boolean;
  data: UniversityData;
}