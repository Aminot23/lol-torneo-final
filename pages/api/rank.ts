// pages/api/rank.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { SummonerRankEntry } from '../../lib/types';

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { puuid } = req.query;

  // if (!summonerName || typeof summonerName !== "string") {
  //   return res.status(400).json({ error: "Missing summoner name" });
  // }


  try {
    // // Paso 1: Obtener Summoner ID
    // const summonerRes = await fetch(
    //   `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    //   {
    //     headers: {
    //       "X-Riot-Token": RIOT_API_KEY!,
    //     },
    //   }
    // );

    // if (!summonerRes.ok) throw new Error("Summoner not found");

    // const summonerData = await summonerRes.json();

    // Paso 1: Obtener ranking
    console.log("--------------------- "+puuid+" este es el puuid--------------------------")
    const rankRes = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY!,
        },
      }
    );

    const rankData = await rankRes.json();
    const soloQ = rankData.find((entry: SummonerRankEntry) => entry.queueType === "RANKED_SOLO_5x5");


    res.status(200).json({
      tier: soloQ?.tier || "UNRANKED",
      rank: soloQ?.rank || "",
      lp: soloQ?.leaguePoints || 0,
      wins: soloQ?.wins || 0,
      losses: soloQ?.losses || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
