import React from 'react';
import { forwardRef } from 'react';
import { cn } from 'shared/utils';
import { Text } from 'shared/ui';
import {InputContainer, InputLabel} from "./Input.styles.ts";

/**
 * @param name - Input name
 * @param label - Input label
 * @param variant - Default: "contained"
 * @param error - If true, renders error state
 * @param color - Default: "primary"
 * @param errorMessage - If true, renders error message
 * @param icon - If provided, renders icon before input
 * @param iconAfter - If provided, renders icon after input
 * @param onChange - Watches for changes in input
 * @param className - If provided, adds classes to button
 * @param disabled - If true, disables button
 * @param type - Default: "input"
 *
 * @example
 *        <Input
 *            error={error}
 *            errorMessage="This is an error"
 *            placeholder="This is a placeholder"
 *            label="Password"
 *            name="password"
 *            type="password"
 *            variant={variant}
 *            color={color}
 *            onChange={() => {}}
 *         />
 * @type
 * InputProps{
 *   extends React.InputHTMLAttributes<HTMLInputElement> {
 *   label?: string
 *   name: string
 *   placeholder?: string
 *   type?: string
 *   value?: string
 *   className?: string
 *   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
 *   errorMessage?: string
 *   error?: boolean
 *   disabled?: boolean by default it is false
 *  }
 */


interface InputProps {
    className?: string
    error?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean
    label?: string,
    name?: string,
    errorMessage?: string,
    type: string
    placeholder?: string
    value?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            name,
            label,
            error,
            className,
            errorMessage,
            onChange,
            disabled = false,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn('flex w-full flex-col gap-2')}>
               <label className={InputLabel}>{label}</label>
                <div className={cn('relative')}>
                    <input
                        {...props}
                        className={cn(
                            className,
                            InputContainer,
                            error ? 'border-[#E62E2E]' : ''
                        )}
                        ref={ref}
                        onChange={onChange}
                        name={name}
                        disabled={disabled}
                    />

                </div>
                {error && (
                    <Text
                        variant="contained"
                        text={errorMessage || ''}
                        size="md"
                        className="text-xs font-thin !text-color-error"
                    />
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
