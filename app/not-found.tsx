import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-8xl font-bold text-muted-foreground/20">404</div>
        <h1 className="text-2xl font-semibold">Seite nicht gefunden</h1>
        <p className="text-muted-foreground max-w-md">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
