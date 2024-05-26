type TToken = {
  token_id: string;
  userref: string;
  token: string;
  type: "REFRESH" | "RESET_PASSWORD" | "VERIFY_EMAIL";
  expires: Date;
  blacklisted: boolean;
};

export { TToken };
