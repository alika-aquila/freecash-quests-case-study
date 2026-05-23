export type QuestCategory = 'engagement' | 'milestone' | 'social';

export interface Quest {
  id: string;
  name: string;
  description: string;
  reward: number;
  progress?: number;
  completed?: boolean;
  iconEmoji: string;
  iconSrc?: string;
  /** Path to a static image for the icon (overrides emoji when present). */
  iconImage?: string;
  /** Path to a short video played on card hover. */
  hoverVideo?: string;
  /** Path to a video played inside the open quest drawer. */
  drawerVideo?: string;
  category: QuestCategory;
}

export const quests: Quest[] = [
  // Engagement
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Complete 1/4 tasks',
    reward: 100,
    progress: 25,
    iconEmoji: '🧭',
    iconImage: '/quest-asset-explorer.png',
    hoverVideo: '/quest-asset-explorer_anim_hover.mp4',
    drawerVideo: '/quest-asset-explorer_anim_open.mp4',
    category: 'engagement',
  },
  {
    id: 'forms-slayer',
    name: "Form's Slayer",
    description: 'Complete 2/3 forms',
    reward: 90,
    progress: 67,
    iconEmoji: '📝',
    iconImage: '/quest-asset-forms.png',
    hoverVideo: '/quest-asset-forms_hover.mp4',
    drawerVideo: '/quest-asset-forms_open.mp4',
    category: 'engagement',
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    description: 'Try 1/3 Categories',
    reward: 90,
    progress: 33,
    iconEmoji: '🗺️',
    iconImage: '/quest-asset-adventurer.png',
    hoverVideo: '/quest-asset-adventurer_hover.mp4',
    drawerVideo: '/quest-asset-adventurer_open.mp4',
    category: 'engagement',
  },
  {
    id: 'streak-builder',
    name: 'Streak Builder',
    description: 'Login for 6/7 days',
    reward: 70,
    progress: 86,
    iconEmoji: '🔥',
    iconImage: '/quest-asset-streak.png',
    hoverVideo: '/quest-asset-streak_hover.mp4',
    drawerVideo: '/quest-asset-streak_open.mp4',
    category: 'engagement',
  },
  {
    id: 'key-holder',
    name: 'Key Holder',
    description: 'Unlock a new app',
    reward: 50,
    progress: 0,
    iconEmoji: '🗝️',
    iconImage: '/quest-asset-key.png',
    hoverVideo: '/quest-asset-key_hover.mp4',
    drawerVideo: '/quest-asset-key_open.mp4',
    category: 'engagement',
  },

  // Milestone
  {
    id: 'popular',
    name: 'Popular',
    description: 'Invite a friend',
    reward: 50,
    iconEmoji: '👥',
    iconImage: '/quest-asset-popular.png',
    hoverVideo: '/quest-asset-popular_hover.mp4',
    drawerVideo: '/quest-asset-popular_open.mp4',
    category: 'milestone',
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Finish 0/3 tasks in a row',
    reward: 80,
    iconEmoji: '⚡',
    iconImage: '/quest-asset-speed.png',
    hoverVideo: '/quest-asset-speed_hover.mp4',
    drawerVideo: '/quest-asset-speed_open.mp4',
    category: 'milestone',
  },
  {
    id: 'cashout',
    name: 'Cashout',
    description: 'First withdrawal',
    reward: 50,
    iconEmoji: '💸',
    iconImage: '/quest-asset-cashout.png',
    hoverVideo: '/quest-asset-cashout_hover.mp4',
    drawerVideo: '/quest-asset-cashout_open.mp4',
    category: 'milestone',
  },
  {
    id: 'big-earner',
    name: 'Big Earner',
    description: 'Withdraw $50',
    reward: 100,
    iconEmoji: '💰',
    iconImage: '/quest-asset-earner.png',
    hoverVideo: '/quest-asset-earner_hover.mp4',
    category: 'milestone',
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    description: 'Withdraw $100',
    reward: 200,
    iconEmoji: '🎰',
    iconImage: '/quest-asset-roller.png',
    category: 'milestone',
  },

  // Social
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Follow us there!',
    reward: 25,
    completed: true,
    iconEmoji: '📸',
    iconImage: '/quest-asset-instagram.png',
    category: 'social',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Follow us there!',
    reward: 25,
    completed: true,
    iconEmoji: '🎵',
    iconImage: '/quest-asset-tiktok.png',
    category: 'social',
  },
  {
    id: 'x',
    name: 'X',
    description: 'Follow us there!',
    reward: 25,
    completed: true,
    iconEmoji: '✖️',
    iconImage: '/quest-asset-x.png',
    category: 'social',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Subscribe!',
    reward: 25,
    completed: true,
    iconEmoji: '📺',
    iconImage: '/quest-asset-youtube.png',
    category: 'social',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Join community!',
    reward: 25,
    completed: true,
    iconEmoji: '💬',
    iconImage: '/quest-asset-discord.png',
    category: 'social',
  },
];

export const stats = {
  tickets: 150,
  questsCompleted: 5,
};
