import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { AssignCategoryDto } from './dto/assign-category.dto';
import { UpdateCategoryAssignmentDto } from './dto/update-category-assignment.dto';
import { FilterHistoryDto } from './dto/filter-history.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() filterHistoryDto: FilterHistoryDto,
  ) {
    return this.walletsService.findOne(id, filterHistoryDto);
  }

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Post('assignment')
  assignCategory(@Body() assignCategoryDto: AssignCategoryDto) {
    return this.walletsService.assignCategory(assignCategoryDto);
  }

  @Patch('assignment/:id')
  updateCategoryAssignment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryAssignmentDto: UpdateCategoryAssignmentDto,
  ) {
    return this.walletsService.updateCategoryAssignment(
      id,
      updateCategoryAssignmentDto,
    );
  }

  @Delete('assignment/:id')
  deleteCategoryAssignment(@Param('id', ParseIntPipe) id: number) {
    return this.walletsService.deleteCategoryAssignment(id);
  }
}
