import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateFaqDto } from './dto/create-faq.dto'
import { UpdateFaqDto } from './dto/update-faq.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Faq } from './entities/faq.entity'

@Injectable()
export class FaqService {
  constructor(
    @Inject('FAQ_REPOSITORY') private faqRepository: Repository<Faq>
  ) {}
  create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const newFaq = this.faqRepository.create(createFaqDto)
    return this.faqRepository.save(newFaq)
  }

  async findAll(): Promise<Faq[]> {
    const faq: Faq[] = await this.faqRepository.find()
    if (faq.length > 0) {
      return faq
    }
    throw new NotFoundException('Faq not found')
  }

  async findOne(id: number): Promise<Faq> {
    const faq: Faq | null = await this.faqRepository.findOne({ where: { id } })
    if (faq) {
      return faq
    }
    throw new NotFoundException('Faq not found')
  }

  update(id: number, updateFaqDto: UpdateFaqDto): Promise<UpdateResult> {
    return this.faqRepository.update(id, updateFaqDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.faqRepository.delete(id)
  }
}
