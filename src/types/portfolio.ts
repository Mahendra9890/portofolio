export type Locale = "id" | "en";

export type LocalizedText = {
  id: string;
  en: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: string;
};

export type PersonalProfile = {
  fullName: string;
  displayName: string;
  monogram: string;
  pronouns: string;
  location: string;
  university: string;
  major: string;
  batch: string;
  status: LocalizedText;
  roleTargets: LocalizedText[];
  internshipDuration: LocalizedText;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
  cv: string;
  headline: LocalizedText;
  heroWords: LocalizedText[];
  tagline: LocalizedText;
  shortBio: LocalizedText;
  longBio: LocalizedText;
};

export type StatItem = {
  value: string;
  label: LocalizedText;
};

export type EducationItem = {
  institution: string;
  program: string;
  period: string;
  cohort: string;
  relevantCourses: string[];
};

export type Skill = {
  name: string;
  level: number;
  label: "Expert" | "Advanced" | "Proficient";
};

export type SkillGroup = {
  title: LocalizedText;
  items: Skill[] | string[];
};

export type ProjectFeature = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type Project = {
  slug: string;
  title: string;
  role: LocalizedText;
  team: string;
  year?: number;
  category: "Web" | "Web App" | "AI/Research" | "Fundamentals" | "Robotics" | "Mobile App / UX Research";
  stack: string[];
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText;
  features: ProjectFeature[];
  /** Local project cover art or a verified screenshot in public/. */
  coverImage: string;
  /** Optional, verified supplemental screenshots in public/. */
  gallery: string[];
  liveUrl?: string;
  repoUrl?: string;
  linkedinUrl?: string;
  featured?: boolean;
  highlight?: boolean;
  context?: string;
  authors?: string;
  businessModel?: LocalizedText;
  pdfUrl?: string;
  pdfLabel?: LocalizedText;
  metrics?: Array<{
    label: LocalizedText;
    value: string;
    comparison?: string;
  }>;
};

export type ExperienceItem = {
  role: LocalizedText;
  organization: string;
  period: string;
  summary: LocalizedText;
  tags: string[];
  image?: string;
};

export type AwardItem = {
  title: string;
  event: string;
  organizer: string;
  date: string;
  level: string;
  image: string;
  highlight?: boolean;
  badge?: "gold";
};

export type JourneyStep = {
  label: string;
  title: string;
};

export type VentureItem = {
  title: string;
  period: string;
  description: LocalizedText;
  metrics: string[];
  image?: string;
  url?: string;
};

export type ResearchItem = {
  title: string;
  venue: string;
  year: number;
  status: string;
  authors: string;
  paperUrl: string;
  summary: LocalizedText;
  metrics: Array<{
    label: LocalizedText;
    value: string;
    comparison?: string;
  }>;
};

export type PortfolioData = {
  profile: PersonalProfile;
  stats: StatItem[];
  education: EducationItem;
  skills: {
    core: Skill[];
    frontend: string[];
    tools: string[];
    teamStack: string[];
    softSkills: string[];
    languages: string[];
  };
  projects: Project[];
  experiences: ExperienceItem[];
  awards: AwardItem[];
  journey: JourneyStep[];
  ventures: VentureItem[];
  research: ResearchItem;
  socials: SocialLink[];
};
