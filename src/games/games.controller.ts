import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard  } from '@nestjs/passport'
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

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createGameDto: CreateGameDto): Promise<any> {
        return this.gamesService.create(createGameDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteGame(@Param('id') id: string): Promise<void> {
        return this.gamesService.deleteGame(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<any> {
        return this.gamesService.updateGame(id, updateGameDto)
    }
}