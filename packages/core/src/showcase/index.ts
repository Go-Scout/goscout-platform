import axios from "axios";
import { getDOM, getStatData } from "./utils";
import { Player, Showcase } from "./types";

const host = "https://www.prepbaseballreport.com";
const getPlayerUrl = "/myincludes/blocks/events/player.php?action=getPlayer";
const testUrl =
  "https://prepbaseballreport.com/myincludes/blocks/events/player.php?action=getPlayer&player_id=182079&profile_type=undefined";

export const scrapeShowcases = async (urls: string[]): Promise<Showcase[]> => {
  let showcases: Showcase[] = [];

  for (const url of urls) {
    const $ = await getDOM(url);

    if (!$(".results-table").length) throw new Error("There was no table found. This script may be out of date.");

    const list = await $(".results-table")
      .find("tr")
      .map((i: number, elem: CheerioElement): Showcase | undefined => {
        if (!$(elem).hasClass("header")) {
          const data = $(elem).find("td").map((i: number, elem: CheerioElement): string => $(elem).text()).get();
          // console.log($(elem).find("td > a").attr("href") ? true : false);
          return {
            name: data[0],
            url: `${host}${$(elem).find("td > a").attr("href")}`,
            state: data[1],
            date: data[2],
            location: data[3],
            roster: []
          };
        }
        return;
      })
      .get();

    showcases = [...showcases, ...list];
  }

  return showcases;
};

export const scrapeRosterData = async (url: any): Promise<Player[]> => {
  try {
    const $ = await getDOM(url);
    const content = $(".content-holder").html();
    const players: Player[] = [];
    const positionStats = JSON.stringify(getStatData(content, "table2.setData"));
    const pitchingStats = JSON.stringify(getStatData(content, "table1.setData"));

    if ($("#tab_rosters")) {
      $("#tab_rosters").find(".player").each(async (i, elem): Promise<void> => {
        const playerId = $(elem).attr("data-playerid");
        const profileType = "undefined";
        const playerUrl = `${host}${getPlayerUrl}&player_id=${playerId}&profile_type=${profileType}`;
        const isPlayer = ({ id }: any): boolean => id === playerId;
        // console.log("url", playerUrl);

        console.log("playerId", playerId);
        if (playerId) {
          try {
            const { data } = await axios.get(testUrl);
            const posStats: any = { positionStats };
            const pitchStats: any = { pitchingStats };

            players.push({
              id: data.id,
              url: posStats || pitchStats ? (posStats ? posStats.profile_url : pitchStats.profile_url) : "",
              name: `${data.fname} ${data.lname}`,
              main_pos: data.pri_position,
              side_pos: data.sec_position,
              state: data.state,
              school: data.high_school,
              class: data.class,
              commitment: data.commitment,
              height: data.height,
              weight: data.weight,
              sixtyYard: posStats ? posStats.stat_2_5 : "",
              homeToFirst: posStats ? posStats.stat_2_7 : "",
              infield: posStats ? posStats.stat_2_6 : "",
              outfield: posStats ? posStats.stat_2_9 : "",
              catcher: posStats ? posStats.stat_2_10 : "",
              popTime: posStats ? posStats.stat_2_8 : "",
              exit: posStats ? posStats.stat_2_11 : "",
              fastBall: pitchStats ? pitchStats.stat_1_1 : "",
              maxfBall: pitchStats ? pitchStats.stat_1_16 : "",
              curveBall: pitchStats ? pitchStats.stat_1_2 : "",
              changeUp: pitchStats ? pitchStats.stat_1_3 : "",
              slider: pitchStats ? pitchStats.stat_1_4 : "",
              splitter: pitchStats ? pitchStats.stat_1_12 : "",
              cutter: pitchStats ? pitchStats.stat_1_13 : "",
              knuckle: pitchStats ? pitchStats.stat_1_14 : "",
              fork: pitchStats ? pitchStats.stat_1_15 : ""
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }

    console.log("here");
    console.log(players);
    return players;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// (async () => {
//   const list = await scrapeShowcases([
//     "http://www.prepbaseballreport.com/past-events",
//     "http://www.prepbaseballreport.com/showcases"
//   ]);
//   console.log(list);
//   list.forEach((i) => scrapeRosterData(i.url));
// })();
