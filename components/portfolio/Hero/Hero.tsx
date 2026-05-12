"use client";

import { HeroStatement } from "./HeroStatement";
import { HeroIndex } from "./HeroIndex";
import { HeroSplit } from "./HeroSplit";
import { HeroEditorial } from "./HeroEditorial";

export type HeroVariant = "statement" | "index" | "split" | "editorial";

interface HeroProps {
  variant?: HeroVariant;
  scrollTo: (id: string) => void;
}

export const Hero = ({ variant = "index", scrollTo }: HeroProps) => {
  if (variant === "index") return <HeroIndex scrollTo={scrollTo} />;
  if (variant === "split") return <HeroSplit scrollTo={scrollTo} />;
  if (variant === "editorial") return <HeroEditorial scrollTo={scrollTo} />;
  return <HeroStatement scrollTo={scrollTo} />;
};
