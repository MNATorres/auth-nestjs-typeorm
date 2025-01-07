import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../task/entities/task.entity';
import { ConfigType } from '@nestjs/config';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configServide: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configServide.mysql;

        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
