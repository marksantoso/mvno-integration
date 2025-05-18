import { z } from "zod";
import _ from "lodash";
import { InternalFormat } from "../../core/types/internal";
import { internalFormatSchema } from "../../core/schemas/internal.schema";
import { IMVNOIntegration } from "../../core/interfaces/MVNOIntegration";
import { FieldMapping } from "../../core/types/mapping";
import { mapWithConfig } from "../../converters/mapping-engine";

/**
 * Base class for MVNO integrations that provides common functionality for data validation and normalization
 * @abstract
 */
export abstract class MVNOIntegrationBase implements IMVNOIntegration {

	/**
	 * Validates the input data against the provided Zod schema
	 * @param schema - The Zod schema to validate against
	 * @param data - The data to validate
	 * @returns The validated data
	 * @throws Error if the data is invalid
	 */
	public validateData(schema: z.ZodSchema, data: any): Partial<InternalFormat> {
		try {
			return schema.parse(data);
		} catch (error) {
			throw new Error(
				`Invalid data: ${error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}

	/**
	 * Validates the mapped result against the internal format schema
	 * @param result - The mapped result to validate
	 * @returns The validated result
	 * @throws Error if the result is invalid
	 */
	public validateMappedResult(result: Partial<InternalFormat>): Partial<InternalFormat> {
		try {
			return internalFormatSchema.parse(result);
		} catch (error) {
			throw new Error(
				`Invalid mapped result: ${error instanceof Error ? error.message : "Unknown error"}`
			);
		}
	}

	/**
	 * Normalizes multiple responses into a single InternalFormat object
	 * @param responses - The responses to normalize
	 * @returns The normalized InternalFormat object
	 * @throws Error if the responses are invalid or do not match
	 */
	public normalize(...responses: Partial<InternalFormat>[]): InternalFormat {
		if (responses.length < 2) {
			throw new Error("At least two responses are required for normalization");
		}

		const firstResponse = responses[0];
		for (let i = 1; i < responses.length; i++) {
			const currentResponse = responses[i];

			if (currentResponse.msisdn !== firstResponse.msisdn) {
				throw new Error(
					`MSISDN mismatch: MSISDN ${firstResponse.msisdn} does not match MSISDN ${currentResponse.msisdn} `
				);
			}

			if (currentResponse.telgea_user_id !== firstResponse.telgea_user_id) {
				throw new Error(
					`User mismatch: user ${firstResponse.telgea_user_id} does not match user ${currentResponse.telgea_user_id}`
				);
			}
		}

		return _.merge({}, ...responses) as InternalFormat;
	}

	/**
	 * Converts the input data to the internal format using the provided mapping
	 * @param data - The data to convert
	 * @param inputSchema - The Zod schema to validate against
	 * @param mapping - The mapping to use for conversion
	 * @returns The converted data
	 * @throws Error if the data is invalid or conversion fails
	 */
	protected convertData<T>(
		data: any,
		inputSchema: z.ZodSchema,
		mapping: FieldMapping[],
	): Partial<InternalFormat> {

		// Validate input data
		const validatedData = this.validateData(inputSchema, data);

		// Map data to internal format
		const mappedResult = mapWithConfig(validatedData, mapping);

		// Validate mapped result
		return this.validateMappedResult(mappedResult);

	}
}
