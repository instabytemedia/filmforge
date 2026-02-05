import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash } from "lucide-react";

export default async function ${namePascal}DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: ${nameLower} } = await supabase
    .from("${nameLower}s")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!${nameLower}) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/${nameLower}s"
          className="p-2 hover:bg-muted rounded-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">${namePascal} Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${nameLower}s/\${${nameLower}.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Bearbeiten
          </Link>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">ID</dt>
            <dd className="mt-1">{${nameLower}.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Erstellt am</dt>
            <dd className="mt-1">{new Date(${nameLower}.created_at).toLocaleDateString("de-DE")}</dd>
          </div>
          {/* Add more fields here based on your entity */}
        </dl>
      </div>
    </div>
  );
}
