/**
 * i18n.js — UI string translations for git-cheatsheet
 */

export const UI = {
  ja: {
    title: 'Git チートシート',
    subtitle: '60+ のコマンドをカテゴリ別・検索付きで参照',
    searchPlaceholder: 'コマンドを検索… (例: staged, reset, rebase)',
    categoryAll: 'すべて',
    dailySection: '毎日使うコマンド',
    dailySectionDesc: '開発者が日常的に使う頻出コマンド',
    copyButton: 'コピー',
    copiedButton: 'コピー済！',
    exampleLabel: '実行例',
    noResults: '該当するコマンドが見つかりません',
    noResultsHint: '別のキーワードで検索してみてください',
    themeToggle: 'ライトモード',
    themeToggleDark: 'ダークモード',
    langToggle: 'English',
    commandCount: 'コマンド',
  },
  en: {
    title: 'Git Cheatsheet',
    subtitle: '60+ commands organized by category with fuzzy search',
    searchPlaceholder: 'Search commands… (e.g. staged, reset, rebase)',
    categoryAll: 'All',
    dailySection: 'Daily Workflow',
    dailySectionDesc: 'Commands developers use every single day',
    copyButton: 'Copy',
    copiedButton: 'Copied!',
    exampleLabel: 'Example',
    noResults: 'No commands found',
    noResultsHint: 'Try a different search term',
    themeToggle: 'Light mode',
    themeToggleDark: 'Dark mode',
    langToggle: '日本語',
    commandCount: 'commands',
  },
};

/**
 * Get the UI string bundle for the given language.
 * Falls back to English for unknown languages.
 * @param {string} lang
 * @returns {Object}
 */
export function getUI(lang) {
  return UI[lang] || UI.en;
}
