import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function mergeTailwindClassName(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
