import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRouteMatcher = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (protectedRouteMatcher(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
