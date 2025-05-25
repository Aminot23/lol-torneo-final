import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Player } from "../lib/types";

const players = [
  { name: "PEUGEOT 206", tag: "2003", imageUrl: "/images/amine.jpg" },
  { name: "MiriiCs", tag: "EUW", imageUrl: "/images/basic.jpg" },
  { name: "Blacknalla", tag: "EUW", imageUrl: "/images/basic.jpg" },
  { name: "Reze", tag: "SLN", imageUrl: "/images/selene.jpg" },
  { name: "matajare21", tag: "9781", imageUrl: "/images/basic.jpg" },
  { name: "NONTRENO", tag: "973", imageUrl: "/images/basic.jpg" },
  { name: "Ayiyiyiyi", tag: "Yiyi", imageUrl: "/images/basic.jpg" },
  { name: "Sidus92", tag: "EUW", imageUrl: "/images/basic.jpg" },
  { name: "FoIIamosGordas", tag: "EUW", imageUrl: "/images/basic.jpg" },
  { name: "Hypnopompic Man", tag: "EUW", imageUrl: "/images/chami.jpg" },
  { name: "Harvey El Pestes", tag: "SPE", imageUrl: "/images/basic.jpg" },
  { name: "xBurgo", tag: "BURGO", imageUrl: "/images/biengo.jpg" },
];

const ligaOrden = [
  "DIAMOND",
  "EMERALD",
  "PLATINUM",
  "GOLD",
  "SILVER",
  "BRONZE",
  "IRON",
  "UNRANKED",
];
const divisionOrden = ["I", "II", "III", "IV"];

function compararRank(a: Player, b: Player) {
  if (!a.rank) return 1;
  if (!b.rank) return -1;

  const [rankA, lpPartA] = a.rank.split(" - ");
  const [rankB, lpPartB] = b.rank.split(" - ");
  const [ligaA, divisionA] = rankA.split(" ");
  const [ligaB, divisionB] = rankB.split(" ");

  const ligaAIndex = ligaOrden.indexOf(ligaA.toUpperCase());
  const ligaBIndex = ligaOrden.indexOf(ligaB.toUpperCase());

  if (ligaAIndex < ligaBIndex) return -1;
  if (ligaAIndex > ligaBIndex) return 1;

  const divisionAIndex = divisionOrden.indexOf(divisionA?.toUpperCase());
  const divisionBIndex = divisionOrden.indexOf(divisionB?.toUpperCase());

  if (divisionAIndex < divisionBIndex) return -1;
  if (divisionAIndex > divisionBIndex) return 1;

  const lpA = parseInt(lpPartA?.replace(" LP", "").trim() || "0");
  const lpB = parseInt(lpPartB?.replace(" LP", "").trim() || "0");

  if (lpA > lpB) return -1;
  if (lpA < lpB) return 1;

  return 0;
}

const REFRESH_TIME = 2.5 * 60 * 1000;

const fetchRank = async (summonerName: string, tag: string) => {
  const res = await fetch(
    `/api/rank?summonerName=${encodeURIComponent(summonerName + "/" + tag)}`
  );
  const data = await res.json();
  return data;
};

export default function Home() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [timeSince, setTimeSince] = useState("Desconocido");

  const loadData = async () => {
    const results = await Promise.all(
      players.map(async (player) => {
        const data = await fetchRank(player.name, player.tag);
        return {
          ...player,
          rank: `${data.tier} ${data.rank} - ${data.lp} LP`,
          wins: data.wins,
          losses: data.losses,
        };
      })
    );

    results.sort(compararRank);
    const now = Date.now();
    localStorage.setItem("lastUpdate", now.toString());
    setLastUpdate(now);
    setPlayerData(results);
  };

  const getTimeSince = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    if (diff < 0) return "Desconocido";
    if (minutes === 0 && seconds === 0) return "Justo ahora";
    if (minutes === 0) return `${seconds} seg.`;
    return `${minutes} min ${seconds} seg.`;
  };

  useEffect(() => {
    const stored = localStorage.getItem("lastUpdate");
    if (stored) {
      const ts = parseInt(stored);
      setLastUpdate(ts);
      setTimeSince(getTimeSince(ts));
    }
    const interval = setInterval(() => {
      if (lastUpdate) setTimeSince(getTimeSince(lastUpdate));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  useEffect(() => {
    loadData();
  }, []);

  const canRefresh = !lastUpdate || Date.now() - lastUpdate > REFRESH_TIME;

  const [sortBy, setSortBy] = useState<"pos" | "name" | "rank" | "partidas" | "wr">("pos");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const getSortedData = () => {
    const sorted = [...playerData];
    if (sortBy === "name") {
      sorted.sort((a, b) =>
        sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sortBy === "rank") {
      sorted.sort((a, b) =>
        sortDir === "asc" ? compararRank(b, a) : compararRank(a, b)
      );
    } else if (sortBy === "partidas") {
    sorted.sort((a, b) => {
      const totalA = (a.wins ?? 0) + (a.losses ?? 0);
      const totalB = (b.wins ?? 0) + (b.losses ?? 0);
      return sortDir === "asc" ? totalA - totalB : totalB - totalA;
    });
  }
    return sorted;
  };

  const handleSort = (col: "pos" | "name" | "rank" | "partidas" | "wr") => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir(col === "pos" ? "asc" : "desc");
    }
  };

  const abrirOpGG = (link: string) => {
    const url = `https://op.gg/es/lol/summoners/euw/${link}`;
    window.open(url, '_blank');
  };


  return (
    <main className={styles.main} style={{ margin: 0 }}>  
      <body style={{ margin: 0 }}>
      <h1 className={styles.title}>SOLOQ CHALLENGE</h1>

      <div className={styles.controls}>
       <button
        className={`${!canRefresh ? styles.refreshButtonMal : styles.refreshButton}`}
        onClick={loadData}
        disabled={!canRefresh}>
          Refrescar
        </button>
        <p className={styles.lastUpdate}>Última actualización {timeSince}</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("pos")}>
                #
                {sortBy === "pos" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("name")}>
                Jugador
                {sortBy === "name" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("rank")}>
                Rango
                {sortBy === "rank" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("partidas")}>
                partidas
                {sortBy === "partidas" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
                <th onClick={() => handleSort("wr")}>
                    winrate
                {sortBy === "wr" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {getSortedData().map((player, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                  <td
                    onClick={() => abrirOpGG(player.name + "-" + player.tag)}
                    className={styles.playerCell}
                    style={{ cursor: 'pointer' }}>

                  <Image
                    src={player.imageUrl}
                    alt={player.name}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  {player.name}
                </td>
                <td>{player.rank}</td>
                <td>
                  V: {player.wins} D: {player.losses}
                </td>
                <td>
                  {((player.wins)/(player.wins+player.losses)*100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </body>
    </main>
  );
}
