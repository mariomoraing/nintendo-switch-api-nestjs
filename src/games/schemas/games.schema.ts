import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Game extends Document {
    @Prop({ required: true})
    title: string;

    @Prop({ required: true})
    genre: string;

    @Prop({ required: true })
    releaseDate: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);