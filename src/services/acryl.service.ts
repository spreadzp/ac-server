import { Injectable} from '@nestjs/common';
import { ConfigService } from './config.service';
import { utils, libs } from '@waves/signature-generator';
const ab2str = require('arraybuffer-to-string')

@Injectable()
export class AcrylService {
  constructor(private config: ConfigService) {
  }

  getAllTxUrl(limitTx: number): any {
    return `${this.config.get('NODE')}address/${this.config.get('ADDRESS')}/limit/${limitTx}`
  }

  getFullUrl (pastUrl: string) {
    return `${this.config.get('NODE')}info/${pastUrl}`
  }

  getTransportKey(senderPublicKey: any) {
    const { privateKey} = utils.crypto.buildKeyPair(
      this.config.get('SEED'),
    );
    const pk = this.config.get('SP').split(',').map(Number);
    const sp = new Uint8Array(pk);
    const sharedKey = libs.axlsign.sharedKey(privateKey, sp);
    const encSharedKey = libs.base58.encode(sharedKey);
    return encSharedKey;
  }
decode58(encHash: string): string {
    const uint8Hash = libs.base58.decode(encHash);
    var str = ab2str(uint8Hash);
    return str;
}
  convertPublicKeyStingToUint8Array (publicKey: string) {
    const keyArray = libs.converters.stringToByteArray(publicKey);
    const Ed25519Key = libs.axlsign.convertPk(keyArray);
    const keyWordArray = libs.converters.byteArrayToWordArray(Ed25519Key);
    const publicKeyUin8 = libs.converters.wordArrayToByteArrayEx(keyWordArray);
    const u8 = new Uint8Array(Ed25519Key);
    return u8;

  }

  decrypt(encData: string, senderPublicKey: string, round: number) {
    const decryptData = utils.crypto.decryptSeed(encData, senderPublicKey, round);
    return decryptData;
  }
}
