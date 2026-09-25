import { TerminalCommand } from '@/app/components/ui/custom/terminal-command'
import { Marquee } from '@/app/components/ui/magicui/marquee'

import { skills } from './skills'

export const SkillMarquee = () => (
  <section aria-labelledby="skills-heading" className="flex flex-col gap-3">
    <TerminalCommand
      as="h2"
      id="skills-heading"
      label="skills"
      command="ls ~/skills"
    />
    {/* Marquee renders its children several times, so assistive tech and reduced motion get this single list instead */}
    {/* WebKit drops list semantics when list-style is none (https://webkit.org/b/170179) */}
    <ul
      role="list"
      className="sr-only motion-reduce:not-sr-only motion-reduce:flex motion-reduce:flex-wrap motion-reduce:gap-x-8 motion-reduce:gap-y-3"
    >
      {skills.map(({ label, Icon }) => (
        <li key={label} className="flex gap-2 text-muted-foreground">
          <Icon title="" aria-hidden />
          <span className="font-mono">{label}</span>
        </li>
      ))}
    </ul>
    <Marquee
      aria-hidden
      pauseOnHover
      className="mask-x-from-92% [--duration:60s] [--gap:2rem] motion-reduce:hidden"
    >
      {skills.map(({ label, Icon }) => (
        <div
          key={label}
          className="flex gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Icon title="" />
          <span className="font-mono">{label}</span>
        </div>
      ))}
    </Marquee>
  </section>
)
