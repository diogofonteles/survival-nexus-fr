import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {
    this.validators = validators
  }

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(
    fieldName: string,
    input: { [key: string]: string | number | object },
  ): string | null {
    const validators = this.validators.filter((v) => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) {
        return error.message
      }
    }
    return null
  }
}
