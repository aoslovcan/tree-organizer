import { ColorType, VariantClassesProps } from 'shared/utils';
import { ClassValue } from 'clsx';
import { ButtonShape, type ButtonSize, type ButtonVariant } from './Button.types';

// Main style getters

/** Base styles for the button */
export const getBaseClasses = (): string =>
  'border-2 transition font-normal flex shadow items-center relative flex justify-center items-center';

/** Styles for contained button variant */
const getContainedClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary:
      'text-color-primaryText flex bg-background-primary border-background-primary hover:opacity-80 hover:border-background-hover',
    secondary:
      'text-white border-background-secondary bg-background-secondary hover:opacity-80 hover:text-color-primaryText',
    warning: '!bg-color-error border-none hover:opacity-80'
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/* Styles for the after pseudo element for the link effect and animation */
const getHoverClasses = (...args: ClassValue[]): string =>
  'hover:text-opacity-80 disabled:text-color-disabled' + { ...args };

/** Styles for text button variant */
const getTextClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: getHoverClasses('active:text-opacity-80'),
    error: getHoverClasses('text-white'),
    warning: getHoverClasses('hover:text-warning')
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/* Styles for the after pseudo element for the link effect and animation */
const getAfterClasses = (...args: ClassValue[]): string =>
  'relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 over:after:w-full after:transition-all after:transition-all after:duration-300 cursor-pointer shadow-none border-none p-0' +
  { ...args };

/** Styles for link button variant */
const getLinkClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: getAfterClasses('after:bg-color-dark'),
    error: getAfterClasses('after:bg-error'),
    success: getAfterClasses('after:bg-success'),
    warning: getAfterClasses('after:!bg-warning'),
    gradient: getAfterClasses(
      'after:bg-gradient-to-r after:from-background-gradient-from after:to-background-gradient-to'
    )
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};
/** Size styles controller */
export const getSizeClasses = (size: ButtonSize, shape: ButtonShape, label: string): string => {
  const VariantClasses: VariantClassesProps = {
    lg:
      shape === 'rounded'
        ? label
          ? 'px-9 py-3.5 gap-3'
          : 'gap-0 p-3.5'
        : label
          ? 'px-7 py-3.5  gap-3'
          : 'gap-0 p-3.5',
    md:
      shape === 'rounded'
        ? label
          ? 'px-7 py-3.5  gap-3'
          : 'gap-0 p-2.5'
        : label
          ? 'px-6 py-3.5  gap-3'
          : 'gap-0 p-2.5',
    base:
      shape === 'rounded'
        ? label
          ? 'px-5 py-2.5  gap-3'
          : 'gap-0 p-1.5'
        : label
          ? 'px-3.5 py-2.5  gap-3'
          : 'gap-0 p-1.5',
    sm:
      shape === 'rounded'
        ? label
          ? 'px-3.5 py-1  gap-3'
          : 'gap-0 p-0.5'
        : label
          ? 'px-2.5 py-1  gap-3'
          : 'gap-0 p-0.5'
  };
  return VariantClasses[size] || VariantClasses.base; // Default size: base
};

/** Variant styles controller */
export const getVariantClasses = (variant: ButtonVariant, color: ColorType): string => {
  const variantClasses: VariantClassesProps = {
    link: getLinkClasses(color),
    text: getTextClasses(color),
    contained: getContainedClasses(color)
  };

  return variantClasses[variant] || variantClasses.contained; // Default variant: contained
};

export const getLabelStyle = (variant: ColorType) => {
  const variantClasses: VariantClassesProps = {
    primary: 'text-color-primaryText font-black',
    secondary: 'text-white font-black'
  };

  return variantClasses[variant];
};
