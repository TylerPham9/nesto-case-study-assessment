import type { AppLocale } from '../locales';
import { enSignupCopy } from './en';
import { frSignupCopy } from './fr';
import type { SignupCopy } from './types';

export type { SignupCopy } from './types';

export const signupCopy: Record<AppLocale, SignupCopy> = {
  en: enSignupCopy,
  fr: frSignupCopy,
};
