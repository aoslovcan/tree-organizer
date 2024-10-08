import { ColorType } from 'shared/utils';

export type ButtonVariant = 'text' | 'link' | 'contained';
export type ButtonShape = 'square' | 'rounded';
export type ButtonSize = 'sm' | 'base' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top';

export interface ButtonProps {
  to?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  loaderText?: string;
  isLoading?: boolean;
  type?: ButtonType;
  color?: ColorType;
  size?: ButtonSize;
  shape?: ButtonShape;
  target?: ButtonTarget;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
