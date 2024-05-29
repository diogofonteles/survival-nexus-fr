import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number,
  ) {
    this.field = field
    this.minLength = minLength
  }

  validate(input: { [key: string]: string | number | object }): Error | null {
    const toValidade = input[this.field]
    if (typeof toValidade === 'string') {
      return toValidade.length < this.minLength ? new InvalidFieldError() : null
    }
    return null
  }
}
