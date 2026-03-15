export type Competition = {
  id: number;
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
      address: string;
      website: string;
      founded: number;
      clubColors: string;
      venue: string;
      lastUpdated: string;
    };
  };
  numberOfAvailableSeasons: number;
  lastUpdated: string;
};

export type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
};

export type Match = {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null;
    stages: string[];
  };
  id: number;
  utcDate: string;
  status: string;
  minute: number;
  injuryTime: number;
  attendance: number;
  venue: string;
  matchday: number;
  stage: string;
  group: null;
  lastUpdated: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: {
      id: number;
      name: string;
      nationality: string;
    };
    leagueRank: string;
    formation: string;
    lineup: {
      id: number;
      name: string;
      position: string;
      shirtNumber: number;
    }[];
    bench: {
      id: number;
      name: string;
      position: string;
      shirtNumber: number;
    }[];
    statistics: {
      corner_kicks: number;
      free_kicks: number;
      goal_kicks: number;
      offsides: number;
      fouls: number;
      ball_possession: number;
      saves: number;
      throw_ins: number;
      shots: number;
      shots_on_goal: number;
      shots_off_goal: number;
      yellow_cards: number;
      yellow_red_cards: number;
      red_cards: number;
    };
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: {
      id: number;
      name: string;
      nationality: string;
    };
    leagueRank: null;
    formation: string;
    lineup: {
      id: number;
      name: string;
      position: string;
      shirtNumber: number;
    }[];
    bench: {
      id: number;
      name: string;
      position: string;
      shirtNumber: number;
    }[];
    statistics: {
      corner_kicks: number;
      free_kicks: number;
      goal_kicks: number;
      offsides: number;
      fouls: number;
      ball_possession: number;
      saves: number;
      throw_ins: number;
      shots: number;
      shots_on_goal: number;
      shots_off_goal: number;
      yellow_cards: number;
      yellow_red_cards: number;
      red_cards: number;
    };
  };
  score: {
    winner: string;
    duration: string;
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
  goals: {
    minute: number;
    injuryTime: number;
    type: string;
    team: {
      id: number;
      name: string;
    };
    scorer: {
      id: number;
      name: string;
    };
    assist: {
      id: number;
      name: string;
    } | null;
    score: {
      home: number;
      away: number;
    };
  }[];
  penalties: {
    player: {
      id: number;
      name: string;
    };
    team: {
      id: number;
      name: string;
    };
    scored: boolean;
  }[];
  bookings: {
    minute: number;
    team: {
      id: number;
      name: string;
    };
    player: {
      id: number;
      name: string;
    };
    card: string;
  }[];
  substitutions: {
    minute: number;
    team: {
      id: number;
      name: string;
    };
    playerOut: {
      id: number;
      name: string;
    };
    playerIn: {
      id: number;
      name: string;
    };
  }[];
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  referees: {
    id: number;
    name: string;
    type: string;
    nationality: string;
  }[];
};

export enum Plan {
  TIER_ONE = 'TIER_ONE',
  TIER_TWO = 'TIER_TWO',
  TIER_THREE = 'TIER_THREE',
  TIER_FOUR = 'TIER_FOUR',
}

export enum Stage {
  FINAL = 'FINAL',
  THIRD_PLACE = 'THIRD_PLACE',
  SEMI_FINALS = 'SEMI_FINALS',
  QUARTER_FINALS = 'QUARTER_FINALS',
  LAST_16 = 'LAST_16',
  LAST_32 = 'LAST_32',
  LAST_64 = 'LAST_64',
  ROUND_4 = 'ROUND_4',
  ROUND_3 = 'ROUND_3',
  ROUND_2 = 'ROUND_2',
  ROUND_1 = 'ROUND_1',
  GROUP_STAGE = 'GROUP_STAGE',
  PRELIMINARY_ROUND = 'PRELIMINARY_ROUND',
  QUALIFICATION = 'QUALIFICATION',
  QUALIFICATION_ROUND_1 = 'QUALIFICATION_ROUND_1',
  QUALIFICATION_ROUND_2 = 'QUALIFICATION_ROUND_2',
  QUALIFICATION_ROUND_3 = 'QUALIFICATION_ROUND_3',
  PLAYOFF_ROUND_1 = 'PLAYOFF_ROUND_1',
  PLAYOFF_ROUND_2 = 'PLAYOFF_ROUND_2',
  PLAYOFFS = 'PLAYOFFS',
  REGULAR_SEASON = 'REGULAR_SEASON',
  CLAUSURA = 'CLAUSURA',
  APERTURA = 'APERTURA',
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  RELEGATION = 'RELEGATION',
  RELEGATION_ROUND = 'RELEGATION_ROUND',
}

export enum Status {
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
  IN_PLAY = 'IN_PLAY',
  LIVE = 'LIVE',
  PAUSED = 'PAUSED',
  POSTPONED = 'POSTPONED',
  SCHEDULED = 'SCHEDULED',
  SUSPENDED = 'SUSPENDED',
}

export enum Venue {
  HOME = 'HOME',
  AWAY = 'AWAY',
}
