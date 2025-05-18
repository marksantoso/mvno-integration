import { InternalFormat } from "../../types/internal";
import { IMVNOIntegration } from "../../../core/interfaces/MVNOIntegration";
import { VodafoneUsage } from "../../types/vodafone";

export interface IVodafoneIntegration extends IMVNOIntegration {
  /**
   * Converts a Vodafone SOAP XML response to the internal format
   * @param xml The XML string from Vodafone SOAP service
   * @returns Converted data in internal format
   */
  convertSmsChargesResponse(xml: string): Promise<Partial<InternalFormat>>;

  /**
   * Converts a Vodafone REST API response to the internal format
   * @param data The data object from Vodafone REST API
   * @returns Converted data in internal format
   */
  convertUsageResponse(data: VodafoneUsage): Partial<InternalFormat>;
}