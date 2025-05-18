import { z } from "zod";
import { InternalFormat } from "../../types/internal";

export interface IMVNOIntegration {
  /**
   * Validates data against a provided schema
   * @param schema The Zod schema to validate against
   * @param data The data to validate
   * @returns Validated data in internal format
   */
  validateData(schema: z.ZodSchema, data: any): Partial<InternalFormat>;

  /**
   * Validates that a mapped result conforms to the internal format schema
   * @param result The result to validate
   * @returns Validated result in internal format
   */
  validateMappedResult(result: Partial<InternalFormat>): Partial<InternalFormat>;

  /**
   * Normalizes multiple responses into a single response
   * @param responses Two or more responses to normalize
   * @returns A merged response containing combined data
   */
  normalize(...responses: Partial<InternalFormat>[]): InternalFormat;
}