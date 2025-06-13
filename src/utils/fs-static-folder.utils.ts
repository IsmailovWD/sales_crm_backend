import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

export function ensureTenantUploadFolder(hostname: string) {
  const uploadPath = join(__dirname, '..', '..', 'uploads', hostname);
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
}

export function removeTenantUploadFolder(hostname: string) {
  const uploadPath = join(__dirname, '..', '..', 'uploads', hostname);
  if (existsSync(uploadPath)) {
    rmSync(uploadPath, { recursive: true, force: true });
  }
}
