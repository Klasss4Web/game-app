export type OptionFields = {
  id: string;
  text: string;
  is_correct: boolean;
};

export type AnswerFields = {
  text: string;
  answers: OptionFields[];
  is_correct?: boolean;
};

export type Questions = OptionFields &
  AnswerFields & {
    order: number;
    point: number;
    hasBeenActive: boolean;
  };

export type ActiveQuestionPayload = {
  experience_id: string;
  question_id: string;
};

export type SubmitAnswerPayload = {
  answer_id: string;
  experience_id: string;
  question_id: string;
  question_answered_at: string;
};
export type AnswerQuestionResponse = {
  answer_id: number;
  answer_text: string;
  created_at: string;
  experience_id: string;
  is_answer_correct: boolean;
  participant_id: string;
  point: number;
  question_activated_at: string;
  question_answered_at: string;
  question_id: number;
  question_point: 100;
  updated_at: string;
};
