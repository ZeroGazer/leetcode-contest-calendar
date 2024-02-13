import ical, {ICalCalendarMethod, ICalEventTransparency} from 'ical-generator';
import {mkdirSync, writeFileSync} from 'fs';

(async () => {
  const contests = await fetchContests();

  const calendar = ical({
    name: 'LeetCode Contest Calendar',
    method: ICalCalendarMethod.REQUEST
  });
  for (const contest of contests.slice(0, 10)) {
    calendar.createEvent({
      id: contest.titleSlug,
      start: new Date(contest.startTime * 1000),
      end: new Date((contest.startTime + contest.duration) * 1000),
      summary: `[LeetCode] - ${contest.title}`,
      location: `https://leetcode.com/contest/${contest.titleSlug}`,
      alarms: [{
        triggerBefore: 1800
      }],
      transparency: ICalEventTransparency.OPAQUE
    })
  }

  mkdirSync('./_site/');
  writeFileSync('./_site/leetcode-contest-calendar.ics', calendar.toString());
})();

async function fetchContests() {
  const response = await fetch('https://leetcode.com/graphql', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      variables: {},
      query: '{  brightTitle  allContests {    containsPremium    title    cardImg    titleSlug    description    startTime    duration    originStartTime    isVirtual    company {      watermark      __typename    }    __typename  }}'
    }),
    method: 'POST',
  });
  const data: Response = await response.json();
  return data.data.allContests;
}

export interface Response {
  data: {
    allContests: Contest[]
  }
}

export interface Contest {
  title: string
  titleSlug: string
  cardImg?: string | null
  description: string
  startTime: number
  duration: number
  originStartTime: number
  isVirtual: boolean
  company?: Company | null
  containsPremium: boolean
}

export interface Company {
  watermark?: string | null
}
