import {
  IconType,
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

import { Marquee, TypingAnimation } from '@/app/components'

const role = 'Desenvolvedor Fullstack'

type TSkill = {
  label: string
  Icon: IconType
}

const skills: TSkill[] = [
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

export const Hero = () => (
  <section className="flex flex-col py-12 sm:py-16">
    <div className="flex flex-col gap-5">
      <p className="font-mono text-xs tracking-[0.3em] text-teal-600">
        <span aria-hidden className="text-teal-500">
          $
        </span>{' '}
        WHOAMI
      </p>

      <p className="text-lg text-muted-foreground sm:text-xl">
        Olá! Meu nome é <strong className="text-teal-500">João Vitor</strong> e
        sou
      </p>

      <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl">
        <span aria-hidden className="mr-3 text-teal-500">
          &gt;
        </span>
        <TypingAnimation className="leading-tight">{role}</TypingAnimation>
      </h1>

      <p className="max-w-prose leading-relaxed text-muted-foreground">
        Transformo necessidades em aplicações reais, escaláveis e bem testadas.
        Da API ao navegador, com atenção ao detalhe em cada etapa do caminho.
      </p>
    </div>

    <div className="mt-10 border-t border-teal-950 pt-6">
      <Marquee
        pauseOnHover
        className="[--duration:60s] [--gap:2rem]"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        {skills.map(({ label, Icon }) => (
          <div
            key={label}
            className="flex gap-2 text-muted-foreground transition-colors hover:text-teal-500"
          >
            <Icon />
            <span className="font-mono">{label}</span>
          </div>
        ))}
      </Marquee>
    </div>
  </section>
)
