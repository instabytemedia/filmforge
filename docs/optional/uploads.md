# Optional: File Uploads (Supabase Storage)

> **Feature Type:** OPTIONAL
> **Complexity:** Medium
> **Dependencies:** Auth, Supabase Storage Bucket
> **Agent:** Uploads Agent 📁
> **Ziel:** File/Image Uploads mit Supabase Storage

---

## Kontext

**Produkt:** FilmForge
**Entities mit Uploads:** Keine spezifischen (allgemeiner Upload)

---

## Tasks

### Task U.1: Storage Bucket erstellen

**In Supabase Dashboard:**

1. Gehe zu Storage
2. Erstelle Bucket: `uploads`
3. Public: Ja (für öffentliche Bilder) oder Nein (für private Dateien)

**Oder per SQL:**

```sql
-- Public bucket für Bilder
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- Private bucket für Dokumente
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);
```

- [ ] Storage Bucket erstellt

### Task U.2: Storage Policies

```sql
-- Policy: Jeder kann öffentliche Bilder sehen
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Policy: Authentifizierte User können hochladen
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');

-- Policy: User können eigene Dateien löschen
CREATE POLICY "Delete Own Files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Für private Dokumente
CREATE POLICY "Private Read"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

- [ ] Storage Policies erstellt

### Task U.3: Upload API Route

**Datei:** `app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const filename = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: "Upload failed" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: publicUrl,
      path: data.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
```

- [ ] Upload API Route erstellt

### Task U.4: Upload Hook

**Datei:** `hooks/useUpload.ts`

```typescript
"use client";

import { useState } from "react";

interface UploadResult {
  url: string;
  path: string;
}

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setProgress(100);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress, error };
}
```

- [ ] Upload Hook erstellt

### Task U.5: Upload Component

**Datei:** `components/uploads/ImageUpload.tsx`

```typescript
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await upload(file);
    if (result) {
      onChange(result.url);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Upload"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-32 w-full border-dashed"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird hochgeladen...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Bild hochladen
            </>
          )}
        </Button>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
```

- [ ] ImageUpload Component erstellt

### Task U.6: Avatar Upload Component

**Datei:** `components/uploads/AvatarUpload.tsx`

```typescript
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  value?: string;
  onChange: (url: string) => void;
  size?: number;
  className?: string;
}

export function AvatarUpload({
  value,
  onChange,
  size = 100,
  className,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await upload(file);
    if (result) {
      onChange(result.url);
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative rounded-full overflow-hidden group"
        style={{ width: size, height: size }}
      >
        {value ? (
          <Image
            src={value}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">?</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {uploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
```

- [ ] AvatarUpload Component erstellt

### Task U.7: Delete Upload Helper

**Datei:** `lib/storage/delete.ts`

```typescript
import { createClient } from "@/lib/supabase/server";

export async function deleteUpload(path: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("uploads")
    .remove([path]);

  if (error) {
    console.error("Delete error:", error);
    return false;
  }

  return true;
}
```

- [ ] Delete Helper erstellt

### Task U.8: Next.js Image Config

**Datei:** `next.config.js` (erweitern)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] Next.js Image Config für Supabase

---

## Usage Example

```typescript
// In einem Form
import { ImageUpload } from "@/components/uploads/ImageUpload";

function MyForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <form>
      <ImageUpload
        value={imageUrl}
        onChange={setImageUrl}
      />
      {/* Rest of form */}
    </form>
  );
}
```

---

## Checkpoint

**Uploads sind abgeschlossen wenn:**

- [ ] Storage Bucket existiert
- [ ] Storage Policies aktiv
- [ ] Upload API funktioniert
- [ ] ImageUpload Component funktioniert
- [ ] Bilder werden angezeigt

**Test:**
1. Gehe zu einem Form mit Upload
2. Wähle ein Bild aus
3. Bild wird hochgeladen
4. Bild wird angezeigt
5. Bild kann gelöscht werden

---

**Diese Datei ist optional. Nur umsetzen wenn File Uploads benötigt werden.**
