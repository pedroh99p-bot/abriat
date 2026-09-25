# ABRIAT — Instruções do projeto

## Objetivo

Manter uma landing page mobile-first para captação de interessados na ABRIAT — Associação Brasileira dos Instrutores de Armamento e Tiro.

## Fonte de verdade

- Conteúdo e limites: `docs/abriat/PROJECT-BRIEF.md`.
- Sistema visual: `docs/abriat/DESIGN-SYSTEM.md` e imagens em `references/`.
- Interações e eventos: `docs/abriat/CONVERSION-FLOW.md` e `docs/abriat/ANALYTICS.md`.
- Assets e pendências: `docs/abriat/ASSETS.md`.

## Regras obrigatórias

- Preservar a stack React + Vite + TypeScript.
- Projetar primeiro para 390 px e testar 430, 768 e 1365 px.
- Todo CTA de associação aponta para `#quiz`; não duplicar formulários.
- Não inventar telefone, e-mail, URL de Instagram, depoimentos, credenciais, números ou garantias.
- Manter explícito quando um ativo for ilustrativo ou estiver pendente.
- O Assistente ABRIAT só trata de associação e atendimento institucional; nunca fornece orientação técnica sobre armamento.
- Eventos são enviados apenas a `window.dataLayer`; não adicionar IDs de analytics sem fornecimento oficial.
- Manter navegação por teclado, foco visível, rótulos de formulário e suporte a movimento reduzido.

## Verificação antes de entregar

Executar `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`. Fazer QA visual nos viewports documentados e revisar console, overflow, foco, menu, carrosséis, quiz, tabs, FAQ e assistente.
