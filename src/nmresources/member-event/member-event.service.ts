import { Injectable } from '@nestjs/common';
import { CreateMemberEventDto } from './dto/create-member-event.dto';
import { UpdateMemberEventDto } from './dto/update-member-event.dto';

@Injectable()
export class MemberEventService {
  create(createMemberEventDto: CreateMemberEventDto) {
    return 'This action adds a new memberEvent';
  }

  findAll() {
    return `This action returns all memberEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberEvent`;
  }

  update(id: number, updateMemberEventDto: UpdateMemberEventDto) {
    return `This action updates a #${id} memberEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberEvent`;
  }
}
