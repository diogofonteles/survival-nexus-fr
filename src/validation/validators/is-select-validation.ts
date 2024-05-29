import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class IsSelectValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly rule: string[] | number[],
  ) {
    this.field = field
    this.rule = rule
  }

  validate(input: { [key: string]: string | number | object }): Error | null {
    const toValidate = input[this.field]
    const isValid = this.rule.some((rule) => rule === toValidate)

    if (!isValid) {
      return new InvalidFieldError('input must be one of the specified values')
    }

    return null
  }
}
