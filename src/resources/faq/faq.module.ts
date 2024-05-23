import { Module } from '@nestjs/common'
import { FaqService } from './faq.service'
import { FaqController } from './faq.controller'
import { DatabaseModule } from 'src/database/database.module'
import { faqProviders } from './faq.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [FaqController],
  providers: [FaqService, ...faqProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FaqModule {}
