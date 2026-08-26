import { lazy } from 'react'

/**
 * Code-splitting por rota: cada página vira um chunk separado, carregado só
 * quando o visitante navega até ela.
 */
export const Home = lazy(() => import('@/pages/Home/Home'))
export const QuickMode = lazy(() => import('@/pages/QuickMode/QuickMode'))
export const AdventureMap = lazy(() => import('@/pages/Adventure/AdventureMap'))
export const About = lazy(() => import('@/pages/Adventure/About'))
export const Projects = lazy(() => import('@/pages/Adventure/Projects'))
export const SkillTree = lazy(() => import('@/pages/Adventure/SkillTree'))
export const Achievements = lazy(() => import('@/pages/Adventure/Achievements'))
export const CareerGraph = lazy(() => import('@/pages/Adventure/CareerGraph'))
export const Contact = lazy(() => import('@/pages/Adventure/Contact'))
export const NotFound = lazy(() => import('@/pages/NotFound'))
