import { TerminalCommand } from '@/app/components/ui/custom/terminal-command'
import { TypingAnimation } from '@/app/components/ui/magicui/typing-animation'

const role = 'Desenvolvedor Fullstack'

export const Hero = () => (
  <section className="flex flex-col gap-3">
    <TerminalCommand command="whoami" />
    <p className="text-lg text-muted-foreground sm:text-xl">
      Olá! Meu nome é <strong className="text-primary">João Vitor</strong> e sou
    </p>

    <h1 className="flex text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
      {/* The typed text is partial until the animation ends, so screen readers get the full role instead */}
      <span className="sr-only">{role}</span>
      <span aria-hidden className="mr-3 text-primary">
        &gt;
      </span>
      {/* The invisible full role reserves the final height, so the line doesn't jump when it wraps at the end of the typing */}
      <span aria-hidden className="grid *:col-start-1 *:row-start-1">
        <span className="invisible">{role}|</span>
        <TypingAnimation className="leading-[inherit] tracking-normal motion-reduce:hidden">
          {role}
        </TypingAnimation>
        {/* TypingAnimation ignores prefers-reduced-motion */}
        <span className="hidden motion-reduce:inline">{role}</span>
      </span>
    </h1>
    <p className="max-w-prose leading-relaxed text-muted-foreground">
      Transformo necessidades em aplicações reais, escaláveis e bem testadas. Da
      API ao navegador, com atenção ao detalhe em cada etapa do caminho.
    </p>
  </section>
)
