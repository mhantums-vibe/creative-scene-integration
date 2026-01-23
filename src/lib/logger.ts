/**
 * Production-safe logging utility
 * Only logs detailed errors in development mode
 */

const isDev = import.meta.env.DEV;

export const logger = {
  error: (message: string, error?: unknown) => {
    if (isDev) {
      console.error(message, error);
    } else {
      // In production, log only generic message without sensitive details
      console.error(`[Error] ${message}`);
    }
  },
  warn: (message: string, data?: unknown) => {
    if (isDev) {
      console.warn(message, data);
    }
  },
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.info(message, data);
    }
  },
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(message, data);
    }
  },
};
