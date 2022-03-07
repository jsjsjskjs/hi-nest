import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  domainCheck(): string {
    return 'Hello World!'
  }
}
