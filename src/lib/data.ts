import { DayMenu, MenuOption, DayOfWeek } from './types';

export const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Helper to create simple options
const opt = (name: string, desc?: string, rec: boolean = false): MenuOption => ({
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name,
    description: desc,
    isRecommended: rec,
});

export const MAIN_MENU: DayMenu[] = [
    {
        day: 'Monday',
        meals: {
            breakfast: {
                type: 'single',
                items: [opt('Kulcha, Channa, Tea')]
            },
            lunch: {
                type: 'single',
                items: [opt('Aloo Palak, Pickle, Chapati')]
            },
            dinner: {
                type: 'alternative',
                items: [
                    opt('Mutter Pulao, Raita', '', true),
                    opt('Channa Pulao, Raita')
                ]
            },
        },
    },
    {
        day: 'Tuesday',
        meals: {
            breakfast: {
                type: 'single',
                items: [opt('Omelette, Paratha, Tea')]
            },
            lunch: {
                type: 'single',
                items: [opt('Daal Mash, Salad, Chapati')]
            },
            dinner: {
                type: 'alternative',
                items: [
                    opt('Chicken Achari, Chapati, Kheer', '', true),
                    opt('Chicken Achari, Chapati, Zarda')
                ]
            },
        },
    },
    {
        day: 'Wednesday',
        meals: {
            breakfast: {
                type: 'both',
                items: [opt('Half & Full Fried Egg, Paratha, Tea')]
            },
            lunch: {
                type: 'single',
                items: [opt('White Rice, Pakora Kari, Pickle')]
            },
            dinner: {
                type: 'alternative',
                items: [
                    opt('Chicken Daleem, Naan/Chapati', '', true),
                    opt('Chicken Channy, Naan/Chapati')
                ]
            },
        },
    },
    {
        day: 'Thursday',
        meals: {
            breakfast: {
                type: 'alternative',
                items: [
                    opt('Scrambled Egg, Paratha, Tea'),
                    opt('Egg Tomato Onion, Paratha, Tea', '', true)
                ]
            },
            lunch: {
                type: 'single',
                items: [opt('Daal Kaddu, Pickle, Chapati')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Biryani, Raita, Cold Drink', '', true)]
            },
        },
    },
    {
        day: 'Friday',
        meals: {
            breakfast: {
                type: 'alternative',
                items: [
                    opt('French Toast, Tea', '', true),
                    opt('Bread, Butter & Jam, Tea')
                ]
            },
            lunch: {
                type: 'alternative',
                items: [
                    opt('White Rice, Daal Mong, Pickle'),
                    opt('White Rice, Black Daal, Pickle')
                ]
            },
            dinner: {
                type: 'single',
                items: [opt('Beef Chapli Kabab, Aloo Bhujia, Chapati', '', true)]
            },
        },
    },
    {
        day: 'Saturday',
        meals: {
            breakfast: {
                type: 'single',
                items: [opt('Aloo Paratha, Yogurt, Tea', '', true)]
            },
            lunch: {
                type: 'single',
                items: [opt('Black Channa, Pickle, Chapati')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Pulao, Raita')]
            },
        },
    },
    {
        day: 'Sunday',
        meals: {
            breakfast: {
                type: 'single',
                items: [opt('Halwa Puri, Channa, Tea', '', true)]
            },
            lunch: {
                type: 'single',
                items: [opt('Seasonal Vegetable, Chapati')]
            },
            dinner: {
                type: 'alternative',
                items: [
                    opt('Chicken Chowmein', '', true),
                    opt('Aloo Cutlets, Daal Mix, Chutney, Chapati')
                ]
            },
        },
    },
];

// NEW: Weekly Ramadan Menu
export const RAMADAN_MENU: DayMenu[] = [
    {
        day: 'Monday',
        meals: {
            sehri: {
                type: 'alternative',
                items: [
                    opt('Murgh Channay, Paratha/Chapati, Yogurt, Tea'),
                    opt('Daal Mash, Paratha/Chapati, Yogurt, Tea')
                ]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Chicken Veg Roll, Pakora Fries, Chutni, Jaame Sheerin')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Manchurian, Chinese Rice, Tea')]
            }
        }
    },
    {
        day: 'Tuesday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('Aloo Anda (Onion), Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Aloo Samosa, Mix Pakora, Chutni, Tang (Lemon)')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Curry, Chapati, Tea')]
            }
        }
    },
    {
        day: 'Wednesday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('White Channa, Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Dahi Balay, Mix Pakora, Chutni, Jaame Sheerin')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Kofta, Chapati, Tea')]
            }
        }
    },
    {
        day: 'Thursday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('Aloo Keema, Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Chicken Veg Roll, Pakora Fries, Chutni, Tang (Orange)')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Biryani, Raita, Cold Drinks')]
            }
        }
    },
    {
        day: 'Friday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('Omelette, Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Channa Chaat, Mix Pakora, Chutni, Rooh Afza')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Daleem, Chapati / Naan, Tea')]
            }
        }
    },
    {
        day: 'Saturday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('Chicken Curry, Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Chicken Veg Samosa, Mix Pakora, Chutni, Tang (Orange)')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Nihari, Naan, Tea')]
            }
        }
    },
    {
        day: 'Sunday',
        meals: {
            sehri: {
                type: 'single',
                items: [opt('Aloo Anda Curry, Paratha/Chapati, Yogurt, Tea')]
            },
            iftari: {
                type: 'single',
                items: [opt('Dates, Lobia & Channa Chaat, Mix Pakora, Chutni, Rooh Afza')]
            },
            dinner: {
                type: 'single',
                items: [opt('Chicken Pulao, Raita, Tea')]
            }
        }
    }
];
