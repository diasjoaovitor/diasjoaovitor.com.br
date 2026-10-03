---
title: 'Como configurar um ambiente de desenvolvimento com o WSL'
summary: 'Primeira parte do guia: instale o WSL e deixe o terminal pronto com Windows Terminal, Fish, Starship e ferramentas de linha de comando.'
date: 2026-10-03
author: 'João Vitor'
lang: pt-BR
draft: true
---

Quem programa no Windows logo esbarra em tutoriais, ferramentas e comandos pensados para Linux ou macOS. Durante muito tempo, a saída era instalar o Linux em dual boot ou usar uma máquina virtual pesada. Hoje existe um caminho bem mais simples: o WSL, que coloca um Linux de verdade dentro do Windows.

<!-- TODO: uma ou duas frases sobre por que você usa o WSL no dia a dia (por exemplo, há quanto tempo e o que ele resolveu para você). -->

Este guia é a atualização de um tutorial que publiquei no [TabNews](https://www.tabnews.com.br/diasjoaovitor/tutorial-como-configurar-um-ambiente-de-desenvolvimento-com-o-wsl) e das anotações que fui acumulando depois em um [gist](https://gist.github.com/diasjoaovitor/3978683b9f48489b4f4f1b2df77d6827). Ele está dividido em duas partes. Nesta primeira, você instala o WSL e deixa o terminal pronto para o dia a dia. Na [segunda parte](/blog/ferramentas-de-desenvolvimento-no-wsl), instalamos o Node.js, o Git, o Docker e o editor. No final das duas, você terá do zero o mesmo ambiente que eu uso para desenvolver.

Cada seção é uma etapa, e as etapas dependem das anteriores, então siga na ordem. Para começar, você precisa do Windows 10 na versão 2004 ou mais recente (build 19041 ou superior) ou do Windows 11, além de acesso de administrador no computador.[^wsl-install]

## O que você vai ter no final

| Ferramenta       | Para que serve                                                    | Seção                           |
| ---------------- | ----------------------------------------------------------------- | ------------------------------- |
| WSL + Ubuntu     | Rodar um Linux completo dentro do Windows                         | Instalando o WSL                |
| Windows Terminal | Abrir o Ubuntu em abas, com temas e atalhos                       | Windows Terminal                |
| Fish             | Um shell com sugestões automáticas e realce de sintaxe            | Fish                            |
| Starship         | Um prompt que mostra a branch do Git, a versão do Node e mais     | Starship                        |
| bat              | Ver o conteúdo de arquivos com cores, no lugar do `cat`           | Ferramentas de linha de comando |
| zoxide           | Navegar entre pastas digitando só parte do nome, no lugar do `cd` | Ferramentas de linha de comando |
| eza              | Listar arquivos com ícones e em árvore, no lugar do `ls`          | Ferramentas de linha de comando |
| fzf              | Buscar arquivos e comandos antigos com uma busca interativa       | Ferramentas de linha de comando |

<!-- TODO: print do terminal pronto (Windows Terminal com Fish, Starship e o tema Drácula). Texto alternativo sugerido: "Windows Terminal com o Ubuntu aberto, mostrando o prompt do Starship com a branch do Git e a versão do Node". -->

## Instalando o WSL

O WSL (Windows Subsystem for Linux) é um recurso do Windows que permite rodar um ambiente Linux no seu computador sem precisar de uma máquina virtual separada nem de dual boot.[^wsl-about] Na versão atual, o WSL 2, o Windows roda um kernel Linux de verdade dentro de uma máquina virtual leve, que ele mesmo gerencia.[^wsl-about] Na prática, você abre um terminal e está em um Linux completo, com acesso aos mesmos comandos e programas que veria em um servidor.

Para instalar, abra o PowerShell como administrador: procure por "PowerShell" no menu Iniciar, clique com o botão direito e escolha "Executar como administrador". Em seguida, execute:

```powershell
wsl --install
```

Esse comando ativa os recursos necessários do Windows, instala o kernel do Linux, define o WSL 2 como padrão e instala o Ubuntu, a distribuição Linux padrão.[^wsl-environment] Quando ele terminar, reinicie o computador.

Depois de reiniciar, abra o Ubuntu pelo menu Iniciar. Na primeira vez, ele leva alguns instantes descompactando arquivos e depois pede que você crie um usuário e uma senha. Eles não precisam ser os mesmos do Windows. Guarde bem essa senha: esse usuário é o administrador do Linux, e a senha será pedida sempre que você rodar um comando com `sudo`. Enquanto você digita a senha, nada aparece na tela. Isso é normal, não é um problema no teclado.[^wsl-environment]

Para conferir se deu tudo certo, volte ao PowerShell e execute:

```powershell
wsl -l -v
```

O Ubuntu deve aparecer na lista com o número 2 na coluna `VERSION`, indicando que ele está rodando no WSL 2.[^wsl-install]

Antes de seguir, uma dica que evita muita dor de cabeça: guarde seus projetos dentro do Linux, na sua pasta de usuário (`~`, que corresponde a `/home/<seu-usuário>`), e não nas pastas do Windows, que aparecem no Linux em `/mnt/c`. Quando você trabalha com ferramentas do Linux, os arquivos ficam bem mais rápidos no sistema de arquivos do próprio Linux.[^wsl-filesystems] Se precisar ver esses arquivos pelo Explorador de Arquivos do Windows, execute `explorer.exe .` no terminal do Ubuntu, com o ponto no final, para abrir a pasta atual.[^wsl-filesystems]

## Atualizando o Ubuntu

O Ubuntu instala programas com o `apt`, o gerenciador de pacotes dele: é parecido com uma loja de aplicativos, só que pelo terminal. O `sudo` é o comando que executa outro comando com permissão de administrador, e por isso pede a sua senha.

O Windows não atualiza os pacotes do Linux sozinho.[^wsl-environment] Antes de instalar qualquer ferramenta, vamos atualizar a lista de pacotes e os programas que já vieram instalados:

```sh
sudo apt update && sudo apt full-upgrade -y
```

O `apt update` baixa a lista mais recente de pacotes disponíveis, e o `apt full-upgrade` instala as atualizações. O `-y` responde "sim" automaticamente às confirmações.

## Configurando o terminal

### Windows Terminal

Em vez da janela padrão do Ubuntu, vamos usar o Windows Terminal, que é o terminal recomendado pela Microsoft para o WSL: ele permite abrir várias abas e painéis e personalizar temas, fontes e atalhos.[^wsl-environment] Se ele ainda não estiver instalado no seu computador, baixe-o pela Microsoft Store.

O Windows Terminal cria um perfil para cada distribuição do WSL instalada, mas abre o PowerShell por padrão.[^terminal-install] Para que ele já abra no Ubuntu, acesse:

`Configurações` > `Inicialização` > `Perfil padrão` > `Ubuntu`

Salve e abra uma nova aba: ela já começa no Ubuntu.

Para deixar o terminal com a cara do meu, uso o tema Drácula. A instalação consiste em colar o esquema de cores no arquivo de configurações do Windows Terminal e ativá-lo nos perfis, e está descrita no [site oficial do tema](https://draculatheme.com/windows-terminal).[^dracula]

<!-- TODO: se quiser, diga em uma frase por que gosta do Drácula. -->

### Fish

O shell é o programa que interpreta os comandos que você digita no terminal. O Ubuntu vem com o Bash, mas eu uso o Fish, um shell que já vem com sugestões automáticas baseadas no seu histórico, autocompletar e realce de sintaxe, sem precisar configurar nada.[^fish] Enquanto você digita, ele sugere em cinza o restante do comando, e basta apertar a seta para a direita para aceitar.

Para instalar a versão mais recente, adicionamos o repositório oficial do Fish e instalamos o pacote:[^fish]

```sh
sudo add-apt-repository ppa:fish-shell/release-4
sudo apt update
sudo apt install fish
```

Agora vamos definir o Fish como o shell padrão do seu usuário:[^fish-docs]

```sh
command -v fish | sudo tee -a /etc/shells
chsh -s "$(command -v fish)"
```

O primeiro comando registra o Fish na lista de shells permitidos do sistema, e o segundo o define como o seu shell. Feche o terminal e abra uma nova aba: a partir de agora, ela já abre no Fish. Ele mostra uma mensagem de boas-vindas toda vez que inicia; para desativá-la, execute:[^fish-faq]

```fish
set -U fish_greeting
```

Por último, vamos instalar o Fisher, um gerenciador de plugins para o Fish.[^fisher] Um gerenciador de plugins instala e atualiza extensões do shell com um comando só. Vamos usá-lo na segunda parte para instalar o gerenciador de versões do Node.

```fish
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

Um aviso importante: o Fish não segue a sintaxe do Bash. Ele define variáveis com o comando `set` em vez de `NOME=valor`, por exemplo.[^fish-bash] Por isso, um comando copiado de um tutorial escrito para o Bash pode não funcionar no Fish. Quando isso acontecer, basta rodá-lo dentro do Bash com `bash -c '<comando>'`. Vamos ver um caso assim na segunda parte, na instalação do GitHub CLI.

### Starship

O prompt é o texto que aparece antes do cursor no terminal. O Starship é um prompt rápido e personalizável que mostra informações úteis sobre a pasta em que você está, como a branch do Git e a versão do Node do projeto.[^starship]

O Starship usa ícones que precisam de uma Nerd Font, uma fonte com símbolos extras, instalada no Windows e selecionada no Windows Terminal.[^starship]

<!-- TODO: diga qual Nerd Font você usa (por exemplo, FiraCode Nerd Font) e onde selecioná-la no Windows Terminal (Configurações > Ubuntu > Aparência > Tipo de fonte). -->

Para instalar o Starship, execute:[^starship]

```fish
curl -sS https://starship.rs/install.sh | sh
```

Agora precisamos pedir ao Fish que inicie o Starship. Para isso, vamos editar o `config.fish`, o arquivo que o Fish lê toda vez que abre e onde ficam as suas configurações.[^fish-docs] Abra-o com o `nano`, um editor de texto simples que roda no próprio terminal:

```fish
nano ~/.config/fish/config.fish
```

Adicione a linha `starship init fish | source` dentro do bloco `if`:

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
end
```

Para salvar e sair do `nano`, use `Ctrl + O`, `Enter` e `Ctrl + X`. As mudanças no `config.fish` só valem para os terminais abertos depois delas, então abra uma nova aba para ver o novo prompt.

### Ferramentas de linha de comando

Com o shell e o prompt prontos, vamos instalar quatro ferramentas que substituem comandos clássicos do terminal por versões mais práticas.

#### bat

O bat é um substituto do `cat`, o comando que mostra o conteúdo de um arquivo no terminal, só que com realce de sintaxe e integração com o Git.[^bat] Para instalar:

```fish
sudo apt install bat
```

No Ubuntu, o comando é instalado com o nome `batcat`, por causa de um conflito com outro pacote.[^bat] Para usá-lo como `bat`, criamos um atalho (um link simbólico) na pasta `~/.local/bin`:[^bat]

```fish
mkdir -p ~/.local/bin
ln -s /usr/bin/batcat ~/.local/bin/bat
```

Falta um detalhe: o terminal só encontra os programas que estão nas pastas listadas no `PATH`, uma variável com a lista de pastas onde ele procura os comandos que você digita. Por isso, vamos adicionar a `~/.local/bin` ao `PATH` no `config.fish`:

```fish
nano ~/.config/fish/config.fish
```

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
    set -gx PATH "$HOME/.local/bin" $PATH
end
```

Abra uma nova aba e teste com `bat ~/.config/fish/config.fish`.

#### zoxide

O zoxide é um `cd` mais esperto: ele lembra das pastas que você mais acessa e permite pular para elas digitando só parte do nome.[^zoxide] Por exemplo, depois de entrar uma vez em `~/projetos/meu-blog`, basta digitar `z blog` de qualquer lugar para voltar a ela. Para instalar:[^zoxide]

```fish
curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh
```

O script instala o zoxide na pasta `~/.local/bin`, que já adicionamos ao `PATH`.[^zoxide] Agora adicione `zoxide init fish | source` ao final do bloco `if` no `config.fish`:[^zoxide]

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
    set -gx PATH "$HOME/.local/bin" $PATH
    zoxide init fish | source
end
```

#### eza

O eza é uma alternativa ao `ls`, o comando que lista os arquivos de uma pasta, com cores, ícones e visualização em árvore. O Ubuntu 24.04 tem o eza nos repositórios padrão, mas em uma versão antiga, a 0.18.[^eza-ubuntu] Para ter a versão mais recente, adicionamos o repositório do próprio projeto antes de instalar. A chave GPG baixada no quarto comando permite ao `apt` confirmar que os pacotes vêm mesmo desse repositório:[^eza]

```fish
sudo apt update
sudo apt install -y gpg
sudo mkdir -p /etc/apt/keyrings
wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | sudo gpg --dearmor -o /etc/apt/keyrings/gierens.gpg
echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | sudo tee /etc/apt/sources.list.d/gierens.list
sudo chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list
sudo apt update
sudo apt install -y eza
```

Experimente `eza --icons` para listar a pasta atual com ícones e `eza --tree --level=2` para ver as pastas em árvore, até dois níveis.

<!-- TODO: se você usa aliases para o eza (por exemplo, `ls` apontando para `eza --icons`), mostre-os aqui. -->

#### fzf

O fzf é uma ferramenta de busca interativa para o terminal.[^fzf] Para instalar:

```fish
sudo apt install fzf
```

Para ativar os atalhos de teclado do fzf no Fish, o pacote do Ubuntu pede que você crie o arquivo de atalhos do usuário com a função `fzf_key_bindings`:[^fzf-debian]

```fish
mkdir -p ~/.config/fish/functions/
echo fzf_key_bindings > ~/.config/fish/functions/fish_user_key_bindings.fish
```

Abra uma nova aba e experimente os atalhos:[^fzf]

- `Ctrl + T`: busca arquivos e pastas e insere o escolhido no comando que você está digitando.
- `Ctrl + R`: busca no histórico de comandos.
- `Alt + C`: busca uma pasta e entra nela.

#### O `config.fish` final

Ao final desta parte, o seu `config.fish` deve estar assim:

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
    set -gx PATH "$HOME/.local/bin" $PATH
    zoxide init fish | source
end
```

Na segunda parte, vamos acrescentar mais algumas linhas a ele.

## Conclusão

Agora você tem tudo o que aparece na tabela do início: um Ubuntu rodando no WSL 2, aberto no Windows Terminal, com o Fish como shell, o Starship no prompt e o bat, o zoxide, o eza e o fzf para trabalhar mais rápido no terminal.

Na [segunda parte](/blog/ferramentas-de-desenvolvimento-no-wsl), vamos completar o ambiente com o Node.js e o pnpm, o Git e o GitHub CLI, o Docker e o editor.

Se alguma etapa não funcionou para você, se encontrou algum erro no guia ou se tem uma ferramenta para recomendar, deixe nos comentários.

[^wsl-install]: [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install), documentação do WSL, Microsoft.

[^wsl-about]: [What is Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about), documentação do WSL, Microsoft.

[^wsl-environment]: [Set up a WSL development environment](https://learn.microsoft.com/en-us/windows/wsl/setup/environment), documentação do WSL, Microsoft.

[^wsl-filesystems]: [Working across file systems](https://learn.microsoft.com/en-us/windows/wsl/filesystems), documentação do WSL, Microsoft.

[^terminal-install]: [Windows Terminal installation](https://learn.microsoft.com/en-us/windows/terminal/install), documentação do Windows Terminal, Microsoft.

[^dracula]: [Dracula for Windows Terminal](https://draculatheme.com/windows-terminal), Dracula Theme.

[^fish]: [fish shell](https://fishshell.com/), site oficial do Fish.

[^fish-docs]: [Introduction](https://fishshell.com/docs/current/index.html), documentação do Fish 4.

[^fish-faq]: [Frequently asked questions](https://fishshell.com/docs/current/faq.html), documentação do Fish 4.

[^fish-bash]: [Fish for bash users](https://fishshell.com/docs/current/fish_for_bash_users.html), documentação do Fish 4.

[^fisher]: [Fisher](https://github.com/jorgebucaran/fisher), Jorge Bucaran.

[^starship]: [Starship](https://starship.rs/guide/), documentação do Starship.

[^bat]: [bat](https://github.com/sharkdp/bat), David Peter.

[^zoxide]: [zoxide](https://github.com/ajeetdsouza/zoxide), Ajeet D'Souza.

[^eza-ubuntu]: [Package: eza](https://packages.ubuntu.com/noble/eza), pacotes do Ubuntu 24.04.

[^eza]: [Installation](https://github.com/eza-community/eza/blob/main/INSTALL.md), documentação do eza.

[^fzf]: [fzf](https://github.com/junegunn/fzf), Junegunn Choi.

[^fzf-debian]: [README.Debian](https://salsa.debian.org/go-team/packages/fzf/-/raw/master/debian/README.Debian), pacote do fzf no Debian.
