export class ValidationError extends Error {
  public errors: Array<{ [key: string]: string }>
  constructor(errors: Array<{ [key: string]: string }>) {
    super('Validation error')
    this.errors = errors
  }
}

export class IncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IncorrectPasswordError'
  }
}

export class EmailNotVerifiedError extends Error {
  title?: string

  constructor(message: string, title?: string) {
    super(message)
    this.name = 'EmailNotVerifiedError'
    if (title) {
      this.title = title
    }
  }
}

export class AccountAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AccountAlreadyExistsError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
