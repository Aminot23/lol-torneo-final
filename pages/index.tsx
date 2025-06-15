import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Player } from "../lib/types";

const players = [
  { name: "PEUGEOT 206", tag: "2003", imageUrl: "/images/amine.jpg", puuid: "bNnhILnZpp82o1cLSbgobBfmHmkboDpO27eG8xJAo0IkdUkn2sWk6upeDAW_KQYuneKi7EcixoOdaw", rarra: false, topWins: false },
  { name: "MiriiCs", tag: "EUW", imageUrl: "/images/basic.jpg", puuid: "RmtGov9-QWUbVvbcfSyBwFTzQ_jvt6H2P1dEUzKvm1F13UrNlv1Esm51mc1xgwr6ZvXxhx_LavNBUg", rarra: false, topWins: false },
  { name: "Blacknalla", tag: "EUW", imageUrl: "/images/basic.jpg", puuid: "4HCtWP1RXcww8W5CxNh5jZgaEaRbjQP3UN2iiXAtMEDDGGreKYnPJ1IdCqaI-xgyehc3Nz1_HEfYMw", rarra: false, topWins: false },
  { name: "Reze", tag: "SLN", imageUrl: "/images/selene.jpg", puuid: "sf33K0twqOt0Qouf47AImIe5HJYrnWtIFbSlzNXci-_AUcHXpi7VG56n8ZwDTFuwopHnxNoeiBbpNw", rarra: false, topWins: false },
  { name: "matajare21", tag: "9781", imageUrl: "/images/basic.jpg", puuid: "bcKpsrVrmuN86RVmurEdx68evBJUpmOv_vio0ErhK35sKmtPNny4d5qXcSknwzqcR2aXVI8iHEeykQ", rarra: false, topWins: false },
  { name: "NONTRENO", tag: "973", imageUrl: "/images/carlitos.jpg", puuid: "_rbzhwH44Xurll5x1PPOau7i-lN2gSPHd8dv6ko1qCJ4FpCcjRCFqJSQ50WrJV6rIZbBGmd_xjWBgQ", rarra: false, topWins: false },
  { name: "Ayiyiyiyi", tag: "Yiyi", imageUrl: "/images/basic.jpg", puuid: "C1Vv5nMdUqR6Mcv6hX-xhMx-8DUiYxS5IZFb1BYU_LUAvxFv1tkEITbttY0TK2UMRtQrmHrzs4Yd0g", rarra: false, topWins: false },
  { name: "Sidus92", tag: "EUW", imageUrl: "/images/mithel.jpg", puuid: "Klde1A0aCs3KPRkTLzjX233R6PdX95X4isCztnCvh8aCuB4B_8zUrYpkjIlR5W3YHKHmL19uaTFGXA", rarra: false, topWins: false },
  { name: "FoIIamosGordas", tag: "EUW", imageUrl: "/images/chicho.jpg", puuid: "FVEFa5zoHFNkPb4WrSkmxpCNjpR8nWK2_gDtAC3P1M07UWVG-RVZitBAZus3K7j6oZAKtydIC5daIQ", rarra: false, topWins: false },
  { name: "Hypnopompic Man", tag: "EUW", imageUrl: "/images/chami.jpg", puuid: "7xyxwmOByEONH_MX6X44XYeeYQiFHwurVQ9qpegYSBmPc5WlFg3lttvn1LYhnQE3XWO178hDN9PTPg", rarra: false, topWins: false },
  { name: "Harvey El Pestes", tag: "SPE", imageUrl: "/images/extintor.jpg", puuid: "MgASkBw9vKQngRalplmMKDt9CzBCClclt4ZjgqNyUT-Me9Uz4CMmaIuYXd3I6cjDW74VMt5Pu0NAaA", rarra: false, topWins: false },
  { name: "xBurgo", tag: "BURGO", imageUrl: "/images/biengo.jpg", puuid: "o5vLHUTwCdmsLw_q7LRVWJBLCfHJ-GLkUEKAJF5GsnZqroETgIsBM_4VIG62EXlzSBJlMAX5sFDeCA", rarra: false, topWins: false },
  { name: "Gol D Loren", tag: "2330", imageUrl: "/images/loren.jpg", puuid: "J6NMoT6gvwWTVH37jOdwJzv443zUN3W6KFt5tyPTVj8ox0VCkhdcDt8YHUGFYYRsmA7lLYHxHUkyNw", rarra: false, topWins: false },
  { name: "danielgv1498", tag: "Poppy", imageUrl: "/images/dani.jpg", puuid: "VgpyuisX0CiU5uCDcze2NxYqVqzvw8nsOsE2hGtG1jouhXlae_-ySD7Xtu2Rr14yZoevV2tgaIXIZw", rarra: false, topWins: false },
  { name: "BurgoLover", tag: "3642", imageUrl: "/images/huevito.jpg", puuid: "vM-GtEnkYgUbwk4mfVy0gHhLp7EEFye0Us1eZW8Zj_564rvW8il43qnjb3uuAoDB8RYb9QkufaEC3w", rarra: false, topWins: false },
  { name: "SoloQoala", tag: "Uzhas", imageUrl: "/images/alferez.jpg", puuid: "EV1UX_ZfLAYAfZZDs_ztFIazp31fKBmnsaIPx3bv-F-sas3eNTu_WaJt7vsEjf7b11adX1gUnowYlA", rarra: false, topWins: false },
  { name: "50 swags of bard", tag: "EUW", imageUrl: "/images/aleano.jpg", puuid: "b7mWGfjWNC6cd7CmzpCngvw_V-HVi9YUZM4Xr3KJ44JCwvtqF4UYWzHzuBOgzfFt3w5lU_jWNiQ-yQ", rarra: false, topWins: false },
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
const emojiOrder = ["🔥", "😅", "🙂", "🥶", "🧊"];


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

const fetchRank = async (puuid: string) => {
  const res = await fetch(
    `/api/rank?puuid=${encodeURIComponent(puuid)}`
  );
  const data = await res.json();
  return data;
};

export default function Home() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [timeSince, setTimeSince] = useState("Desconocido");
  const [maxPartidas, setMaxPartidas] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true); // mostrar throbber

    const results: Player[] = [];

    const idxRARRA = getRARRA();

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const data = await fetchRank(player.puuid);

      results.push({
        ...player,
        rank: `${data.tier} ${data.rank} - ${data.lp} LP`,
        wins: data.wins,
        losses: data.losses,
        rarra: i === idxRARRA,
        topWins: false,
        rango: `${data.tier}`,
        division: `${data.rank}`,
        lps: `${data.lp}`,
      });

      if ((i + 1) % 5 === 0 && i !== players.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    results.sort(compararRank);

    const mejorJugador = results[0];
    if (mejorJugador) {
      results.forEach((p) => {
        p.topWins = p === mejorJugador;
      });
    }
    const max = Math.max(...results.map(p => (p.wins ?? 0) + (p.losses ?? 0)));
    setMaxPartidas(max);

    const now = Date.now();
    localStorage.setItem("lastUpdate", now.toString());
    setLastUpdate(now);
    setPlayerData(results);
    setLoading(false); // ocultar throbber
    console.log("Jugador con RARRA:", results.find(p => p.rarra));
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

  function getRARRA(): number {
    const startDate = Date.UTC(2025, 0, 1); // 0 = enero

    const now = new Date();
    const utcPlus2 = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Añade 2 horas (UTC+2)

    const today = Date.UTC(
      utcPlus2.getUTCFullYear(),
      utcPlus2.getUTCMonth(),
      utcPlus2.getUTCDate()
    );

    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return diffDays % 17;
  }



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

  useEffect(() => {
    loadData();
  }, []);

  const canRefresh = !lastUpdate || Date.now() - lastUpdate > REFRESH_TIME;

  const [sortBy, setSortBy] = useState<"pos" | "name" | "rank" | "partidas" | "wr" | "actividad" | "estado">("pos");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const getActividadLevel = (wins?: number, losses?: number, maxPartidas?: number): string => {
    const total = (wins ?? 0) + (losses ?? 0);

    if (!maxPartidas || maxPartidas === 0) return "🧊";

    const porcentaje = (total / maxPartidas) * 100;

    if (porcentaje >= 90) return "🔥";
    if (porcentaje >= 70) return "😅";
    if (porcentaje >= 50) return "🙂";
    if (porcentaje >= 30) return "🥶";
    return "🧊";
  };

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
    } else if (sortBy === "wr") {
      sorted.sort((a, b) => {
        const wrA = (a.wins ?? 0) / ((a.wins ?? 0) + (a.losses ?? 0)) || 0;
        const wrB = (b.wins ?? 0) / ((b.wins ?? 0) + (b.losses ?? 0)) || 0;
        return sortDir === "asc" ? wrA - wrB : wrB - wrA;
      });
    } else if (sortBy === "actividad") {
      sorted.sort((a, b) => {
        const emojiA = getActividadLevel(a.wins, a.losses, maxPartidas);
        const emojiB = getActividadLevel(b.wins, b.losses, maxPartidas);
        const indexA = emojiOrder.indexOf(emojiA);
        const indexB = emojiOrder.indexOf(emojiB);
        return sortDir === "asc" ? indexA - indexB : indexB - indexA;
      });
    }



    return sorted;
  };

  const handleSort = (col: "pos" | "name" | "rank" | "partidas" | "wr" | "actividad" | "estado") => {
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
  // const getEstadoJugador = (estado: boolean) =>{
  //   if(estado){
  //     return (<span
  //         style={{
  //           fontSize: "1.5rem",
  //           color: "#1e90ff",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           height: "100%",
  //           width: "100%",
  //         }}
  //         title={"JUGANDO!"}
  //       >
  //         🟢
  //       </span>)
  //       }
  //     else{
  //       return (<span
  //         style={{
  //           fontSize: "1.5rem",
  //           color: "#1e90ff",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           height: "100%",
  //           width: "100%",
  //         }}
  //         title={"Desconectado"}
  //       >
  //         🔴
  //       </span>)
  //       }
  //     }

  const getActividadEmoji = (wins?: number, losses?: number) => {
    const total = (wins ?? 0) + (losses ?? 0);

    // Si maxPartidas es 0 o no está listo, muestra emoji base
    if (!maxPartidas || maxPartidas === 0) {
      return (
        <span
          style={{
            fontSize: "1.5rem",
            color: "#1e90ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
          title={total === 0 ? "Sin partidas registradas" : "Datos cargando..."}
        >
          🧊
        </span>
      );
    }

    const porcentaje = (total / maxPartidas) * 100;

    let emoji = "🧊";
    let color = "#1e90ff";

    if (porcentaje >= 90) {
      emoji = "🔥";
      color = "#ff4500";
    } else if (porcentaje >= 70) {
      emoji = "😅";
      color = "#ff8c00";
    } else if (porcentaje >= 50) {
      emoji = "🙂";
      color = "#daa520";
    } else if (porcentaje >= 30) {
      emoji = "🥶";
      color = "#4682b4";
    }

    return (
      <span
        style={{
          fontSize: "1.5rem",
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
        title={
          total === 0
            ? "Sin partidas registradas"
            : `Actividad relativa: ${porcentaje.toFixed(0)}%`
        }
      >
        {emoji}
      </span>
    );
  };

  // const formatDateTime = (timestamp: number) => {
  //   const d = new Date(timestamp);
  //   const day = d.getDate();

  //   // Nombres de meses en español
  //   const months = [
  //     "enero", "febrero", "marzo", "abril", "mayo", "junio",
  //     "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  //   ];
  //   const monthName = months[d.getMonth()];

  //   const year = d.getFullYear();
  //   const hours = d.getHours().toString().padStart(2, "0");
  //   const minutes = d.getMinutes().toString().padStart(2, "0");

  //   return `${day} de ${monthName} de ${year} a las ${hours}:${minutes}`;
  // };


  return (
    <main className={styles.main} style={{ margin: 0 }}>


      <body style={{ margin: 0 }}>
        <h1 className={styles.title}>SOLOQ CHALLENGE</h1>
        {loading && (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p className={styles.cargandoDatos}>Cargando datos...</p>
            <div className={styles.cargandoDatosPetit}>El tiempo de espera es necesario para evitar la sobrecarga de la API sorry 😜</div>

          </div>
        )}
        <div className={styles.controls}>
          <button
            className={`${!canRefresh ? styles.refreshButtonMal : styles.refreshButton}`}
            onClick={loadData}
            disabled={!canRefresh}>
            Refrescar
          </button>
          <p className={styles.lastUpdate}>Última actualización hace: {timeSince}</p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.row}>
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
                  Partidas
                  {sortBy === "partidas" && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
                <th onClick={() => handleSort("wr")}>
                  Win Rate
                  {sortBy === "wr" && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
                <th onClick={() => handleSort("actividad")}>
                  Actividad
                  {sortBy === "actividad" && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getSortedData().map((player, idx) => {
                const totalGames = player.wins + player.losses;
                const isLoser = player.losses > player.wins;
                const hasRarra = player.rarra;
                const isMejor = player.topWins;
                const estiloRarra = (() => {
                  if (isMejor) {
                    return {
                      background: '#ffcd00',
                      border: '5px solid #d3a900',
                    };
                  }
                  if (hasRarra && isLoser) {
                    return {
                      background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
                      border: '10px solid purple',
                    };
                  }
                  if (isLoser) {
                    return {
                      background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
                    };
                  }
                  if (hasRarra) {
                    return {
                      backgroundColor: '#ab4b8d',
                    };
                  }

                  return undefined;
                })();
                const estiloEnfermo = (() => {
                  if (player.wins + player.losses > 299) {
                    return {
                      backgroundImage: 'url("images/bluefire.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      textShadow: `
                        -1px -1px 0 white,
                        1px -1px 0 white,
                        -1px  1px 0 white,
                        1px  1px 0 white
                      `
                    };
                  }
                  if (player.wins + player.losses > 199) {
                    return {
                      backgroundImage: 'url("images/purplefire.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      textShadow: `
                        -1px -1px 0 white,
                        1px -1px 0 white,
                        -1px  1px 0 white,
                        1px  1px 0 white
                      `
                    };
                  }
                  if (player.wins + player.losses > 99) {
                    return {
                      backgroundImage: 'url("images/fire.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: `
                        -1px -1px 0 black,
                        1px -1px 0 black,
                        -1px  1px 0 black,
                        1px  1px 0 black
                      `
                    };
                  }
                  return undefined;
                })();
                return (
                  <tr
                    key={idx}
                    title={`Partidas totales: ${totalGames}`}
                    style={estiloRarra}
                    className={styles.row}
                  >
                    <td>{idx + 1}</td>
                    <td
                      onClick={() => abrirOpGG(player.name + "-" + player.tag)}
                      className={styles.playerCell}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ position: 'relative', marginRight: 8 }}>
                          <Image
                            src={player.imageUrl}
                            alt={player.name}
                            width={40}
                            height={40}
                            className={styles.avatar}
                          />
                          {(isLoser || player.rarra || isMejor) && (
                            <span
                              style={{
                                position: 'absolute',
                                top: -5,
                                right: 5,
                                fontSize: '1.2rem',
                                borderRadius: '30%',
                                padding: '0 4px',
                              }}
                            >
                              {isMejor && '👑'}
                              {isLoser && '🤡'}
                              {player.rarra && '🦠'}
                            </span>
                          )}
                        </div>
                        <div style={{ fontWeight: 'bold', flex: 1, textAlign: 'left' }}>
                          {player.name}
                        </div>
                      </div>
                    </td>

                    <td className={styles.cell}>
                      {player.rank?.toUpperCase() === "UNRANKED" ? (
                        "UNRANKED"
                      ) : (
                        <div className={styles.rankCellContent}>
                          <Image
                            src={`/images/${player.rango?.toUpperCase() || "DEFAULT"}.png`}
                            alt={player.rank}
                            className={styles.rankImage}
                          />
                          <div className={styles.rankText}>
                            <span>{player.division}</span>
                            <span>{player.lps} LP</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td
                      style={estiloEnfermo}>
                      {player.rank?.toUpperCase().includes("UNRANKED")
                        ? "-"
                        : <div style={{ textAlign: 'center' }}>{`V: ${player.wins} D: ${player.losses}`}</div>}
                    </td>
                    <td>
                      {player.rank?.toUpperCase().includes("UNRANKED")
                        ? "-"
                        : <div style={{ textAlign: 'center' }}>{((player.wins ?? 0) / ((player.wins ?? 0) + (player.losses ?? 0)) * 100).toFixed(1) + "%"}</div>}
                    </td>
                    <td>
                      {getActividadEmoji(player.wins, player.losses)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </body>
    </main>
  );
}
