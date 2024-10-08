import { ColorType, VariantClassesProps } from 'shared/utils';
import { LoaderVariant } from './Loader.types';

/** Base styles for the loader */
export const getBaseClasses = (): string =>
  'flex h-5 w-5 animate-spin items-center justify-center rounded-full p-0 text-center align-middle';

/** Size styles controller */
export const getLoaderSizes = (size: string): string => {
  const sizeClasses: VariantClassesProps = {
    sm: 'h-3 w-3',
    base: 'h-5 w-5',
    lg: 'h-7 w-7'
  };

  return sizeClasses[size] || sizeClasses.base; // Default size: base
};

// Main style getters
/** Styles for contained loader variant */
export const getContainedClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: '!stroke-none dark:!stroke-none !fill-color-text-dark',
    error: '!stroke-none fill-color-text-dark',
    success: '!stroke-none fill-color-text-dark',
    warning: '!stroke-none fill-color-text-dark',
    gradient: '!stroke-none !fill-color-dark'
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/** Styles for link loader variant */
export const getLinkClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary: 'stroke-none disabled:stroke-disabled dark:stroke-none fill-color-dark ',
    error: '!stroke-none disabled:stroke-none fill-color-error dark:fill-color-error',
    success: '!stroke-none disabled:stroke-none fill-color-success dark:fill-color-success',
    warning: '!stroke-none disabled:stroke-none fill-color-warning dark:fill-color-warning',
    gradient: '!stroke-none disabled:stroke-none fill-color-active dark:fill-color-active'
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/** Styles for link loader variant */
export const getTextClasses = (color: ColorType): string => {
  const colorClasses: VariantClassesProps = {
    primary:
      '!stroke-none disabled:!stroke-none dark:!stroke-none dark:disabled:!stroke-none fill-color-base',
    error: '!stroke-none disabled:!stroke-none !fill-color-error dark:fill-color-error',
    success: '!stroke-none disabled:!stroke-none !fill-color-success dark:fill-color-success',
    warning: '!stroke-none disabled:!stroke-none !fill-color-warning dark:fill-color-warning'
  };

  return colorClasses[color] || colorClasses.primary; // Default color: primary
};

/** Variant styles controller */
export const getVariantClasses = (variant: LoaderVariant, color: ColorType): string => {
  const variantClasses: VariantClassesProps = {
    contained: getContainedClasses(color),
    text: getTextClasses(color),
    link: getLinkClasses(color)
  };

  return variantClasses[variant] || variantClasses.contained; // Default variant: contained
};
