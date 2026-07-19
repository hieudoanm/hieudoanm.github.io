export interface ErrorInfo {
  message: string;
  detail?: string;
}

export type ErrorHandler = (error: ErrorInfo) => void;

export interface TryCatch {
  <T>(fn: () => Promise<T>, context: string): Promise<T | undefined>;
  void(fn: () => Promise<void>, context: string): Promise<boolean>;
}

export const createTryCatch = (onError: ErrorHandler): TryCatch => {
  const tryCatch = async <T>(
    fn: () => Promise<T>,
    context: string
  ): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (err) {
      onError({
        message: `Failed to ${context}`,
        detail: err instanceof Error ? err.message : String(err),
      });
      return undefined;
    }
  };

  const tryCatchVoid = async (
    fn: () => Promise<void>,
    context: string
  ): Promise<boolean> => {
    try {
      await fn();
      return true;
    } catch (err) {
      onError({
        message: `Failed to ${context}`,
        detail: err instanceof Error ? err.message : String(err),
      });
      return false;
    }
  };

  return Object.assign(tryCatch, { void: tryCatchVoid });
};

export const formatError = (err: unknown): ErrorInfo => {
  if (err instanceof Error) {
    return { message: err.message, detail: err.stack };
  }
  return { message: String(err) };
};
