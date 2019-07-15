import { Controller, Get, HttpService, Param } from '@nestjs/common';
import { AcrylService } from './services/acryl.service';

@Controller('')
export class AcrylController {
  arrayTx = [];
  constructor(private readonly acrylService: AcrylService,
    private readonly http: HttpService) { }

  @Get('')
  async getTx(): Promise<any> {
    const response = await this.http.get(this.acrylService.getAllTxUrl(100)).toPromise();
    const attachmentList = await response.data[0].map(item => this.acrylService.decode58(item.attachment))
    this.arrayTx = attachmentList.slice();
    return this.arrayTx;
  }

  @Get('/tx-info/:id')
  async txInfo(@Param('id') id: string): Promise<any> {
    const fullurl = this.acrylService.getFullUrl(id);
    const response = await this.http.get(fullurl).toPromise();
    const pubKeyUint8 = this.acrylService.convertPublicKeyStingToUint8Array(response.data.senderPublicKey);

    const transportKey = this.acrylService.getTransportKey(pubKeyUint8);
    const decryptData = this.acrylService.decrypt(response.data.data[0].value, transportKey, 5000);
    return decryptData;
  }

  @Get('**')
  wrongRoute() {
    return 'Page not found!'
  }
}
