// src/providers/index.ts
import { VodafoneIntegration } from './vodafone';

export const mvnoRegistry = {
	vodafone: new VodafoneIntegration(),
};