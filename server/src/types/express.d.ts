import 'express'

declare module 'express' {
  interface Request {
    event?: {
      requestContext?: {
        authorizer?: {
          claims?: {
            sub?: string
          }
        }
      }
    }
  }
}
