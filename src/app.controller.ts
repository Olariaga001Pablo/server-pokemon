import { Controller, Get, Post, Body, Query, Res, Param, Delete, Response, Redirect} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pokemon')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPokemonList(@Query('page') page: number, @Response() res) {
    const pokemonList = await this.appService.getPokemonList(page);
    return res.status(200).json(pokemonList);
  }

  @Post()
  async addPokemon(@Body() pokemon: any, @Response() res) {
    try {
      const newPokemon = await this.appService.addPokemon(pokemon);
      return res.status(201).json(newPokemon);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deletePokemon(@Param('id') id: string, @Response() res) {
    try {
      const idNumber = parseInt(id, 10);
      const deletedPokemon = await this.appService.deletePokemon(idNumber);
      return res.status(200).json(deletedPokemon);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}
