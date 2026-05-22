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
    category: 'engagement',
  },
  {
    id: 'forms-slayer',
    name: "Form's Slayer",
    description: 'Complete 8/2 Forms',
    reward: 90,
    progress: 60,
    iconEmoji: '📝',
    category: 'engagement',
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    description: 'Try 8/3 categories',
    reward: 90,
    progress: 40,
    iconEmoji: '🗺️',
    category: 'engagement',
  },
  {
    id: 'streak-builder',
    name: 'Streak Builder',
    description: 'Login for 8/7 days',
    reward: 70,
    progress: 85,
    iconEmoji: '🔥',
    category: 'engagement',
  },
  {
    id: 'key-holder',
    name: 'Key Holder',
    description: 'Unlock a new app',
    reward: 50,
    progress: 0,
    iconEmoji: '🗝️',
    category: 'engagement',
  },

  // Milestone
  {
    id: 'popular',
    name: 'Popular',
    description: 'Invite a friend',
    reward: 50,
    iconEmoji: '👥',
    category: 'milestone',
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Finish 8/3 tasks in a row',
    reward: 80,
    iconEmoji: '⚡',
    category: 'milestone',
  },
  {
    id: 'cashout',
    name: 'Cashout',
    description: 'First withdrawal',
    reward: 50,
    iconEmoji: '💸',
    category: 'milestone',
  },
  {
    id: 'big-earner',
    name: 'Big Earner',
    description: 'Withdraw $50',
    reward: 100,
    iconEmoji: '💰',
    category: 'milestone',
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    description: 'Withdraw $100',
    reward: 200,
    iconEmoji: '🎰',
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
    category: 'social',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Follow us there!',
    reward: 25,
    completed: true,
    iconEmoji: '🎵',
    category: 'social',
  },
  {
    id: 'x',
    name: 'X',
    description: 'Follow us there!',
    reward: 25,
    completed: true,
    iconEmoji: '✖️',
    category: 'social',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Subscribe!',
    reward: 25,
    completed: true,
    iconEmoji: '📺',
    category: 'social',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Join community!',
    reward: 25,
    completed: true,
    iconEmoji: '💬',
    category: 'social',
  },
];

export const stats = {
  tickets: 150,
  questsCompleted: 5,
};
