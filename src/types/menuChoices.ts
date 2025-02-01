type MenuChoice = number | null;
export type MenuChoiceWeek = [MenuChoice, ...MenuChoice[]] & { length: 5 };
