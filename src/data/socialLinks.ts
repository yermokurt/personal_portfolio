export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // React Icons identifier string
  username?: string;
  enabled: boolean;
  label?: string;
}

/**
 * Centralized social links configuration.
 * Update the `url` fields below with your actual profile links.
 * Set `enabled: false` to hide a link without deleting it.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yermokurt",
    icon: "FiGithub",
    username: "yermokurt",
    enabled: true,
    label: "GitHub",
  },
  {
    platform: "Behance",
    url: "https://www.behance.net/kurtyermo1",
    icon: "SiBehance",
    username: "kurtyermo1",
    enabled: true,
    label: "Behance",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/yermokurt",
    icon: "FiLinkedin",
    username: "yermokurt",
    enabled: true,
    label: "LinkedIn",
  },
  {
    platform: "Facebook",
    url: "", // e.g. "https://facebook.com/yourprofile"
    icon: "FiFacebook",
    username: "",
    enabled: false,
    label: "Facebook",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/defnotcollin_/",
    icon: "FiInstagram",
    username: "defnotcollin_",
    enabled: true,
    label: "Instagram",
  },
];

export const contactInfo = {
  email: "yermokurt8@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1mvblvGnWM6G29APJqNxHq_tPrquhhAek/view?usp=sharing",
};

export const getEnabledLinks = () => socialLinks.filter((l) => l.enabled && l.url);
export const getLinkByPlatform = (platform: string) =>
  socialLinks.find((l) => l.platform === platform);

