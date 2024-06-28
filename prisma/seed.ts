import {
  Club,
  Competition,
  Match,
  MatchPlayer,
  Player,
  Prisma,
  PrismaClient,
  Season,
  SeasonPlayer,
  User,
  Vote,
} from "@prisma/client";
import { randomUUID, UUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const fakeUsers = generateFakeUsers(50);
  const fakeClubs = generateFakeClubs(20);
  const fakeSeasons = generateFakeSeasons(2);
  const fakeCompetitions = generateFakeCompetitions(3);
  const fakePlayers = generateFakePlayers(15);
  const fakeMatches = generateFakeMatches({
    amount: 30,
    seasons: fakeSeasons,
    competitions: fakeCompetitions,
    clubs: fakeClubs,
  });
  const fakeSeasonPlayers = generateFakeSeasonPlayers({
    seasons: fakeSeasons,
    players: fakePlayers,
  });
  const fakeMatchPlayers = generateFakeMatchPlayers({
    matches: fakeMatches,
    players: fakePlayers,
  });
  const fakeVotes = generateFakeVotes({
    matchPlayers: fakeMatchPlayers,
    users: fakeUsers,
  });

  // clear the database
  await prisma.$transaction(async (tx) => {
    await tx.vote.deleteMany();
    await tx.matchPlayer.deleteMany();
    await tx.seasonPlayer.deleteMany();
    await tx.match.deleteMany();
    await tx.player.deleteMany();
    await tx.competition.deleteMany();
    await tx.club.deleteMany();
    await tx.season.deleteMany();
    await tx.user.deleteMany();

    console.log("database cleared");
  });

  // seed new data
  await prisma.$transaction(
    async (tx) => {
      await tx.user.createMany({ data: fakeUsers });
      await tx.season.createMany({ data: fakeSeasons });
      await tx.competition.createMany({ data: fakeCompetitions });
      await tx.club.createMany({ data: fakeClubs });
      await tx.player.createMany({ data: fakePlayers });
      await tx.match.createMany({
        data: [
          ...fakeMatches.map((m) => ({
            ...m,
            scores: m.scores as Prisma.InputJsonValue,
          })),
        ],
      });
      await tx.seasonPlayer.createMany({ data: fakeSeasonPlayers });
      await tx.matchPlayer.createMany({ data: fakeMatchPlayers });
      await tx.vote.createMany({ data: fakeVotes });

      console.log("seeded data");
    },
    {
      maxWait: 10000, // default: 2000
      timeout: 50000, // default: 5000
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
    }
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// GENERATORS
export function generateFakeClubs(amount: number = 20) {
  const fakeClubs: Club[] = [];
  for (let i = 0; i < amount; i++) {
    fakeClubs.push({
      id: randomUUID(),
      country_code: "fr",
      full_name: `Fake-Club ${i + 1}`,
      name_code: `FC${i + 1}`,
      logo_url: null,
      primary_color: "#fff",
      secondary_color: "#000",
    });
  }
  return fakeClubs;
}

export function generateFakeSeasons(amount: number = 2) {
  const fakeSeasons: Season[] = [];
  for (let i = 0; i < amount; i++) {
    fakeSeasons.push({
      id: randomUUID(),
      active: i === amount - 1 ? true : false,
      start_date: new Date(2020 + i, 5, 5),
      end_date: new Date(2020 + i + 1, 4, 4),
      published: true,
      period: `${20 + i}/${20 + i + 1}`,
    });
  }
  return fakeSeasons;
}

export function generateFakeCompetitions(amount: number = 3) {
  const fakeCompetitions: Competition[] = [];
  for (let i = 0; i < amount; i++) {
    fakeCompetitions.push({
      id: randomUUID(),
      full_name: `Fake Competition ${i + 1}`,
      name_code: `FC${i + 1}`,
      logo_url: null,
      primary_color: "#fff",
      secondary_color: "#000",
    });
  }
  return fakeCompetitions;
}

export function generateFakePlayers(amount: number = 15) {
  const fakePlayers: Player[] = [];
  for (let i = 0; i < amount; i++) {
    fakePlayers.push({
      id: randomUUID(),
      first_name: `Fake`,
      last_name: `Player${i + 1}`,
      birth_date: new Date(Date.now()),
      country_code: "fr",
      avatar_url: null,
    });
  }
  return fakePlayers;
}

export function generateFakeUsers(amount: number = 50) {
  const fakeUsers: User[] = [];
  for (let i = 0; i < amount; i++) {
    fakeUsers.push({
      id: randomUUID(),
      email: `user${i + 1}@fake.com`,
      emailVerified: null,
      role: "USER",
      image: null,
      name: `Fake User${i + 1}`,
      username: `fakeuser${i + 1}`,
    });
  }
  return fakeUsers;
}

export function generateFakeMatches({
  amount = 30,
  seasons,
  clubs,
  competitions,
}: {
  amount?: number;
  seasons: Season[];
  clubs: Club[];
  competitions: Competition[];
}) {
  const fakeMatches: Match[] = [];
  for (let i = 0; i < seasons.length; i++) {
    const seasonStartDate = seasons[i].start_date;
    for (let j = 0; j < amount; j++) {
      let newMatchDate = new Date(seasonStartDate);
      newMatchDate.setDate(newMatchDate.getDate() + j * 3);
      fakeMatches.push({
        id: randomUUID(),
        season_id: seasons[i].id as UUID,
        start_date: newMatchDate,
        competition_id: competitions[amount % competitions.length].id as UUID,
        opponent_id: clubs[amount % clubs.length].id as UUID,
        active: true,
        published: true,
        result: "DRAW",
        location: j % 2 ? "HOME" : "AWAY",
        scores: {
          scored_full: 1,
          scored_pens: null,
          conceeded_full: 1,
          conceeded_pens: null,
        },
      });
    }
  }
  return fakeMatches;
}

export function generateFakeSeasonPlayers({
  seasons,
  players,
}: {
  seasons: Season[];
  players: Player[];
}) {
  const fakeSeasonPlayers: SeasonPlayer[] = [];
  for (let i = 0; i < seasons.length; i++) {
    for (let j = 0; j < players.length; j++) {
      fakeSeasonPlayers.push({
        id: randomUUID(),
        player_id: players[j].id,
        season_id: seasons[i].id,
      });
    }
  }
  return fakeSeasonPlayers;
}

export function generateFakeMatchPlayers({
  matches,
  players,
}: {
  matches: Match[];
  players: Player[];
}) {
  const fakeMatchPlayers: MatchPlayer[] = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < players.length; j++) {
      fakeMatchPlayers.push({
        id: randomUUID(),
        match_id: matches[i].id,
        player_id: players[j].id,
        player_position: "ATTACKER",
        player_status: "STARTER",
        minutes_played: 90,
      });
    }
  }
  return fakeMatchPlayers;
}

export function generateFakeVotes({
  matchPlayers,
  users,
}: {
  matchPlayers: MatchPlayer[];
  users: User[];
}) {
  const fakeVotes: Vote[] = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < matchPlayers.length; j++) {
      fakeVotes.push({
        id: randomUUID(),
        player_id: matchPlayers[j].player_id,
        match_id: matchPlayers[j].match_id,
        user_id: users[i].id,
        rating: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        motm: Math.random() * 100 > 8 ? true : false,
        botm: Math.random() * 100 > 8 ? true : false,
      });
    }
  }
  return fakeVotes;
}
