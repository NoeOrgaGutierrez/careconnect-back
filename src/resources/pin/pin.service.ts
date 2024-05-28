import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePinDto } from './dto/create-pin.dto'
import { UpdatePinDto } from './dto/update-pin.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Pin } from './entities/pin.entity'

@Injectable()
export class PinService {
  constructor(
    @Inject('PIN_REPOSITORY') private pinRepository: Repository<Pin>
  ) {}
  create(createPinDto: CreatePinDto): Promise<Pin> {
    const newPin: Pin = this.pinRepository.create(createPinDto)
    return this.pinRepository.save(newPin)
  }

  async findAll(): Promise<Pin[]> {
    const pins = await this.pinRepository.find()
    if (pins.length > 0) {
      return pins
    }
    throw new NotFoundException('Pins not found')
  }

  async findOne(id: number): Promise<Pin> {
    const pin: Pin | null = await this.pinRepository.findOne({ where: { id } })
    if (pin) {
      return pin
    }
    throw new NotFoundException('Pin not found')
  }

  update(id: number, updatePinDto: UpdatePinDto): Promise<UpdateResult> {
    return this.pinRepository.update(id, updatePinDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.pinRepository.delete({ id })
  }
}
