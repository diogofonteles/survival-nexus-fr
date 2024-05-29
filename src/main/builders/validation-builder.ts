import { FieldValidation } from '@/validation/protocols'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '@/validation/validators'
import { IsNumberValidation } from '@/validation/validators/is-number-validation'
import { IsSelectValidation } from '@/validation/validators/is-select-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {
    this.fieldName = fieldName
    this.validations = validations
  }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  isNumber(): ValidationBuilder {
    this.validations.push(new IsNumberValidation(this.fieldName))
    return this
  }

  isSelect(rule: string[] | number[]): ValidationBuilder {
    this.validations.push(new IsSelectValidation(this.fieldName, rule))
    return this
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    )
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
