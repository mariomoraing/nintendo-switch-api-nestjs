import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './game.dto';


@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService){}

    @Get()
    async findAll(): Promise<any[]> {
        return this.gamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<any> {
        return this.gamesService.findOne(id);
    }

    @Post()
    create(@Body() createGameDto: CreateGameDto): Promise<any> {
        return this.gamesService.create(createGameDto);
    }

    @Delete(':id')
    deleteGame(@Param('id') id: string): Promise<void> {
        return this.gamesService.deleteGame(id);
    }

    @Put(':id')
    updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<any> {
        return this.gamesService.updateGame(id, updateGameDto)
    }
}