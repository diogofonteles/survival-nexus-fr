export interface FieldValidation {
  field: string
  validate: (
    input: { [key: string]: string | number | object } | string,
  ) => Error | null
  rule?: string[] | number[] | { [key: string]: string | number }
}
