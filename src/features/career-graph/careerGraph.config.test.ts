import { describe, expect, it } from 'vitest'
import { BRANCH_META } from './careerGraph.config'

describe('BRANCH_META', () => {
  it('gives education its own light-green token, distinct from the brand purple', () => {
    expect(BRANCH_META.education.colorVar).toBe('var(--color-branch-education)')
    expect(BRANCH_META.education.colorVar).not.toBe('var(--color-secondary)')
  })

  it('keeps career and courses untouched', () => {
    expect(BRANCH_META.career.colorVar).toBe('var(--color-primary)')
    expect(BRANCH_META.courses.colorVar).toBe('var(--color-accent)')
  })

  it('gives every branch a distinct color token', () => {
    const colors = Object.values(BRANCH_META).map((meta) => meta.colorVar)
    expect(new Set(colors).size).toBe(colors.length)
  })
})
