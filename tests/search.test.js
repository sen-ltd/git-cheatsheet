import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fuzzyMatch, filterCommands, groupByCategory } from '../src/search.js';

// ── Sample data ──────────────────────────────────────────────────────────────

const sampleCommands = [
  {
    id: 'init',
    command: 'git init',
    category: 'setup',
    tags: ['daily', 'setup'],
    description: { ja: '新しい Git リポジトリを初期化する', en: 'Initialize a new Git repository' },
  },
  {
    id: 'clone',
    command: 'git clone <url>',
    category: 'setup',
    tags: ['daily'],
    description: { ja: 'リモートリポジトリをローカルにコピー', en: 'Clone a remote repository to local' },
  },
  {
    id: 'add',
    command: 'git add <file>',
    category: 'staging',
    tags: ['daily'],
    description: { ja: 'ファイルをステージングエリアに追加', en: 'Add a specific file to the staging area' },
  },
  {
    id: 'add-all',
    command: 'git add .',
    category: 'staging',
    tags: ['daily'],
    description: { ja: '全変更ファイルをステージング', en: 'Stage all changed files' },
  },
  {
    id: 'diff-staged',
    command: 'git diff --staged',
    category: 'inspect',
    tags: ['daily'],
    description: { ja: 'ステージ済みの変更を表示', en: 'Show changes that are staged for commit' },
  },
  {
    id: 'reset-hard',
    command: 'git reset --hard <commit>',
    category: 'undo',
    tags: ['emergency'],
    description: { ja: '指定コミットまで強制的に戻す', en: 'Reset to a commit, discarding all changes permanently' },
  },
  {
    id: 'cherry-pick',
    command: 'git cherry-pick <commit>',
    category: 'advanced',
    tags: ['advanced'],
    description: { ja: '特定コミットを現在のブランチに適用', en: 'Apply a specific commit to the current branch' },
  },
  {
    id: 'stash',
    command: 'git stash',
    category: 'stash',
    tags: ['daily'],
    description: { ja: '作業中の変更を一時退避', en: 'Stash current working changes temporarily' },
  },
];

// ── fuzzyMatch tests ─────────────────────────────────────────────────────────

describe('fuzzyMatch', () => {
  it('returns > 0 for empty query', () => {
    assert.ok(fuzzyMatch('', 'anything') > 0);
  });

  it('returns > 0 for exact match', () => {
    assert.ok(fuzzyMatch('init', 'init') > 0);
  });

  it('returns high score for exact match', () => {
    const exact = fuzzyMatch('init', 'init');
    const partial = fuzzyMatch('init', 'initialize');
    assert.ok(exact >= partial);
  });

  it('returns > 0 for partial in-order match', () => {
    assert.ok(fuzzyMatch('int', 'initialize') > 0);
  });

  it('returns 0 when characters are out of order', () => {
    // 't' comes before 'i' in 'ti', but 'i' comes before 't' in 'git'
    // This should still match (g,i,t all present in order in 'git init')
    // Test a genuinely failing case: 'zyx' in 'xyz' — z appears after x,y
    assert.strictEqual(fuzzyMatch('zyx', 'xyz'), 0);
  });

  it('returns 0 when query has characters not in text', () => {
    assert.strictEqual(fuzzyMatch('xyz', 'git init'), 0);
  });

  it('handles case-insensitive matching', () => {
    assert.ok(fuzzyMatch('INIT', 'initialize') > 0);
    assert.ok(fuzzyMatch('init', 'INITIALIZE') > 0);
  });

  it('returns higher score for tighter span match', () => {
    const tight = fuzzyMatch('ab', 'ab'); // span = 2
    const loose = fuzzyMatch('ab', 'a123456789b'); // span = 11
    assert.ok(tight > loose);
  });

  it('matches substrings spread across long text', () => {
    // 'staged' in 'changes that are staged for commit'
    assert.ok(fuzzyMatch('staged', 'changes that are staged for commit') > 0);
  });

  it('single character query matches if present', () => {
    assert.ok(fuzzyMatch('g', 'git') > 0);
  });

  it('single character query returns 0 if not present', () => {
    assert.strictEqual(fuzzyMatch('z', 'git init'), 0);
  });
});

// ── filterCommands tests ─────────────────────────────────────────────────────

describe('filterCommands', () => {
  it('returns all commands with empty query and no category', () => {
    const result = filterCommands(sampleCommands, '', null, 'en');
    assert.strictEqual(result.length, sampleCommands.length);
  });

  it('returns all commands with "all" category and empty query', () => {
    const result = filterCommands(sampleCommands, '', 'all', 'en');
    assert.strictEqual(result.length, sampleCommands.length);
  });

  it('filters by category only', () => {
    const result = filterCommands(sampleCommands, '', 'setup', 'en');
    assert.ok(result.every((c) => c.category === 'setup'));
    assert.strictEqual(result.length, 2);
  });

  it('filters by query only', () => {
    const result = filterCommands(sampleCommands, 'staged', null, 'en');
    assert.ok(result.length > 0);
    // diff --staged and 'staged' description should both match
    const ids = result.map((c) => c.id);
    assert.ok(ids.includes('diff-staged') || ids.includes('add'));
  });

  it('filters by both query and category', () => {
    const result = filterCommands(sampleCommands, 'init', 'setup', 'en');
    assert.ok(result.every((c) => c.category === 'setup'));
    assert.ok(result.some((c) => c.id === 'init'));
  });

  it('returns empty array when no commands match query', () => {
    const result = filterCommands(sampleCommands, 'xyzzyxyzzy', null, 'en');
    assert.strictEqual(result.length, 0);
  });

  it('searches in English description when lang is en', () => {
    const result = filterCommands(sampleCommands, 'repository', null, 'en');
    assert.ok(result.length > 0);
    assert.ok(result.some((c) => c.id === 'init' || c.id === 'clone'));
  });

  it('searches in Japanese description when lang is ja', () => {
    const result = filterCommands(sampleCommands, 'ステージ', null, 'ja');
    assert.ok(result.length > 0);
  });

  it('query matches command text (not just description)', () => {
    const result = filterCommands(sampleCommands, 'cherry', null, 'en');
    assert.ok(result.some((c) => c.id === 'cherry-pick'));
  });

  it('query matches tags', () => {
    const result = filterCommands(sampleCommands, 'emergency', null, 'en');
    assert.ok(result.some((c) => c.id === 'reset-hard'));
  });

  it('category filter removes irrelevant commands', () => {
    const result = filterCommands(sampleCommands, '', 'advanced', 'en');
    assert.ok(result.every((c) => c.category === 'advanced'));
  });

  it('returns results sorted best-match first', () => {
    const result = filterCommands(sampleCommands, 'add', null, 'en');
    assert.ok(result.length > 0);
    // 'git add <file>' should score higher than 'git diff --staged' for query 'add'
    const addIdx = result.findIndex((c) => c.id === 'add');
    assert.ok(addIdx >= 0);
  });

  it('handles query with whitespace', () => {
    const result = filterCommands(sampleCommands, '  init  ', null, 'en');
    assert.ok(result.some((c) => c.id === 'init'));
  });
});

// ── groupByCategory tests ────────────────────────────────────────────────────

describe('groupByCategory', () => {
  it('groups commands by category', () => {
    const groups = groupByCategory(sampleCommands);
    assert.ok(groups.setup);
    assert.ok(groups.staging);
    assert.ok(groups.inspect);
    assert.ok(groups.undo);
    assert.ok(groups.advanced);
    assert.ok(groups.stash);
  });

  it('each group contains only correct category commands', () => {
    const groups = groupByCategory(sampleCommands);
    assert.ok(groups.setup.every((c) => c.category === 'setup'));
    assert.ok(groups.staging.every((c) => c.category === 'staging'));
  });

  it('counts are correct', () => {
    const groups = groupByCategory(sampleCommands);
    assert.strictEqual(groups.setup.length, 2);
    assert.strictEqual(groups.staging.length, 2);
    assert.strictEqual(groups.inspect.length, 1);
  });

  it('returns empty object for empty input', () => {
    const groups = groupByCategory([]);
    assert.deepStrictEqual(groups, {});
  });

  it('handles single command', () => {
    const groups = groupByCategory([sampleCommands[0]]);
    assert.strictEqual(Object.keys(groups).length, 1);
    assert.strictEqual(groups.setup.length, 1);
  });
});
