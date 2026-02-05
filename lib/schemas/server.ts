import { z } from "zod";

export const Create${namePascal}Schema = z.object({
${zodFields}
});

export const Update${namePascal}Schema = Create${namePascal}Schema.partial();

export type Create${namePascal} = z.infer<typeof Create${namePascal}Schema>;
export type Update${namePascal} = z.infer<typeof Update${namePascal}Schema>;
