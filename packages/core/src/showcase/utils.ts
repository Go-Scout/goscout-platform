import cheerio from "cheerio";
import axios from "axios";

export const getDOM = async (url: string): Promise<CheerioStatic> => {
  const res = await axios.get(url);

  if (!res) throw new Error(`This ${url} did not return any data`);

  return cheerio.load(res.data);
};

export const getStatData = (html: any, start: string): string => {
  const pattern = new RegExp(start);
  const end = /\(([^;]+)\)/;
  const stats = pattern.test(html) ? html.substring(html.lastIndexOf(start) + start.length).match(end)[1] : "[]";

  return stats;
};
