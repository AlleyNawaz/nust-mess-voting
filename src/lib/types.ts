export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'sehri' | 'iftari';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface MenuOption {
    id: string;
    name: string;
    description?: string; // e.g. "with Raita"
    isRecommended?: boolean;
}

// NEW: Richer structure for Menu Logic
export type MenuLogicType = 'both' | 'alternative' | 'single';

export interface LogicalMenu {
    type: MenuLogicType;
    items: MenuOption[];
}

export interface DayMenu {
    day: DayOfWeek;
    meals: {
        [key in MealType]?: LogicalMenu;
    };
}

export interface User {
    fullName: string;
    cmsId: string;
    batch: string;
    department: string;
    email: string;
}

export interface VoteEntry {
    day: DayOfWeek;
    meal: MealType;
    selectedOptionId: string; // 'custom' if custom
    customOptionValue?: string;

    // NEW: Checkbox preferences
    wantsBoth?: boolean;  // For "I want both options"
    wantsExtra?: boolean; // For "I want extra serving"
}

export interface VoteSession {
    user: User;
    mainMenuVotes: VoteEntry[];
    ramadanMenuVotes: VoteEntry[];
    completedMain: boolean;
    completedRamadan: boolean;
    phase: 'main' | 'ramadan' | 'completed';
}
