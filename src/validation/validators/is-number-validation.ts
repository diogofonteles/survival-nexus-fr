import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class IsNumberValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(input: { [key: string]: string | number | object }): Error | null {
    const toValidade = input[this.field]
    if (typeof toValidade === 'number') {
      return toValidade > 0
        ? null
        : new InvalidFieldError('input must be greater than 0')
    }
    return new InvalidFieldError('input must be a number')
  }
}
