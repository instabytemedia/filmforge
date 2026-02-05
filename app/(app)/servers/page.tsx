import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ${namePascal}Card } from "@/components/${nameLower}/${namePascal}Card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function ${namePascal}sPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: ${nameLower}s } = await supabase
    .from("${nameLower}s")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">${namePascal}s</h1>
          <p className="text-muted-foreground">Verwalte deine ${namePascal}s</p>
        </div>
        <Link
          href="/${nameLower}s/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Neu erstellen
        </Link>
      </div>

      {${nameLower}s && ${nameLower}s.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {${nameLower}s.map((${nameLower}) => (
            <${namePascal}Card key={${nameLower}.id} ${nameLower}={${nameLower}} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Noch keine ${namePascal}s"
          description="Erstelle deinen ersten ${namePascal} um loszulegen."
          action={
            <Link
              href="/${nameLower}s/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Ersten ${namePascal} erstellen
            </Link>
          }
        />
      )}
    </div>
  );
}
