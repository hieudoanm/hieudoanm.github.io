import { GamesService } from './games.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  GamesResponseDto,
  SyncRequestDto,
  SyncedResponseDto,
} from './games.dto';
import { ChessGameDto } from '../../../../generated/chessGame.entity';

@Controller({ version: '1' })
@ApiTags('Chess')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('player/:username/games')
  @ApiResponse({ status: 200, type: GamesResponseDto })
  async getGames(
    @Param('username') username: string,
    @Query('month') month: number = new Date().getMonth() + 1,
    @Query('year') year: number = new Date().getFullYear()
  ): Promise<GamesResponseDto> {
    return this.gamesService.getGames(username, { month, year });
  }

  @Post('player/:username/games')
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

  @Get('player/:username/games/:gameId')
  @ApiResponse({ status: 200, type: ChessGameDto })
  async getGame(
    @Param('username') username: string,
    @Param('gameId') gameId: string
  ): Promise<ChessGameDto> {
    return this.gamesService.getGame(username, gameId);
  }

  @Get('player/:username/games/:gameId/pgn')
  @ApiResponse({ status: 200, type: String })
  async getGamePGN(
    @Param('username') username: string,
    @Param('gameId') gameId: string
  ): Promise<string> {
    return this.gamesService.getGamePGN(username, gameId);
  }
}
