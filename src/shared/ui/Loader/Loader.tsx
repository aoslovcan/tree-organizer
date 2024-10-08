import React from 'react';
import {LoaderIcon} from 'shared/assets/icons';
import {ColorType, cn} from 'shared/utils';
import {Text} from 'shared/ui';
import {getBaseClasses, getLoaderSizes, getVariantClasses} from './Loader.styles';
import {LoaderVariant} from './Loader.types';

type LoaderSize = 'sm' | 'base' | 'md' | 'lg';

export const Loader = ({
                           text,
                           color = 'primary',
                           className,
                           variant = 'contained',
                           size = 'md',
                           fill = 'white',
                           textClassName
                       }: {
    text: string;
    color?: ColorType;
    className?: string;
    variant: LoaderVariant;
    fill?: string;
    viewBox?: string;
    size: LoaderSize;
    strokeColor?: string;
    textClassName?: string;
}) => {
    const classes = cn(
        getBaseClasses(),
        getLoaderSizes(size),
        getVariantClasses(variant, color),
        'fill-white'
    );
    return (
        <div className="flex items-center justify-center">
            <div className={cn(classes, className)}><LoaderIcon fill={fill}/></div>
            <Text className={textClassName} text={text} color={color} variant={variant} size={size}/>
        </div>
    );
};
