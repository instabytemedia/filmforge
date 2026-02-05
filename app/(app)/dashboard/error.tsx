"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-semibold">Etwas ist schiefgelaufen</h2>
        <p className="text-muted-foreground max-w-md">
          {error.message || "Ein unerwarteter Fehler ist aufgetreten."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
