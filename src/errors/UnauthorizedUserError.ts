export class UnauthorizedUserError extends Error {
  constructor() {
    super('User is not authorized')
  }
}
