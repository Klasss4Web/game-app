export type CreateExpPayload = {
  title: string;
  description: string;
};

export type Participants = {
  experience_id: string;
  id: string;
  index: number;
  is_active: boolean;
  nonce_id: string;
  username: string;
  point: number;
  total_point: number;
  is_question_answered: boolean;
};

export type ExperienceData = {
  id: string | number;
  title: string;
  description: string;
  experience_type: string;
  experience_playback_mode: string;
  experience_status: string;
  participant_count: number;
  seconds_to_countdown: number;
  question_countdown: number;
  no_of_questions: number;
  question_activated_at: string;
  auto_start: boolean;
  next_experience_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  lookup_code: string;
  next_experience: string;
};
