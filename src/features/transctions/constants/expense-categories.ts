import type { Category } from "../types/category";
import {
  LuUtensils,
  LuCar,
  LuHouse,
  LuShoppingBag,
  LuRepeat,
  LuHeart,
  LuClapperboard,
  LuGift,
} from "react-icons/lu";
import { TbDots } from "react-icons/tb";

export const EXPENSE_CATEGORIES: Category[] = [
  {
    value: "food",
    label: "Food",
    icon: LuUtensils,
  },

  {
    value: "transport",
    label: "Transport",
    icon: LuCar,
  },

  {
    value: "housing",
    label: "Housing",
    icon: LuHouse,
  },

  {
    value: "shopping",
    label: "Shopping",
    icon: LuShoppingBag,
  },
  {
    value: "subscriptions",
    label: "Subscriptions",
    icon: LuRepeat,
  },

  {
    value: "health",
    label: "Health",
    icon: LuHeart,
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: LuClapperboard,
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
