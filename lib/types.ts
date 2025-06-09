// lib/types.ts

export interface Player {
  name: string;
  imageUrl: string;
  rank: string;
  tag: string;
  wins: number;
  losses: number;
  puuid: string;
  rarra: boolean;
  topWins: boolean;
  rango: string;
  division: string;
}

export interface SummonerRankEntry {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}
