import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './players.service';
import { ChessPlayerDto } from '../../../generated/chessPlayer.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PlayersResponseDto } from './players.dto';

@ApiTags('Chess')
@Controller({ version: '1', path: 'chess/players' })
@UseInterceptors(CacheInterceptor)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
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
  @ApiResponse({ status: 200, type: PlayersResponseDto })
  async getPlayers(
    @Param('limit') limit: number = 100,
    @Param('offset') offset: number = 0
  ): Promise<PlayersResponseDto> {
    return this.playerService.getPlayers({ limit, offset });
  }

  @Get(':username')
  @ApiResponse({ status: 200, type: ChessPlayerDto })
  async getPlayer(
    @Param('username') username: string = 'hikaru'
  ): Promise<ChessPlayerDto> {
    return this.playerService.getPlayer(username);
  }

  @Post(':username')
  @ApiResponse({ status: 200, type: ChessPlayerDto })
  async syncPlayer(
    @Param('username') username: string = 'hikaru'
  ): Promise<ChessPlayerDto> {
    return this.playerService.syncPlayer(username);
  }
}
