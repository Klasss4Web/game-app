import io from "socket.io-client";
import { socketBaseURL } from "./api";
import {
  getLocalStorageItem,
  getLocalStorageString,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { ACCESS_TOKEN, SAVED_ITEMS } from "@/constants/appConstants";
import { errorNotifier, successNotifier } from "@/app/providers";
import { LoggedInParticipant } from "@/types/user";
import { setTimer } from "@/utils/setTimer";
import { Participants } from "@/types/experience";

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  adminJoinNotification: "hostNotification",
  joinExperience: "joinExperience",
  joinExperienceError: "joinExperienceError",
  joinExperienceResponse: "joinExperienceResponse",
  rejoinExperience: "rejoinExperience",
  rejoinExperienceError: "rejoinExperienceError",
  rejoinExperienceResponse: "rejoinExperienceResponse",
  adminEndExperience: "endExperience",
  adminEndExperienceResponse: "endExperienceResponse",
  adminEndExperienceError: "endExperienceError",
  adminStartExperience: "startExperience",
  experienceReactivity: "experienceReactivity",
  adminStartExperienceError: "startExperienceError",
  adminStartExperienceResponse: "startExperienceResponse",
  adminGetExperienceQuestion: "getExperienceQuestion",
  adminGetExperienceQuestionResponse: "getExperienceQuestionResponse",
  adminSetActiveQuestion: "setActiveQuestion",
  getParticipantsScore: "getParticipantsScore",
  getParticipantsScoreError: "getParticipantsScoreError",
  getParticipantsScoreResponse: "getParticipantsScoreResponse",
  getCurrentQuestionParticipantScore: "getCurrentQuestionParticipantScore",
  getCurrentQuestionParticipantsScoreError:
    "getCurrentQuestionParticipantsScoreError",
  getCurrentQuestionParticipantsScoreResponse:
    "getCurrentQuestionParticipantsScoreResponse",
  adminSetActiveQuestionResponse: "setActiveQuestionResponse",
  adminSetActiveQuestionError: "setActiveQuestionError",
  adminGetExperienceParticipants: "getExperienceParticipant",
  adminShowCorrectAnswer: "showCorrectAnswer",
  showCorrectAnswerResponse: "showCorrectAnswerResponse",
  showCorrectAnswerError: "showCorrectAnswerError",
  adminShowQuestionRank: "showQuestionRank",
  showQuestionRankError: "showQuestionRankError",
  showQuestionRankResponse: "showQuestionRankResponse",
  adminShowFinalRank: "showFinalRank",
  showFinalRankResponse: "showFinalRankResponse",
  showFinalRankError: "showFinalRankError",
  getExperienceParticipantError: "getExperienceParticipantError",
  getExperienceParticipantResponse: "getExperienceParticipantResponse",
  answerExperienceQuestion: "answerExperienceQuestion",
  answerExperienceQuestionResponse: "answerExperienceQuestionResponse",
  answerExperienceQuestionError: "answerExperienceQuestionError",
};

const token = getLocalStorageString(ACCESS_TOKEN);

export let socketClient: any = io(socketBaseURL as string);
export function connect() {
  socketClient = io(socketBaseURL as string);
  socketClient?.on("connect", () => {
    console.log("PART CONNECTED TO SOCKET", socketClient);
    successNotifier("Connection restored");
    // socketClient.emit();
  });
}

export const onDisconnect = () => {
  socketClient.on("disconnect", () => {
    console.log("Disconnected from the server!");
  });
};

export function disconnect() {
  if (socketClient) {
    socketClient.disconnect();
  }
}

// export function setMessageHandler(handler: (data: any) => void) {
//   socketClient.on(MESSAGE_EVENT_NAME, (data: any) => {
//     handler(data);
//   });
// }

// export function clearMessageHandler() {
//   socketClient.removeAllListeners(MESSAGE_EVENT_NAME);
// }

export const socketEmitEvent = (
  eventName: string,
  eventPayload: any,
  socketClient: any
) => {
  socketClient.emit(eventName, eventPayload, (response: any) => {
    console.log(response, `EMIT RESPONSE FOR ${eventName}`); // ok
  });
};

export const socketListenEvent = (
  eventName: string,
  socketClient: any,
  setData: (arg: Participants[]) => void = (arg) => null
) => {
  socketClient.on(eventName, (data: any) => {
    console.log(`MSG RESP FOR ${eventName}`, data);
    setData(data);
    successNotifier("Success...");
  });
};

export const socketListenError = (eventName: string, socketClient: any) => {
  socketClient.on(eventName, (error: any) => {
    console.log(`MSG ERROR FOR ${eventName}`, error);
    errorNotifier(error?.message);
    // setLoading(false);
  });
};

export async function joinExperience(
  name: string,
  payload: any,
  setData: (arg: any) => void,
  setPosition: (arg: string) => void,
  setLoading: (arg: boolean) => void,
  socketClient: any
) {
  // socketClient = io(socketBaseURL as string);
  socketClient.emit(name, payload, (response: any) => {
    console.log(response, `EMIT RESPONSE FOR ${name}`); // ok
  });

  socketClient.on("joinExperienceResponse", (data: any) => {
    setData(data);
    setPosition("waiting");
    setLocalStorageItem(SAVED_ITEMS.participant, data);
    // socketEmitEvent(
    //   SOCKET_EVENTS.adminGetExperienceParticipants,
    //   {
    //     experience_id: payload?.experience_id,
    //   },
    //   socketClient
    // );
    console.log("EXP RESP", data);
  });
  socketClient.on("joinExperienceError", (error: any) => {
    console.log("EXP ERROR RESP", error);
    errorNotifier(error?.message);
    setLoading(false);
  });
}

export async function reJoinExperience(
  payload: any,
  setData: (arg: any) => void,
  setPosition: (arg: string) => void,
  setLoading: (arg: boolean) => void,
  socketClient: any
) {
  // socketClient = io(socketBaseURL as string);
  socketClient.emit(
    SOCKET_EVENTS.rejoinExperience,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT RESPONSE FOR ${SOCKET_EVENTS.rejoinExperience}`
      ); // ok
    }
  );

  socketClient.on(SOCKET_EVENTS.rejoinExperienceResponse, (data: any) => {
    setData(data);
    setPosition("waiting");
    // setLocalStorageItem(SAVED_ITEMS.participant, data);
    console.log("REJOIN EXP RESP", data);
  });
  socketClient.on(SOCKET_EVENTS.rejoinExperienceError, (error: any) => {
    console.log("REJOIN EXP ERROR RESP", error);
    errorNotifier(error?.message);
    setLoading(false);
  });
}

export async function sendMessage(
  name: string,
  payload: any,
  setLoading: (arg: boolean) => void,
  setData: (arg: boolean) => void
) {
  setLoading(true);
  socketClient = io(socketBaseURL as string, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
  socketClient.emit(name, payload, (response: any) => {
    console.log(response, `EMIT RESPONSE FOR ${name}`); // ok
  });

  socketClient.on(SOCKET_EVENTS.adminStartExperienceResponse, (data: any) => {
    setData(data);
    console.log(
      `EXP MSG RESP FOR ${SOCKET_EVENTS.adminStartExperienceResponse}`,
      data
    );

    setLoading(false);
  });
  socketClient.on(SOCKET_EVENTS.adminStartExperienceError, (error: any) => {
    // setData(data);
    errorNotifier(error?.message);
    console.log(
      `EXP ERROR RESP FOR ${SOCKET_EVENTS.adminStartExperienceError}`,
      error
    );
    setLoading(false);
  });
}

export async function endExperience(
  payload: any,
  setLoading: (arg: boolean) => void,
  setData: (arg: boolean) => void
) {
  setLoading(true);

  socketClient = io(socketBaseURL as string, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
  socketClient.emit(
    SOCKET_EVENTS.adminEndExperience,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT RESPONSE FOR ${SOCKET_EVENTS.adminEndExperience}`
      ); // ok
    }
  );

  socketClient.on(SOCKET_EVENTS.adminEndExperienceResponse, (data: any) => {
    setData(data);
    console.log(
      `EXP MSG RESP FOR ${SOCKET_EVENTS.adminEndExperienceResponse}`,
      data
    );

    setLoading(false);
  });
  socketClient.on(SOCKET_EVENTS.adminEndExperienceError, (error: any) => {
    // setData(data);
    errorNotifier(error?.message);
    console.log(
      `EXP ERROR RESP FOR ${SOCKET_EVENTS.adminEndExperienceError}`,
      error
    );
    setLoading(false);
  });
}

export const getMessageResponse = (
  name: string,
  setData: (arg: any) => void,
  setLoading: (arg: boolean) => void
) => {
  socketClient = io(socketBaseURL as string);
  socketClient.on(name, (data: any) => {
    setData(data);
    console.log(`EXP MSG RESP FOR ${name}`, data);
    setLoading(false);
  });
  console.log("FIRE RESPONSE");
};

export const getErrorMessageResponse = (
  name: string,
  setLoading: (arg: boolean) => void
) => {
  socketClient = io(socketBaseURL as string);
  socketClient.on(name, (error: any) => {
    console.log(`ERROR MSG RESP FOR ${name}`, error);
    setLoading(false);
  });
};

export async function getExperienceQuestion(
  payload: any,
  setLoading: (arg: boolean) => void,
  setData: (arg: any) => void
) {
  setLoading(true);
  socketClient = io(socketBaseURL as string, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
  socketClient.emit(
    SOCKET_EVENTS.adminGetExperienceQuestion,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT QUST RESPONSE FOR ${SOCKET_EVENTS.adminGetExperienceQuestion}`
      ); // ok
    }
  );

  socketClient.on(
    SOCKET_EVENTS.adminGetExperienceQuestionResponse,
    (data: any) => {
      setData(data);
      console.log(
        `EXP MSG EXP RESP FOR ${SOCKET_EVENTS.adminStartExperienceResponse}`,
        data
      );
      setLoading(false);
    }
  );
}

export async function setActiveQuestion(
  payload: any,
  setLoading: (arg: boolean) => void,
  setData: (arg: any) => void,
  restart: (arg: Date) => void,
  socketClient: any
) {
  setLoading(true);
  // socketClient = io(socketBaseURL as string, {
  //   extraHeaders: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });
  socketClient.emit(
    SOCKET_EVENTS.adminSetActiveQuestion,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT QUST RESPONSE FOR ${SOCKET_EVENTS.adminSetActiveQuestion}`
      ); // ok
      setData(response);
      setLoading(false);

      successNotifier("Success");
    }
  );

  socketClient.on(
    SOCKET_EVENTS.adminSetActiveQuestionResponse,
    (response: any) => {
      console.log(
        `EXP MSG EXP RESP FOR ${SOCKET_EVENTS.adminSetActiveQuestionResponse}`,
        response
      );
      setLoading(false);
      restart(setTimer());
      successNotifier("Success");
    }
  );

  socketClient.on(SOCKET_EVENTS.adminSetActiveQuestionError, (error: any) => {
    console.log(
      `ERROR MSG RESP FOR ${SOCKET_EVENTS.adminSetActiveQuestionError}`,
      error
    );
    errorNotifier(error?.message);
    setLoading(false);
  });
}

export function answerExperienceQuestion(
  payload: any,
  setLoading: (arg: boolean) => void
) {
  const participant = getLocalStorageItem<LoggedInParticipant>(
    SAVED_ITEMS.participant
  );
  setLoading(true);
  // socketClient = io(socketBaseURL as string);
  console.log("socketClient", socketClient);

  socketClient.emit(
    SOCKET_EVENTS.answerExperienceQuestion,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT RESPONSE FOR ${SOCKET_EVENTS.answerExperienceQuestion}`
      ); // ok
      setLoading(false);
      successNotifier("Submitted...");
    }
  );

  socketClient.on(
    SOCKET_EVENTS.answerExperienceQuestionResponse,
    (data: any) => {
      console.log(
        `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionResponse}`,
        data
      );
      successNotifier("Submitted...");
      // errorNotifier(error?.message);
      setLoading(false);
    }
  );
  socketClient.on(SOCKET_EVENTS.answerExperienceQuestionError, (error: any) => {
    console.log(
      `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionError}`,
      error
    );
    errorNotifier(error?.message);
    setLoading(false);
  });
}

export function getParticipantsFinalScore(
  payload: any,
  socketClient: any
  // setLoading: (arg: boolean) => void
) {
  console.log("socketClient", socketClient);

  socketClient.emit(
    SOCKET_EVENTS.getParticipantsScore,
    payload,
    (response: any) => {
      console.log(
        response,
        `EMIT RESPONSE FOR ${SOCKET_EVENTS.getParticipantsScore}`
      ); // ok
      // setLoading(false);
      successNotifier("Leader Board Updated");
    }
  );

  socketClient.on(SOCKET_EVENTS.getParticipantsScoreResponse, (data: any) => {
    console.log(
      `MSG RESP FOR ${SOCKET_EVENTS.getParticipantsScoreResponse}`,
      data
    );
    successNotifier("Leader Board Updated");
    // setLoading(false);
  });
  socketClient.on(SOCKET_EVENTS.getParticipantsScoreError, (error: any) => {
    console.log(
      `MSG ERROR FOR ${SOCKET_EVENTS.getParticipantsScoreError}`,
      error
    );
    errorNotifier(error?.message);
    // setLoading(false);
  });
}

// export function handleShowCorrectAnswer(payload: any, socketClient: any) {
//   console.log("socketClient", socketClient);

//   socketEmitEvent(SOCKET_EVENTS.adminShowCorrectAnswer, payload, socketClient);

//   socketListenEvent(SOCKET_EVENTS.showCorrectAnswerResponse, socketClient);
//   socketListenError(SOCKET_EVENTS.showCorrectAnswerError, socketClient);
// }

export function handleAdminControls(
  eventName: string,
  responseName: string,
  errorName: string,
  payload: { experience_id: string },
  socketClient: any,
  setData: (arg: Participants[]) => void
) {
  console.log("socketClient", socketClient);

  socketEmitEvent(eventName, payload, socketClient);

  socketListenEvent(responseName, socketClient, setData);
  socketListenError(errorName, socketClient);
}

export const participantJoinNotification = (
  socketConnection: any,
  participants: Participants[],
  setData: (arg: Participants[]) => void
) => {
  socketConnection.on(
    SOCKET_EVENTS.adminJoinNotification,
    (data: { payload: Participants }) => {
      setData([data?.payload, ...participants]);
      console.log(
        `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionResponse}`,
        data
      );
      successNotifier(`${data?.payload?.username} Joined`);
      // errorNotifier(error?.message);
    }
  );
};
