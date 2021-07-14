import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../roomList/roomList.module';
import { chat_room } from '../roomList/roomList.entity';
import { ProfileModule } from '../profile/profile.module';
import { AdminModule } from 'src/admin/admin.module';
import { MatchHistoryModule } from 'src/match-history/match-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db_postgres',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'transcendence',
      entities: [chat_room, 'dist/**/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoomModule,
    ProfileModule,
    AdminModule,
    MatchHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
