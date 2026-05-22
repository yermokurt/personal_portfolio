"use client";

import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiMail, FiExternalLink } from "react-icons/fi";
import { SiBehance } from "react-icons/si";
import { SocialLink } from "@/data/socialLinks";
import { cn } from "@/lib/utils";

interface SocialLinkComponentProps {
  link: SocialLink;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiMail,
  SiBehance,
  FiExternalLink,
};

const sizeMap = {
  sm: { icon: 16, container: "w-8 h-8" },
  md: { icon: 20, container: "w-10 h-10" },
  lg: { icon: 22, container: "w-12 h-12" },
};

export default function SocialLinkComponent({
  link,
  size = "md",
  showLabel = false,
  className,
}: SocialLinkComponentProps) {
  const Icon = iconMap[link.icon] || FiExternalLink;
  const { icon: iconSize, container } = sizeMap[size];
  const isDisabled = !link.enabled || !link.url;

  if (isDisabled) {
    return (
      <div
        title={`${link.platform} — not configured`}
        className={cn(
          "flex items-center gap-2 opacity-20 cursor-not-allowed",
          className
        )}
      >
        <div
          className={cn(
            container,
            "flex items-center justify-center rounded-full border border-white/10 bg-white/5"
          )}
        >
          <Icon size={iconSize} className="text-white/40" />
        </div>
        {showLabel && (
          <span className="text-sm text-white/30">{link.label}</span>
        )}
      </div>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${link.platform}`}
      className={cn(
        "group flex items-center gap-2 transition-all duration-300",
        className
      )}
    >
      <div
        className={cn(
          container,
          "flex items-center justify-center rounded-full border border-white/10 bg-white/5",
          "group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300"
        )}
      >
        <Icon
          size={iconSize}
          className="text-white/60 group-hover:text-accent transition-colors duration-300"
        />
      </div>
      {showLabel && (
        <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300">
          {link.label}
        </span>
      )}
    </a>
  );
}
