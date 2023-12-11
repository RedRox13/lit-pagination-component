export interface IButton {
  index: number,
  handler: Function,
  isDisabled: boolean,
  label: number | string,
  icon?: string,
  isNavButton: boolean,
  isEllipsis: boolean,
  isTextLabel: boolean
}