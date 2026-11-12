export type ScreenId = 'intro' | 'memes' | 'research' | 'final';

export interface CatMeme {
  id: string;
  image: string;
  caption: string;
  tag: string;
  subtext?: string;
}

export interface TerminalLog {
  id: string;
  text: string;
  status?: 'pending' | 'success' | 'info';
}
