import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DealActivityType } from '../entities/deal-activity.entity';

export class TaskMetadataDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsOptional()
  @IsNumber()
  due_date: number;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  before_due_date: number[];

  @IsOptional()
  @IsBoolean()
  done: boolean;
}

export class StageChangeMetadataDto {
  @IsNotEmpty()
  @IsString()
  from_stage: string;

  @IsNotEmpty()
  @IsString()
  to_stage: string;
}

export class EditMetadataDto {
  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsString()
  old_value: string;

  @IsNotEmpty()
  @IsString()
  new_value: string;
}

export class ActionMetadataDto {
  @IsNotEmpty()
  @IsString()
  action: string;
}

export class CommentMetadataDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class NoteMetadataDto {
  @IsNotEmpty()
  @IsString()
  note: string;
}

export class CreateDealActivityDto {
  @IsBoolean()
  is_pin: boolean;

  @IsEnum(DealActivityType)
  type: DealActivityType;

  @IsNotEmpty()
  @IsNumber()
  deal_id: number;

  @IsOptional()
  @ValidateNested()
  @Type((options) => {
    const object = options?.object ?? {};
    switch (object.type) {
      case DealActivityType.TASK:
        return TaskMetadataDto;
      case DealActivityType.STAGE_CHANGE:
        return StageChangeMetadataDto;
      case DealActivityType.EDIT:
        return EditMetadataDto;
      case DealActivityType.ACTION:
        return ActionMetadataDto;
      case DealActivityType.COMMENT:
        return CommentMetadataDto;
      case DealActivityType.NOTE:
        return NoteMetadataDto;
      default:
        throw new Error('Unknown activity type for metadata');
    }
  })
  metadata?:
    | TaskMetadataDto
    | StageChangeMetadataDto
    | EditMetadataDto[]
    | ActionMetadataDto
    | CommentMetadataDto
    | Object;
}
