import { Test, TestingModule } from '@nestjs/testing';
import { CipherService } from './cipher.service';

describe('CipherService', () => {
  let testService: CipherService;

  const testUUID: string = '2fda8229-a4d7-43da-99cf-2644a28417aa';
  const testEncryptedValue: string = 'TheDummyIV:TheEncryptedValueToBeFilledIn';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CipherService],
    }).compile();

    testService = module.get<CipherService>(CipherService);
  });

  it('should be defined', () => {
    expect(testService).toBeDefined();
  });

  it('Encrypts a uuid into an encrypted value', async () => {
    expect(await testService.encrypt(testUUID)).toEqual(testEncryptedValue);
  });

  it('Decrypts an encrypted value into a uuid', async () => {
    expect(await testService.decrypt(testUUID)).toEqual(testEncryptedValue);
  });

  it('Generates an IV of 32 bits length', () => {});

});
