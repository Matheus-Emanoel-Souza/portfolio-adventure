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
| `data/career.ts`         | Career Graph — experiências (`branch: 'career'`) e formação (`branch: 'education'`) |
| `data/achievements.ts`   | regras de desbloqueio (todas determinísticas, a partir dos dados acima) |

Os arquivos já têm comentários `TODO` nos campos que só devem ser preenchidos
com informação real — nada de conteúdo fictício foi adicionado.

## Career Graph

`/adventure/career` representa a trajetória como um "repositório": cada
experiência/formação é um `CareerEvent` (`src/types/career.ts`) numa branch —
hoje `career` (emprego/estágio) ou `education` (graduação/curso/certificação).

**Adicionar uma experiência ou formação nova:** acrescente um objeto em
`src/data/career.ts` com `branch`, `commitType` (`init`/`feat`/`refactor`/
`milestone`/`study`/`cert` — estilo Conventional Commits), `title`,
`organization`, `sortDate` ("YYYY-MM", só pra ordenar no eixo temporal),
`period` (texto livre exibido, ex. "Julho de 2025 — atual"), `current`
(opcional) e `description`. `technologies` fica disponível pra quando houver
stack confirmada pra listar — nunca preencher com achismo.

**Como o graph é montado** (`src/features/career-graph/`):

- `careerGraph.utils.ts` — lógica pura, testada isoladamente
  (`careerGraph.utils.test.ts`): `layoutCareerEvents` ordena todos os eventos
  (das duas branches juntas) por `sortDate` decrescente e atribui uma linha
  (`row`) sequencial — é isso que faz `career`/`education` compartilharem o
  mesmo eixo vertical, em vez de duas timelines independentes.
  `buildBranchLanes` calcula onde cada branch começa/termina;
  `buildYearGutter` decide em qual linha mostrar cada rótulo de ano;
  `findHeadEvent` acha o cargo atual (`current: true` na branch `career`) pro
  badge HEAD.
- **Hash do commit**: `shortHash(id)` — FNV-1a determinístico a partir do
  `id` do evento, nunca `Math.random()`. O mesmo evento sempre mostra o
  mesmo hash curto.
- `careerGraph.config.ts` — geometria compartilhada entre o SVG (linhas das
  branches) e o layout HTML (linhas de conteúdo), e o `BRANCH_META` (cor +
  ordem de cada branch).
- Componentes (`CareerGraph`, `CareerGraphHeader`, `CareerGraphFilters`,
  `CareerGraphPaths`, `CareerGraphNode`, `CareerGraphRow`,
  `CareerCommitCard`, `CareerGraphLegend`) — cada um com uma responsabilidade
  só; a seleção de commit e o filtro de branch (all/career/education, por
  destaque/dimming, não remoção) vivem em `CareerGraph.tsx`.

**Adicionar uma branch nova** (ex. `projects`): estender a union
`CareerBranch` em `src/types/career.ts`, adicionar uma entrada em
`BRANCH_META` (`careerGraph.config.ts`) com cor/ordem, e incluir eventos com
esse `branch` em `data/career.ts`. O layout (`layoutCareerEvents`,
`buildBranchLanes`) já itera as branches presentes nos dados — nada
hardcoded pra exatamente duas.

`Quick Mode` (`/quick`) reusa a mesma `data/career.ts` (via
`layoutCareerEvents`) numa lista simples, sem o graph — uma única fonte de
conteúdo pras duas visões.

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
layout (ordenação, hash determinístico, lanes, gutter de anos). Rodar com
`npm run test -- --run`.

## Próximos passos sugeridos

1. Preencher `src/data/*.ts` com conteúdo real (bio, projetos, mais eventos
   de carreira) — a estrutura já está pronta pra isso.
2. Screenshots reais dos projetos (hoje o campo `screenshots` é opcional).
3. Avaliar uma cena 3D leve e lazy-loaded (React Three Fiber) só no hero da
   Home, se agregar valor visual sem pesar o bundle inicial.
4. GSAP só se surgir uma animação de timeline/sequência que o Framer Motion
   não resolva bem (ex.: desenhar as conexões da Skill Tree).
5. Domínio customizado (CNAME), se desejado, no lugar do Project Page atual.
