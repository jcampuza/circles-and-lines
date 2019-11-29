import { useState, useCallback } from "react";
import produce, { Draft } from "immer";

type StateInitializer<T> = T | (() => T);

type StateProducer<T> = (draft: Draft<T>) => void | Draft<T>;

export const useImmerState = <T>(init: StateInitializer<T>) => {
  const [state, setState] = useState(init);

  const produceState = useCallback(
    (cb: StateProducer<T>) =>
      setState(s => produce(s, draft => cb(draft)) as T),
    [setState]
  );

  return [state, produceState] as const;
};
