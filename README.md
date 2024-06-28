- [x] setup env vars for database and authentication
- [x] prisma schema and connection to database
- [x] prisma client and seeding tools

### Folder structure

# App routes

| Path               | Description      | Auth  | Role |
| ------------------ | ---------------- | ----- | ---- |
| /                  | landing page     | false | none |
| /home              | user home        | true  | user |
| /players           | players stats    | true  | user |
| /players/:playerId | player by id     | true  | user |
| /matches           | matches stats    | true  | user |
| /matches/:matchId  | match by id      | true  | user |
| ------------------ | ---------------- | ----- | ---- |
| /players/tierlist  | players tierlist | true  | user |

# Admin routes

| Path                               | Description           | Auth | Role  |
| ---------------------------------- | --------------------- | ---- | ----- |
| /admin                             | home                  | true | admin |
| /admin/matches                     | matches               | true | admin |
| /admin/matches/create              | create match          | true | admin |
| /admin/matches/:matchId            | edit match            | true | admin |
| /admin/matches/:matchId/players    | manage match players  | true | admin |
| /admin/players                     | players               | true | admin |
| /admin/players/create              | create player         | true | admin |
| /admin/players/:playerId           | edit player           | true | admin |
| /admin/season                      | season                | true | admin |
| /admin/season/create               | create season         | true | admin |
| /admin/season/:seasonId            | edit player           | true | admin |
| /admin/season/:seasonId/players    | manage season players | true | admin |
| /admin/clubs                       | clubs                 | true | admin |
| /admin/clubs/create                | create club           | true | admin |
| /admin/clubs/:clubId               | edit club             | true | admin |
| /admin/competitions                | competitions          | true | admin |
| /admin/competitions/create         | create competitions   | true | admin |
| /admin/competitions/:competitionId | edit competitions     | true | admin |
| /admin/users                       | users                 | true | admin |
