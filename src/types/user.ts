export type AuthUserType = {
  id: number;
  role: string;
  photo: string;
  photo_id: string;
  surname: string;
  first_name: string;
  last_name: string;
};

export type LoggedInUser = {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  access_token: string;
  refresh_token: string;
};

export type LoggedInParticipant = {
  active: boolean;
  created_at: string;
  deleted_at: string;
  experience_id: string;
  id: string;
  is_active: boolean;
  nonce_id: string;
  updated_at: string;
  username: string;
};
