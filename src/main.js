/**
 * main.js — DOM, events, search, filtering for git-cheatsheet
 */

import { COMMANDS, CATEGORIES, DAILY_COMMAND_IDS } from './commands.js';
import { filterCommands, groupByCategory } from './search.js';
import { getUI } from './i18n.js';

// ── State ──────────────────────────────────────────────────────────────────

let state = {
  lang: 'en',
  theme: 'dark',
  query: '',
  category: 'all',
};

// ── DOM refs ───────────────────────────────────────────────────────────────

const searchInput = document.getElementById('search');
const categoryNav = document.getElementById('category-nav');
const dailySection = document.getElementById('daily-section');
const resultsSection = document.getElementById('results-section');
const noResults = document.getElementById('no-results');
const commandCount = document.getElementById('command-count');
const themeBtn = document.getElementById('theme-toggle');
const langBtn = document.getElementById('lang-toggle');
const titleEl = document.getElementById('site-title');
const subtitleEl = document.getElementById('site-subtitle');
const dailyTitleEl = document.getElementById('daily-title');
const dailyDescEl = document.getElementById('daily-desc');
const searchPlaceholder = searchInput;

// ── Render helpers ─────────────────────────────────────────────────────────

function tagBadge(tag) {
  return `<span class="tag tag-${tag}">${tag}</span>`;
}

function commandCard(cmd, ui) {
  const desc = cmd.description[state.lang] || cmd.description.en;
  const tags = (cmd.tags || []).map(tagBadge).join('');
  const exampleHtml = cmd.example
    ? `<details class="example"><summary>${ui.exampleLabel}</summary><pre>${escapeHtml(cmd.example)}</pre></details>`
    : '';
  return `
    <div class="card" data-id="${cmd.id}">
      <div class="card-header">
        <code class="cmd-text">${escapeHtml(cmd.command)}</code>
        <button class="copy-btn" aria-label="${ui.copyButton}" data-command="${escapeAttr(cmd.command)}">${ui.copyButton}</button>
      </div>
      <p class="cmd-desc">${escapeHtml(desc)}</p>
      <div class="card-footer">
        <span class="tags">${tags}</span>
      </div>
      ${exampleHtml}
    </div>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;');
}

// ── Category tabs ──────────────────────────────────────────────────────────

function renderCategoryNav() {
  const ui = getUI(state.lang);
  const allBtn = `<button class="cat-btn${state.category === 'all' ? ' active' : ''}" data-cat="all">${ui.categoryAll}</button>`;
  const catBtns = CATEGORIES.map(
    (cat) =>
      `<button class="cat-btn${state.category === cat.id ? ' active' : ''}" data-cat="${cat.id}">${cat.name[state.lang]}</button>`
  ).join('');
  categoryNav.innerHTML = allBtn + catBtns;
}

// ── Daily section ──────────────────────────────────────────────────────────

function renderDaily() {
  const ui = getUI(state.lang);
  dailyTitleEl.textContent = ui.dailySection;
  dailyDescEl.textContent = ui.dailySectionDesc;

  const dailyCmds = DAILY_COMMAND_IDS.map((id) => COMMANDS.find((c) => c.id === id)).filter(Boolean);
  dailySection.querySelector('.cards-grid').innerHTML = dailyCmds.map((cmd) => commandCard(cmd, ui)).join('');
}

// ── Main results ───────────────────────────────────────────────────────────

function renderResults() {
  const ui = getUI(state.lang);
  const filtered = filterCommands(COMMANDS, state.query, state.category, state.lang);

  // Show count
  commandCount.textContent = `${filtered.length} ${ui.commandCount}`;

  if (filtered.length === 0) {
    resultsSection.innerHTML = '';
    noResults.hidden = false;
    noResults.querySelector('.no-results-hint').textContent = ui.noResultsHint;
    noResults.querySelector('.no-results-title').textContent = ui.noResults;
    return;
  }

  noResults.hidden = true;

  if (state.query) {
    // Flat list when searching
    resultsSection.innerHTML = `<div class="cards-grid">${filtered.map((cmd) => commandCard(cmd, ui)).join('')}</div>`;
  } else {
    // Grouped by category
    const groups = groupByCategory(filtered);
    const html = CATEGORIES.filter((cat) => groups[cat.id])
      .map(
        (cat) => `
        <section class="category-group">
          <h2 class="category-title">${cat.name[state.lang]}</h2>
          <div class="cards-grid">${groups[cat.id].map((cmd) => commandCard(cmd, ui)).join('')}</div>
        </section>`
      )
      .join('');
    resultsSection.innerHTML = html;
  }
}

// ── Full re-render ─────────────────────────────────────────────────────────

function render() {
  const ui = getUI(state.lang);

  // Update static text
  titleEl.textContent = ui.title;
  subtitleEl.textContent = ui.subtitle;
  searchPlaceholder.placeholder = ui.searchPlaceholder;
  themeBtn.textContent = state.theme === 'dark' ? ui.themeToggle : ui.themeToggleDark;
  langBtn.textContent = ui.langToggle;

  // Daily section: only show when not actively filtering
  const showDaily = !state.query && state.category === 'all';
  dailySection.hidden = !showDaily;
  if (showDaily) renderDaily();

  renderCategoryNav();
  renderResults();
}

// ── Events ─────────────────────────────────────────────────────────────────

searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

categoryNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  state.category = btn.dataset.cat;
  render();
});

themeBtn.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = state.theme;
  render();
});

langBtn.addEventListener('click', () => {
  state.lang = state.lang === 'en' ? 'ja' : 'en';
  render();
});

// Copy to clipboard
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const text = btn.dataset.command;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for environments without clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  const ui = getUI(state.lang);
  const orig = btn.textContent;
  btn.textContent = ui.copiedButton;
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = ui.copyButton;
    btn.classList.remove('copied');
  }, 1500);
});

// ── Init ───────────────────────────────────────────────────────────────────

document.documentElement.dataset.theme = state.theme;
render();
