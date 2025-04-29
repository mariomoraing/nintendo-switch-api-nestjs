import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa MongooseModule
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GameSchema } from './schemas/games.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Game.name, schema: GameSchema}
    ]) // Registra el esquema
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}