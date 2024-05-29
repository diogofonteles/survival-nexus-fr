export class InvalidFieldError extends Error {
  constructor(messageError?: string) {
    const message = messageError || 'Valor inválido'
    super(message)
    this.name = 'InvalidFieldError'
  }
}
