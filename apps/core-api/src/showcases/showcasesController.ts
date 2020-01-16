import { Request, Response } from "express";
import { scrapeShowcases, scrapeRosterData } from "@goscout/core";
import { handleError } from "../utils";

export async function sync(req: Request, res: Response): Promise<Response> {
  const host = "https://www.prepbaseballreport.com";
  const pastUrl = `${host}/past-events`;
  const upcomingUrl = `${host}/showcases`;

  try {
    const showcases = await scrapeShowcases([ pastUrl, upcomingUrl ]);

    for (const showcase of showcases) {
      const roster = await scrapeRosterData(showcase.url);
      showcase.roster = roster;
    }

    // return res.status(200).send({ status: "synced" });
    return res.status(200).send({ showcases });
  } catch (err) {
    return handleError(res, err);
  }
}
