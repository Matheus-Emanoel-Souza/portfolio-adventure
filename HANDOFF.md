# Handoff — Portfolio Adventure

Estado do projeto em 2026-08-27. Pra quem (ou o "eu" futuro) continuar sem
reler todo o histórico do chat.

**Atualização 2026-08-27 (2):** Botão de download do currículo — Hero do
Quick Mode (principal) e About/Player Profile do Adventure Mode
(secundário), os dois lendo `profile.resumeUrl` (fonte única,
`src/data/profile.ts`, montada com `import.meta.env.BASE_URL` pra funcionar
sob `/portfolio-adventure/` no GitHub Pages). Nome do arquivo centralizado
em `RESUME_FILE_NAME`. Ícone novo `DownloadIcon` (mesmo padrão pixel dos
outros ícones de contato). **Pendência:** o PDF em si ainda não foi
adicionado — falta colocar `Matheus-Emanoel-Curriculo.pdf` em
`public/resume/` (pasta ainda não existe) antes do próximo deploy, senão o
botão 404. Ver seção "Currículo (PDF)" do README.

**Atualização 2026-08-27:** Redesign do Quick Mode (`src/pages/QuickMode/`),
sem tocar no Career Graph do Adventure Mode. Três mudanças principais:
(1) Projetos virou showcase horizontal (`ProjectShowcase.tsx` +
`ProjectPanel.tsx`) — um painel por `Project`, CSS Scroll Snap (sem lib de
carousel), setas + indicador de posição, CTA de GitHub geral abaixo (o link
de GitHub saiu de Contato); (2) Trajetória virou timeline horizontal
(`CareerTimeline.tsx` + `careerTimeline.utils.ts`) — só a branch `career`,
mais antigo → mais recente, reusando o mesmo `withTimelineMarkers` do Career
Graph pro ponto HEAD; `education` ficou numa lista secundária discreta;
(3) Contato virou três cards grandes (Email/LinkedIn/WhatsApp, sem GitHub),
com ícones novos em pixel art (`components/icons/{Email,LinkedIn,GitHub}Icon.tsx`,
mesmo padrão do `WhatsAppIcon`). Testes em
`src/pages/QuickMode/QuickMode.test.tsx` e `careerTimeline.utils.test.ts`.

**Atualização 2026-08-26:** `data/timeline.ts` + página `QuestLog` foram
substituídos por `data/career.ts` + `/adventure/career` (**Career Graph**) —
trajetória desenhada como histórico Git (branches compartilhando o mesmo
eixo temporal vertical). Detalhes na seção "Career Graph" do README. Rota
`quest-log` não existe mais; é `career` agora. Também foi adicionado um
canal de WhatsApp em Contato (`profile.social.whatsapp`,
`src/lib/whatsapp.ts`) com link "click to chat" pré-preenchido.

**Atualização 2026-08-26 (2):** Career Graph ganhou uma terceira branch,
`courses` (cursos/bootcamps/certificações menores — diferente de `education`,
que é formação formal e longa: graduação, técnico). Sem eventos reais
cadastrados ainda — só a arquitetura (tipo, cor, filtro `COURSES`, legenda)
já pronta. `CareerEvent` ganhou `items?: string[]` opcional pra agrupar
vários cursos pequenos relacionados num único commit ("trilha"), em vez de
um commit por curso. `BRANCH_META` (`careerGraph.config.ts`) agora carrega
também a chave de i18n de cada branch (`labelKey`/`filterLabelKey`) — Legend
e Filters passaram a ler daí em vez de `if (branch === 'career') ...`, então
adicionar uma quarta branch não exige mexer nesses componentes.

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
                             Achievements,CareerGraph,Contact}
  components/                # PixelButton, PixelPanel, QuestCard, XPBar,
                             # CopyButton, LanguageSwitcher, EmptyState...
  features/game-progress/    # XP/level/achievements — lógica pura testável
                             # + Context (localStorage)
  features/career-graph/     # Career Graph: layout puro + componentes —
                             # única página fora da estética pixel art
  i18n/                      # PT/EN — só texto de interface (ver abaixo)
  data/                      # profile/projects/skills/achievements/career
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
  quase tudo já desbloqueado agora que `projects.ts`/`career.ts` têm dado real.

## Conteúdo real já preenchido

- `data/profile.ts`: nome, GitHub, e-mail pessoal
  (`matheusemanoelgomessouza@gmail.com`), LinkedIn, WhatsApp.
- `data/skills.ts`: só o que este próprio repo comprova (React, TS, Vite,
  CSS, Framer Motion, Git, GitHub Actions).
- `data/career.ts`: 5 eventos reais — TechnipFMC, FIBRASA, OGMO-ES, Oncovit
  (branch `career`) e UCL/Engenharia da Computação (branch `education`).
- `data/projects.ts`: RadarTorres, Smart Taskbar, FaturamentoAnalytics,
  LearnDeck.

## Pendente (TODO explícito no código)

- `data/profile.ts`: localização.
- `data/career.ts`: `technologies` fica vazio até haver stack confirmada por
  evento — não preencher por achismo.
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
navega pro Quick Mode, troca idioma, copy button dá feedback, nav mostra
Career Graph (não Quest Log), seleção de commit no Career Graph funciona.
`src/features/career-graph/careerGraph.utils.test.ts` — lógica pura de
layout. Rodar com `npm run test -- --run`.

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
