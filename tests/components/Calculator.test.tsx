import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Calculator from '@/components/Calculator'

describe('Calculator', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('calculates live from salary and state without a calculate button', () => {
    vi.useFakeTimers()
    render(<Calculator />)

    const salary = screen.getByLabelText(/gross annual salary/i)
    const state = screen.getByLabelText(/^state$/i)

    expect(salary.getAttribute('type')).toBe('text')
    expect(salary.getAttribute('inputmode')).toBe('decimal')
    expect(document.activeElement).toBe(salary)
    expect(screen.queryByRole('button', { name: /calculate/i })).toBeNull()
    expect(screen.getByRole('heading', { name: /your real paycheck/i })).toBeTruthy()

    fireEvent.change(salary, { target: { value: '90000' } })
    fireEvent.change(state, { target: { value: 'TX' } })
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(screen.getByRole('heading', { name: /your real paycheck/i })).toBeTruthy()
    expect(screen.getByText(/take-home per paycheck/i)).toBeTruthy()
  })

  it('uses a single 401k match preset unless custom is selected', () => {
    render(<Calculator />)

    expect(screen.getByLabelText(/401k match/i)).toBeTruthy()
    expect(screen.queryByLabelText(/employer match rate/i)).toBeNull()
    expect(screen.queryByLabelText(/match limit/i)).toBeNull()

    fireEvent.change(screen.getByLabelText(/401k match/i), { target: { value: 'custom' } })

    expect(screen.getByLabelText(/employer match rate/i)).toBeTruthy()
    expect(screen.getByLabelText(/match limit/i)).toBeTruthy()
  })

  it('accepts an optional default state for embedded calculators', () => {
    render(<Calculator defaultState="TX" />)

    expect((screen.getByLabelText(/^state$/i) as HTMLSelectElement).value).toBe('TX')
  })

  it('shows privacy copy near salary and an empty-state prompt when salary is cleared', () => {
    vi.useFakeTimers()
    render(<Calculator />)

    expect(screen.getByText(/runs in your browser/i)).toBeTruthy()
    expect(screen.getByText(/we never see or store your salary/i)).toBeTruthy()

    fireEvent.change(screen.getByLabelText(/gross annual salary/i), { target: { value: '' } })
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(screen.getByText(/enter your salary to see your numbers/i)).toBeTruthy()
  })
})
