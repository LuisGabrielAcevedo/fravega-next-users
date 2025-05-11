import {
  IGithubEvent,
  IGithubRepository,
  IGithubUser,
  IGithubUserDetail,
} from "@/interfaces";
import { API } from "../requests";

export const getUserBySlugAction = async (
  slug: string
): Promise<IGithubUserDetail | null> => {
  try {
    return await API.users.getUserBySlug(slug);
  } catch (err) {
    console.log(`Log this error: ${err}`);
    return null;
  }
};

export const getUserRepositoriesAction = async (
  slug: string
): Promise<IGithubRepository[]> => {
  try {
    return await API.users.getUserRepositories(slug);
  } catch (err) {
    console.log(`Log this error: ${err}`);
    return [];
  }
};

export const getUserEventsAction = async (
  slug: string
): Promise<IGithubEvent[]> => {
  try {
    return await API.users.getUserEvents(slug);
  } catch (err) {
    console.log(`Log this error: ${err}`);
    return [];
  }
};

export const getUserFollowersAction = async (
  slug: string
): Promise<IGithubUser[]> => {
  try {
    return await API.users.getUserFollowers(slug);
  } catch (err) {
    console.log(`Log this error: ${err}`);
    return [];
  }
};
