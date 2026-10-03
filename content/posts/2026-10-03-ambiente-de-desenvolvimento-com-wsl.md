---
title: 'Como configurar um ambiente de desenvolvimento com o WSL'
summary: 'Primeira parte do guia: instale o WSL e deixe o terminal pronto com Windows Terminal, Fish, Starship e ferramentas de linha de comando.'
date: 2026-10-03
author: 'João Vitor'
lang: pt-BR
draft: true
---

<!-- Introdução (sem heading) -->

- O problema: quem programa no Windows esbarra em ferramentas e tutoriais pensados para Linux/macOS.
- A promessa da série: seguindo as duas partes, o leitor sai com um ambiente pronto do zero, o mesmo que você usa. Esta parte termina com o terminal pronto; a segunda, com Node, Git, Docker e editor (link para a Parte 2).
- Contexto: atualiza o post do TabNews (link) e o gist (link). Uma frase só, sem contar a história.
- Como ler: cada seção é uma etapa, na ordem em que deve ser feita, e as etapas dependem das anteriores.
- Requisitos: Windows 10/11 com virtualização ativada, conta de administrador. <!-- cite: requisitos de versão do Windows para `wsl --install` -->

## O que você vai ter no final

- Uma tabela com cada ferramenta desta parte, para que serve, em uma frase para o iniciante, e em qual seção aparece. Ela também serve de índice:
  - WSL + Ubuntu, Windows Terminal, Fish, Starship, bat, zoxide, eza, fzf.
- Opcional: um print do terminal pronto (Fish + Starship + Drácula) para mostrar o destino.

## Instalando o WSL

- Conceito: o que é o WSL, explicado para iniciante (um Linux de verdade rodando dentro do Windows, sem dual boot nem máquina virtual tradicional). <!-- cite: o que é o WSL 2 e como ele roda o kernel Linux -->
- Bloco de código: `wsl --install` no PowerShell como administrador.
- O que acontece depois: reiniciar, a janela do Ubuntu abre, criar usuário e senha. Explique que essa senha é a do `sudo` e que nada aparece enquanto ela é digitada.
- Verificação: `wsl -l -v` mostra o Ubuntu na versão 2.
- Dica: onde ficam os arquivos (`\\wsl$`) e por que os projetos devem ficar no Linux (`~`), não em `/mnt/c`. <!-- cite: desempenho de arquivos no sistema de arquivos do Linux vs /mnt/c -->

## Atualizando o Ubuntu

- Conceito: o que é o `apt` e o `sudo`, em uma frase cada.
- Bloco de código: `sudo apt update && sudo apt full-upgrade -y`.

## Configurando o terminal

### Windows Terminal

- Instalar pela Microsoft Store (já vem no Windows 11?). <!-- cite: Windows Terminal já vem instalado no Windows 11 -->
- Definir o Ubuntu como perfil padrão: `Configurações` > `Perfil Padrão` > `Ubuntu`.
- Tema Drácula: link para os passos oficiais, sem repetir.

### Fish

- Conceito: o que é um shell e por que trocar o Bash (sugestões automáticas, realce de sintaxe, pouca configuração).
- Bloco de código: PPA + instalação, depois `chsh` para virar o shell padrão.
- `set -U fish_greeting` para tirar a mensagem de boas-vindas.
- fisher: o que é um gerenciador de plugins e o comando de instalação.
- Aviso: comandos de outros tutoriais escritos para Bash podem não funcionar no Fish (a Parte 2 mostra um caso, na instalação do gh).

### Starship

- Conceito: o prompt é o texto antes do cursor, e o Starship mostra branch do Git, versão do Node etc.
- Bloco de código: instalação e a linha no `config.fish`.
- Conceito para iniciante: o que é o `config.fish`, como editar com `nano` (`Ctrl + O`, `Enter`, `Ctrl + X`) e por que abrir uma nova aba.

### Ferramentas de linha de comando

- Uma subseção curta por ferramenta, cada uma com: o que substitui, um exemplo de uso e o comando de instalação.
  - bat (`cat`): o link simbólico `batcat` → `bat` e o `PATH` com `~/.local/bin`. Explique o que é o `PATH` aqui, na primeira vez que ele aparece.
  - zoxide (`cd`): exemplo de `z` com parte do nome da pasta.
  - eza (`ls`): repositório próprio com chave GPG. Explique em uma frase por que alguns pacotes vêm de fora do `apt` padrão.
  - fzf: `Ctrl + T` e os atalhos no Fish.
- Bloco de código: o `config.fish` como fica ao final desta parte (Starship, `PATH`, zoxide), para o leitor conferir o dele. A Parte 2 acrescenta as linhas do nvm e do pnpm.

## Conclusão

- Volte à tabela do início: o leitor tem tudo aquilo funcionando.
- Próximo passo: a Parte 2 (link), com Node, Git, Docker e o editor.
- Convite para os comentários (Giscus): dúvidas, erros no guia ou ferramentas que você recomenda.
