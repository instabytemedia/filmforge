# 02 - Database Schema

> **Agent:** Database Agent 🗄️
> **Goal:** Set up Supabase database with all tables and policies

---

## ⚠️ CRITICAL: Avoid Duplicate Fields

**NEVER define these fields in your custom schema - they are automatically added:**
- `id` - UUID Primary Key (auto-generated)
- `user_id` - UUID Foreign Key to auth.users (auto-generated)
- `created_at` - TIMESTAMPTZ (auto-generated)
- `updated_at` - TIMESTAMPTZ (auto-generated)

**Only define entity-SPECIFIC fields in your tables.**

Example of WRONG vs RIGHT:
```sql
-- WRONG: Duplicate fields!
CREATE TABLE items (
  id UUID PRIMARY KEY,       -- Already auto-added!
  user_id UUID,              -- Already auto-added!
  created_at TIMESTAMPTZ,    -- Already auto-added!
  name TEXT,
  id UUID,                   -- DUPLICATE! Will cause error!
  created_at TIMESTAMPTZ     -- DUPLICATE! Will cause error!
);

-- RIGHT: Only custom fields
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Only custom fields below:
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);
```

---

## Context

**Product:** FilmForge
**Entities:** Server, Channel, Message, User

### Data Model

**Server**: A community server for discussing movies
- `id`: UUID (required) - Primary key
- `created_at`: TIMESTAMPTZ (required) - Creation timestamp
- `updated_at`: TIMESTAMPTZ (required) - Last update timestamp
- `user_id`: UUID (required) - Owner user ID
- `name`: TEXT (required) - Server name
- `description`: TEXT - Server description
Relationships:
  - one_to_many → Channel: A server can have multiple channels
  - many_to_many → User: A server can have multiple users, and a user can be part of multiple servers

**Channel**: A discussion channel within a server
- `id`: UUID (required) - Primary key
- `created_at`: TIMESTAMPTZ (required) - Creation timestamp
- `updated_at`: TIMESTAMPTZ (required) - Last update timestamp
- `user_id`: UUID (required) - Owner user ID
- `name`: TEXT (required) - Channel name
- `description`: TEXT - Channel description
Relationships:
  - one_to_many → Message: A channel can have multiple messages
  - many_to_one → Server: A channel belongs to one server

**Message**: A discussion message within a channel
- `id`: UUID (required) - Primary key
- `created_at`: TIMESTAMPTZ (required) - Creation timestamp
- `updated_at`: TIMESTAMPTZ (required) - Last update timestamp
- `user_id`: UUID (required) - Owner user ID
- `content`: TEXT (required) - Message content
Relationships:
  - many_to_one → Channel: A message belongs to one channel
  - many_to_one → User: A message is sent by one user

**User**: A platform user
- `id`: UUID (required) - Primary key
- `created_at`: TIMESTAMPTZ (required) - Creation timestamp
- `updated_at`: TIMESTAMPTZ (required) - Last update timestamp
- `user_id`: UUID (required) - Owner user ID
- `username`: TEXT (required, unique, indexed) - User username
- `email`: TEXT (required, unique, indexed) - User email
Relationships:
  - many_to_many → Server: A user can be part of multiple servers
  - one_to_many → Message: A user can send multiple messages

---

## Instructions

### 1. Profiles Table

Create a **profiles** table that syncs with auth.users:

**Requirements:**
- Primary Key: `id` (UUID) - Reference to auth.users(id)
- Fields: username (unique), display_name, avatar_url, bio
- Timestamps: created_at, updated_at
- RLS: Everyone can view profiles, only owner can update
- Auto-Trigger: Automatically create profile on user signup

**Important:**
- ON DELETE CASCADE for foreign key to auth.users
- Trigger Function for auto-create on signup
- Public read access, owner-only write access

### 2. Entity Tables

Create a table for each entity:

**1. Server Table (`servers`):**
Purpose: A community server for discussing movies

```sql
CREATE TABLE servers (
  -- Standard fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Entity-specific fields
  name TEXT NOT NULL -- Server name,
  description TEXT -- Server description

);

-- Indexes for performance
CREATE INDEX servers_user_id_idx ON servers(user_id);
CREATE INDEX servers_created_at_idx ON servers(created_at DESC);



-- RLS Policies (Granular)
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can only view their own records
CREATE POLICY "servers_select_own"
  ON servers FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only create records for themselves
CREATE POLICY "servers_insert_own"
  ON servers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own records
CREATE POLICY "servers_update_own"
  ON servers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own records
CREATE POLICY "servers_delete_own"
  ON servers FOR DELETE
  USING (auth.uid() = user_id);
```

Relationships:
- one_to_many to Channel (foreign key: channel_id)
- many_to_many to User (foreign key: user_id)

**2. Channel Table (`channels`):**
Purpose: A discussion channel within a server

```sql
CREATE TABLE channels (
  -- Standard fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Entity-specific fields
  name TEXT NOT NULL -- Channel name,
  description TEXT -- Channel description

);

-- Indexes for performance
CREATE INDEX channels_user_id_idx ON channels(user_id);
CREATE INDEX channels_created_at_idx ON channels(created_at DESC);



-- RLS Policies (Granular)
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can only view their own records
CREATE POLICY "channels_select_own"
  ON channels FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only create records for themselves
CREATE POLICY "channels_insert_own"
  ON channels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own records
CREATE POLICY "channels_update_own"
  ON channels FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own records
CREATE POLICY "channels_delete_own"
  ON channels FOR DELETE
  USING (auth.uid() = user_id);
```

Relationships:
- one_to_many to Message (foreign key: message_id)
- many_to_one to Server (foreign key: server_id)

**3. Message Table (`messages`):**
Purpose: A discussion message within a channel

```sql
CREATE TABLE messages (
  -- Standard fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Entity-specific fields
  content TEXT NOT NULL -- Message content

);

-- Indexes for performance
CREATE INDEX messages_user_id_idx ON messages(user_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);



-- RLS Policies (Granular)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can only view their own records
CREATE POLICY "messages_select_own"
  ON messages FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only create records for themselves
CREATE POLICY "messages_insert_own"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own records
CREATE POLICY "messages_update_own"
  ON messages FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own records
CREATE POLICY "messages_delete_own"
  ON messages FOR DELETE
  USING (auth.uid() = user_id);
```

Relationships:
- many_to_one to Channel (foreign key: channel_id)
- many_to_one to User (foreign key: user_id)

**4. User Table (`users`):**
Purpose: A platform user

```sql
CREATE TABLE users (
  -- Standard fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Entity-specific fields
  username TEXT NOT NULL UNIQUE -- User username,
  email TEXT NOT NULL UNIQUE -- User email

);

-- Indexes for performance
CREATE INDEX users_user_id_idx ON users(user_id);
CREATE INDEX users_created_at_idx ON users(created_at DESC);
CREATE INDEX users_username_idx ON users(username);
CREATE INDEX users_email_idx ON users(email);


-- RLS Policies (Granular)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can only view their own records
CREATE POLICY "users_select_own"
  ON users FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only create records for themselves
CREATE POLICY "users_insert_own"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own records
CREATE POLICY "users_update_own"
  ON users FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own records
CREATE POLICY "users_delete_own"
  ON users FOR DELETE
  USING (auth.uid() = user_id);
```

Relationships:
- many_to_many to Server (foreign key: server_id)
- one_to_many to Message (foreign key: message_id)


### 3. Updated-At Automation

Create a **Trigger Function** that automatically sets `updated_at`:
- Function Name: `update_updated_at()`
- Trigger: BEFORE UPDATE on all tables
- Logic: SET NEW.updated_at = now()

Apply the trigger to all tables (profiles + entities).

### 4. Storage Setup

Create a **Storage Bucket** for file uploads:
- Name: "uploads"
- Visibility: Private
- Folder Structure: `{user_id}/{filename}`

Storage Policies:
- Users can only upload to their own folder
- Users can only read/delete their own files
- No public access

Implement folder-based security with storage.foldername().

### 5. Type Safety

Generate TypeScript types from the schema:
- Use Supabase CLI: `supabase gen types typescript`
- Export to: `lib/database.types.ts`
- Use the types for type-safe queries

---

## Validation Checklist

Verify that:
- [ ] profiles table exists with RLS
- [ ] Auto-create Profile Trigger works
- [ ] Server table exists with correct fields
- [ ] Channel table exists with correct fields
- [ ] Message table exists with correct fields
- [ ] User table exists with correct fields
- [ ] All tables have RLS enabled
- [ ] Foreign Keys correctly set
- [ ] Indexes created for performance
- [ ] updated_at Trigger on all tables
- [ ] Storage Bucket configured
- [ ] TypeScript Types generated

**Test:**
- Signup new user → Profile automatically created
- Create Entity record → Only visible to owner
- Update record → updated_at automatically set
- Upload file → Only possible in own folder

---

## Troubleshooting

**RLS Issues:**
- Check if policies correctly use auth.uid()
- Test with SQL Editor: `SELECT auth.uid()`
- Policies must have USING and WITH CHECK

**Foreign Key Errors:**
- Check CASCADE on user_id
- Entities with relationships: Correct order when creating

**Storage Issues:**
- Folder structure must follow {user_id}/ pattern
- Policies use storage.foldername() for user isolation

---

**Continue to:** `03-auth.md`
