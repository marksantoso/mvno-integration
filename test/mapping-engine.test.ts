import { mapWithConfig } from '../src/converters/mapping-engine';
import { FieldMapping } from '../src/core/types/mapping';
import _ from 'lodash';

describe('mapWithConfig', () => {
  // Basic test with simple mapping
  test('should map simple fields correctly', () => {
    const source = { 
      name: 'John', 
      age: 30 
    };
    
    const mappingConfig: FieldMapping[] = [
      { sourceField: 'name', targetField: 'userName' },
      { sourceField: 'age', targetField: 'userAge' }
    ];
    
    const result = mapWithConfig(source, mappingConfig);
    
    expect(result).toEqual({
      userName: 'John',
      userAge: 30
    });
  });
  
  // Test with nested fields
  test('should map nested fields correctly', () => {
    const source = { 
      user: { 
        id: '123', 
        profile: { 
          name: 'Jane', 
          email: 'jane@example.com' 
        } 
      } 
    };
    
    const mappingConfig: FieldMapping[] = [
      { sourceField: 'user.id', targetField: 'userId' },
      { sourceField: 'user.profile.name', targetField: 'userName' },
      { sourceField: 'user.profile.email', targetField: 'userEmail' }
    ];
    
    const result = mapWithConfig(source, mappingConfig);
    
    expect(result).toEqual({
      userId: '123',
      userName: 'Jane',
      userEmail: 'jane@example.com'
    });
  });
  
  // Test with target nested structure
  test('should create nested target structure correctly', () => {
    const source = { 
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };
    
    const mappingConfig: FieldMapping[] = [
      { sourceField: 'firstName', targetField: 'user.name.first' },
      { sourceField: 'lastName', targetField: 'user.name.last' },
      { sourceField: 'email', targetField: 'user.contact.email' }
    ];
    
    const result = mapWithConfig(source, mappingConfig);
    
    expect(result).toEqual({
      user: {
        name: {
          first: 'John',
          last: 'Doe'
        },
        contact: {
          email: 'john@example.com'
        }
      }
    });
  });
  
  // Test with multiple source fields
  test('should handle multiple source fields correctly', () => {
    const source = { 
      primaryPhone: '555-1234',
      // secondaryPhone is intentionally missing
      contactPhone: '555-5678'
    };
    
    const mappingConfig: FieldMapping[] = [
      { sourceField: ['secondaryPhone', 'primaryPhone', 'contactPhone'], targetField: 'phone' }
    ];
    
    const result = mapWithConfig(source, mappingConfig);
    
    expect(result).toEqual({
      phone: '555-1234'  // should take the first found value (primaryPhone)
    });
  });
    
  // Test with undefined values
  test('should not include undefined values in result', () => {
    const source = { 
      name: 'John'
      // age is missing
    };
    
    const mappingConfig: FieldMapping[] = [
      { sourceField: 'name', targetField: 'userName' },
      { sourceField: 'age', targetField: 'userAge' }
    ];
    
    const result = mapWithConfig(source, mappingConfig);
    
    expect(result).toEqual({
      userName: 'John'
      // userAge should not be in the result
    });
    expect(result).not.toHaveProperty('userAge');
  });
  
});