export interface IFormCinfig {
  [x: string]: any
  id?: string
  label: string
  field: string
  slotType: string
  placeholder?: string
  options?: option[]
}

export type option = {
  label: string
  value: number
}
