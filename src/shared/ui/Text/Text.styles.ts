import { ColorType, VariantClassesProps } from 'shared/utils';
import { TextSize, TextVariant } from './Text.types';

/** Size styles controller */
export const getSizeClasses = (size: TextSize): string => {
  const sizeClasses: VariantClassesProps = {
    sm: 'text-2xs',
    base: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return sizeClasses[size] || sizeClasses.md; // Default size: md
};

// Variant styles
/** Styles for contained text variant */
export const getContainedClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: 'text-white font-black',
    secondary: 'text-white font-black',
    error: 'text-white font-black',
    light: 'text-[#4F5480] font-black',
    dark: 'text-[#C3CAD9] font-black'
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/** Styles for link text variant */
export const getLinkClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: 'text-color-textPrimary font-black',
    secondary: 'text-white font-black',
    error: 'text-white font-black',
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/** Variant styles controller */
export const getVariantClasses = (color: ColorType, variant: TextVariant): string => {
  const variantClasses: VariantClassesProps = {
    link: getLinkClasses(color),
    text: getLinkClasses(color),
    contained: getContainedClasses(color)
  };

  return variantClasses[variant] || variantClasses.contained; // Default variant: contained
};
