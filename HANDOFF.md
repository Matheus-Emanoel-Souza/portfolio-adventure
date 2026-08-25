# Handoff — Portfolio Adventure

Estado do projeto em 2026-08-25. Pra quem (ou o "eu" futuro) continuar sem
reler todo o histórico do chat.

## O que é

Portfólio pessoal de Matheus Emanoel Souza. Tema RPG/pixel art, navegável
como "aventura" (`/adventure/*`) e com versão tradicional pra recrutadores
(`/quick`). Publicado no GitHub Pages:
https://matheus-emanoel-souza.github.io/portfolio-adventure/

## Stack

Vite + React 19 + TypeScript, React Router (`HashRouter`), Framer Motion, CSS
Modules puro (sem framework de UI), Vitest + Testing Library, oxlint, GitHub
Actions → GitHub Pages. Sem GSAP nem Three.js/R3F ainda (ver "Próximos
passos").

## Arquitetura (resumo)

```
src/
  App.tsx, routes/          # HashRouter + lazy pages por rota
  layouts/AdventureLayout    # HUD (level/XP, idioma) + nav do hub
  pages/Home, QuickMode, Adventure/{About,Projects,SkillTree,
                             Achievements,QuestLog,Contact}
  components/                # PixelButton, PixelPanel, QuestCard, XPBar,
                             # CopyButton, LanguageSwitcher, EmptyState...
  features/game-progress/    # XP/level/achievements — lógica pura testável
                             # + Context (localStorage)
  i18n/                      # PT/EN — só texto de interface (ver abaixo)
  data/                      # profile/projects/skills/achievements/timeline
                             # — única fonte de conteúdo, tipada
  types/, hooks/, styles/
```

Decisões que importam pra manutenção:

- **HashRouter, não BrowserRouter.** GitHub Pages não faz rewrite de SPA —
  sem hash, refresh numa rota tipo `/adventure/projects` dá 404. Não trocar
  sem também resolver isso (ex.: 404.html com redirect).
- **`vite.config.ts` tem `base: '/portfolio-adventure/'`** — hardcoded pro
  nome deste repo. Se o repo for renomeado, atualizar aqui também.
- **CI usa `npm install`, não `npm ci`.** O `package-lock.json` foi gerado no
  Windows; `npm ci` no runner Ubuntu puxava o binário nativo errado do
  Rollup (bug conhecido do npm com `optionalDependencies`). Não reverter pra
  `npm ci` sem testar num runner Linux primeiro.
- **i18n é caseiro** (`src/i18n`), sem lib. Só traduz *interface* (nav,
  botões, labels). Conteúdo de `data/*.ts` fica numa língua só, por decisão
  explícita — traduzir isso exigiria virar cada campo em `{pt, en}`.
- **Achievements são determinísticos** (`data/achievements.ts` + regras em
  `features/game-progress/gameProgress.ts`) — nunca aleatórios. Hoje quase
  tudo aparece bloqueado porque `projects.ts`/`timeline.ts` estão vazios.

## Conteúdo real já preenchido

- `data/profile.ts`: nome, GitHub, e-mail pessoal
  (`matheusemanoelgomessouza@gmail.com`), LinkedIn.
- `data/skills.ts`: só o que este próprio repo comprova (React, TS, Vite,
  CSS, Framer Motion, Git, GitHub Actions).

## Pendente (TODO explícito no código)

- `data/profile.ts`: bio, localização, Player Stats.
- `data/projects.ts`: **vazio** — nenhuma quest cadastrada ainda.
- `data/timeline.ts`: **vazio** — Quest Log sem trajetória ainda.
- Skills de backend/database/devops/arquitetura: vazias (só entram quando
  houver uso real e verificável).
- Screenshots de projeto (campo opcional em `Project`).

Enquanto vazios, a UI mostra `EmptyState` honesto — não tem dado fictício em
lugar nenhum.

## GitHub Pages / deploy

- Settings → Pages → Source = **GitHub Actions** (já configurado).
- Push em `main` dispara `.github/workflows/deploy.yml`: lint → test → build
  → deploy. ~20-40s ponta a ponta.
- Repo é privado o suficiente pra push exigir colaborador: conta que fez o
  push (`matheusemanoel-oncovit`) precisou ser adicionada como collaborator
  do dono do repo (`Matheus-Emanoel-Souza`) — já feito, mas se trocar de
  máquina/conta, checar de novo.

## Testes

`src/App.test.tsx` — smoke tests: Home renderiza, navega pra Adventure Map,
navega pro Quick Mode, troca idioma, copy button dá feedback. Rodar com
`npm run test -- --run`.

`src/test/setup.ts` tem mocks de `matchMedia` e `clipboard` — jsdom não
implementa nenhum dos dois nativamente.

## Próximos passos sugeridos (ordem)

1. Preencher `data/*.ts` com conteúdo real — é o maior ganho de valor agora,
   o resto (UI/infra) já está pronto.
2. Screenshots reais dos projetos.
3. Cena 3D lazy (React Three Fiber) só no hero da Home, se agregar — não
   implementado ainda, custo zero até decidir.
4. GSAP só se a Skill Tree ganhar conexões animadas que Framer Motion não
   resolva bem.
5. Domínio customizado, se quiser, no lugar do Project Page atual.

## Comandos úteis

```bash
npm run dev                 # local, http://localhost:5173
npm run lint                 # oxlint — se der erro de parse JSON estranho,
                             # rodar via `rtk proxy npm run lint` (hook do
                             # RTK confunde saída do oxlint com ESLint)
npm run test -- --run
npm run build && npm run preview
```
