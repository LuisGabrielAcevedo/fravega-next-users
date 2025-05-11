import {
  getUserBySlugAction,
  getUserRepositoriesAction,
  getUserEventsAction,
  getUserFollowersAction,
} from "../userActions";
import { mockUser, mockGithubEvent, mockGithubRepository } from "@/mocks";
import { API } from "../../requests";

jest.mock("../../requests", () => ({
  API: {
    users: {
      getUserBySlug: jest.fn(),
      getUserRepositories: jest.fn(),
      getUserEvents: jest.fn(),
      getUserFollowers: jest.fn(),
    },
  },
}));

const slug = "test";

describe("User actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getUserBySlugAction should return user detail (success)", async () => {
    (API.users.getUserBySlug as jest.Mock).mockResolvedValueOnce(mockUser);
    const result = await getUserBySlugAction(slug);
    expect(API.users.getUserBySlug).toHaveBeenCalledWith(slug);
    expect(result).toEqual(mockUser);
  });

  it("getUserBySlugAction should return null (error)", async () => {
    (API.users.getUserBySlug as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const result = await getUserBySlugAction(slug);
    expect(result).toBeNull();
  });

  it("getUserRepositoriesAction should return repositories (success)", async () => {
    const mockRepos = [mockGithubRepository];
    (API.users.getUserRepositories as jest.Mock).mockResolvedValueOnce(
      mockRepos
    );
    const result = await getUserRepositoriesAction(slug);
    expect(API.users.getUserRepositories).toHaveBeenCalledWith(slug);
    expect(result).toEqual(mockRepos);
  });

  it("getUserRepositoriesAction should return empty array (error)", async () => {
    (API.users.getUserRepositories as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const result = await getUserRepositoriesAction(slug);
    expect(result).toEqual([]);
  });

  it("getUserEventsAction should return events (success)", async () => {
    const mockEvents = [mockGithubEvent];
    (API.users.getUserEvents as jest.Mock).mockResolvedValueOnce(mockEvents);
    const result = await getUserEventsAction(slug);
    expect(API.users.getUserEvents).toHaveBeenCalledWith(slug);
    expect(result).toEqual(mockEvents);
  });

  it("getUserEventsAction should return empty array (error)", async () => {
    (API.users.getUserEvents as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const result = await getUserEventsAction(slug);
    expect(result).toEqual([]);
  });

  it("getUserFollowersAction should return followers (success)", async () => {
    const mockUsers = [mockUser];
    (API.users.getUserFollowers as jest.Mock).mockResolvedValueOnce(mockUsers);
    const result = await getUserFollowersAction(slug);
    expect(API.users.getUserFollowers).toHaveBeenCalledWith(slug);
    expect(result).toEqual(mockUsers);
  });

  it("getUserFollowersAction should return empty array (error)", async () => {
    (API.users.getUserFollowers as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const result = await getUserFollowersAction(slug);
    expect(result).toEqual([]);
  });
});
