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
