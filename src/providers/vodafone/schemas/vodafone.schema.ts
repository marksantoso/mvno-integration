import { z } from 'zod';

/**
 * Schema for parsing Vodafone SOAP response containing SMS charge information.
 * This schema validates and transforms the XML-like structure of the SOAP response
 * into a strongly-typed object.
 * 
 * @property {Object} sms:ChargeSMS - Container for SMS charge details
 * @property {string} sms:ChargeSMS.sms:UserID - Unique identifier for the user
 * @property {string} sms:ChargeSMS.sms:PhoneNumber - MSISDN of the user
 * @property {string} sms:ChargeSMS.sms:MessageID - Unique identifier for the SMS message
 * @property {string} sms:ChargeSMS.sms:Timestamp - When the SMS was sent/received
 * @property {number} sms:ChargeSMS.sms:ChargeAmount - Cost of the SMS (transformed from string to number)
 * @property {string} sms:ChargeSMS.sms:Currency - Currency code for the charge amount
 */
export const VodafoneSmsChargesParsedSchema = z.object({
	'sms:ChargeSMS': z.object({
		'sms:UserID': z.string(),
		'sms:PhoneNumber': z.string(),
		'sms:MessageID': z.string(),
		'sms:Timestamp': z.string(),
		'sms:ChargeAmount': z.string().transform(val => parseFloat(val)),
		'sms:Currency': z.string()
	})
});

/**
 * Schema for parsing Vodafone REST API response containing usage data.
 * This schema validates and transforms the REST API response into a strongly-typed object.
 * 
 * @property {string} user_id - Unique identifier for the user
 * @property {string} msisdn - MSISDN of the user
 * @property {Object} usage - Container for usage details
 * @property {Object} usage.data - Data usage information
 * @property {number} usage.data.total_mb - Total data usage in megabytes
 * @property {number} usage.data.roaming_mb - Roaming data usage in megabytes
 * @property {string} usage.data.country - Country where the usage occurred
 * @property {Object} usage.period - Billing period information
 * @property {string} usage.period.start - Start of the billing period
 * @property {string} usage.period.end - End of the billing period
 * @property {Object} network - Network information
 * @property {string} network.type - Type of network used
 * @property {string} network.provider_code - Provider code for the network
 */
export const VodafoneUsageSchema = z.object({
	user_id: z.string(),
	msisdn: z.string(),
	usage: z.object({
		data: z.object({
			total_mb: z.number(),
			roaming_mb: z.number(),
			country: z.string()
		}),
		period: z.object({
			start: z.string(),
			end: z.string()
		})
	}),
	network: z.object({
		type: z.string(),
		provider_code: z.string()
	})
});