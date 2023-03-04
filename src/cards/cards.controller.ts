import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CardsService } from './cards.service';
import { CreateCardDto } from "./dto/create-card.dto";

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOne(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
}
