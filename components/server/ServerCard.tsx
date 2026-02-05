import Link from "next/link";
import type { ${namePascal} } from "@/types/${nameLower}";

interface ${namePascal}CardProps {
  ${nameLower}: ${namePascal};
}

export function ${namePascal}Card({ ${nameLower} }: ${namePascal}CardProps) {
  return (
    <Link
      href={`/${nameLower}s/\${${nameLower}.id}`}
      className="block p-6 bg-card border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="space-y-2">
        <h3 className="font-semibold">${namePascal} #{${nameLower}.id.slice(0, 8)}</h3>
        <p className="text-sm text-muted-foreground">
          Erstellt: {new Date(${nameLower}.created_at).toLocaleDateString("de-DE")}
        </p>
      </div>
    </Link>
  );
}
