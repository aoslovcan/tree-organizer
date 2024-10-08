import { ColorType } from 'shared/utils';

export type TextVariant = 'text' | 'contained' | 'link';
export type TextSize = 'sm' | 'base' | 'md' | 'lg';

export interface TextProps {
  text: string;
  color?: ColorType;
  variant: TextVariant;
  className?: string;
  size?: TextSize;
}
