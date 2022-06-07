import { useContext } from "react";

/**
 * equivalent to `useContext` from react - but using this hook removes null check on every values from context.
 * Use this one instead of the one from React
 */
export function useTypeSafeContext<TContext>(passedContext: React.Context<TContext | undefined>): TContext {
  const context = useContext(passedContext);
  if (!context) throw new Error("useContext must be inside a Provider with a value");
  return context;
}
