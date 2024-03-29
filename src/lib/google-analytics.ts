import { isLocalhost } from '../serviceWorker';
import { GoogleAnalyticsEvents, SocialNames } from '../types';

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

type EventScrollClick = {
  event: GoogleAnalyticsEvents.SCROLL_CLICK;
  linkText: string;
};

type EventSocialHover = {
  event: GoogleAnalyticsEvents.SOCIAL_HOVER;
  socialName: SocialNames;
  hoverText: string;
  hoverUrl: string;
};

type EventSocialClick = {
  event: GoogleAnalyticsEvents.SOCIAL_CLICK;
  socialName: SocialNames;
  linkText: string;
  linkUrl: string;
};

type EventProjectHover = {
  event: GoogleAnalyticsEvents.PROJECT_HOVER;
  projectTitle: string;
  hoverText: string;
  hoverUrl: string;
};

type EventProjectClick = {
  event: GoogleAnalyticsEvents.PROJECT_CLICK;
  projectTitle: string;
  linkText: string;
  linkUrl: string;
};

type EventProjectInfoHover = {
  event: GoogleAnalyticsEvents.PROJECT_INFO_HOVER;
  projectTitle: string;
  hoverText: string;
};

type EventGifAutoPlayStart = {
  event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_START;
  projectTitle: string;
  gifLoadTime: number;
};

type EventGifAutoPlayCancel = {
  event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_CANCEL;
  projectTitle: string;
  gifCancelTime: number;
  gifCancelProgress: number;
};

export function trackEvent(
  data:
    | EventScrollClick
    | EventSocialHover
    | EventSocialClick
    | EventProjectHover
    | EventProjectClick
    | EventProjectInfoHover
    | EventGifAutoPlayStart
    | EventGifAutoPlayCancel,
  forced?: boolean
) {
  if (isLocalhost && !forced) {
    return;
  }

  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  window.dataLayer.push(data);
}
