import {
  IGithubEvent,
  IGithubRepository,
  IGithubUser,
  IGithubUserDetail,
} from "@/interfaces";

export const mockUser: IGithubUser = {
  login: "mojombo",
  id: 1,
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/mojombo",
  html_url: "https://github.com/mojombo",
  followers_url: "https://api.github.com/users/mojombo/followers",
  following_url: "https://api.github.com/users/mojombo/following{/other_user}",
  gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
  starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
  organizations_url: "https://api.github.com/users/mojombo/orgs",
  repos_url: "https://api.github.com/users/mojombo/repos",
  events_url: "https://api.github.com/users/mojombo/events{/privacy}",
  received_events_url: "https://api.github.com/users/mojombo/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
};

export const mockGithubRepository: IGithubRepository = {
  id: 123456,
  name: "example-repo",
  url: "https://api.github.com/repos/test/example-repo",
  updated_at: "2025-05-11T12:34:56Z",
};

export const mockGithubEvent: IGithubEvent = {
  id: "evt123",
  type: "PushEvent",
  public: true,
  created_at: "2025-05-11T15:00:00Z",
  actor: {
    id: 101,
    login: "test",
    display_login: "test",
    gravatar_id: "",
    url: "https://api.github.com/users/test",
    avatar_url: "https://avatars.githubusercontent.com/u/101?v=4",
  },
  repo: {
    id: 202,
    name: "test/hello-world",
    url: "https://api.github.com/repos/test/hello-world",
  },
};

export const mockGithubUserDetail: IGithubUserDetail = {
  ...mockUser,
  name: "The test",
  company: "@github",
  blog: "https://github.blog",
  location: "San Francisco",
  email: null,
  hireable: null,
  bio: "A mysterious feline hacker 🐱‍💻",
  twitter_username: "test",
  public_repos: 8,
  public_gists: 8,
  followers: 9999,
  following: 42,
  created_at: "2011-01-25T18:44:36Z",
  updated_at: "2024-05-01T12:00:00Z",
};
