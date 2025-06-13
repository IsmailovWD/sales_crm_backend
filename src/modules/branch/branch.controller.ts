/* eslint-disable */

import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request as Rq } from 'express';
import * as fs from 'fs';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateBranchDto } from './dto/create-dto';
import { BranchService } from './branch.service';

@ApiTags('Branch')
@Controller('api/v1/branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req: Rq, file, cb) => {
          const tenant = req.headers['x-tenant-id'] as string;
          if (!tenant)
            return cb(new BadRequestException('Tenant header missing'), '');

          const uploadPath = join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'uploads',
            tenant,
          );
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateBranchDto })
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body('name') name: string,
    @Request() req: any,
  ) {
    const tenant = req.headers['x-tenant-id'] as string;
    const imagePath = image ? `/${tenant}/${image.filename}` : undefined;
    return await this.branchService.create(name, req.user.id, imagePath);
  }
}
