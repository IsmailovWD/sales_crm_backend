import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionsDto } from './create-regions.dto';

export class UpdateRegionsDto extends PartialType(CreateRegionsDto) {}
