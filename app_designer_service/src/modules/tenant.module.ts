import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantController } from "src/controllers/tenant.controller";
import { Tenant } from "src/entities/tenant.entity";
import { TenantService } from "src/services/tenant.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}