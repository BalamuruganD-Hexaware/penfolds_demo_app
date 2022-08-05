import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { UserModule } from "./modules/user.module";
import { User } from "./entities/user.entity";
import { TenantModule } from "./modules/tenant.module";
import { Tenant } from "./entities/tenant.entity";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const entities = [User, Tenant];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      ssl: {},
      entities,
      synchronize: true,
    }),
    WinstonModule.forRoot({
      level: "info",
      format: combine(label({ label: "right now!" }), timestamp(), myFormat),
      transports: [
        new transports.File({
          filename: "logs/debug.log",
          level: "debug",
        }),
      ],
    }),
    UserModule,
    TenantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
