import { CatMeme, ScreenId } from '../types';

export const SCREENS: ScreenId[] = ['intro', 'memes', 'research', 'final'];

export const BASE_MEMES: CatMeme[] = [
  {
    id: 'meme-1',
    image: './src/assets/images/cat_bug_laptop_1794478835297.jpg',
    caption: 'When you fix one bug and discover 17 new ones.',
    tag: 'Bug Report #404',
    subtext: 'The bugs are friendly, but they do not speak python.'
  },
  {
    id: 'meme-2',
    image: './src/assets/images/cat_sleepy_code_1794478853016.jpg',
    caption: 'Me pretending I understand the code I wrote yesterday.',
    tag: 'Git Blame',
    subtext: 'Who wrote this at 3 AM? Oh wait, it was me.'
  },
  {
    id: 'meme-3',
    image: './src/assets/images/cat_ai_disagrees_1794478852618.jpg',
    caption: 'AI said the code is correct. The computer disagrees.',
    tag: 'SyntaxError',
    subtext: 'The compiler took personal offense to line 42.'
  }
];

export const EXTRA_MEMES: CatMeme[] = [
  {
    id: 'meme-extra-1',
    image: './src/assets/images/cat_intro_flowers_1794478833523.jpg',
    caption: 'git commit -m "fixed it for real this time i promise"',
    tag: 'Version Control',
    subtext: 'Narrator: It was not, in fact, fixed for real.'
  },
  {
    id: 'meme-extra-2',
    image: './src/assets/images/cat_scientist_glasses_1794478834869.jpg',
    caption: 'Cat.sleep() is a critical blocking dependency.',
    tag: 'System Architecture',
    subtext: 'Cannot compile until belly rubs are delivered.'
  },
  {
    id: 'meme-extra-3',
    image: './src/assets/images/cat_flowers_final_1794478836081.jpg',
    caption: 'Replacing 200 lines of complex logic with a single cup of tea.',
    tag: 'Refactor #99',
    subtext: 'Sometimes the best algorithm is just taking a break.'
  }
];

export function getNextScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  if (index >= 0 && index < SCREENS.length - 1) {
    return SCREENS[index + 1];
  }
  return SCREENS[0];
}

export function getPrevScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  if (index > 0) {
    return SCREENS[index - 1];
  }
  return SCREENS[0];
}

export function getScreenIndex(screen: ScreenId): number {
  return SCREENS.indexOf(screen);
}

export function getProgressPercentage(screen: ScreenId): number {
  const index = getScreenIndex(screen);
  return Math.round(((index + 1) / SCREENS.length) * 100);
}

export function getNextBonusMeme(currentIndex: number): { meme: CatMeme; nextIndex: number } {
  const nextIdx = (currentIndex + 1) % EXTRA_MEMES.length;
  return {
    meme: EXTRA_MEMES[nextIdx],
    nextIndex: nextIdx
  };
}

export const ARABIC_DUA_MAIN = "اللهم اجعل بيننا خيرًا، وارزقنا حسن النية، وطيب الكلام، وجميل الأثر.";
export const ARABIC_DUA_SUB = "وأسأل الله أن يكتب لنا الخير أينما كان.";
export const PERSONAL_MESSAGE = "I just want good things between us. ❤️";

export const TERMINAL_SIGNATURE = [
  "$ research.exe",
  "",
  "Missing piece: FOUND",
  "Intentions: Pure",
  "Bugs: Still debugging",
  "Flowers: 100%",
  "Cats: Unlimited 🐱",
  "",
  "Status: Hoping for good things."
];
