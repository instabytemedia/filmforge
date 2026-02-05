import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

// Also support GET for simple link-based logout
export async function GET() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
