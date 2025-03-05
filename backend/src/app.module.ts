// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule], // Registre os módulos
})
export class AppModule {}