import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Load counts for all entities
  const { count: serverCount } = await supabase
    .from("servers")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: channelCount } = await supabase
    .from("channels")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: messageCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: userCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const stats = [
    { name: "Servers", count: serverCount || 0, href: "/servers" },
    { name: "Channels", count: channelCount || 0, href: "/channels" },
    { name: "Messages", count: messageCount || 0, href: "/messages" },
    { name: "Users", count: userCount || 0, href: "/users" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="block p-6 bg-card rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </div>
            <div className="text-3xl font-bold mt-2">{stat.count}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
