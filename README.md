# leetcode-contest-calendar

This repository generates LeetCode contest calendar in ICS format daily and deploys to GitHub pages for external subscription.

## Usage

Include following URL in calendar apps to subscribe recent LeetCode contest.
[https://zerogazer.github.io/leetcode-contest-calendar/leetcode-contest-calendar.ics](https://zerogazer.github.io/leetcode-contest-calendar/leetcode-contest-calendar.ics)

## Development

Node v20
Yarn v5

## Design

### Calendar properties
* Recent 10 contests
* Trigger alarm before 30 minutes
* Event is a free event

### File generation

```mermaid
  graph TD;
  A(Query LeetCode graphQL API to get contest schedule)-->B(Generate ICS file);
```

### File deploment

```mermaid
  graph TD;
  A(Scheduled GitHub Action)-->B(Transcompile TS);
  B-->C(Generate ICS file);
  C-->D(Build artifact by packaging ICS file);
  D-->E(Deploy artifact to GitHub pages);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
