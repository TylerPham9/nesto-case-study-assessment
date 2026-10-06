// This file contains the supported locales for the application
export const SUPPORTED_LOCALES = ['en', 'fr'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
