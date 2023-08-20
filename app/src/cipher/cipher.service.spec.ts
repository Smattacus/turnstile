import { Test, TestingModule } from '@nestjs/testing';
import { CipherService } from './cipher.service';
import { AppVars } from '../app.envvars';
import { MockCipherService } from '../../test/mocks/cipher.service.mock';
import { Cipher } from 'crypto';

describe('CipherService', () => {
  let testService: CipherService;
  let mockService: CipherService;

  const testUUID: string = '2fda8229-a4d7-43da-99cf-2644a28417aa';
  const testEncryptedValue: string =
    '30313233343536373839616263646566_729d05ed41aac767b113ef260a95e4e040575bb4263999d266eee5168308f2223ed002bb83f7d99af9f2ed7c62dca334';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CipherService, MockCipherService],
    }).compile();

    testService = module.get<CipherService>(CipherService);
    mockService = module.get<MockCipherService>(MockCipherService);
    process.env[AppVars.TURNSTILE_SECRET] = 'this is a test secret';
  });

  it('should be defined', () => {
    expect(testService).toBeDefined();
  });

  it('Encrypts a uuid into an encrypted value', async () => {
    expect(await mockService.encrypt(testUUID)).toEqual(testEncryptedValue);
  });

  it('Decrypts an encrypted value into a uuid', async () => {
    expect(await mockService.decrypt(testEncryptedValue)).toEqual(testUUID);
  });

  it('Returns a 16 element IV', async () => {
    const iv: Buffer = await testService.generateIV();
    expect(iv).toBeInstanceOf(Buffer);
    expect(iv).toHaveLength(16);
  });
});
