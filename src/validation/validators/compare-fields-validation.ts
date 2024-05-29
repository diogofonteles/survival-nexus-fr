import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

interface InputObject {
  [key: string]: string | number | object
}

export class CompareFieldsValidation implements FieldValidation {
  readonly field: string
  private readonly fieldToCompare: string

  constructor(field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate(input: InputObject): Error | null {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null
  }
}
