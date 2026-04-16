export const selectAuth = (state) => state.auth;

export const selectIsAuthenticated = (state) => Boolean(state.auth?.token);
