import {
  IGithubEvent,
  IGithubRepository,
  IGithubUser,
  IGithubUserDetail,
} from "@/interfaces";
import { BASE_URL, GITHUB_TOKEN, PATHS } from "./config";
export const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

export const userApis = {
  getUsers: async (): Promise<IGithubUser[]> => {
    const resp = await fetch(
      `${BASE_URL}/${PATHS.users.getUsers}?per_page=16`,
      {
        headers,
      }
    );
    if (!resp.ok) throw new Error("Error fetching users");
    return await resp.json();
  },

  getUsersSearch: async (q: string): Promise<{ items: IGithubUser[] }> => {
    const resp = await fetch(
      `${BASE_URL}/search/${PATHS.users.getUsers}?q=${q}&per_page=16`,
      {
        headers,
      }
    );
    if (!resp.ok) throw new Error("Error searching users");
    return await resp.json();
  },

  getUserBySlug: async (slug: string): Promise<IGithubUserDetail> => {
    const resp = await fetch(`${BASE_URL}/users/${slug}`, {
      headers,
    });
    if (!resp.ok) throw new Error(`Error fetching user ${slug}`);
    return await resp.json();
  },

  getUserRepositories: async (slug: string): Promise<IGithubRepository[]> => {
    const resp = await fetch(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/repos`,
      {
        headers,
      }
    );
    if (!resp.ok) throw new Error(`Error fetching repositories for ${slug}`);
    return await resp.json();
  },

  getUserEvents: async (slug: string): Promise<IGithubEvent[]> => {
    const resp = await fetch(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/received_events`,
      {
        headers,
      }
    );
    if (!resp.ok) throw new Error(`Error fetching events for ${slug}`);
    return await resp.json();
  },
  getUserFollowers: async (slug: string): Promise<IGithubUser[]> => {
    const resp = await fetch(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/followers`,
      {
        headers,
      }
    );
    if (!resp.ok) throw new Error(`Error fetching followers for ${slug}`);
    return await resp.json();
  },
};
