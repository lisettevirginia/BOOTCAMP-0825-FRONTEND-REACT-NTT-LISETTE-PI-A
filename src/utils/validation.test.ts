import { describe, test, expect } from 'vitest';
import { 
  validateEmail, 
  validatePassword, 
  validateNoSpaces, 
  validateMinLength 
} from './validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    test('returns true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('first.last@subdomain.example.org')).toBe(true);
    });

    test('returns false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
      expect(validateEmail('user@domain.')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('returns true for passwords with at least 3 characters', () => {
      expect(validatePassword('abc')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('123')).toBe(true);
      expect(validatePassword('   ')).toBe(true); 
    });

    test('returns false for passwords with less than 3 characters', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('a')).toBe(false);
      expect(validatePassword('ab')).toBe(false);
    });
  });

  describe('validateNoSpaces', () => {
    test('returns true for strings without spaces', () => {
      expect(validateNoSpaces('hello')).toBe(true);
      expect(validateNoSpaces('test123')).toBe(true);
      expect(validateNoSpaces('')).toBe(true);
      expect(validateNoSpaces('camelCase')).toBe(true);
    });

    test('returns false for strings containing spaces', () => {
      expect(validateNoSpaces('hello world')).toBe(false);
      expect(validateNoSpaces(' test')).toBe(false);
      expect(validateNoSpaces('test ')).toBe(false);
      expect(validateNoSpaces('  ')).toBe(false);
      expect(validateNoSpaces('multiple spaces here')).toBe(false);
    });
  });

  describe('validateMinLength', () => {
    test('returns true when string meets or exceeds minimum length', () => {
      expect(validateMinLength('hello', 3)).toBe(true);
      expect(validateMinLength('test', 4)).toBe(true);
      expect(validateMinLength('abc', 3)).toBe(true);
      expect(validateMinLength('', 0)).toBe(true);
    });

    test('returns false when string is shorter than minimum length', () => {
      expect(validateMinLength('hi', 3)).toBe(false);
      expect(validateMinLength('a', 2)).toBe(false);
      expect(validateMinLength('', 1)).toBe(false);
      expect(validateMinLength('test', 5)).toBe(false);
    });

    test('handles edge cases correctly', () => {
      expect(validateMinLength('   ', 2)).toBe(true);
      expect(validateMinLength('ñ', 1)).toBe(true); 
      expect(validateMinLength('🚀', 1)).toBe(true); 
    });
  });
});