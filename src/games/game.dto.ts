import { IsOptional, IsNotEmpty, IsDateString, Matches } from "class-validator";

export class CreateGameDto {
    title: string;
    genre: string;
    releaseDate: string;
}

export class UpdateGameDto {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    genre?: string;

    @IsOptional()
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'releaseDate must be in YYYY-MM-DD format' })
    releaseDate?: string
}