export const CATEGORIES = [
  { id: 'setup', name: { ja: 'セットアップ', en: 'Setup' } },
  { id: 'staging', name: { ja: 'ステージング・コミット', en: 'Staging & Commit' } },
  { id: 'branching', name: { ja: 'ブランチ', en: 'Branching' } },
  { id: 'merging', name: { ja: 'マージ・リベース', en: 'Merging & Rebasing' } },
  { id: 'remote', name: { ja: 'リモート', en: 'Remote' } },
  { id: 'inspect', name: { ja: '履歴・状態', en: 'Inspecting' } },
  { id: 'undo', name: { ja: '取り消し', en: 'Undoing' } },
  { id: 'stash', name: { ja: 'スタッシュ', en: 'Stashing' } },
  { id: 'tag', name: { ja: 'タグ', en: 'Tags' } },
  { id: 'advanced', name: { ja: '高度な操作', en: 'Advanced' } },
];

export const DAILY_COMMAND_IDS = [
  'status', 'add', 'add-all', 'commit', 'commit-m', 'push', 'pull',
  'branch', 'switch', 'switch-c', 'log-oneline', 'diff', 'stash', 'stash-pop',
];

export const COMMANDS = [
  // ── Setup ──────────────────────────────────────────────────────────────────
  {
    id: 'init',
    command: 'git init',
    category: 'setup',
    tags: ['daily', 'setup'],
    description: {
      ja: '新しい Git リポジトリを初期化する',
      en: 'Initialize a new Git repository',
    },
    example: '$ git init\nInitialized empty Git repository in /path/to/.git/',
  },
  {
    id: 'clone',
    command: 'git clone <url>',
    category: 'setup',
    tags: ['daily'],
    description: {
      ja: 'リモートリポジトリをローカルにコピー',
      en: 'Clone a remote repository to local',
    },
    example: '$ git clone https://github.com/user/repo.git',
  },
  {
    id: 'clone-depth',
    command: 'git clone --depth 1 <url>',
    category: 'setup',
    tags: ['occasional'],
    description: {
      ja: '最新コミットのみのシャロークローン（高速）',
      en: 'Shallow clone with only the latest commit (faster)',
    },
    example: '$ git clone --depth 1 https://github.com/user/repo.git',
  },
  {
    id: 'config-name',
    command: 'git config user.name "<name>"',
    category: 'setup',
    tags: ['setup'],
    description: {
      ja: 'コミット用のユーザー名を設定',
      en: 'Set user name for commits',
    },
    example: '$ git config user.name "Alice"',
  },
  {
    id: 'config-email',
    command: 'git config user.email "<email>"',
    category: 'setup',
    tags: ['setup'],
    description: {
      ja: 'コミット用のメールアドレスを設定',
      en: 'Set email address for commits',
    },
    example: '$ git config user.email "alice@example.com"',
  },
  {
    id: 'config-global',
    command: 'git config --global <key> <value>',
    category: 'setup',
    tags: ['setup'],
    description: {
      ja: 'グローバル設定を変更（全リポジトリに適用）',
      en: 'Set a global config value (applies to all repos)',
    },
    example: '$ git config --global core.editor "vim"',
  },
  {
    id: 'config-list',
    command: 'git config --list',
    category: 'setup',
    tags: ['occasional'],
    description: {
      ja: '現在の設定一覧を表示',
      en: 'List all current config settings',
    },
    example: '$ git config --list\nuser.name=Alice\nuser.email=alice@example.com',
  },

  // ── Staging & Commit ───────────────────────────────────────────────────────
  {
    id: 'status',
    command: 'git status',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: '作業ツリーの状態（変更・ステージ）を確認',
      en: 'Show working tree status (changes and staged files)',
    },
    example: '$ git status\nOn branch main\nChanges not staged for commit:\n  modified: README.md',
  },
  {
    id: 'add',
    command: 'git add <file>',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: '指定ファイルをステージングエリアに追加',
      en: 'Add a specific file to the staging area',
    },
    example: '$ git add README.md',
  },
  {
    id: 'add-all',
    command: 'git add .',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: '全変更ファイルをステージング',
      en: 'Stage all changed files in the current directory',
    },
    example: '$ git add .',
  },
  {
    id: 'add-patch',
    command: 'git add -p',
    category: 'staging',
    tags: ['occasional'],
    description: {
      ja: '変更を対話的にハンク単位でステージ',
      en: 'Interactively stage changes hunk by hunk',
    },
    example: '$ git add -p\n@@ -1,3 +1,4 @@ ...\nStage this hunk [y,n,q,a,d,/,e,?]?',
  },
  {
    id: 'commit',
    command: 'git commit',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: 'エディタを開いてコミット',
      en: 'Commit staged changes (opens editor for message)',
    },
    example: '$ git commit',
  },
  {
    id: 'commit-m',
    command: 'git commit -m "<message>"',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: 'メッセージを指定してコミット',
      en: 'Commit with an inline message',
    },
    example: '$ git commit -m "feat: add login page"',
  },
  {
    id: 'commit-am',
    command: 'git commit -am "<message>"',
    category: 'staging',
    tags: ['daily'],
    description: {
      ja: 'tracked ファイルの変更を全てステージして即コミット',
      en: 'Stage all tracked changes and commit with message',
    },
    example: '$ git commit -am "fix: typo in README"',
  },
  {
    id: 'commit-amend',
    command: 'git commit --amend',
    category: 'staging',
    tags: ['occasional'],
    description: {
      ja: '直前のコミットを修正（メッセージまたは内容）',
      en: 'Amend the last commit (message or contents)',
    },
    example: '$ git commit --amend -m "fix: corrected message"',
  },
  {
    id: 'commit-empty',
    command: 'git commit --allow-empty -m "<message>"',
    category: 'staging',
    tags: ['occasional'],
    description: {
      ja: '変更なしで空コミットを作成',
      en: 'Create an empty commit without any file changes',
    },
    example: '$ git commit --allow-empty -m "chore: trigger CI"',
  },

  // ── Branching ─────────────────────────────────────────────────────────────
  {
    id: 'branch',
    command: 'git branch',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: 'ローカルブランチの一覧を表示',
      en: 'List local branches',
    },
    example: '$ git branch\n* main\n  feature/login',
  },
  {
    id: 'branch-all',
    command: 'git branch -a',
    category: 'branching',
    tags: ['occasional'],
    description: {
      ja: 'ローカルとリモートの全ブランチを表示',
      en: 'List all local and remote branches',
    },
    example: '$ git branch -a\n* main\n  remotes/origin/main\n  remotes/origin/feature/login',
  },
  {
    id: 'branch-new',
    command: 'git branch <name>',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: '新しいブランチを作成（切り替えなし）',
      en: 'Create a new branch without switching to it',
    },
    example: '$ git branch feature/login',
  },
  {
    id: 'branch-d',
    command: 'git branch -d <name>',
    category: 'branching',
    tags: ['occasional'],
    description: {
      ja: 'マージ済みブランチを削除',
      en: 'Delete a merged branch (safe delete)',
    },
    example: '$ git branch -d feature/login',
  },
  {
    id: 'branch-D',
    command: 'git branch -D <name>',
    category: 'branching',
    tags: ['occasional'],
    description: {
      ja: 'ブランチを強制削除（マージ未済でも削除）',
      en: 'Force delete a branch (even if not merged)',
    },
    example: '$ git branch -D feature/wip',
  },
  {
    id: 'switch',
    command: 'git switch <branch>',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: '指定ブランチに切り替え',
      en: 'Switch to an existing branch',
    },
    example: '$ git switch main',
  },
  {
    id: 'switch-c',
    command: 'git switch -c <name>',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: '新しいブランチを作成して切り替え',
      en: 'Create and switch to a new branch',
    },
    example: '$ git switch -c feature/auth',
  },
  {
    id: 'checkout',
    command: 'git checkout <branch>',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: 'ブランチを切り替え（旧コマンド）',
      en: 'Switch branches (legacy command)',
    },
    example: '$ git checkout main',
  },
  {
    id: 'checkout-b',
    command: 'git checkout -b <name>',
    category: 'branching',
    tags: ['daily'],
    description: {
      ja: '新しいブランチを作成して切り替え（旧コマンド）',
      en: 'Create and switch to a new branch (legacy command)',
    },
    example: '$ git checkout -b feature/auth',
  },

  // ── Merging & Rebasing ────────────────────────────────────────────────────
  {
    id: 'merge',
    command: 'git merge <branch>',
    category: 'merging',
    tags: ['daily'],
    description: {
      ja: '指定ブランチを現在のブランチにマージ',
      en: 'Merge specified branch into current branch',
    },
    example: '$ git merge feature/auth\nFast-forward\n auth.js | 40 +++++',
  },
  {
    id: 'merge-noff',
    command: 'git merge --no-ff <branch>',
    category: 'merging',
    tags: ['occasional'],
    description: {
      ja: 'Fast-forward を禁止してマージコミットを強制作成',
      en: 'Merge with a merge commit (no fast-forward)',
    },
    example: '$ git merge --no-ff feature/auth',
  },
  {
    id: 'merge-squash',
    command: 'git merge --squash <branch>',
    category: 'merging',
    tags: ['occasional'],
    description: {
      ja: '全コミットを1つに圧縮してマージ（コミットは手動）',
      en: 'Squash all commits from branch into one (commit manually)',
    },
    example: '$ git merge --squash feature/auth && git commit -m "feat: auth"',
  },
  {
    id: 'rebase',
    command: 'git rebase <branch>',
    category: 'merging',
    tags: ['occasional'],
    description: {
      ja: '指定ブランチを基点にリベース',
      en: 'Rebase current branch onto specified branch',
    },
    example: '$ git rebase main',
  },
  {
    id: 'rebase-i',
    command: 'git rebase -i HEAD~<n>',
    category: 'merging',
    tags: ['occasional'],
    description: {
      ja: '直近 n 件のコミットを対話的に整理',
      en: 'Interactively rewrite the last n commits',
    },
    example: '$ git rebase -i HEAD~3',
  },
  {
    id: 'rebase-onto',
    command: 'git rebase --onto <newbase> <upstream> <branch>',
    category: 'merging',
    tags: ['advanced'],
    description: {
      ja: '特定範囲のコミットを別ブランチに移植',
      en: 'Transplant a range of commits onto a different base',
    },
    example: '$ git rebase --onto main featureA featureB',
  },
  {
    id: 'rebase-abort',
    command: 'git rebase --abort',
    category: 'merging',
    tags: ['emergency'],
    description: {
      ja: 'リベース中断して元の状態に戻す',
      en: 'Abort an in-progress rebase and restore original state',
    },
    example: '$ git rebase --abort',
  },
  {
    id: 'merge-abort',
    command: 'git merge --abort',
    category: 'merging',
    tags: ['emergency'],
    description: {
      ja: 'マージ中断して元の状態に戻す',
      en: 'Abort an in-progress merge and restore original state',
    },
    example: '$ git merge --abort',
  },

  // ── Remote ────────────────────────────────────────────────────────────────
  {
    id: 'remote-add',
    command: 'git remote add <name> <url>',
    category: 'remote',
    tags: ['setup'],
    description: {
      ja: 'リモートリポジトリを追加',
      en: 'Add a remote repository',
    },
    example: '$ git remote add origin https://github.com/user/repo.git',
  },
  {
    id: 'remote-v',
    command: 'git remote -v',
    category: 'remote',
    tags: ['occasional'],
    description: {
      ja: '登録済みリモートの URL 一覧を表示',
      en: 'List all remotes with their URLs',
    },
    example: '$ git remote -v\norigin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)',
  },
  {
    id: 'remote-remove',
    command: 'git remote remove <name>',
    category: 'remote',
    tags: ['occasional'],
    description: {
      ja: 'リモートを削除',
      en: 'Remove a remote',
    },
    example: '$ git remote remove origin',
  },
  {
    id: 'fetch',
    command: 'git fetch',
    category: 'remote',
    tags: ['daily'],
    description: {
      ja: 'リモートの変更を取得（マージはしない）',
      en: 'Fetch changes from remote (without merging)',
    },
    example: '$ git fetch origin',
  },
  {
    id: 'fetch-all',
    command: 'git fetch --all',
    category: 'remote',
    tags: ['occasional'],
    description: {
      ja: '全リモートの変更をまとめて取得',
      en: 'Fetch from all remotes at once',
    },
    example: '$ git fetch --all',
  },
  {
    id: 'pull',
    command: 'git pull',
    category: 'remote',
    tags: ['daily'],
    description: {
      ja: 'リモートの変更を取得してマージ',
      en: 'Fetch and merge changes from remote',
    },
    example: '$ git pull origin main',
  },
  {
    id: 'pull-rebase',
    command: 'git pull --rebase',
    category: 'remote',
    tags: ['occasional'],
    description: {
      ja: 'マージの代わりにリベースで取得',
      en: 'Pull using rebase instead of merge',
    },
    example: '$ git pull --rebase origin main',
  },
  {
    id: 'push',
    command: 'git push',
    category: 'remote',
    tags: ['daily'],
    description: {
      ja: 'ローカルのコミットをリモートに送信',
      en: 'Push local commits to remote',
    },
    example: '$ git push origin main',
  },
  {
    id: 'push-u',
    command: 'git push -u origin <branch>',
    category: 'remote',
    tags: ['daily'],
    description: {
      ja: 'リモートに push しつつ追跡ブランチを設定',
      en: 'Push and set upstream tracking branch',
    },
    example: '$ git push -u origin feature/auth',
  },
  {
    id: 'push-force-lease',
    command: 'git push --force-with-lease',
    category: 'remote',
    tags: ['advanced'],
    description: {
      ja: '他者の変更を上書きしない安全な強制 push',
      en: 'Force push safely (fails if remote has new commits)',
    },
    example: '$ git push --force-with-lease origin feature/auth',
  },
  {
    id: 'push-delete',
    command: 'git push origin --delete <branch>',
    category: 'remote',
    tags: ['occasional'],
    description: {
      ja: 'リモートブランチを削除',
      en: 'Delete a remote branch',
    },
    example: '$ git push origin --delete feature/auth',
  },

  // ── Inspecting ────────────────────────────────────────────────────────────
  {
    id: 'log',
    command: 'git log',
    category: 'inspect',
    tags: ['daily'],
    description: {
      ja: 'コミット履歴を表示',
      en: 'Show commit history',
    },
    example: '$ git log\ncommit abc1234...\nAuthor: Alice <alice@example.com>\nDate:   Mon Apr 1',
  },
  {
    id: 'log-oneline',
    command: 'git log --oneline',
    category: 'inspect',
    tags: ['daily'],
    description: {
      ja: 'コミット履歴を1行ずつ簡潔に表示',
      en: 'Show commit history one line per commit',
    },
    example: '$ git log --oneline\nabc1234 feat: add login\ndef5678 fix: typo',
  },
  {
    id: 'log-graph',
    command: 'git log --oneline --graph --all',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: 'ブランチをグラフ表示で確認',
      en: 'Show branch graph in ASCII art',
    },
    example: '$ git log --oneline --graph --all\n* abc1234 feat: login\n| * def5678 fix: header\n|/\n* ghi9012 init',
  },
  {
    id: 'log-p',
    command: 'git log -p',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: '各コミットの diff を一緒に表示',
      en: 'Show commit history with patch (diff) for each commit',
    },
    example: '$ git log -p',
  },
  {
    id: 'log-follow',
    command: 'git log --follow <file>',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: 'ファイル名変更を追跡しつつ履歴表示',
      en: 'Show history of a file, following renames',
    },
    example: '$ git log --follow src/auth.js',
  },
  {
    id: 'shortlog',
    command: 'git shortlog -sn',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: '作者別コミット数を集計して表示',
      en: 'Summarize commit count by author',
    },
    example: '$ git shortlog -sn\n    42  Alice\n    18  Bob',
  },
  {
    id: 'diff',
    command: 'git diff',
    category: 'inspect',
    tags: ['daily'],
    description: {
      ja: 'ワーキングツリーとステージの差分を表示',
      en: 'Show unstaged changes in working tree',
    },
    example: '$ git diff\n-old line\n+new line',
  },
  {
    id: 'diff-staged',
    command: 'git diff --staged',
    category: 'inspect',
    tags: ['daily'],
    description: {
      ja: 'ステージ済みの変更を表示',
      en: 'Show changes that are staged for commit',
    },
    example: '$ git diff --staged',
  },
  {
    id: 'diff-branches',
    command: 'git diff <branch1>..<branch2>',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: '2つのブランチ間の差分を表示',
      en: 'Show differences between two branches',
    },
    example: '$ git diff main..feature/auth',
  },
  {
    id: 'show',
    command: 'git show <commit>',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: '特定コミットの詳細と diff を表示',
      en: 'Show details and diff of a specific commit',
    },
    example: '$ git show abc1234',
  },
  {
    id: 'blame',
    command: 'git blame <file>',
    category: 'inspect',
    tags: ['occasional'],
    description: {
      ja: '各行を最後に変更したコミット・作者を表示',
      en: 'Show who last changed each line of a file',
    },
    example: '$ git blame README.md\nabc1234 (Alice 2026-01-01) # README',
  },

  // ── Undoing ───────────────────────────────────────────────────────────────
  {
    id: 'restore',
    command: 'git restore <file>',
    category: 'undo',
    tags: ['daily'],
    description: {
      ja: 'ワーキングツリーのファイル変更を破棄',
      en: 'Discard working tree changes in a file',
    },
    example: '$ git restore README.md',
  },
  {
    id: 'restore-staged',
    command: 'git restore --staged <file>',
    category: 'undo',
    tags: ['daily'],
    description: {
      ja: 'ステージから外す（変更は残る）',
      en: 'Unstage a file (keep changes in working tree)',
    },
    example: '$ git restore --staged README.md',
  },
  {
    id: 'checkout-file',
    command: 'git checkout -- <file>',
    category: 'undo',
    tags: ['occasional'],
    description: {
      ja: 'ファイルをHEADの状態に戻す（旧コマンド）',
      en: 'Restore file to HEAD state (legacy command)',
    },
    example: '$ git checkout -- README.md',
  },
  {
    id: 'reset-soft',
    command: 'git reset --soft HEAD~1',
    category: 'undo',
    tags: ['occasional'],
    description: {
      ja: '直前コミットを取り消し（変更はステージに残る）',
      en: 'Undo last commit, keep changes staged',
    },
    example: '$ git reset --soft HEAD~1',
  },
  {
    id: 'reset-mixed',
    command: 'git reset HEAD~1',
    category: 'undo',
    tags: ['occasional'],
    description: {
      ja: '直前コミットを取り消し（変更はワーキングツリーに残る）',
      en: 'Undo last commit, keep changes unstaged',
    },
    example: '$ git reset HEAD~1',
  },
  {
    id: 'reset-hard',
    command: 'git reset --hard <commit>',
    category: 'undo',
    tags: ['emergency'],
    description: {
      ja: '指定コミットまで強制的に戻す（変更を完全破棄）',
      en: 'Reset to a commit, discarding all changes permanently',
    },
    example: '$ git reset --hard HEAD~3',
  },
  {
    id: 'revert',
    command: 'git revert <commit>',
    category: 'undo',
    tags: ['occasional'],
    description: {
      ja: '指定コミットの逆操作コミットを作成（履歴を保持）',
      en: 'Create a new commit that undoes a specified commit',
    },
    example: '$ git revert abc1234',
  },
  {
    id: 'clean',
    command: 'git clean -fd',
    category: 'undo',
    tags: ['occasional'],
    description: {
      ja: '追跡されていないファイル・ディレクトリを削除',
      en: 'Remove untracked files and directories',
    },
    example: '$ git clean -fd\nRemoving build/\nRemoving tmp.log',
  },

  // ── Stashing ──────────────────────────────────────────────────────────────
  {
    id: 'stash',
    command: 'git stash',
    category: 'stash',
    tags: ['daily'],
    description: {
      ja: '作業中の変更を一時退避',
      en: 'Stash current working changes temporarily',
    },
    example: '$ git stash\nSaved working directory and index state WIP on main',
  },
  {
    id: 'stash-u',
    command: 'git stash -u',
    category: 'stash',
    tags: ['occasional'],
    description: {
      ja: '未追跡ファイルも含めてスタッシュ',
      en: 'Stash including untracked files',
    },
    example: '$ git stash -u',
  },
  {
    id: 'stash-pop',
    command: 'git stash pop',
    category: 'stash',
    tags: ['daily'],
    description: {
      ja: '最新のスタッシュを復元して削除',
      en: 'Apply the latest stash and remove it from the stash list',
    },
    example: '$ git stash pop',
  },
  {
    id: 'stash-apply',
    command: 'git stash apply stash@{<n>}',
    category: 'stash',
    tags: ['occasional'],
    description: {
      ja: '指定スタッシュを復元（スタッシュは残す）',
      en: 'Apply a specific stash without removing it',
    },
    example: '$ git stash apply stash@{1}',
  },
  {
    id: 'stash-list',
    command: 'git stash list',
    category: 'stash',
    tags: ['occasional'],
    description: {
      ja: 'スタッシュの一覧を表示',
      en: 'List all stashes',
    },
    example: '$ git stash list\nstash@{0}: WIP on main: abc1234 feat: login\nstash@{1}: WIP on main: def5678',
  },
  {
    id: 'stash-drop',
    command: 'git stash drop stash@{<n>}',
    category: 'stash',
    tags: ['occasional'],
    description: {
      ja: '指定スタッシュを削除',
      en: 'Delete a specific stash entry',
    },
    example: '$ git stash drop stash@{0}',
  },
  {
    id: 'stash-show',
    command: 'git stash show -p',
    category: 'stash',
    tags: ['occasional'],
    description: {
      ja: '最新スタッシュの diff を表示',
      en: 'Show patch diff of the latest stash',
    },
    example: '$ git stash show -p stash@{0}',
  },

  // ── Tags ──────────────────────────────────────────────────────────────────
  {
    id: 'tag',
    command: 'git tag',
    category: 'tag',
    tags: ['occasional'],
    description: {
      ja: 'タグ一覧を表示',
      en: 'List all tags',
    },
    example: '$ git tag\nv1.0.0\nv1.1.0',
  },
  {
    id: 'tag-create',
    command: 'git tag <name>',
    category: 'tag',
    tags: ['occasional'],
    description: {
      ja: '軽量タグを作成',
      en: 'Create a lightweight tag',
    },
    example: '$ git tag v1.0.0',
  },
  {
    id: 'tag-annotated',
    command: 'git tag -a <name> -m "<message>"',
    category: 'tag',
    tags: ['occasional'],
    description: {
      ja: 'メッセージ付きの注釈タグを作成',
      en: 'Create an annotated tag with a message',
    },
    example: '$ git tag -a v1.0.0 -m "Release version 1.0.0"',
  },
  {
    id: 'tag-delete',
    command: 'git tag -d <name>',
    category: 'tag',
    tags: ['occasional'],
    description: {
      ja: 'ローカルタグを削除',
      en: 'Delete a local tag',
    },
    example: '$ git tag -d v1.0.0',
  },
  {
    id: 'push-tags',
    command: 'git push --tags',
    category: 'tag',
    tags: ['occasional'],
    description: {
      ja: '全ローカルタグをリモートに push',
      en: 'Push all local tags to remote',
    },
    example: '$ git push --tags',
  },

  // ── Advanced ──────────────────────────────────────────────────────────────
  {
    id: 'cherry-pick',
    command: 'git cherry-pick <commit>',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: '特定コミットを現在のブランチに適用',
      en: 'Apply a specific commit to the current branch',
    },
    example: '$ git cherry-pick abc1234',
  },
  {
    id: 'cherry-pick-range',
    command: 'git cherry-pick <from>..<to>',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: 'コミット範囲をまとめて cherry-pick',
      en: 'Cherry-pick a range of commits',
    },
    example: '$ git cherry-pick abc1234..def5678',
  },
  {
    id: 'bisect-start',
    command: 'git bisect start',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: 'バグを二分探索で特定するセッション開始',
      en: 'Start a bisect session to find a bug by binary search',
    },
    example: '$ git bisect start\n$ git bisect bad HEAD\n$ git bisect good v1.0.0',
  },
  {
    id: 'reflog',
    command: 'git reflog',
    category: 'advanced',
    tags: ['emergency', 'advanced'],
    description: {
      ja: '全 HEAD 移動履歴を表示（削除コミットの復旧に使用）',
      en: 'Show all HEAD movements (useful for recovering lost commits)',
    },
    example: '$ git reflog\nabc1234 HEAD@{0}: commit: feat: login\ndef5678 HEAD@{1}: reset: moving to HEAD~1',
  },
  {
    id: 'worktree-add',
    command: 'git worktree add <path> <branch>',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: '同一リポジトリを別ディレクトリでチェックアウト',
      en: 'Check out a branch in a separate directory (linked worktree)',
    },
    example: '$ git worktree add ../hotfix hotfix/urgent',
  },
  {
    id: 'submodule-add',
    command: 'git submodule add <url> <path>',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: '別リポジトリをサブモジュールとして追加',
      en: 'Add another repository as a submodule',
    },
    example: '$ git submodule add https://github.com/user/lib.git libs/lib',
  },
  {
    id: 'archive',
    command: 'git archive --format=zip HEAD > out.zip',
    category: 'advanced',
    tags: ['advanced'],
    description: {
      ja: 'リポジトリを zip アーカイブとしてエクスポート',
      en: 'Export the repository as a zip archive',
    },
    example: '$ git archive --format=zip HEAD > project.zip',
  },
];
