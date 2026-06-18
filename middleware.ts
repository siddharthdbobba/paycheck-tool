import { NextResponse, type NextRequest } from 'next/server'

type BasicCredentials = {
  user: string
  password: string
}

function unauthorized(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"',
    },
  })
}

function parseBasicAuth(header: string | null): BasicCredentials | null {
  if (!header?.startsWith('Basic ')) {
    return null
  }

  try {
    const decoded = atob(header.slice('Basic '.length).trim())
    const separatorIndex = decoded.indexOf(':')

    if (separatorIndex < 0) {
      return null
    }

    return {
      user: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    }
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPassword) {
    return unauthorized()
  }

  const credentials = parseBasicAuth(request.headers.get('authorization'))

  if (
    !credentials ||
    credentials.user !== expectedUser ||
    credentials.password !== expectedPassword
  ) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
