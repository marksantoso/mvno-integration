import { z } from 'zod';
import { internalFormatSchema } from '../schemas/internal.schema';
export type InternalFormat = z.infer<typeof internalFormatSchema>;
