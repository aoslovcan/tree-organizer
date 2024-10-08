import React from 'react';
import { forwardRef, type ForwardedRef } from 'react';
import { cn, getShapeClasses } from 'shared/utils';
import { Loader, Text } from 'shared/ui';
import { getBaseClasses, getLabelStyle, getSizeClasses, getVariantClasses } from './Button.styles';
import { ButtonProps } from './Button.types';

/**
 * @param to - If provided, renders as an anchor tag
 * @param variant - Default: "contained" - "contained" | "outlined" | "text" | "square" | "transparent" | "fill" | "stroke" | "link" | "rounded"
 * @param size - Default: "md" - "sm" | "base" |  "md" | "lg
 * @param color - Default: "primary" - "primary" | "success" | "warning" | "error"
 * @param isLoading - If true, renders loading spinner
 * @param loaderText - Text to display when isLoading is true
 * @param children - If provided, renders children instead of label
 * @param onClick - If provided, renders as a button
 * @param className - If provided, adds classes to button
 * @param disabled - If true, disables button
 * @param type - Default: "button"
 *
 * @example
 * <Button
 *      label='Button'
 *      variant='contained'
 *      isLoading
 *      disabled
 *      color='primary'
 *      loaderText='Loading'
 *      size='md'
 *      className='w-4 h-4'
 *      type='button'
 *      onClick={handleClick()}
 * />
 *
 * @type
 * ButtonProps{
 *   to?: string
 *   label: string
 *   disabled?: boolean
 *   className?: string
 *   loaderText?: string
 *   isLoading?: boolean
 *   size?: ButtonSize
 *   type?: ButtonType
 *   color?: ColorType
 *   target?: ButtonTarget
 *   variant?: ButtonVariant
 *   children?: React.ReactNode
 *   onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
 * }
 */

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      to,
      label,
      disabled,
      children,
      className,
      isLoading,
      iconAfter,
      iconBefore,
      size = 'md',
      type = 'button',
      target = '_self',
      shape = 'rounded',
      color = 'primary',
      variant = 'contained',
      loaderText = 'Loading',
      onClick,
      ...commonProps
    },
    ref
  ) => {
    const classes = cn(
      getBaseClasses(),
      getSizeClasses(size, shape, label),
      getVariantClasses(variant, color),
      getShapeClasses(shape),
      disabled
        ? 'hover:bg-background-none bg-[#F2F3F5] border-[#F2F3F5] hover:border-[#F2F3F5] text-color-primaryText'
        : '',
      isLoading
        ? 'text-color-primaryText fill-white rounded-[30px] border border-[#95D5F1] justify-center items-center gap-2.5 inline-flex text-[#95D5F1] hover:bg-background-none hover:border-[#95D5F1] focus:border-[#95D5F1]'
        : ''
    );

    if (to)
      return (
        <a
          href={to}
          className={cn(classes, className)}
          target={target}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          {...commonProps}>
          {children}
        </a>
      );

    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(classes, className)}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        disabled={disabled || isLoading}
        {...commonProps}>
        {isLoading ? (
          <Loader
            size={size}
            variant={variant}
            color="primary"
            text={loaderText}
            className="mr-2"
          />
        ) : (
          <>
            {iconBefore && (
                iconBefore
            )}
            <Text
              className={cn(getLabelStyle(color), disabled && 'text-color-primaryText')}
              text={label}
              color={color}
              variant={variant}
              size={size}
            />
            {iconAfter && (
                iconAfter
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
