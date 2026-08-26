import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loading } from '@/components/Loading/Loading'
import { AdventureLayout } from '@/layouts/AdventureLayout'
import * as Pages from './lazyPages'

/** Árvore de rotas. HashRouter (ver App.tsx) garante refresh funcionando no GitHub Pages. */
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Pages.Home />
          </Suspense>
        }
      />
      <Route
        path="/quick"
        element={
          <Suspense fallback={<Loading />}>
            <Pages.QuickMode />
          </Suspense>
        }
      />

      <Route path="/adventure" element={<AdventureLayout />}>
        <Route index element={<Pages.AdventureMap />} />
        <Route path="about" element={<Pages.About />} />
        <Route path="projects" element={<Pages.Projects />} />
        <Route path="skills" element={<Pages.SkillTree />} />
        <Route path="achievements" element={<Pages.Achievements />} />
        <Route path="career" element={<Pages.CareerGraph />} />
        <Route path="contact" element={<Pages.Contact />} />
      </Route>

      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <Pages.NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}
