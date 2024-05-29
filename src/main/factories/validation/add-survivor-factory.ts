import { ValidationComposite } from '@/main/composites'
import { ValidationBuilder as Builder } from '@/main/builders'

export const makeSignUpValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('fullName').required().min(5).build(),
    ...Builder.field('status')
      .required()
      .isSelect(['Healty', 'Infected'])
      .build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('age').isNumber().build(),
    ...Builder.field('gender').required().isSelect(['M', 'F']).build(),
    ...Builder.field('latitude').required().isNumber().build(),
    ...Builder.field('longitude').required().isNumber().build(),
  ])
