// lib/types.ts

export interface Player {
  name: string;
  imageUrl: string;
  rank: string;
  tag: string;
  wins: number;
  losses: number;
  estado: boolean;
}

export interface SummonerRankEntry {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}
