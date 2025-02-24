export const extractStreamerNickname = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);

    if (hostname.includes("twitch.tv") || hostname.includes("kick.com")) {
      return pathSegments[0]; // Никнейм идёт сразу после домена
    }

    if (hostname.includes("youtube.com")) {
      if (pathSegments[0] === "channel") {
        return "YouTube Channel ID"; // YouTube channel ID
      }
      if (pathSegments[0] === "c" || pathSegments[0] === "user") {
        return pathSegments[1]; // Пользовательский канал
      }
    }

    return "No Name";
  } catch (error) {
    return "Некорректная ссылка";
  }
};
