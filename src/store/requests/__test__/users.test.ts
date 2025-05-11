import { mockUser, mockGithubEvent, mockGithubRepository } from "@/mocks";
import { BASE_URL, PATHS } from "../config";
import { userApis, headers } from "../users";

global.fetch = jest.fn();
const mockUsers = [mockUser];
const slug = "test";

describe("userApis", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getUsers should return a users array (success flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    const users = await userApis.getUsers();
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/${PATHS.users.getUsers}?per_page=16`,
      { headers }
    );
    expect(users).toEqual(mockUsers);
  });

  it("getUsers should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUsers()).rejects.toThrow("Error fetching users");
  });

  it("getUsersSearch should return search results (success flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    const q = "test-q";
    const result = await userApis.getUsersSearch(q);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/search/${PATHS.users.getUsers}?q=${q}&per_page=16`,
      { headers }
    );
    expect(result).toEqual(mockUsers);
  });

  it("getUsersSearch should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUsersSearch("test")).rejects.toThrow(
      "Error searching users"
    );
  });

  it("getUserBySlug should return user detail (success flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });
    const result = await userApis.getUserBySlug(slug);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/${slug}`, {
      headers,
    });
    expect(result).toEqual(mockUser);
  });

  it("getUserBySlug should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUserBySlug(slug)).rejects.toThrow(
      `Error fetching user ${slug}`
    );
  });

  it("getUserRepositories should return repos (success flow)", async () => {
    const mockRepos = [mockGithubRepository];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });
    const result = await userApis.getUserRepositories(slug);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/repos`,
      { headers }
    );
    expect(result).toEqual(mockRepos);
  });

  it("getUserRepositories should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUserRepositories(slug)).rejects.toThrow(
      `Error fetching repositories for ${slug}`
    );
  });

  it("getUserEvents should return events (success flow)", async () => {
    const mockEvents = [mockGithubEvent];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });
    const result = await userApis.getUserEvents(slug);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/received_events`,
      { headers }
    );
    expect(result).toEqual(mockEvents);
  });

  it("getUserEvents should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUserEvents(slug)).rejects.toThrow(
      `Error fetching events for ${slug}`
    );
  });

  it("getUserFollowers should return a users array (success flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    const users = await userApis.getUserFollowers(slug);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/${PATHS.users.getUsers}/${slug}/followers`,
      { headers }
    );
    expect(users).toEqual(mockUsers);
  });

  it("getUserFollowers should throw an error (error flow)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(userApis.getUserFollowers(slug)).rejects.toThrow(
      `Error fetching followers for ${slug}`
    );
  });
});
