export interface Event {
  id: string,
  name: string,
  color: string,
  active: boolean,
  options: EventOptions;
}

export interface EventOptions {
  boulders: EventOptionsBoulder[],
}

export interface EventOptionsBoulder {
  label: string,
  hasZone: boolean
}

export interface EventDetails extends Event {
  climbers: Climber[]
}

export interface Climber {
  id: string,
  eventId: string,
  firstname: string,
  lastname: string,
  gender: Gender
  boulders: ClimberBoulder[]
}

export interface ClimberBoulder {
  validateTop: boolean,
  validateZone: boolean
}

export enum Gender {
  MALE= 'MALE',
  FEMALE='FEMALE'
}

export interface Leaderboards {
  maleLeaderboard: Leaderboard,
  femaleLeaderboard: Leaderboard
}

export interface Leaderboard {
  climbers: RankedClimber[]
}

export interface RankedClimber {
  id: string,
  firstname: string,
  lastname: string,
  score: number
}

export interface EventRequest {
  name: string,
  boulders: number,
  metadata: { [key: string]: string },
}

export interface EventUpdateRequest {
  active?: boolean,
  color?: string,
  boulders?: EventOptionsBoulder[],
}

export interface ClimberRequest {
  firstname: string,
  lastname: string,
  gender: Gender
}

export interface ClimberUpdateRequest {
  boulders: ClimberBoulder[]
}
