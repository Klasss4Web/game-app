export type CreateExpPayload = {
  title: string;
  description: string;
};

export type Participants = {
  experience_id: string;
  id: string;
  is_active: boolean;
  nonce_id: string;
  username: string;
};

export type ExperienceData = {
  id: string;
  title: string;
  description: string;
  experience_type: string;
  experience_playback_mode: string;
  experience_status: string;
  participant_count: number;
  seconds_to_countdown: number;
  auto_start: boolean;
  next_experience_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  lookup_code: string;
  next_experience: string;
};
