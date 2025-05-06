import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname

  // 정적 리소스 요청 거르기
  const isStatic =
    url.startsWith('/_next') ||
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.ico') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.woff2')

  if (isStatic) return NextResponse.next()

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  console.log(`[접속] IP: ${ip} | 경로: ${url}`)

  return NextResponse.next()
}
