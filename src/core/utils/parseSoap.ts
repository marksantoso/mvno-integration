import { parseStringPromise } from 'xml2js';

/**
 * Parses a SOAP XML string and returns the inner body content.
 * Assumes the SOAP body structure is: soapenv:Envelope > soapenv:Body > someOperation
 * @param xml SOAP XML string to parse
 * @param options Optional xml2js parser options
 */
export async function parseSoap<T>(xml: string, options: Record<string, any> = {}): Promise<T> {
	try {
		const parseOptions = { explicitArray: false, ...options };
		const result = await parseStringPromise(xml, parseOptions);
		const body = result['soapenv:Envelope']?.['soapenv:Body'];

		if (!body) {
			throw new Error('Invalid SOAP structure: Missing soapenv:Body');
		}

		return body;
	} catch (error) {
		throw new Error(`Failed to parse SOAP XML: ${String(error)}`);
	}
}
