import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { ${namePascal} } from "@/types/${nameLower}";
import type { Create${namePascal} } from "@/lib/schemas/${nameLower}";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Failed to fetch");
  }
  return res.json();
};

export function use${namePascal}s() {
  const { data, error, isLoading, mutate } = useSWR<{ data: ${namePascal}[] }>(
    "/api/${nameLower}s",
    fetcher
  );

  return {
    ${nameLower}s: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function use${namePascal}(id: string | null) {
  const { data, error, isLoading } = useSWR<{ data: ${namePascal} }>(
    id ? `/api/${nameLower}s/\${id}` : null,
    fetcher
  );

  return {
    ${nameLower}: data?.data,
    isLoading,
    error,
  };
}

export function useCreate${namePascal}() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/${nameLower}s",
    async (url: string, { arg }: { arg: Create${namePascal} }) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to create");
      }
      return res.json();
    }
  );

  return { create: trigger, isCreating: isMutating };
}

export function useUpdate${namePascal}(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/${nameLower}s/\${id}`,
    async (url: string, { arg }: { arg: Partial<Create${namePascal}> }) => {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to update");
      }
      return res.json();
    }
  );

  return { update: trigger, isUpdating: isMutating };
}

export function useDelete${namePascal}(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/${nameLower}s/\${id}`,
    async (url: string) => {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete");
      }
      return res.json();
    }
  );

  return { remove: trigger, isDeleting: isMutating };
}
