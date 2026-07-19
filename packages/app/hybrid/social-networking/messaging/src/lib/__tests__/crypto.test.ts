import { webcrypto } from 'crypto';
if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    writable: true,
  });
}

import {
  generateKeyPair,
  deriveSharedKey,
  encrypt,
  decrypt,
  exportSharedKey,
  generateVerificationCode,
  getDeviceFingerprint,
  hashPin,
  verifyPin,
} from '@/lib/crypto';

describe('crypto', () => {
  describe('generateKeyPair', () => {
    it('returns object with publicKey and privateKey strings', async () => {
      const keys = await generateKeyPair();
      expect(typeof keys.publicKey).toBe('string');
      expect(typeof keys.privateKey).toBe('string');
      expect(keys.publicKey.length).toBeGreaterThan(0);
      expect(keys.privateKey.length).toBeGreaterThan(0);
    });
  });

  describe('deriveSharedKey', () => {
    it('returns a CryptoKey', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const sharedKey = await deriveSharedKey(alice.privateKey, bob.publicKey);
      expect(sharedKey).toBeDefined();
      expect(sharedKey.type).toBe('secret');
    });
  });

  describe('encrypt / decrypt', () => {
    it('roundtrip encrypts and decrypts plaintext', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const sharedKeyA = await deriveSharedKey(alice.privateKey, bob.publicKey);
      const sharedKeyB = await deriveSharedKey(bob.privateKey, alice.publicKey);
      const exportedA = await exportSharedKey(sharedKeyA);
      const exportedB = await exportSharedKey(sharedKeyB);

      const plaintext = 'hello, secure world';
      const ciphertext = await encrypt(plaintext, exportedA);
      const decrypted = await decrypt(ciphertext, exportedB);
      expect(decrypted).toBe(plaintext);
    });

    it('decrypt with wrong key fails', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const charlie = await generateKeyPair();
      const sharedKeyA = await deriveSharedKey(alice.privateKey, bob.publicKey);
      const sharedKeyC = await deriveSharedKey(
        charlie.privateKey,
        alice.publicKey
      );
      const exportedA = await exportSharedKey(sharedKeyA);
      const exportedC = await exportSharedKey(sharedKeyC);

      const ciphertext = await encrypt('secret', exportedA);
      await expect(decrypt(ciphertext, exportedC)).rejects.toThrow();
    });
  });

  describe('exportSharedKey', () => {
    it('returns base64 string', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const sharedKey = await deriveSharedKey(alice.privateKey, bob.publicKey);
      const exported = await exportSharedKey(sharedKey);
      expect(typeof exported).toBe('string');
      expect(exported.length).toBeGreaterThan(0);
      expect(() => atob(exported)).not.toThrow();
    });
  });

  describe('generateVerificationCode', () => {
    it('returns 6-digit string', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const code = await generateVerificationCode(
        alice.publicKey,
        bob.publicKey
      );
      expect(code).toMatch(/^\d{6}$/);
    });

    it('is commutative regardless of argument order', async () => {
      const alice = await generateKeyPair();
      const bob = await generateKeyPair();
      const codeAB = await generateVerificationCode(
        alice.publicKey,
        bob.publicKey
      );
      const codeBA = await generateVerificationCode(
        bob.publicKey,
        alice.publicKey
      );
      expect(codeAB).toBe(codeBA);
    });
  });

  describe('getDeviceFingerprint', () => {
    it('returns a string containing pipe separators', () => {
      const fp = getDeviceFingerprint();
      expect(typeof fp).toBe('string');
      expect(fp).toContain('|');
      expect(fp.split('|').length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('hashPin', () => {
    it('returns consistent hashes', async () => {
      const hash1 = await hashPin('1234');
      const hash2 = await hashPin('1234');
      expect(hash1).toBe(hash2);
    });
  });

  describe('verifyPin', () => {
    it('returns true for matching pin/hash', async () => {
      const hash = await hashPin('5678');
      const result = await verifyPin('5678', hash);
      expect(result).toBe(true);
    });

    it('returns false for mismatched pin/hash', async () => {
      const hash = await hashPin('5678');
      const result = await verifyPin('0000', hash);
      expect(result).toBe(false);
    });
  });
});
