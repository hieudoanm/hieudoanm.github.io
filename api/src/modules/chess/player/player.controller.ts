import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { ChessPlayerDto } from '../../../generated/chessPlayer.entity';

@Controller('player')
@ApiTags('Chess')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get(':username')
  @ApiResponse({ status: 200, type: ChessPlayerDto })
  async getPlayer(
    @Param('username') username: string
  ): Promise<ChessPlayerDto> {
    return this.playerService.getPlayer(username);
  }

  @Post(':username')
  @ApiResponse({ status: 200, type: ChessPlayerDto })
  async syncPlayer(
    @Param('username') username: string
  ): Promise<ChessPlayerDto> {
    return this.playerService.syncPlayer(username);
  }
}
