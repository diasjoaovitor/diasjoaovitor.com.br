---
title: 'Ferramentas de desenvolvimento no WSL: Node, Git, Docker e editor'
summary: 'Segunda parte do guia: complete o ambiente no WSL com Node e pnpm, Git e GitHub CLI, Docker e o editor Antigravity.'
date: 2026-10-03
author: 'João Vitor'
lang: pt-BR
draft: true
---

Esta é a segunda parte do guia de configuração de um ambiente de desenvolvimento com o WSL. Na [primeira parte](/blog/ambiente-de-desenvolvimento-com-wsl), instalamos o WSL e deixamos o terminal pronto, com o Fish, o Starship e algumas ferramentas de linha de comando. Agora vamos completar o ambiente com o que falta para começar a programar: o Node.js, o Git, o Docker e o editor.

Os comandos daqui partem do terminal configurado na primeira parte, então, se você ainda não passou por ela, comece por lá. As seções seguem a ordem de instalação. O editor fica por último porque, além de instalá-lo, vamos configurá-lo como o editor padrão do Git.

## O que você vai ter no final

| Ferramenta        | Para que serve                                         | Seção            |
| ----------------- | ------------------------------------------------------ | ---------------- |
| nvm.fish          | Instalar e trocar entre versões do Node.js             | Node.js e pnpm   |
| Node.js           | Rodar JavaScript fora do navegador                     | Node.js e pnpm   |
| pnpm              | Instalar as dependências dos projetos, no lugar do npm | Node.js e pnpm   |
| Git               | Versionar o código                                     | Git e GitHub CLI |
| GitHub CLI (`gh`) | Usar o GitHub pelo terminal e autenticar o Git         | Git e GitHub CLI |
| Docker Desktop    | Rodar bancos de dados e outros serviços em containers  | Docker           |
| Antigravity IDE   | Editar o código, com agentes de IA integrados          | Antigravity      |

## Node.js e pnpm

O Node.js é o que permite rodar JavaScript fora do navegador, e é a base de praticamente todas as ferramentas do desenvolvimento web atual. Você poderia instalá-lo direto pelo `apt`, mas é melhor usar um gerenciador de versões: projetos diferentes costumam pedir versões diferentes do Node, e com ele você troca de versão com um comando, sem precisar de `sudo`.

Como estamos usando o Fish, vamos usar o nvm.fish, um gerenciador de versões do Node feito para ele.[^nvm-fish] Ele é instalado com o Fisher, que instalamos na primeira parte:[^nvm-fish]

```fish
fisher install jorgebucaran/nvm.fish
```

Agora vamos instalar o Node.js. As versões pares do Node passam por um período de suporte de longo prazo, o LTS, que é o recomendado para aplicações em produção, e cada linha LTS ganha um nome.[^node-releases] Eu uso a linha 24, chamada Krypton, e o nvm.fish aceita instalar uma linha LTS pelo nome:[^nvm-fish]

```fish
nvm install lts/krypton
```

<!-- TODO: confirme se quer manter o Node 24. O Node 26 entra em LTS no fim de outubro de 2026; depois disso, ele passa a ser a linha LTS mais recente. -->

O `nvm install` só ativa a versão instalada no terminal atual. Para que todo terminal novo já abra com ela, defina a versão padrão:[^nvm-fish]

```fish
set --universal nvm_default_version lts/krypton
```

Abra uma nova aba e confira com `node -v`.

O Node vem acompanhado do npm, o gerenciador de pacotes padrão, que instala as dependências dos projetos. Eu prefiro o pnpm: em vez de copiar as dependências para cada projeto, ele guarda cada arquivo uma única vez em um armazenamento central no disco e cria links para ele nos projetos, o que economiza espaço e deixa a instalação mais rápida.[^pnpm-motivation] Vamos instalá-lo com o próprio npm:

```fish
npm i -g pnpm
```

Em seguida, execute o `pnpm setup`, que cria uma pasta própria para o pnpm e a adiciona ao `PATH` no seu `config.fish`:[^pnpm-setup]

```fish
pnpm setup
```

Abra uma nova aba e confira com `pnpm -v`. Ao final desta seção, o seu `config.fish` fica parecido com este (a pasta do pnpm muda de acordo com o seu usuário):

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
    set -gx PATH "$HOME/.local/bin" $PATH
    zoxide init fish | source
end

# pnpm
set -gx PNPM_HOME "/home/<seu-usuário>/.local/share/pnpm"
if not string match -q -- $PNPM_HOME $PATH
  set -gx PATH "$PNPM_HOME" $PATH
end
# pnpm end
```

<!-- TODO: confira se o bloco que o `pnpm setup` gera na versão atual do pnpm é igual ao seu (desde o pnpm 11, os binários globais ficam em uma subpasta `bin` do `PNPM_HOME`). -->

## Git e GitHub CLI

O Git, a ferramenta de controle de versão que registra o histórico do seu código, já vem instalado no Ubuntu. Antes de usá-lo, configure o nome e o e-mail que vão aparecer nos seus commits:

```fish
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

Para enviar o código ao GitHub, vamos instalar o GitHub CLI, o comando `gh`, que permite usar o GitHub pelo terminal: criar repositórios, abrir pull requests, ver issues e mais. O comando de instalação oficial para o Ubuntu foi escrito para o Bash e atribui variáveis com `out=$(mktemp)`, uma sintaxe que o Fish não aceita.[^fish-bash] Como vimos na primeira parte, a saída é rodá-lo dentro do Bash, com `bash -c`:[^gh-install]

```fish
bash -c '(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && sudo mkdir -p -m 755 /etc/apt/sources.list.d \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y'
```

Com o `gh` instalado, faça login na sua conta do GitHub e siga as perguntas no terminal:

```fish
gh auth login
```

Depois, configure o Git para usar o `gh` como gerenciador de credenciais.[^gh-setup-git] Assim, o Git usa o login que você acabou de fazer no `gh` sempre que precisar se autenticar no GitHub, e você não precisa digitar senha ou token a cada `git push`:

```fish
gh auth setup-git
```

Por último, uma sugestão opcional: aliases são atalhos para comandos do Git que você usa muito. Estes são os que eu uso:

```fish
git config --global alias.s "!git status -s"
git config --global alias.l "!git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'"
git config --global alias.c "!git add --all && git commit -m"
git config --global alias.amend "!git add --all && git commit --amend --no-edit"
```

- `git s` mostra o status do repositório em formato curto.
- `git l` mostra o histórico em uma linha por commit, com cores, autor e data relativa.
- `git c "mensagem"` adiciona todas as alterações e faz o commit de uma vez.
- `git amend` adiciona as alterações ao último commit, sem mudar a mensagem.

Se você também usa o GitLab, existe o equivalente do `gh` para ele, o [glab](https://gitlab.com/gitlab-org/cli). Eu o instalei pelo [Snap](https://snapcraft.io/glab), com `sudo snap install glab`.

## Docker

Um container é um ambiente isolado que empacota um programa com tudo de que ele precisa para rodar. Na prática, o Docker permite subir um banco de dados ou outro serviço com um comando, sem instalar nada diretamente no seu sistema, e apagar tudo depois sem deixar rastro.

No WSL, o jeito mais simples de usar o Docker é o Docker Desktop, instalado no Windows e integrado ao WSL 2:[^docker-wsl]

1. Baixe e instale o [Docker Desktop para Windows](https://docs.docker.com/desktop/setup/install/windows-install/). Durante a instalação, mantenha marcada a opção de usar o WSL 2.
2. Abra o Docker Desktop pelo menu Iniciar.
3. Em `Settings` > `General`, confira se a opção `Use WSL 2 based engine` está marcada.
4. Em `Settings` > `Resources` > `WSL Integration`, ative a integração com o Ubuntu e clique em `Apply`.

Um detalhe que confunde no começo: o comando `docker` só funciona no WSL enquanto o Docker Desktop estiver aberto no Windows.[^docker-wsl] Se o terminal disser que não encontra o comando, abra o Docker Desktop e tente de novo.

Para testar, abra uma nova aba no Windows Terminal e execute:

```fish
docker run hello-world
```

Esse comando baixa uma imagem de teste e roda um container que imprime uma mensagem de boas-vindas. Se ela aparecer, o Docker está funcionando.

## Antigravity

O editor que eu uso é o Antigravity IDE, do Google. O Antigravity foi anunciado em novembro de 2025 como uma plataforma de desenvolvimento com agentes de IA, e é derivado do VS Code.[^antigravity-wikipedia] Hoje, ele é dividido em alguns produtos, e o Antigravity IDE é o editor completo, com autocompletar, comandos em linguagem natural e um agente que trabalha no editor, no terminal e no navegador.[^antigravity-ide]

<!-- TODO: em uma ou duas frases, por que você trocou o Cursor pelo Antigravity e o que mais usa nele. -->

Para instalar, baixe o Antigravity IDE na [página de download](https://antigravity.google/download#antigravity-ide) e instale-o no Windows, como qualquer outro programa.

O Antigravity IDE já vem com uma extensão para o WSL, então você pode abrir os projetos que estão no Linux direto do terminal. Entre na pasta do projeto e execute:

```fish
antigravity-ide .
```

O editor abre no Windows, conectado ao WSL: os arquivos, o terminal integrado e as extensões rodam no Ubuntu. Na primeira vez, ele leva alguns instantes instalando no WSL a parte que roda do lado do Linux.

<!-- TODO: confirme o fluxo (o comando `antigravity-ide` fica disponível no WSL logo após a instalação ou foi preciso fazer algo?) e acrescente um print do editor aberto em um projeto no WSL. Texto alternativo sugerido: "Antigravity IDE com um projeto aberto, mostrando no canto inferior esquerdo que está conectado ao WSL: Ubuntu". -->

Por fim, vamos configurá-lo como o editor padrão do Git, que é aberto quando o Git precisa que você escreva ou edite algo, como a mensagem de um commit:

```fish
git config --global core.editor "antigravity-ide --wait"
```

O `--wait` faz o comando esperar você fechar o arquivo antes de devolver o controle ao terminal.[^vscode-cli] Sem ele, o Git seguiria em frente antes de você terminar de escrever.

## Menções honrosas

Duas coisas que não entram no passo a passo, mas fazem parte do meu dia a dia.

### Claude Code

O Claude Code é um agente de IA da Anthropic que roda no terminal: ele lê o seu projeto, edita arquivos e executa comandos a partir do que você pede. No WSL, ele é instalado e executado dentro do Ubuntu:[^claude-code]

```fish
curl -fsSL https://claude.ai/install.sh | bash
```

Depois, basta rodar `claude` na pasta do projeto e fazer login pelo navegador. Ele precisa de uma assinatura paga do Claude ou de uma conta da API.[^claude-code]

<!-- TODO: uma frase sobre como você usa o Claude Code junto com o Antigravity. -->

### Extensões do editor

Estas são as extensões que tenho instaladas no Antigravity IDE. Todas estão disponíveis no [Open VSX](https://open-vsx.org/), o registro de extensões que ele usa:

<!-- TODO: confirme se o Antigravity IDE usa o Open VSX como registro de extensões. -->

- [Auto Rename Tag](https://open-vsx.org/extension/formulahendry/auto-rename-tag): renomeia automaticamente a tag de fechamento quando você muda a de abertura, no HTML e no JSX.
- [Code Spell Checker](https://open-vsx.org/extension/streetsidesoftware/code-spell-checker) e o [dicionário em português do Brasil](https://open-vsx.org/extension/streetsidesoftware/code-spell-checker-portuguese-brazilian): apontam erros de digitação no código, nos comentários e nos textos.
- [EditorConfig](https://open-vsx.org/extension/editorconfig/editorconfig): aplica as regras de espaçamento e de fim de linha definidas no `.editorconfig` do projeto.
- [ESLint](https://open-vsx.org/extension/dbaeumer/vscode-eslint): mostra no editor os problemas apontados pelo ESLint.
- [git-autoconfig](https://open-vsx.org/extension/shyykoserhiy/git-autoconfig): pede o nome e o e-mail do Git ao abrir um repositório que ainda não os tem configurados.
- [GitLens](https://open-vsx.org/extension/eamodio/gitlens): mostra quem alterou cada linha e quando, além do histórico do arquivo.
- [Material Icon Theme](https://open-vsx.org/extension/pkief/material-icon-theme): ícones para cada tipo de arquivo e pasta.
- [OKLCH Preview](https://open-vsx.org/extension/swiftlydaniel/oklch-color-visualiser): mostra a cor das variáveis escritas em `oklch()` no CSS.
- [Prettier](https://open-vsx.org/extension/esbenp/prettier-vscode): formata o código automaticamente.
- [Tailwind CSS IntelliSense](https://open-vsx.org/extension/bradlc/vscode-tailwindcss): autocompletar e pré-visualização das classes do Tailwind CSS.

## Conclusão

Com as duas partes, você tem o ambiente completo: o Ubuntu no WSL 2 com um terminal produtivo, o Node.js e o pnpm, o Git autenticado no GitHub, o Docker e o Antigravity IDE conectado ao WSL.

Para colocar tudo à prova, crie um projeto e abra no editor. Por exemplo, um projeto Next.js:

```fish
cd ~
pnpm create next-app meu-projeto
cd meu-projeto
antigravity-ide .
```

<!-- TODO: confira se `pnpm create next-app` continua sendo o comando recomendado pelo Next.js, ou troque por outro projeto de exemplo. -->

Se alguma etapa não funcionou para você, se encontrou algum erro no guia ou se tem uma ferramenta para recomendar, deixe nos comentários.

[^nvm-fish]: [nvm.fish](https://github.com/jorgebucaran/nvm.fish), Jorge Bucaran.

[^node-releases]: [Node.js Releases](https://nodejs.org/en/about/previous-releases), Node.js.

[^pnpm-motivation]: [Motivation](https://pnpm.io/motivation), documentação do pnpm.

[^pnpm-setup]: [pnpm setup](https://pnpm.io/cli/setup), documentação do pnpm.

[^fish-bash]: [Fish for bash users](https://fishshell.com/docs/current/fish_for_bash_users.html), documentação do Fish 4.

[^gh-install]: [Installing gh on Linux and BSD](https://github.com/cli/cli/blob/trunk/docs/install_linux.md), GitHub CLI.

[^gh-setup-git]: [gh auth setup-git](https://cli.github.com/manual/gh_auth_setup-git), manual do GitHub CLI.

[^docker-wsl]: [Docker Desktop WSL 2 backend on Windows](https://docs.docker.com/desktop/features/wsl/), documentação do Docker.

[^antigravity-wikipedia]: [Google Antigravity](https://en.wikipedia.org/wiki/Google_Antigravity), Wikipédia.

[^antigravity-ide]: [Antigravity IDE](https://antigravity.google/product/antigravity-ide), Google.

[^vscode-cli]: [Command Line Interface (CLI)](https://code.visualstudio.com/docs/configure/command-line), documentação do VS Code.

[^claude-code]: [Advanced setup](https://code.claude.com/docs/en/setup), documentação do Claude Code.
