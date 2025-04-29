import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateGameDto, UpdateGameDto } from './game.dto'
import { Game } from './schemas/games.schema'

@Injectable()
export class GamesService {

    constructor(@InjectModel(Game.name) private gameModel: Model<Game>){}


    async findAll(): Promise<Game[]> {
        return this.gameModel.find().exec();
    }

    async findOne(id: string): Promise<Game> {

        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        const game = this.gameModel.findById(id).exec();

        if(!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }

    async create(createGameDto: CreateGameDto): Promise<Game> {
        
        const newGame = new this.gameModel(createGameDto);

        return newGame.save();
    }

    async deleteGame(id: string): Promise<void> {

        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        const result = await this.gameModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
    }

    async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {

        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        
        const updateGame = await this.gameModel.findByIdAndUpdate(id, updateGameDto, { new: true}).exec();

        if (!updateGame){
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        return updateGame;
    }
}