export interface IGithubUser {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User" | "Organization";
  user_view_type: "public";
  site_admin: boolean;
}

export interface IGithubUserDetail extends IGithubUser {
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IGithubRepository {
  id: number;
  name: string;
  url: string;
  updated_at: string;
}

export interface IGithubEvent {
  id: string;
  type: string;
  actor: IGithubEventActor;
  repo: IGithubEventRepo;
  public: boolean;
  created_at: string;
}

interface IGithubEventActor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

interface IGithubEventRepo {
  id: number;
  name: string;
  url: string;
}
