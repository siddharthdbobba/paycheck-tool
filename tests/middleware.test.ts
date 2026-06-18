import { afterEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

const originalAdminUser = process.env.ADMIN_USER
const originalAdminPassword = process.env.ADMIN_PASSWORD

function adminRequest(authorization?: string): NextRequest {
  return new NextRequest('https://paycheck.test/admin', {
    headers: authorization ? { authorization } : undefined,
  })
}

afterEach(() => {
  process.env.ADMIN_USER = originalAdminUser
  process.env.ADMIN_PASSWORD = originalAdminPassword
})

describe('admin middleware', () => {
  it('denies admin when credentials are not configured', () => {
    delete process.env.ADMIN_USER
    delete process.env.ADMIN_PASSWORD

    const response = middleware(adminRequest())

    expect(response.status).toBe(401)
    expect(response.headers.get('www-authenticate')).toBe('Basic realm="Admin", charset="UTF-8"')
  })

  it('denies missing credentials when admin auth is configured', () => {
    process.env.ADMIN_USER = 'admin'
    process.env.ADMIN_PASSWORD = 'secret'

    const response = middleware(adminRequest())

    expect(response.status).toBe(401)
    expect(response.headers.get('www-authenticate')).toBe('Basic realm="Admin", charset="UTF-8"')
  })

  it('allows matching credentials', () => {
    process.env.ADMIN_USER = 'admin'
    process.env.ADMIN_PASSWORD = 'secret'
    const authorization = `Basic ${btoa('admin:secret')}`

    const response = middleware(adminRequest(authorization))

    expect(response.status).toBe(200)
  })
})
