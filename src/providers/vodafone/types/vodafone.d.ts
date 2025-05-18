import { z } from 'zod';
import { VodafoneSmsChargesParsedSchema, VodafoneUsageSchema } from '../schemas/vodafone.schema';

// Infer the type from the schema
export type VodafoneSmsChargesParsed = z.infer<typeof VodafoneSmsChargesParsedSchema>;
export type VodafoneUsage = z.infer<typeof VodafoneUsageSchema>;
