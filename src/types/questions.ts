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
  };
