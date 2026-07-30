import type { Category } from "../types/category";
import { LuWallet, LuGift } from "react-icons/lu";
import { TbDots } from "react-icons/tb";

export const INCOME_CATEGORIES: Category[] = [
  {
    value: "salary",
    label: "Salary",
    icon: LuWallet,
  },
  {
    value: "gifts",
    label: "Gifts",
    icon: LuGift,
  },
  {
    value: "other",
    label: "Other",
    icon: TbDots,
  },
];
