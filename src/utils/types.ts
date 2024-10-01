import { BoxProps, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface SidebarWithHeaderProps {
  passedActive: string;
  children?: React.ReactNode;
}

export interface LinkItemProps {
  id?: number;
  name: string;
  icon: IconType;
  href?: string;
  children?: LinkItemProps[];
}

export interface NavItemProps extends FlexProps {
  icon: React.ElementType;
  children?: React.ReactNode;
  passedActive: string;
  subNav: LinkItemProps[] | null;
  navName: string;
  href: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
  passedActive: string;
}

export type RouteChangeHandler = (newRoute: string) => void;

export interface Category {
  name: string;
  subLabel: string;
  id: string;
  children?: SubCategory[];
}

export interface SubCategory {
  name: string;
  id: string;
  description?: string;
  children?: Template[];
}

export interface Template {
  name: string;
  filename: string;
  tags?: string[];
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  location: string;
  phone: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  location: string;
  phone: string;
}

export interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
}

export interface CreateEventFormValues {
  eventDes: string;
  startDate: string | Date;
}

export interface ShareFormValues {
  email: string;
}

interface EducationItem {
  degree: string;
  year: string;
  institution: string;
  certificate: File | Blob | MediaSource | null;
}

export type QualificationPayloadProps = {
  education: EducationItem[];
  challenges: string;
  keyPositives: string;
  doDifferently: string;
};

export type LeadershipItem = {
  id: string;
  title: string;
  startYear: string;
  endYear: string;
  challenges: string;
  keyPositives: string;
  doDifferently: string;
};

export type LeadershipPayloadType = {
  title: string;
  startYear: string;
  endYear: string;
  challenges: string;
  keyPositives: string;
  doDifferently: string;
};

export type ParamsType = {
  index: string;
};

export interface QualificationProps {
  createdAt: number;
  updatedAt: number;
  id: string;
  education: {
    degree: string;
    year: string;
    institution: string;
    certificate: File | Blob | MediaSource | null;
  }[];
  challenges: string;
  keyPositives: string;
  doDifferently: string;
  owner: string;
}

export interface CourseItem {
  id: string;
  school: string;
  institution: string;
  certificateNo: string;
  year: string;
}

export type CoursesPayloadType = {
  courseTitle: string;
  institution: string;
  year: string;
  certificateNo: string;
  challenges: string;
  document: File | Blob | MediaSource | null;
  keyPositives?: string;
  doDifferently?: string;
};

// logbook types

export type logbookDataProps = {
  logbookTittle: string;
  year: string;
  role: string;
  challenges: string;
  key_points: string;
  observation: string;
  solvedPro: string;
  summary: string;
  logbookBeneficials: string;

  differentAction: string;
  caseTittle: string;
  caseYear: string;
  flag: string;
  file?: File | null | Blob | MediaSource;
};

export type logbookResponseType = {
  id: string;
  action: string;
  logBookType: string;
  firstTitle: string;
  firstYear: string;
  firstDocument: File | null | Blob | MediaSource;
  secondTitle: string;
  secondYear: string;
  secondDocument: File | null | Blob | MediaSource;
  summary: string;
  challenges: string;
  keyPositives: string;
  doDifferently: string;
};

export type requestFeedBackDataProps = {
  fullName: string;
  title: string;
  role: string;
  challenges: string;
  key_points: string;
  observation: string;
  email: string;
  bodyText: string;
};

export type passedValueProps = {
  formSteps: number;
  handleFormSteps: (value: number) => void;
  fillForm: boolean;
  handleFillForm: (value: boolean) => void;
  logbookData: logbookDataProps;
  handleLogbookData: (value: logbookDataProps) => void;
  handleLogbookMode: (value: string) => void;

  preview: boolean;
  handlePreview: (value: boolean) => void;
  totalData: logbookDataProps[];
  handleTotalData: () => void;
  handleResetData: () => void;
  noOfAuthor: number;
  addToAuthor: () => void;
  minusFromAuthor: () => void;
  logBookMode: string;
  file?: File | null | Blob | MediaSource;
};

export type LogbookPayloadType = {
  action?: string;
  firstTitle?: string;
  firstYear?: string;
  secondTitle?: string;
  secondYear?: string;
  summary?: string;
  challenges?: string;
  keyPositives?: string;
  doDifferently?: string;
  secondDocument?: File | Blob | MediaSource | null;
  firstDocument?: File | Blob | MediaSource | null;
  logBookType?: string;
};

export type SupervisorCardType = {
  icon: React.ReactNode;
  id: number;
  title: string;
  num: string;
};

export type TeachingPayloadType = {
  title: string;
  year: string;
  qualificationYear: string;
  summary: string;
  keyTakeaway: string;
  document: File | Blob | MediaSource | null;
  qualificationType: string;
};

export type TeachingResType = {
  id: string;
  title: string;
  year: string;
  qualificationYear: string;
  qualificationType: string;
  document: File | Blob | MediaSource | null;
  summary: string;
  keyTakeaway: string;
};

export type QualityPayloadType = {
  title: string;
  year: string;
  details: string;
  challenges: string;
  keyPositives: string;
  doDifferently: string;
  type: string;
};

export type QualityDataItem = {
  createdAt: number;
  updatedAt: number;
  id: string;
  title: string;
  year: string;
  type: string;
  details: string;
  challenges: string;
  keyPositives: string;
  doDifferently: string;
  owner: {
    id: string;
    fullName: string;
    img: string;
    email: string;
    plan: string;
    emailStatus: string;
    phone: string;
    location: string;
    status: string;
    role: string;
  };
};

export type ResearchPayloadTypes = {
  title: string;
  year: string;
  authors: string[];
  summary: string;
  findings: string;
  area: string;
  beneficiary: string;
};

export type ResearchResponseType = {
  id: string;
  title: string;
  year: string;
  authors: string[];
  summary: string;
  findings: string;
  area: string;
  beneficiary: string;
};

export type SupervisorDataType = {
  data: {
    data: {
      totalUsers?: number;
      totalVerifiedUsers?: number;
      totalActiveUsers?: number;
    };
  };
  isLoading: boolean;
};

export type UserDataType = {
  id: string;
  fullName: string;
  img: string;
  email: string;
  plan: string;
  emailStatus: string;
  phone: string;
  location: string;
  status: string;
  role: string;
};

export type PlanType = "trial" | "basic" | "premium" | "infinite";

export type FeedbackPayload = {
  name: string;
  title: string;
  role: string;
  email: string;
  selectedId: string;
};

export type RequestSupportType = {
  message: string;
  file: File | null;
};
