import { errorNotifier, successNotifier } from "@/app/providers";

export const handleCopyLink = async (
  url: string
): Promise<void> => {
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      successNotifier('Link copied successfully');
    });
  } else {
    errorNotifier('Your system doesnt support this feature');
  }
};
