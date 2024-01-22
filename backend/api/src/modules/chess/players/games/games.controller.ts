import { ChessGameDto } from '@hieudoanm/generated/chessGame.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GamesResponseDto,
  SyncRequestDto,
  SyncedResponseDto,
} from './games.dto';
import { GamesService } from './games.service';

@ApiTags('chess')
@Controller({ version: '1', path: 'chess' })
@UseInterceptors(CacheInterceptor)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('players/:username/games')
  @ApiParam({
    name: 'username',
    description: 'username',
    type: String,
  })
  @ApiQuery({
    name: 'year',
    description: 'year',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'month',
    description: 'month',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: 'offset',
    type: Number,
    required: false,
  })
  @ApiResponse({ status: 200, type: GamesResponseDto })
  async getGames(
    @Param('username') username: string = 'hikaru',
    @Query('year') year: number = new Date().getFullYear(),
    @Query('month') month: number = new Date().getMonth() + 1,
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0
  ): Promise<GamesResponseDto> {
    return this.gamesService.getGames(
      username,
      { month, year },
      { limit, offset }
    );
  }

  @Post('players/:username/games')
  @ApiResponse({ status: 200, type: SyncedResponseDto })
  async syncGames(
    @Param('username') username: string,
    @Body() syncRequest: SyncRequestDto
  ): Promise<SyncedResponseDto> {
    const {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    } = syncRequest;
    return this.gamesService.syncGames(username, { month, year });
  }

  @Get('players/:username/games/:gameId')
  @ApiResponse({ status: 200, type: ChessGameDto })
  async getGame(
    @Param('username') username: string,
    @Param('gameId') gameId: string
  ): Promise<ChessGameDto> {
    return this.gamesService.getGame(username, gameId);
  }

  @Get('players/:username/games/:gameId/pgn')
  @ApiResponse({ status: 200, type: String })
  async getGamePGN(
    @Param('username') username: string,
    @Param('gameId') gameId: string
  ): Promise<string> {
    return this.gamesService.getGamePGN(username, gameId);
  }
}
