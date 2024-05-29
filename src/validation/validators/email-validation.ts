import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(input: { [key: string]: string | number | object }): Error | null {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const value = input[this.field]
    if (typeof value !== 'string' || !emailRegex.test(value)) {
      return new InvalidFieldError()
    }
    return null
  }
}
