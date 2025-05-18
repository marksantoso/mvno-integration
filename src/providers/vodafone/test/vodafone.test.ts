// VodafoneIntegration.test.ts
import fs from 'fs';
import path from 'path';
import { mvnoRegistry } from '../..';
import restFixture from './fixtures/mvno_rest_spec.json';
import restFixtureDifferentMsisdn from './fixtures/mvno_rest_spec_different_msisdn.json';
const soapFixture = fs.readFileSync(path.join(__dirname, './fixtures/mvno_soap_spec.xml'), 'utf-8');
const brokenSoap = fs.readFileSync(path.join(__dirname, './fixtures/mvno_soap_broken_spec.xml'), 'utf-8');
const soapDifferentUser = fs.readFileSync(path.join(__dirname, './fixtures/mvno_soap_different_user.xml'), 'utf-8');

const integration = mvnoRegistry.vodafone;

describe('VodafoneIntegration Pure Conversion Tests', () => {
  it('converts REST data correctly', async () => {
    const result = await integration.convertUsageResponse(restFixture);

    expect(result.telgea_user_id).toBe('abc123');
    expect(result.usage_data?.total_mb).toBe(845.23);
  });

  it('converts SOAP data correctly', async () => {
    const result = await integration.convertSmsChargesResponse(soapFixture);
    expect(result.sms_charges?.[0].amount).toBe(0.05);
  });

  it('normalizes data from multiple partials', async () => {
    const restResult = await integration.convertUsageResponse(restFixture);
    const soapResult = await integration.convertSmsChargesResponse(soapFixture);

    const normalized = integration.normalize(restResult, soapResult);

    expect(normalized.telgea_user_id).toBe('abc123');
    expect(normalized.usage_data?.total_mb).toBe(845.23);
    expect(normalized.sms_charges?.[0].amount).toBe(0.05);
  });

  it('throws on broken XML input', async () => {
    await expect(
      integration.convertSmsChargesResponse(brokenSoap)
    ).rejects.toThrow();
  });

  it('throws on user mismatch between partials', async () => {
    const restResult = await integration.convertUsageResponse(restFixture);
    const soapResult = await integration.convertSmsChargesResponse(soapDifferentUser);

    expect(() => integration.normalize(restResult, soapResult)).toThrow(
      'User mismatch: user abc123 does not match user xyz456'
    );
  });

  it('throws on MSISDN mismatch between partials', async () => {
    const restResult = await integration.convertUsageResponse(restFixtureDifferentMsisdn);
    const soapResult = await integration.convertSmsChargesResponse(soapFixture);

    expect(() => integration.normalize(restResult, soapResult)).toThrow(
      'MSISDN mismatch: MSISDN +46701234561 does not match MSISDN +46701234567'
    );
  });
});

describe('Required Field Validation Tests', () => {
  it('throws with proper Zod error when user_id is missing', async () => {
    // Create an object with the same structure but make properties optional
    const invalidData = { ...restFixture } as Partial<typeof restFixture>;
    delete invalidData.user_id;
    
    try {
      await integration.convertUsageResponse(invalidData);
      fail('Should have thrown an error');
    } catch (error: any) { // Type the error as any to access properties
      expect(error.message).toContain('invalid_type');
      expect(error.message).toContain('user_id');
      expect(error.message).toContain('Required');
    }
  });

  it('throws with proper Zod error when msisdn is missing', async () => {
    const invalidData = { ...restFixture } as Partial<typeof restFixture>;
    delete invalidData.msisdn;
    
    try {
      await integration.convertUsageResponse(invalidData);
      fail('Should have thrown an error');
    } catch (error: any) {
      // Check the error contains expected Zod validation details
      expect(error.message).toContain('invalid_type');
      expect(error.message).toContain('msisdn');
      expect(error.message).toContain('Required');
    }
  });
});