import _ from "lodash";
import { MVNOIntegrationBase } from "../base/MVNOIntegrationBase";
import { InternalFormat } from "../../core/types/internal";
import { parseSoap } from "../../core/utils/parseSoap";
import { VodafoneSmsChargesParsed } from "./types/vodafone";
import { VodafoneSmsChargesParsedSchema, VodafoneUsageSchema } from "./schemas/vodafone.schema";
import { vodafoneUsageMapping, vodafoneSmsChargesMapping } from './converters';
import { IVodafoneIntegration } from "./interfaces/Vodafone";

/**
 * Vodafone integration class that extends MVNOIntegrationBase
 * Implements IVodafoneIntegration interface
 */
export class VodafoneIntegration extends MVNOIntegrationBase implements IVodafoneIntegration {
	async convertSmsChargesResponse(xml: string): Promise<Partial<InternalFormat>> {
		const parsed = await parseSoap<VodafoneSmsChargesParsed>(xml, {
			explicitArray: false,
		});

		return this.convertData(
			parsed,
			VodafoneSmsChargesParsedSchema,
			vodafoneSmsChargesMapping
		);
	}

	convertUsageResponse(data: any): Partial<InternalFormat> {
		return this.convertData(
			data,
			VodafoneUsageSchema,
			vodafoneUsageMapping
		);
	}
}
