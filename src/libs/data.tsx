export interface Contributer {
  username: string;
  url: string;
  avatar: string;
}

export interface Repository {
  repositoryName: string;
  username: string;
  url: string;
  totalStars: number;
  starsSince: number;
  since: string;
  rank: number;
  languageColor: string | null;
  language: string | null;
  forks: number;
  description: string;
  builtBy: Array<Contributer>;
}

export interface PopularRepository {
  description: string | null;
  repositoryName: string;
  url: string;
}

export interface Developer {
  name: string;
  username: string;
  rank: number;
  since: string;
  url: string;
  avatar: string | undefined;
  popularRepository: PopularRepository;
}