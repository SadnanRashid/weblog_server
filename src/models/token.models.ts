type TToken = {
  token_id: string;
  refuser: string;
  token: string;
  type: "REFRESH" | "RESET_PASSWORD" | "VERIFY_EMAIL";
  expires: Date;
  blacklisted: boolean;
};

export { TToken };
