/**
 * Defines a mapping between source field(s) and a target field with optional transformation
 */
 export type FieldMapping = {
	/** Source field(s) to map from - can be a single field or multiple fields */
 	sourceField: string | string[];
	/** Target field to map to */
 	targetField: string;
	/** Optional function to transform the source value(s) before assigning to the target */
 	transform?: (value: any) => any;
 };