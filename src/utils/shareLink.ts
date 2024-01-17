import { errorNotifier, successNotifier } from "@/app/providers";

export const shareLink = (url: string, text?: string, title?: string): void => {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => successNotifier("Sharing..."))
      .catch(() => errorNotifier("Error sharing"));
  } else {
    errorNotifier("Your system doesn't support sharing");
  }
};
