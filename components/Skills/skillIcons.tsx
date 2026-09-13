import type { IconType } from "react-icons/lib";
import { FaJava } from "react-icons/fa6";
import { TbBrandAdobe } from "react-icons/tb";
import {
  SiApache,
  SiApachemaven,
  SiBootstrap,
  SiCss,
  SiEclipseide,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiJquery,
  SiMysql,
  SiReact,
  SiSpring,
  SiSpringboot,
} from "react-icons/si";
import {
  LuArrowLeftRight,
  LuBell,
  LuBlocks,
  LuBoxes,
  LuCloud,
  LuClock,
  LuCodeXml,
  LuComponent,
  LuCpu,
  LuDatabase,
  LuFileJson,
  LuFileStack,
  LuFolderTree,
  LuGitBranch,
  LuGitMerge,
  LuGlobe,
  LuImagePlay,
  LuLayers,
  LuLayoutGrid,
  LuLayoutTemplate,
  LuMonitorSmartphone,
  LuNetwork,
  LuPuzzle,
  LuRefreshCw,
  LuSearch,
  LuServer,
  LuShieldCheck,
  LuTag,
  LuTerminal,
  LuWaypoints,
  LuWorkflow,
  LuWrench,
} from "react-icons/lu";

/**
 * Every skill/category in skills.json references one of these keys instead
 * of importing an icon directly, so the data file stays plain JSON. Real
 * product/brand logos get their real brand color; the rest (AEM-specific
 * concepts with no logo of their own, e.g. "Bulk Asset Migration") get a
 * plain conceptual icon in the site's own gold — that split is deliberate,
 * see data/README.md.
 */
export interface SkillIconEntry {
  icon: IconType;
  /** Omit to fall back to the site's gold accent (--gold) — used for
   *  conceptual icons that don't represent a real logo. */
  color?: string;
}

export const skillIconMap: Record<string, SkillIconEntry> = {
  // Real brand logos.
  adobe: { icon: TbBrandAdobe, color: "#FA0F00" },
  springboot: { icon: SiSpringboot, color: "#6DB33F" },
  spring: { icon: SiSpring, color: "#6DB33F" },
  react: { icon: SiReact, color: "#61DAFB" },
  java: { icon: FaJava, color: "#ED8B00" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  css3: { icon: SiCss, color: "#1572B6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  jquery: { icon: SiJquery, color: "#0769AD" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  apache: { icon: SiApache, color: "#D22128" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  git: { icon: SiGit, color: "#F05032" },
  // GitHub's real brand mark is near-black — invisible on this dark theme,
  // so it gets a light neutral instead of the literal brand hex.
  github: { icon: SiGithub, color: "#E6EDF3" },
  jenkins: { icon: SiJenkins, color: "#D24939" },
  maven: { icon: SiApachemaven, color: "#C71A36" },
  eclipse: { icon: SiEclipseide, color: "#5C4EE5" },
  intellij: { icon: SiIntellijidea, color: "#FC801D" },
  jira: { icon: SiJira, color: "#0052CC" },
  graphql: { icon: SiGraphql, color: "#E10098" },

  // Conceptual icons for AEM-specific/compound skills with no logo of
  // their own — color intentionally omitted, falls back to gold.
  "folder-tree": { icon: LuFolderTree },
  "dynamic-media": { icon: LuImagePlay },
  schema: { icon: LuFileJson },
  microservices: { icon: LuNetwork },
  tag: { icon: LuTag },
  layers: { icon: LuLayers },
  migrate: { icon: LuArrowLeftRight },
  governance: { icon: LuShieldCheck },
  api: { icon: LuGlobe },
  cloud: { icon: LuCloud },
  sites: { icon: LuLayoutGrid },
  puzzle: { icon: LuPuzzle },
  stack: { icon: LuFileStack },
  template: { icon: LuLayoutTemplate },
  touch: { icon: LuMonitorSmartphone },
  server: { icon: LuServer },
  component: { icon: LuComponent },
  database: { icon: LuDatabase },
  search: { icon: LuSearch },
  workflow: { icon: LuWorkflow },
  bell: { icon: LuBell },
  clock: { icon: LuClock },
  waypoints: { icon: LuWaypoints },
  refresh: { icon: LuRefreshCw },
  cpu: { icon: LuCpu },
  code: { icon: LuCodeXml },
  "git-branch": { icon: LuGitBranch },
  blocks: { icon: LuBlocks },
  wrench: { icon: LuWrench },
  "git-merge": { icon: LuGitMerge },
  terminal: { icon: LuTerminal },
  boxes: { icon: LuBoxes },
};

export function getSkillIcon(key: string): SkillIconEntry {
  return skillIconMap[key] ?? { icon: LuCodeXml };
}
