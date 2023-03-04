import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('cards')
export class CardsController {
  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {}

  @Post()
  create() {}
}
