import { createContext, useCallback, useContext, useMemo, useState } from "react";

const FireflyContext = createContext({ event: null, emit: () => {} });

export function FireflyProvider({ children }) {
  const [event, setEvent] = useState(null);

  const emit = useCallback((type, payload) => {
    setEvent({ type, payload, ts: Date.now() });
  }, []);

  const value = useMemo(() => ({ event, emit }), [event, emit]);

  return (
    <FireflyContext.Provider value={value}>
      {children}
    </FireflyContext.Provider>
  );
}

export function useFirefly() {
  return useContext(FireflyContext);
}
