import { FieldMapping } from '../../../core/types/mapping';

export const vodafoneUsageMapping: FieldMapping[] = [
	{
		sourceField: "user_id",
		targetField: "telgea_user_id",
	},
	{
		sourceField: "msisdn",
		targetField: "msisdn",
	},
	{
		sourceField: "usage.data.total_mb",
		targetField: "usage_data.total_mb",
	},
	{
		sourceField: "usage.data.roaming_mb",
		targetField: "usage_data.roaming_mb"
	},
	{
		sourceField: "usage.data.country",
		targetField: "usage_data.country"
	},
	{
		sourceField: "network.type",
		targetField: "usage_data.network_type"
	},
	{
		sourceField: "network.provider_code",
		targetField: "usage_data.provider_code"
	},
	{
		sourceField: "usage.period.start",
		targetField: "billing_period.start"
	},
	{
		sourceField: "usage.period.end",
		targetField: "billing_period.end"
	}
];

export const vodafoneSmsChargesMapping: FieldMapping[] = [
	{
		sourceField: "sms:ChargeSMS.sms:UserID",
		targetField: "telgea_user_id",
	},
	{
		sourceField: "sms:ChargeSMS.sms:PhoneNumber",
		targetField: "msisdn",
	},
	{
		sourceField: "sms:ChargeSMS",
		targetField: "sms_charges",
		transform: (chargeData) => [{
			message_id: chargeData["sms:MessageID"],
			timestamp: chargeData["sms:Timestamp"],
			amount: chargeData["sms:ChargeAmount"],
			currency: chargeData["sms:Currency"]
		}],
	}
];