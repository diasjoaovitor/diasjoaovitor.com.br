import {
  type IconType,
  SiAlgolia,
  SiClaude,
  SiCss,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPrettier,
  SiReact,
  SiReacthookform,
  SiStorybook,
  SiStrapi,
  SiStripe,
  SiTailwindcss,
  SiTanstack,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZod
} from '@icons-pack/react-simple-icons'

type TSkill = {
  label: string
  Icon: IconType
}

export const skills: TSkill[] = [
  {
    label: 'Next',
    Icon: SiNextdotjs
  },
  {
    label: 'React',
    Icon: SiReact
  },
  {
    label: 'TypeScript',
    Icon: SiTypescript
  },
  {
    label: 'Node',
    Icon: SiNodedotjs
  },
  {
    label: 'Tailwind',
    Icon: SiTailwindcss
  },
  {
    label: 'JavaScript',
    Icon: SiJavascript
  },
  {
    label: 'HTML',
    Icon: SiHtml5
  },
  {
    label: 'CSS',
    Icon: SiCss
  },
  {
    label: 'TanStack',
    Icon: SiTanstack
  },
  {
    label: 'React Hook Form',
    Icon: SiReacthookform
  },
  {
    label: 'Zod',
    Icon: SiZod
  },
  {
    label: 'Nest',
    Icon: SiNestjs
  },
  {
    label: 'Drizzle',
    Icon: SiDrizzle
  },
  {
    label: 'Vite',
    Icon: SiVite
  },
  {
    label: 'Vitest',
    Icon: SiVitest
  },
  {
    label: 'ESLint',
    Icon: SiEslint
  },
  {
    label: 'Prettier',
    Icon: SiPrettier
  },
  {
    label: 'Storybook',
    Icon: SiStorybook
  },
  {
    label: 'Docker',
    Icon: SiDocker
  },
  {
    label: 'Terraform',
    Icon: SiTerraform
  },
  {
    label: 'Vercel',
    Icon: SiVercel
  },
  {
    label: 'Git',
    Icon: SiGit
  },
  {
    label: 'Linux',
    Icon: SiLinux
  },
  {
    label: 'Firebase',
    Icon: SiFirebase
  },
  {
    label: 'Algolia',
    Icon: SiAlgolia
  },
  {
    label: 'Stripe',
    Icon: SiStripe
  },
  {
    label: 'Strapi',
    Icon: SiStrapi
  },
  {
    label: 'Claude',
    Icon: SiClaude
  }
]
