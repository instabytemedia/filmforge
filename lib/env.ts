import { z } from 'zod';

/**
 * Environment Variable Validation
 *
 * This module validates all required environment variables at startup.
 * If any required variable is missing, the app will fail fast with a clear error.
 *
 * Usage:
 * import { env } from '@/lib/env';
 * console.log(env.NEXT_PUBLIC_SUPABASE_URL);
 */

// Schema for public environment variables (exposed to browser)
const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default('http://localhost:3000'),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .describe('Supabase project URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .describe('Supabase anonymous/public key'),
});

// Schema for server-only environment variables
const serverEnvSchema = z.object({
  // Supabase
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .optional()
    .describe('Supabase service role key (for admin operations)'),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z
    .string()
    .optional()
    .describe('Stripe secret key'),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .optional()
    .describe('Stripe webhook signing secret'),

  // Other services
  RESEND_API_KEY: z
    .string()
    .optional()
    .describe('Resend API key for emails'),
});

// Combined schema
const envSchema = publicEnvSchema.merge(serverEnvSchema);

// Type for the validated env
export type Env = z.infer<typeof envSchema>;

// Validate and export
function validateEnv(): Env {
  // In development, we can be more lenient
  const isDev = process.env.NODE_ENV === 'development';

  try {
    return envSchema.parse({
      // Public
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      // Server
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors
        .map((e) => `  - ${e.path.join('.')}: ${e.message}`)
        .join('\n');

      console.error('❌ Invalid environment variables:\n' + missing);

      if (!isDev) {
        throw new Error('Invalid environment variables');
      }
    }
    throw error;
  }
}

// Export validated env
export const env = validateEnv();

// Helper to check if running on server
export const isServer = typeof window === 'undefined';

// Helper to get public env (safe for client)
export function getPublicEnv() {
  return {
    NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}
