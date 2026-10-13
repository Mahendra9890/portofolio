export type Locale = "id" | "en";

export type LocalizedText = {
  id: string;
  en: string;
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
  program: LocalizedText;
  period: string;
  location: string;
  cohort?: string;
  relevantCourses?: string[];
  url: string;
};

export type Skill = {
  name: string;
  level: number;
  label: "Expert" | "Advanced" | "Proficient";
};

export type ProjectCategory = "Web" | "Web App" | "AI/Research" | "Robotics" | "Mobile App / UX Research";

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
  category: ProjectCategory;
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
  instagramUrl?: string;
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

export type ExternalLink = {
  label: LocalizedText;
  url: string;
};

export type ExperienceItem = {
  role: LocalizedText;
  organization: string;
  period: string;
  summary: LocalizedText;
  tags: string[];
  image?: string;
  links?: ExternalLink[];
};

export type AwardItem = {
  title: string;
  event: string;
  organizer: string;
  date: string;
  level: string;
  image: string;
  /** Optional second photo shown next to the certificate. */
  photo?: string;
  highlight?: boolean;
  badge?: "gold";
};

export type JourneyStep = {
  label: string;
  title: LocalizedText;
};

export type VentureItem = {
  title: string;
  period: string;
  description: LocalizedText;
  metrics: string[];
  image?: string;
  /** "contain" for logos, "cover" (default) for photos and screenshots. */
  imageFit?: "cover" | "contain";
  url?: string;
  urlLabel?: LocalizedText;
  links?: ExternalLink[];
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
  education: EducationItem[];
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
};
