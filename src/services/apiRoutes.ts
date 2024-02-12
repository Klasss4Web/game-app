export const API_ROUTES = {
  // AUTH
  LOGIN: "/auth/signin",
  REGISTER: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/token/refresh",

  //   QUESTIONS
  QUESTIONS: "/questions",
  GET_ALL_QUESTIONS: (experienceId: string) =>
    `/experience/${experienceId}/questions`,
  GET_QUESTION_BY_ID: (experienceId: string) => `/questions/${experienceId}`,

  //   EXPERIENCES
  EXPERIENCES: "/experience",
  GET_EXPERIENCE_BY_ID: (experienceId: string) => `/experience/${experienceId}`,
};
