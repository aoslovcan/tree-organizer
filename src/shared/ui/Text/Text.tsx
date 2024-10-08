import React from 'react';
import { cn } from 'shared/utils';
import { getSizeClasses, getVariantClasses } from './Text.styles';
import { TextProps } from './Text.types';

export const Text = ({ text, color = 'primary', className, variant, size = 'md' }: TextProps) => {
  const classes = cn(getVariantClasses(color, variant), getSizeClasses(size), className);
  return (
    <p className={cn(classes)} color={color}>
      {text}
    </p>
  );
};
