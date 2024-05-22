type TToken = {
  token_id: string;
  useref: string;
  token: string;
  type: "REFRESH" | "RESET_PASSWORD" | "VERIFY_EMAIL";
  expires: Date;
  blacklisted: boolean;
};

export { TToken };
