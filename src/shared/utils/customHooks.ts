import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ShapeType } from './types.ts';
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

export const getShapeClasses = (shape: ShapeType): string => {
  return shape === 'square' ? 'rounded-lg' : 'rounded-full';
};
