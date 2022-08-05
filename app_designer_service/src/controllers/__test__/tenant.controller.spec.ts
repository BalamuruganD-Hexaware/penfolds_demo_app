import { Test } from "@nestjs/testing";
import { TenantService } from "src/services/tenant.service";
import { TenantController } from "src/controllers/tenant.controller";
import { Tenant } from "src/entities/tenant.entity";

describe("TenantController", () => {
  let controller: TenantController;
  let service: TenantService;

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
    const mockService = {
      fetchAll: () => Promise.resolve(multipleTenants),
      fetchOne: (id: number) => Promise.resolve(singleTenant),
      create: (tenant: Tenant) => Promise.resolve(tenant),
      delete: (id: number) => Promise.resolve(singleTenant),
      update: (id: number, tenant: Partial<Tenant>) => Promise.resolve(tenant),
    };

    const module = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(TenantController);
    service = module.get(TenantService);
  });

  describe("fetchAll", () => {
    it("should fetch all tenants", async () => {
      const tenants = await controller.fetchAll();
      expect(tenants.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one tenant for the given id", async () => {
      const tenant = await controller.fetchOne("1");

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });

  describe("Create tenant", () => {
    it("should create a tenant", async () => {
      const tenant = await controller.create(singleTenant);

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });

  describe("Update tenant", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, tenant: Partial<Tenant>) => Promise.resolve(null);
      await expect(controller.update("1", singleTenant)).rejects.toThrow();
    });

    it("should return one tenant for the given id", async () => {
      const tenant = await controller.update("1", singleTenant);

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });

  describe("Delete tenant", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one tenant for the given id", async () => {
      const tenant = await controller.delete("1");

      expect(tenant.name).toEqual(singleTenant.name);

    });
  });
});
