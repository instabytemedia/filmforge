# 08 - Forms & Validation

> **Agent:** Forms Agent 📝
> **Goal:** Create forms with react-hook-form + Zod

---

## Context

**Product:** FilmForge
**Entities with Forms:** Server, Channel, Message, User

---

## Instructions

### 1. Check Dependencies

Ensure the following dependencies are installed:
- `react-hook-form` - Form State Management
- `@hookform/resolvers` - Zod Integration

If not present, install them.

**Important:**
- Zod should already be installed from Setup
- Schemas should already exist in lib/schemas/ (from Phase 06)


### 2. Server Form

Create **ServerForm Component** (`components/server/ServerForm.tsx`):

**Props Interface:**
- `server?`: Server Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateServerSchema for Validation
- Distinguish Create vs Edit Mode (based on server prop)
- useCreateServer() Hook for Create
- useUpdateServer(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `name` (text) - Required: Server name
- `description` (text) - Optional: Server description

**Layout:**
- Card Container
- CardHeader: Title ("New Server" or "Edit Server")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from server prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Server Page** (`app/(app)/servers/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render ServerForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout



### 3. Channel Form

Create **ChannelForm Component** (`components/channel/ChannelForm.tsx`):

**Props Interface:**
- `channel?`: Channel Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateChannelSchema for Validation
- Distinguish Create vs Edit Mode (based on channel prop)
- useCreateChannel() Hook for Create
- useUpdateChannel(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `name` (text) - Required: Channel name
- `description` (text) - Optional: Channel description

**Layout:**
- Card Container
- CardHeader: Title ("New Channel" or "Edit Channel")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from channel prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Channel Page** (`app/(app)/channels/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render ChannelForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout



### 4. Message Form

Create **MessageForm Component** (`components/message/MessageForm.tsx`):

**Props Interface:**
- `message?`: Message Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateMessageSchema for Validation
- Distinguish Create vs Edit Mode (based on message prop)
- useCreateMessage() Hook for Create
- useUpdateMessage(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `content` (text) - Required: Message content

**Layout:**
- Card Container
- CardHeader: Title ("New Message" or "Edit Message")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from message prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Message Page** (`app/(app)/messages/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render MessageForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout



### 5. User Form

Create **UserForm Component** (`components/user/UserForm.tsx`):

**Props Interface:**
- `user?`: User Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateUserSchema for Validation
- Distinguish Create vs Edit Mode (based on user prop)
- useCreateUser() Hook for Create
- useUpdateUser(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `username` (text) - Required: User username
- `email` (text) - Required: User email

**Layout:**
- Card Container
- CardHeader: Title ("New User" or "Edit User")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from user prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New User Page** (`app/(app)/users/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render UserForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout


---

## Validation Checklist

Verify for EACH Entity:
- [ ] Form Component created
- [ ] New Page created with Auth Check
- [ ] react-hook-form integrated
- [ ] Zod Validation works
- [ ] Create Mode works
- [ ] Edit Mode works (when server is passed)
- [ ] Loading State during Submit
- [ ] Error Messages are displayed
- [ ] Redirect after Success

**Test per Entity:**
1. **Create Test:**
   - Go to /[entity]s/new
   - Leave field empty → Validation Error displayed
   - Fill all fields → Submit
   - Redirected to list
   - New entry appears in list

2. **Validation Test:**
   - Required fields empty → Error
   - Number field with text → Error (if applicable)
   - Correct input → No Error

3. **Edit Test (if Detail Page exists):**
   - Open Entity Detail
   - Click Edit
   - Fields are pre-filled
   - Change value → Submit
   - Changes saved

---

## Troubleshooting

**Form submitted but nothing happens:**
- handleSubmit correctly passed to form onSubmit?
- async/await in onSubmit Handler?
- Errors being logged?

**Validation not working:**
- zodResolver correctly imported?
- Schema correctly passed to zodResolver?
- Schema exported from lib/schemas?

**Register not working:**
- Field Name exactly like in Schema?
- Input has {...register("fieldName")} spread?
- For Number: valueAsNumber Option?

**defaultValues being ignored:**
- useForm with defaultValues option?
- server prop being passed?
- Object spread correct?

**No redirect after Submit:**
- router.push() called?
- router.refresh() for SSR Update?
- No Error in try/catch?

**TypeScript Errors:**
- CreateServerSchema imported?
- Type Inference from Zod: type CreateServer = z.infer<typeof CreateServerSchema>
- useForm Generic: useForm<CreateServer>()

---

**Continue to:** `09-landing.md`
