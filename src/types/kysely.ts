import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export const MatchLocation = {
    HOME: "HOME",
    AWAY: "AWAY"
} as const;
export type MatchLocation = (typeof MatchLocation)[keyof typeof MatchLocation];
export const MatchResult = {
    WIN: "WIN",
    LOSE: "LOSE",
    DRAW: "DRAW"
} as const;
export type MatchResult = (typeof MatchResult)[keyof typeof MatchResult];
export const PlayerPosition = {
    ATTACKER: "ATTACKER",
    MIDFIELDER: "MIDFIELDER",
    DEFENDER: "DEFENDER",
    GOALKEEPER: "GOALKEEPER"
} as const;
export type PlayerPosition = (typeof PlayerPosition)[keyof typeof PlayerPosition];
export const PlayerStatus = {
    STARTER: "STARTER",
    SUBSTITUTE: "SUBSTITUTE"
} as const;
export type PlayerStatus = (typeof PlayerStatus)[keyof typeof PlayerStatus];
export type Account = {
    id: Generated<string>;
    user_id: string;
    type: string;
    provider: string;
    provider_account_id: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
};
export type Club = {
    id: Generated<string>;
    country_code: string;
    full_name: string;
    name_code: string;
    primary_color: string;
    secondary_color: string;
    logo_url: string | null;
};
export type Competition = {
    id: Generated<string>;
    full_name: string;
    name_code: string;
    primary_color: string;
    secondary_color: string;
    logo_url: string | null;
};
export type Match = {
    id: Generated<string>;
    location: MatchLocation;
    result: MatchResult;
    scores: unknown;
    start_date: Timestamp;
    active: Generated<boolean>;
    published: Generated<boolean>;
    opponent_id: string;
    competition_id: string;
    season_id: string;
};
export type MatchPlayer = {
    id: Generated<string>;
    match_id: string;
    player_id: string;
    player_position: PlayerPosition;
    player_status: PlayerStatus;
    minutes_played: Generated<number>;
};
export type Player = {
    id: Generated<string>;
    first_name: string | null;
    last_name: string;
    country_code: string;
    birth_date: Timestamp;
    avatar_url: string | null;
};
export type Season = {
    id: Generated<string>;
    period: string;
    start_date: Timestamp;
    end_date: Timestamp;
    active: Generated<boolean>;
    published: Generated<boolean>;
};
export type SeasonPlayer = {
    id: Generated<string>;
    player_id: string;
    season_id: string;
};
export type Session = {
    id: Generated<string>;
    session_token: string;
    user_id: string;
    expires: Timestamp;
};
export type User = {
    id: Generated<string>;
    name: string | null;
    username: string | null;
    role: Generated<UserRole>;
    email: string | null;
    email_verified: Timestamp | null;
    image: string | null;
};
export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Timestamp;
};
export type Vote = {
    id: Generated<string>;
    rating: number;
    motm: Generated<boolean>;
    botm: Generated<boolean>;
    user_id: string;
    match_id: string;
    player_id: string;
};
export type DB = {
    accounts: Account;
    clubs: Club;
    competitions: Competition;
    match_players: MatchPlayer;
    matches: Match;
    players: Player;
    season_players: SeasonPlayer;
    seasons: Season;
    sessions: Session;
    users: User;
    verification_tokens: VerificationToken;
    votes: Vote;
};
