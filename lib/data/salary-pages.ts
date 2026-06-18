import { BRAND } from '@/lib/copy'
import { getStatePageByCode, stateSlug } from './state-pages'

export const SALARY_PAGE_SALARIES = [45_000, 55_000, 65_000, 75_000, 85_000] as const
export const SALARY_PAGE_STATE_CODES = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'WA'] as const

export type SalaryPageSalary = (typeof SALARY_PAGE_SALARIES)[number]
export type SalaryPageStateCode = (typeof SALARY_PAGE_STATE_CODES)[number]

export type SalaryPageParam = {
  amount: string
  state: string
}

export type SalaryPage = {
  salary: SalaryPageSalary
  stateCode: SalaryPageStateCode
  stateName: string
  stateSlug: string
  href: string
  url: string
}

export function salaryPageHref(salary: number, stateCode: string): string {
  return `/salary/${salary}/${stateSlug(stateCode)}`
}

export function salaryPageUrl(salary: number, stateCode: string): string {
  return `${BRAND.shareUrl}${salaryPageHref(salary, stateCode)}`
}

export function allSalaryPages(): SalaryPage[] {
  return SALARY_PAGE_SALARIES.flatMap((salary) =>
    SALARY_PAGE_STATE_CODES.map((stateCode) => {
      const state = getStatePageByCode(stateCode)

      if (!state) {
        throw new Error(`Missing state page data for ${stateCode}`)
      }

      return {
        salary,
        stateCode,
        stateName: state.name,
        stateSlug: state.slug,
        href: salaryPageHref(salary, stateCode),
        url: salaryPageUrl(salary, stateCode),
      }
    }),
  )
}

export function getSalaryPage(amount: string, state: string): SalaryPage | undefined {
  const parsedAmount = Number.parseInt(amount, 10)

  if (!Number.isInteger(parsedAmount) || String(parsedAmount) !== amount) {
    return undefined
  }

  const salary = SALARY_PAGE_SALARIES.find((candidate) => candidate === parsedAmount)
  const stateCode = SALARY_PAGE_STATE_CODES.find((candidate) => stateSlug(candidate) === state.toLowerCase())

  if (!salary || !stateCode) {
    return undefined
  }

  const statePage = getStatePageByCode(stateCode)

  if (!statePage) {
    return undefined
  }

  return {
    salary,
    stateCode,
    stateName: statePage.name,
    stateSlug: statePage.slug,
    href: salaryPageHref(salary, stateCode),
    url: salaryPageUrl(salary, stateCode),
  }
}
