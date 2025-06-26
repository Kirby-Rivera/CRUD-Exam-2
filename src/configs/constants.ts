interface PageAccess {
  private: string;
  public: string;
}

export const SESSION_COOKIE: string = "session_cookie";
export const PAGE_ACCESS: PageAccess = {
  private: "private",
  public: "public",
};
