import { Injectable } from '@nestjs/common';
import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { AppVars } from '../app.envvars';

export interface IEncryptedData {
  data: string;
}

@Injectable()
export class CipherService {
  private algo: string = 'aes-192-cbc';
  private _key: Buffer;

  get key() {
    if (!this._key)
      this._key = scryptSync(
        Buffer.from(process.env[AppVars.TURNSTILE_SECRET]), // TODO: perhaps have this loaded in by the constructor?
        this.generateSalt(),
        24,
      );
    return this._key;
  }

  public generateIV(): Buffer {
    return randomBytes(16);
  }

  public generateSalt(): Buffer {
    return Buffer.from('ConstSaltForNow');
  }

  public async encrypt(input: string): Promise<string> {
    const iv: Buffer = this.generateIV();
    const cipher: Cipher = createCipheriv(this.algo, this.key, iv);
    let encrypted: string = cipher.update(input, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}_${encrypted}`;
  }

  public async decrypt(input: string): Promise<string> {
    const data_split: string[] = input.split('_');
    const iv: Buffer = Buffer.from(data_split[0], 'hex');
    const data: string = data_split[1];
    const decipher: Decipher = createDecipheriv(this.algo, this.key, iv);
    let decrypted: string = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
