import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calculator from '@/components/Calculator'

describe('Calculator', () => {
  it('calculates live from salary and state without a calculate button', () => {
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

    expect(screen.getByRole('status').textContent).toContain('Take-home per paycheck')
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
})
