"use client";

import { useRouter } from "next/navigation";
import { ${namePascal}Form } from "@/components/${nameLower}/${namePascal}Form";
import { useCreate${namePascal} } from "@/hooks/use${namePascal}s";

export default function New${namePascal}Page() {
  const router = useRouter();
  const { create, isCreating } = useCreate${namePascal}();

  const handleSubmit = async (data: Parameters<typeof create>[0]) => {
    try {
      await create(data);
      router.push("/${nameLower}s");
      router.refresh();
    } catch (error) {
      console.error("Failed to create ${nameLower}:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Neuen ${namePascal} erstellen</h1>
        <p className="text-muted-foreground">Fülle das Formular aus um einen neuen ${namePascal} zu erstellen.</p>
      </div>

      <${namePascal}Form onSubmit={handleSubmit} isSubmitting={isCreating} />
    </div>
  );
}
