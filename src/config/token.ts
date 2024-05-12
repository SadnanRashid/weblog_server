type tokenType = {
  ACCESS: string;
  REFRESH: string;
  RESET_PASSWORD: string;
  VERIFY_EMAIL: string;
};

const tokenTypes: tokenType = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};

export { tokenTypes };
