export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const handleError = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = {
    message: payload?.message || error?.message || "Something went wrong",
    code: payload?.statusCode || error?.code,
  };
};