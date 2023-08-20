import { Injectable } from '@nestjs/common';
import { CipherService } from '../../src/cipher/cipher.service';

@Injectable()
export class MockCipherService extends CipherService {
  public generateIV(): Buffer {
    return Buffer.from('0123456789abcdef');
  }

  public generateSalt(): Buffer {
    return Buffer.from('ThisIsASalt');
  }
}
