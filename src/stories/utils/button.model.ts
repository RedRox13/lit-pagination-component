import { IButton } from "./button.interface";

export class Button implements IButton {
  index: number = 0;
  handler: Function = () => {};
  isDisabled: boolean;
  label: number | string;
  icon?: string;
  isNavButton: boolean = false;
  isEllipsis: boolean = false;
  isTextLabel: boolean = false;

  constructor(
    index: number,
    handler: Function,
    isDisabled?: boolean,
    label?: number | string,
    icon?: string
  ) {
    this.index = index;
    this.handler = handler;
    this.isDisabled = isDisabled ? isDisabled : false;
    this.label = label ? label : index;
    this.icon = icon;
    this.isNavButton = index === -1
    this.isEllipsis = typeof label === 'string' && label.includes('...')
    this.isTextLabel = typeof label === 'string' && !icon;
  }
}