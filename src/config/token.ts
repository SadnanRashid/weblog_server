type tokenType = {
  ACCESS: string;
  REFRESH: string;
  RESET_PASSWORD: string;
  VERIFY_EMAIL: string;
};

const tokenTypes: tokenType = {
  ACCESS: "ACCESS",
  REFRESH: "REFRESH",
  RESET_PASSWORD: "RESET_PASSWORD",
  VERIFY_EMAIL: "VERIFY_EMAIL",
};

export { tokenTypes };
