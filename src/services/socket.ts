import io from "socket.io-client";
import { socketBaseURL } from "./api";
import {
  getLocalStorageString,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { ACCESS_TOKEN, SAVED_ITEMS } from "@/constants/appConstants";
import { errorNotifier, successNotifier } from "@/app/providers";

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  joinExperience: "joinExperience",
  joinExperienceError: "joinExperienceError",
  joinExperienceResponse: "joinExperienceResponse",
  adminStartExperience: "startExperience",
  experienceReactivity: "experienceReactivity",
  adminStartExperienceError: "startExperienceError",
  adminStartExperienceResponse: "startExperienceResponse",
  adminGetExperienceQuestion: "getExperienceQuestion",
  adminGetExperienceQuestionResponse: "getExperienceQuestionResponse",
  adminSetActiveQuestion: "setActiveQuestion",
  adminSetActiveQuestionResponse: "setActiveQuestionResponse",
  adminSetActiveQuestionError: "setActiveQuestionError",
  adminGetExperienceParticipants: "getExperienceParticipant",
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
    console.log("CONNECTED TO SOCKET", socketClient);
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

export async function joinExperience(
  name: string,
  payload: any,
  setData: (arg: any) => void,
  setPosition: (arg: string) => void,
  setLoading: (arg: boolean) => void
) {
  socketClient = io(socketBaseURL as string);
  socketClient.emit(name, payload, (response: any) => {
    console.log(response, `EMIT RESPONSE FOR ${name}`); // ok
  });

  socketClient.on("joinExperienceResponse", (data: any) => {
    setData(data);
    setPosition("waiting");
    setLocalStorageItem(SAVED_ITEMS.participant, data);
    console.log("EXP RESP", data);
  });
  socketClient.on("joinExperienceError", (error: any) => {
    console.log("EXP ERROR RESP", error);
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
  setData: (arg: any) => void
) {
  setLoading(true);
  socketClient = io(socketBaseURL as string, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
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

  socketClient.on(SOCKET_EVENTS.adminSetActiveQuestionError, (error: any) => {
    console.log(
      `EXP MSG EXP RESP FOR ${SOCKET_EVENTS.adminSetActiveQuestionError}`,
      error
    );
    errorNotifier(error?.message);
    setLoading(false);
    successNotifier("Success");
  });
}

export async function answerExperienceQuestion(
  payload: any,
  setLoading: (arg: boolean) => void
) {
  setLoading(true);
  socketClient = io(socketBaseURL as string, {
    transports: ["websocket"],
  });
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
    (error: any) => {
      console.log(
        `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionResponse}`,
        error
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
