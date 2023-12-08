import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/user.enity';
import { LoggerMiddleware } from './user/user.middleware';
import { BookModule } from './book/book.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserEntity],
      synchronize: true,
      migrations: [
        /*...*/
      ],
      migrationsTableName: 'custom_migration_table',
      // synchronize: true shouldn't be used in production - otherwise you can lose production data.
    }),
    UserModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // thêm middleware cho cac url 'user'
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
