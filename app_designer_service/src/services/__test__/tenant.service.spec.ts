import { Tenant } from "src/entities/tenant.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TenantService } from "src/services/tenant.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("TenantService", () => {
  let service: TenantService;
  let repo: Repository<Tenant>;

  const singleTenant: Tenant = {
    id: 1,

    name: "rapidx",

  };

  const multipleTenants: Tenant[] = [
    {
      id: 1,

      name: "rapidx",

    }
  ];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleTenants),
      findOne: (id: number) => Promise.resolve(singleTenant),
      save: (tenant: Tenant) => Promise.resolve(tenant),
      create: (tenant: Tenant) => tenant,
      remove: (tenant: Tenant) => Promise.resolve(tenant),
    };

    const module = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(TenantService);
    repo = module.get(getRepositoryToken(Tenant));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all tenants from database", async () => {
      const tenants = await service.fetchAll();
      expect(tenants.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one tenant from the database", async () => {
      const tenant = await service.fetchOne(1);

      expect(tenant.name).toEqual(singleTenant.name);

    });
    it("should fetch no tenants from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const tenant = await service.fetchOne(1);
      expect(tenant).toBeNull();
    });
  });

  describe("Create tenant", () => {
    it("should create the tenant of the specified values", async () => {
      const tenant = await service.create(singleTenant);

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });

  describe("Update tenant", () => {
    it("should return null when tenant is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const tenant = await service.update(1, {});
      expect(tenant).toBeNull();
    });

    it("should update the tenant of the specified id", async () => {
      const tenant = await service.update(1, singleTenant);

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });

  describe("Delete tenant", () => {
    it("should return null when tenant is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const tenant = await service.delete(1);
      expect(tenant).toBeNull();
    });

    it("should delete the tenant of the specified id", async () => {
      const tenant = await service.delete(1);
      expect(tenant.id).toEqual(1);
    });
  });
});
