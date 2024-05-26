type TUsers = {
  user_id: string;
  name: string;
  email: string;
  pass: string;
  created_at: Date;
};

type TUsersWithoutPass = Omit<TUsers, "pass">;

export { TUsers, TUsersWithoutPass };
