import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ type: 'string', description: 'Branch name' })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Branch image',
  })
  image?: any;
}
