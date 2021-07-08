import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../roomList/roomList.module';
import { chat_room } from '../roomList/roomList.entity';
import { UsersModule } from '../profile/users/users.module';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'db_postgres',
		port: 5432,
		username: 'postgres',
		password: 'password',
		database: 'transcendence',
		entities: [chat_room, "dist/**/**/**.entity{.ts,.js}"],
		synchronize: true,
	}),
		RoomModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppGateway]
})
export class AppModule { }
