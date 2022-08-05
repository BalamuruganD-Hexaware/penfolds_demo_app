import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tenant } from "src/entities/tenant.entity";
import { Repository } from "typeorm";

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
  ) {}

  fetchAll() {
    return this.tenantRepo.find();
  }

  fetchOne(id: number) {
    return this.tenantRepo.findOne({
      where: { id },
    });
  }

  create(tenant: Tenant) {
    const newTenant = this.tenantRepo.create(tenant);
    return this.tenantRepo.save(newTenant);
  }

  async update(id: number, attrs: Partial<Tenant>) {
    const tenant = await this.fetchOne(id);

    if (!tenant) {
      return null;
    }

    Object.assign(tenant, attrs);
    return this.tenantRepo.save(tenant);
  }

  async delete(id: number) {
    const tenant = await this.fetchOne(id);

    if (!tenant) {
      return null;
    }

    return this.tenantRepo.remove(tenant);
  }
}
