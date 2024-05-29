import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(input: { [key: string]: string | number | object }): Error | null {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
