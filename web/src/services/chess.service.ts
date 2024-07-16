import { Prisma, Title } from '@prisma/client';
import { logger } from '@web/log';
import { prismaClient } from '@web/prisma/prisma.client';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export const getTitled = async ({
  days,
  title,
  countryCode,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
}) => {
  const { count, overall } = await getDescriptive({ days, title, countryCode });
  const countries = await getCountries({ days, title, countryCode });
  const distribution = await getDistribution({ days, title, countryCode });
  const leaderboard = await getLeaderboard({ days, title, countryCode });
  await prismaClient.$disconnect();
  return { count, overall, distribution, countries, leaderboard };
};

type Descriptive = {
  count_total: number;
  count_gm: number;
  count_im: number;
  count_fm: number;
  count_cm: number;
  count_nm: number;
  count_wgm: number;
  count_wim: number;
  count_wfm: number;
  count_wcm: number;
  count_wnm: number;
  average_rapid_rating_best: number;
  average_blitz_rating_best: number;
  average_bullet_rating_best: number;
  max_rapid_rating_best: number;
  max_blitz_rating_best: number;
  max_bullet_rating_best: number;
};

export type Days = 7 | 30 | 90 | 366;

const buildWhereClause = (
  {
    days,
    title,
    countryCode,
  }: {
    days?: Days;
    title?: Title;
    countryCode?: string;
  },
  extra: string[] = []
) => {
  const where: string[] = extra;
  if (title) where.push(`p."title" = '${title}'`);
  if (countryCode) where.push(`p."countryCode" = '${countryCode}'`);
  if (days) where.push(`p."last_online" > now() - interval '${days} days'`);
  const whereClause = where.length === 0 ? '' : `WHERE ${where.join(' AND ')}`;
  logger.info(`whereClause=${whereClause}`);
  return whereClause;
};

export const getDescriptive = async ({
  days,
  title,
  countryCode,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
}) => {
  try {
    const query: string = `-- Descriptive (Count - Average - Max) --
SELECT COUNT(p."username") AS "count_total", -- Count - Total
SUM(CASE WHEN p."title" = 'GM' then 1 else 0 end) AS "count_gm", -- Count - GM
SUM(CASE WHEN p."title" = 'IM' then 1 else 0 end) AS "count_im", -- Count - IM
SUM(CASE WHEN p."title" = 'FM' then 1 else 0 end) AS "count_fm", -- Count - FM
SUM(CASE WHEN p."title" = 'CM' then 1 else 0 end) AS "count_cm", -- Count - CM
SUM(CASE WHEN p."title" = 'NM' then 1 else 0 end) AS "count_nm", -- Count - NM
SUM(CASE WHEN p."title" = 'WGM' then 1 else 0 end) AS "count_wgm", -- Count - WGM
SUM(CASE WHEN p."title" = 'WIM' then 1 else 0 end) AS "count_wim", -- Count - WIM
SUM(CASE WHEN p."title" = 'WFM' then 1 else 0 end) AS "count_wfm", -- Count - WFM
SUM(CASE WHEN p."title" = 'WCM' then 1 else 0 end) AS "count_wcm", -- Count - WCM
SUM(CASE WHEN p."title" = 'WNM' then 1 else 0 end) AS "count_wnm", -- Count - WNM
CAST(ROUND(AVG(CASE WHEN p."rapid_rating_best" <> 0 THEN p."rapid_rating_best" ELSE NULL END), 2) AS FLOAT) AS "average_rapid_rating_best", -- Average
CAST(ROUND(AVG(CASE WHEN p."blitz_rating_best" <> 0 THEN p."blitz_rating_best" ELSE NULL END), 2) AS FLOAT) AS "average_blitz_rating_best", -- Average
CAST(ROUND(AVG(CASE WHEN p."bullet_rating_best" <> 0 THEN p."bullet_rating_best" ELSE NULL END), 2) AS FLOAT) AS "average_bullet_rating_best", -- Average
MAX(p."rapid_rating_best") AS "max_rapid_rating_best", -- Max
MAX(p."blitz_rating_best") AS "max_blitz_rating_best", -- Max
MAX(p."bullet_rating_best") AS "max_bullet_rating_best" -- Max
FROM chess."Player" AS p
${buildWhereClause({ days, title, countryCode })};`;
    const sql = Prisma.raw(query);
    const results: Descriptive[] = await prismaClient.$queryRaw(sql);
    const result = results[0];
    const {
      count_total: total = 0,
      count_gm: gm = 0,
      count_im: im = 0,
      count_fm: fm = 0,
      count_cm: cm = 0,
      count_nm: nm = 0,
      count_wgm: wgm = 0,
      count_wim: wim = 0,
      count_wfm: wfm = 0,
      count_wcm: wcm = 0,
      count_wnm: wnm = 0,
      average_rapid_rating_best = 0,
      average_blitz_rating_best = 0,
      average_bullet_rating_best = 0,
      max_rapid_rating_best = 0,
      max_blitz_rating_best = 0,
      max_bullet_rating_best = 0,
    } = result;
    return {
      count: { total, gm, im, fm, cm, nm, wgm, wim, wfm, wcm, wnm },
      overall: {
        rapid: {
          average: average_rapid_rating_best,
          max: max_rapid_rating_best,
        },
        blitz: {
          average: average_blitz_rating_best,
          max: max_blitz_rating_best,
        },
        bullet: {
          average: average_bullet_rating_best,
          max: max_bullet_rating_best,
        },
      },
    };
  } catch (error) {
    logger.error(`getDescriptive error=${error}`);
    return {
      count: {
        total: 0,
        gm: 0,
        im: 0,
        fm: 0,
        cm: 0,
        nm: 0,
        wgm: 0,
        wim: 0,
        wfm: 0,
        wcm: 0,
        wnm: 0,
      },
      rapid: { average: 0, max: 0 },
      blitz: { average: 0, max: 0 },
      bullet: { average: 0, max: 0 },
    };
  }
};

export type TimeClass = 'rapid' | 'blitz' | 'bullet';
export type TimeClassKey = `${TimeClass}_group` | `${TimeClass}_total`;

export const getDistributionByTimeClass = async ({
  days,
  title,
  countryCode,
  timeClass,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
  timeClass: TimeClass;
}): Promise<{ group: number; total: number }[]> => {
  try {
    const query: string = `SELECT COUNT(p."username") AS "total", (FLOOR((p."${timeClass}_rating_last" / 100)) * 100) AS "group" FROM chess."Player" AS p ${buildWhereClause({ days, title, countryCode }, [`(FLOOR((p."${timeClass}_rating_last" / 100)) * 100) <> 0`])} GROUP BY "group" ORDER BY "group";`;
    const sql = Prisma.raw(query);
    return prismaClient.$queryRaw(sql);
  } catch (error) {
    logger.error(`getDistributionByTimeClass error=${error}`);
    return [];
  }
};

export const getDistribution = async ({
  days,
  title,
  countryCode,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
}) => {
  const rapid = await getDistributionByTimeClass({
    days,
    title,
    countryCode,
    timeClass: 'rapid',
  });
  const blitz = await getDistributionByTimeClass({
    days,
    title,
    countryCode,
    timeClass: 'blitz',
  });
  const bullet = await getDistributionByTimeClass({
    days,
    title,
    countryCode,
    timeClass: 'bullet',
  });
  return { rapid, blitz, bullet };
};

type Country = { countryCode: string; country: string; count: number };

export const getCountries = async ({
  days,
  title,
  countryCode,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
}): Promise<Country[]> => {
  try {
    const query = `SELECT p."countryCode", p."country", COUNT(p."username") AS "count" FROM chess."Player" AS p ${buildWhereClause({ days, title, countryCode })} GROUP BY p."countryCode", p."country"
ORDER BY p."count" DESC;`;
    const sql = Prisma.raw(query);
    return prismaClient.$queryRaw(sql);
  } catch (error) {
    logger.error(`getCountries error=${error}`);
    return [];
  }
};

type Leader = {
  title: Title;
  countryCode: string;
  country: string;
  username: string;
  name: string;
  rapid_rating_last: number;
  blitz_rating_last: number;
  bullet_rating_last: number;
};

export const getLeaderboard = async ({
  days,
  title,
  countryCode,
}: {
  days?: Days;
  title?: Title;
  countryCode?: string;
}): Promise<Leader[]> => {
  try {
    const query = `SELECT p."title", p."countryCode", p."country", p."username", p."name", p."bullet_rating_last", p."blitz_rating_last", p."rapid_rating_last" FROM chess."Player" AS p ${buildWhereClause({ days, title, countryCode })} ORDER BY p."bullet_rating_last" DESC, p."blitz_rating_last" DESC, p."rapid_rating_last" DESC LIMIT 100 OFFSET 0 ;`;
    const sql = Prisma.raw(query);
    return prismaClient.$queryRaw(sql);
  } catch (error) {
    logger.error(`getLeaderboard error=${error}`);
    return [];
  }
};
