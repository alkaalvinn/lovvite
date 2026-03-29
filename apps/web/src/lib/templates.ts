import { z } from "zod";
import type { TemplateCategory } from "@lovvite/types";
import { ElegantWedding } from "../components/templates/ElegantWedding";
import { BirthdayBash } from "../components/templates/BirthdayBash";
import { AnniversaryGold } from "../components/templates/AnniversaryGold";
import { GraduationCap } from "../components/templates/GraduationCap";
import { GardenParty } from "../components/templates/GardenParty";
import { BabyShower } from "../components/templates/BabyShower";

export interface TemplateDefinitionFull {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail: string;
  component: React.ComponentType<{ data: Record<string, unknown>; isPreview?: boolean }>;
  defaultData: Record<string, unknown>;
  schema: z.ZodSchema;
}

export const TEMPLATES: TemplateDefinitionFull[] = [
  ElegantWedding,
  BirthdayBash,
  AnniversaryGold,
  GraduationCap,
  GardenParty,
  BabyShower,
];

export function getTemplate(id: string): TemplateDefinitionFull | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
