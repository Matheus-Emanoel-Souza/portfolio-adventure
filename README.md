# Portfolio Adventure

Portfólio pessoal de **Matheus Emanoel Souza** com identidade visual em pixel
art / RPG retro-futurista. Funciona como uma pequena aventura navegável (mapa,
quests, skill tree, conquistas, **Career Graph**) e, ao mesmo tempo, como um
portfólio profissional direto ao ponto via **Quick Mode**, pensado pra
recrutadores.

O **Career Graph** (`/adventure/career`) é a exceção proposital à estética
pixel art: a trajetória acadêmica/profissional é desenhada como um histórico
Git, com branches `career`/`education` compartilhando o mesmo eixo temporal
vertical. Ver "Career Graph" abaixo.

🔗 **Teste ao vivo:** https://matheus-emanoel-souza.github.io/portfolio-adventure/

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build/dev server)
- [React Router](https://reactrouter.com/) (`HashRouter` — ver seção GitHub Pages)
- [Framer Motion](https://motion.dev/) (transições e microinterações)
- CSS puro com CSS Modules + custom properties (design tokens) — sem
  framework de UI
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (testes)
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) (lint)
- GitHub Actions (CI/CD) → GitHub Pages

GSAP e Three.js/React Three Fiber estão na stack preferencial do projeto mas
**não foram adicionados ainda** — só entram quando um elemento concreto
justificar o custo (ver "Próximos passos").

## Rodando localmente

Pré-requisito: Node 20+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Outros scripts:

```bash
npm run lint       # oxlint
npm run test       # vitest (watch)
npm run test -- --run   # vitest (uma vez, usado no CI)
npm run build       # tsc -b && vite build → dist/
npm run preview     # serve dist/ localmente pra conferir o build de produção
```

## Estrutura do projeto

```
src/
  main.tsx, App.tsx        # bootstrap + shell (HashRouter, providers)
  routes/                  # lazy imports das páginas + árvore de rotas
  layouts/                 # AdventureLayout (HUD + navegação do hub)
  pages/
    Home/                  # tela inicial
    QuickMode/              # versão tradicional pra recrutadores
    Adventure/              # AdventureMap, About, Projects, SkillTree,
                             # Achievements, CareerGraph, Contact
  components/              # PixelButton, PixelPanel, XPBar, StatusTag,
                             # QuestCard, EmptyState, Loading...
  features/
    game-progress/          # XP/level/achievements (lógica pura + Context)
    career-graph/            # Career Graph: layout/geometria + componentes
                             # (ver seção própria abaixo)
  data/                     # profile.ts, projects.ts, skills.ts,
                             # achievements.ts, career.ts — única fonte de
                             # conteúdo, sem nada hardcoded na UI
  types/                    # tipos compartilhados
  hooks/                    # useLocalStorage, useReducedMotion, useDocumentTitle
  i18n/                     # PT/EN — só texto de interface (ver abaixo)
  styles/                   # tokens.css (design tokens) + globals.css
```

### Idioma (PT/EN)

O switcher PT/EN (Home, HUD da aventura, header do Quick Mode) troca só o
**texto de interface** — labels, botões, menus — definido em
`src/i18n/pt.ts` e `src/i18n/en.ts`, com o formato garantido em
`src/i18n/types.ts` (`en.ts` não compila se faltar alguma chave). Preferência
persiste em `localStorage`.

O **conteúdo** de `src/data/*.ts` (bio, projetos, carreira) continua numa
língua só — a que você escrever — por decisão de escopo: traduzir cada
projeto/quest exigiria manter tudo em `{pt, en}` e dobraria o trabalho de
preencher o portfólio depois.

### Onde editar conteúdo

Todo o conteúdo real fica em `src/data/*.ts`, tipado e separado da UI:

| Arquivo                 | O que preencher                                          |
| ------------------------ | --------------------------------------------------------- |
| `data/profile.ts`        | bio, localização, Player Stats, LinkedIn                  |
| `data/projects.ts`       | quests reais (nome, status, problema/solução, links, `skillIds`) |
| `data/skills.ts`         | tecnologias por categoria (frontend/backend/db/devops/tools/arquitetura) |
| `data/career.ts`         | Career Graph — experiências (`branch: 'career'`), formação formal (`branch: 'education'`) e cursos/certificações (`branch: 'courses'`) |
| `data/achievements.ts`   | regras de desbloqueio (todas determinísticas, a partir dos dados acima) |

Os arquivos já têm comentários `TODO` nos campos que só devem ser preenchidos
com informação real — nada de conteúdo fictício foi adicionado.

## Career Graph

`/adventure/career` representa a trajetória como um "repositório": cada
experiência/formação/curso é um `CareerEvent` (`src/types/career.ts`) numa
branch — `career` (emprego/estágio), `education` (graduação/curso técnico —
formação formal e longa) ou `courses` (curso online, bootcamp, certificação
menor, estudo pontual — mais curto/avulso que `education`).

**Adicionar uma experiência, formação ou curso novo:** acrescente um objeto
em `src/data/career.ts` com `branch`, `commitType` (`init`/`feat`/
`refactor`/`milestone`/`study`/`cert`/`course` — estilo Conventional
Commits), `title`, `organization`, `sortDate` ("YYYY-MM", só pra ordenar no
eixo temporal), `period` (texto livre exibido, ex. "Julho de 2025 — atual"),
`current` (opcional) e `description`. `technologies` fica disponível pra
quando houver stack confirmada pra listar — nunca preencher com achismo.

**Trilha agrupada de cursos:** quando vários cursos pequenos relacionados
não justificam um commit cada (poluiria o graph), agrupe-os num único
`CareerEvent` da branch `courses` usando `items: string[]` — a lista aparece
inteira no card de detalhes ao selecionar aquele commit. Um curso isolado
relevante o bastante pode continuar como commit próprio, sem `items`.

**Como o graph é montado** (`src/features/career-graph/`):

- `careerGraph.utils.ts` — lógica pura, testada isoladamente
  (`careerGraph.utils.test.ts`): `layoutCareerEvents` ordena todos os eventos
  (das três branches juntas) por `sortDate` decrescente e atribui uma linha
  (`row`) sequencial — é isso que faz `career`/`education`/`courses`
  compartilharem o mesmo eixo vertical, em vez de timelines independentes.
  `buildBranchLanes` calcula onde cada branch começa/termina;
  `buildYearGutter` decide em qual linha mostrar cada rótulo de ano;
  `findHeadEvent` acha o cargo atual (`current: true` na branch `career`) pro
  badge HEAD.
- **Hash do commit**: `shortHash(id)` — FNV-1a determinístico a partir do
  `id` do evento, nunca `Math.random()`. O mesmo evento sempre mostra o
  mesmo hash curto.
- `careerGraph.config.ts` — geometria compartilhada entre o SVG (linhas das
  branches) e o layout HTML (linhas de conteúdo), e o `BRANCH_META` (cor,
  ordem e chaves de i18n de cada branch — é o único lugar que sabe quantas
  branches existem; nenhum componente tem `if branch === 'career' ...`
  espalhado).
- Componentes (`CareerGraph`, `CareerGraphHeader`, `CareerGraphFilters`,
  `CareerGraphPaths`, `CareerGraphNode`, `CareerGraphRow`,
  `CareerCommitCard`, `CareerGraphLegend`) — cada um com uma responsabilidade
  só; a seleção de commit e o filtro de branch (all/career/education/courses,
  por destaque/dimming, não remoção) vivem em `CareerGraph.tsx`.

**Adicionar uma branch nova** (ex. `projects`): estender a union
`CareerBranch` em `src/types/career.ts`, adicionar uma entrada em
`BRANCH_META` (`careerGraph.config.ts`) com cor/ordem/chaves de i18n (+ as
chaves correspondentes em `t.careerGraph` nos dois dicionários), e incluir
eventos com esse `branch` em `data/career.ts`. O layout (`layoutCareerEvents`,
`buildBranchLanes`), o SVG e a legenda/filtros já iteram as branches
presentes em `BRANCH_META`/dados — nada hardcoded pra um número fixo.

`Quick Mode` (`/quick`, `src/pages/QuickMode/CareerTimeline.tsx`) reusa a
mesma `data/career.ts` — via `withTimelineMarkers`/`layoutCareerEvents` do
Career Graph (`careerTimeline.utils.ts` só adiciona a posição horizontal
proporcional ao tempo) — numa timeline horizontal simplificada, só a branch
`career`, mais antigo pra mais recente (esquerda pra direita). O mesmo
marcador "atual" do Career Graph vira o ponto **HEAD** no fim da linha
quando o cargo em andamento tiver `sortDate` no passado. `education` some
numa lista secundária discreta abaixo da timeline; `courses` fica de fora,
como no graph vertical — uma única fonte de conteúdo pras duas visões.

### Showcase de projetos (Quick Mode)

`src/pages/QuickMode/ProjectShowcase.tsx` + `ProjectPanel.tsx` — um painel
horizontal por `Project` (mesmos campos de `data/projects.ts`, sem campo
novo), navegação via CSS Scroll Snap (arraste/swipe/trackpad) + setas +
indicador de posição, sem carousel automático. Pra adicionar screenshots a
um projeto, preencha `screenshots: string[]` (caminhos de imagem) em
`data/projects.ts` — o painel mostra até 2 lado a lado com o texto quando o
campo existir; sem `screenshots`, o texto ocupa a largura toda (nunca usa
imagem fictícia). O CTA de GitHub abaixo do showcase usa
`profile.social.github` (nunca hardcoded).

## Gamificação

`src/features/game-progress` calcula XP/level a partir de dado real
(quantidade de projetos concluídos/em andamento, achievements desbloqueados,
eventos de carreira) e guarda em `localStorage` quais seções do hub já foram
visitadas. Nenhuma métrica é simulada ou aleatória.

## Acessibilidade

- Skip link, `:focus-visible` consistente, navegação 100% por teclado.
- `prefers-reduced-motion` desliga animações CSS globalmente e as variantes
  do Framer Motion (`useReducedMotion`).
- Componentes interativos (Skill Tree, cards) são `<button>`/`<a>` reais.
- HUD (XP bar) usa `role="progressbar"` com `aria-value*`.

## GitHub Pages

O repositório é publicado como **Project Page**
(`usuario.github.io/portfolio-adventure/`), o que exige dois ajustes:

1. `vite.config.ts` define `base: '/portfolio-adventure/'`.
2. O roteamento usa **`HashRouter`** (URLs como `#/adventure/projects`) em vez
   de `BrowserRouter`. GitHub Pages não faz rewrite de servidor pra SPA — sem
   hash, dar refresh numa rota aninhada resultaria em 404. Com hash, o
   navegador sempre serve `index.html` e o React Router assume o roteamento.

### Deploy

`.github/workflows/deploy.yml` builda e publica automaticamente a cada push
em `main`: `npm ci` → lint → testes → build → `actions/deploy-pages`.

Configuração única no repositório (uma vez): em **Settings → Pages**, define
a source como **GitHub Actions**.

## Testes

Smoke tests em `src/App.test.tsx` cobrem a Home, a navegação pro hub da
aventura e pro Quick Mode, e a seleção de commit no Career Graph.
`src/features/career-graph/careerGraph.utils.test.ts` cobre a lógica pura de
layout (ordenação, hash determinístico, lanes, gutter de anos, marcadores de
início/atual). `src/pages/QuickMode/QuickMode.test.tsx` cobre o showcase de
projetos (render, navegação por seta/bolinha, link de GitHub individual e
CTA geral), a timeline horizontal (branch `career` só, ordem cronológica,
HEAD, seleção) e o contato (Email/LinkedIn/WhatsApp, GitHub ausente, links
corretos); `careerTimeline.utils.test.ts` cobre a lógica pura de posição
horizontal/HEAD isoladamente. Rodar com `npm run test -- --run`.

## Próximos passos sugeridos

1. Preencher `src/data/*.ts` com conteúdo real (bio, projetos, mais eventos
   de carreira) — a estrutura já está pronta pra isso.
2. Screenshots reais dos projetos (hoje o campo `screenshots` é opcional).
3. Avaliar uma cena 3D leve e lazy-loaded (React Three Fiber) só no hero da
   Home, se agregar valor visual sem pesar o bundle inicial.
4. GSAP só se surgir uma animação de timeline/sequência que o Framer Motion
   não resolva bem (ex.: desenhar as conexões da Skill Tree).
5. Domínio customizado (CNAME), se desejado, no lugar do Project Page atual.
