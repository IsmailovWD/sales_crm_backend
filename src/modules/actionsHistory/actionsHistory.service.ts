import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ActionsHistory } from './entities/actionsHistory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActionsHistoryService {
  constructor(
    @InjectRepository(ActionsHistory)
    private actionsHistoryRepo: Repository<ActionsHistory>,
  ) {}
}
