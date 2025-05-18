import { z } from "zod";

/**
 * Schema for the internal data format used across the MVNO integration system.
 * This schema defines the structure and validation rules for internal normalized data from different MVNO providers.
 * 
 * @property {string} telgea_user_id - Unique identifier for the user in Telgea's system
 * @property {string} msisdn - Mobile Subscriber Integrated Services Digital Network Number
 * @property {Object} [usage_data] - Optional container for data usage information
 * @property {number} usage_data.total_mb - Total data usage in megabytes
 * @property {number} usage_data.roaming_mb - Roaming data usage in megabytes
 * @property {string} usage_data.country - Country where the usage occurred
 * @property {string} usage_data.network_type - Type of network used
 * @property {string} usage_data.provider_code - Provider code for the network
 * @property {Array} [sms_charges] - Optional array of SMS charge records
 * @property {string} sms_charges[].message_id - Unique identifier for the SMS message
 * @property {string} sms_charges[].timestamp - When the SMS was sent/received
 * @property {number} sms_charges[].amount - Cost of the SMS
 * @property {string} sms_charges[].currency - Currency code for the charge amount
 * @property {Object} [billing_period] - Optional billing period information
 * @property {string} billing_period.start - Start of the billing period (valid date string)
 * @property {string} billing_period.end - End of the billing period (valid date string)
 */

export const internalFormatSchema = z.object({
	telgea_user_id: z.string(),
	msisdn: z.string(),
	usage_data: z
		.object({
			total_mb: z.number(),
			roaming_mb: z.number(),
			country: z.string(),
			network_type: z.string(),
			provider_code: z.string(),
		})
		.optional(),
	sms_charges: z
		.array(
			z.object({
				message_id: z.string(),
				timestamp: z.string(),
				amount: z.number(),
				currency: z.string(),
			})
		)
		.optional(),
	billing_period: z
		.object({
			start: z.string().refine((val) => !isNaN(Date.parse(val)), {
				message: "Invalid start date format",
			}),
			end: z.string().refine((val) => !isNaN(Date.parse(val)), {
				message: "Invalid end date format",
			}),
		})
		.optional(),
});
