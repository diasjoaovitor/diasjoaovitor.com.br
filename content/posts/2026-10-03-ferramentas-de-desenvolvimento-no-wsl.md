---
title: 'Ferramentas de desenvolvimento no WSL: Node, Git, Docker e editor'
summary: 'Segunda parte do guia: complete o ambiente no WSL com Node e pnpm, Git e GitHub CLI, Docker e o editor Antigravity.'
date: 2026-10-03
author: 'João Vitor'
lang: pt-BR
draft: true
---

<!-- Introdução (sem heading) -->

- Retome a série: esta é a segunda parte e termina com o ambiente completo, pronto para o primeiro projeto.
- Pré-requisito: o terminal configurado na Parte 1 (link). Os comandos daqui usam o Fish e o fisher instalados lá.
- Como ler: as seções seguem a ordem de instalação. O Antigravity fica por último porque é configurado como editor do Git.

## O que você vai ter no final

- Uma tabela com cada ferramenta desta parte, para que serve, em uma frase para o iniciante, e em qual seção aparece. Ela também serve de índice:
  - nvm.fish + Node + pnpm, Git + gh, Docker Desktop, Antigravity.

## Node.js e pnpm

- Conceito: por que usar um gerenciador de versões em vez de instalar o Node direto (projetos diferentes pedem versões diferentes, sem `sudo`).
- Bloco de código: `fisher install jorgebucaran/nvm.fish`, `nvm install lts/krypton`, `set --universal nvm_default_version lts/krypton`. <!-- cite: Node.js 24 "Krypton" é a LTS ativa em outubro de 2026 -->
- Por que `nvm use default --silent` no `config.fish`.
- pnpm: o que é, a vantagem sobre o npm em uma frase e o comando de instalação (`npm i -g pnpm`, com o npm que vem junto com o Node). <!-- cite: vantagem do pnpm sobre o npm (store compartilhada, links) -->
- Verificação: `node -v` e `pnpm -v`.
- Bloco de código: o `config.fish` final completo (o da Parte 1 mais `nvm use default --silent` e o bloco do pnpm), para o leitor conferir o dele.

## Git e GitHub CLI

- O Git já vem no Ubuntu: configurar nome, e-mail e editor (`git config --global ...`).
- gh: o que é, a instalação via `bash -c` (por que não roda direto no Fish, retomando o aviso da Parte 1) e `gh auth login`.
- Por que o `gh` também resolve as credenciais do Git (o `credential.helper` que ele configura). <!-- cite: gh auth setup-git / credential helper -->
- Opcional: seus aliases (`git s`, `git l`, `git c`) como bloco de código, com uma frase sobre cada um. O glab entra só se o leitor usar GitLab, em uma linha.

## Docker

- Conceito: o que são containers, em duas frases, e por que ajudam (banco de dados local sem instalar nada no sistema).
- Docker Desktop no Windows com a integração WSL (link para a doc). <!-- cite: Docker Desktop com backend WSL 2 -->
- Aviso: o app do Docker Desktop precisa estar aberto para o comando `docker` funcionar no WSL.
- Verificação: `docker run hello-world`.

## Antigravity

- O que é: um editor do Google, baseado no VS Code, com agentes de IA integrados. Diga em uma frase por que você o escolheu (o que ele trouxe em relação ao Cursor). <!-- cite: o que é o Google Antigravity e em que ele se baseia -->
- Instalação no Windows e conexão com o WSL: como abrir uma pasta do Linux (comando no terminal ou extensão remota). Confira o fluxo atual na doc. <!-- cite: Antigravity com WSL -->
- Definir como editor do Git: `git config --global core.editor "antigravity-ide --wait"` e por que o `--wait` é necessário.
- Opcional: um print do editor aberto em um projeto no WSL.

## Menções honrosas

- Claude Code: em um parágrafo curto, o que é (agente de IA no terminal), o comando de instalação e um link. Sem tutorial. <!-- cite: instalação do Claude Code -->
- Extensões do editor: a lista enxuta, atualizada a partir do gist (ESLint, Prettier, EditorConfig, Code Spell Checker, GitLens etc.), com uma linha cada. Tire as que não usa mais (Live Server, Live Share?).

## Conclusão

- Feche a série: com as duas partes, o leitor tem o ambiente completo, do terminal ao editor.
- Próximo passo concreto: criar um projeto para testar (por exemplo `pnpm create next-app`) e abrir no Antigravity.
- Convite para os comentários (Giscus): dúvidas, erros no guia ou ferramentas que você recomenda.
