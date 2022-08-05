import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Tenant } from "src/entities/tenant.entity";
import { TenantService } from "src/services/tenant.service";

@Controller("/tenant")
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get("")
  fetchAll() {
    return this.tenantService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const tenant = await this.tenantService.fetchOne(+id);

    if (!tenant) throw new NotFoundException("Tenant not found");

    return tenant;
  }

  @Post()
  create(@Body() tenant: Tenant) {
    return this.tenantService.create(tenant);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() tenant: Partial<Tenant>) {
    const receivedTenant = await this.tenantService.update(+id, tenant);

    if (!receivedTenant) throw new NotFoundException("Tenant not found");

    return receivedTenant;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedTenant = await this.tenantService.delete(+id);

    if (!receivedTenant) throw new NotFoundException("Tenant not found");

    return receivedTenant;
  }
}