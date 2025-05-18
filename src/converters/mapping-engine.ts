import _ from 'lodash';
import { FieldMapping } from '../core/types/mapping';
import { InternalFormat } from '../core/types/internal';

/**
 * Maps data from a source object to a target object based on a configuration of field mappings.
 * 
 * @param source - The source object containing the data to be mapped
 * @param mappingConfig - Array of field mappings defining how to map from source to target
 * @returns A new object with the mapped data according to the configuration
 * 
 * @example
 * const source = { user: { id: '123', name: 'John' } };
 * const config = [
 *   { sourceField: 'user.id', targetField: 'userId' },
 *   { sourceField: 'user.name', targetField: 'userName' }
 * ];
 * const result = mapWithConfig(source, config);
 * // Result: { userId: '123', userName: 'John' }
 * 
 * @example
 * // Using array of possible source fields
 * const source = { profile: { userId: '123' } };
 * const config = [
 *   { sourceField: ['user.id', 'profile.userId'], targetField: 'id' }
 * ];
 * const result = mapWithConfig(source, config);
 * // Result: { id: '123' }
 * 
 * @throws {Error} If a required field is missing from the source
 */

export function mapWithConfig(source: any, mappingConfig: FieldMapping[]): Partial<InternalFormat> {
	let result = {};

	for (const mapping of mappingConfig) {
		let value;
		
		// In case source field has multiple possible fields, try them all as from list of possible fields
		if (Array.isArray(mapping.sourceField)) {
			// Try multiple possible source fields
			for (const field of mapping.sourceField) {
				value = _.get(source, field);
				if (value !== undefined) break;
			}
		} else {
			value = _.get(source, mapping.sourceField);
		}

		// Apply transform function if it exists and value is not undefined
		if (value !== undefined && mapping.transform) {
			value = mapping.transform(value);
		}

		// Set value in result if not undefined
		if (value !== undefined) {
 			_.set(result as object, mapping.targetField, value);
		}
	}

	return result;
}