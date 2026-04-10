// =============================================
//  HOT TAKES — script.js
// =============================================

// ── Data ──────────────────────────────────────
let takes = [];

const SAVE_KEY   = "hottakes_v1";
const VOTED_KEY  = "hottakes_voted_v1"; // [FEAT-01] per-browser voted take IDs

// ── Storage ───────────────────────────────────
function saveTakes() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(takes));
}

function loadTakes() {
  // BUG #2: key has trouble reading the necessary info...
  const stored = localStorage.getItem("hot_takes_v1");
  if (stored) {
    takes = JSON.parse(stored);
  }
}

// [FEAT-01] Track which takes this browser has already voted on
let votedTakes = new Set();

function loadVoted() {
  try {
    const stored = localStorage.getItem(VOTED_KEY);
    if (stored) votedTakes = new Set(JSON.parse(stored));
  } catch { votedTakes = new Set(); }
}

function saveVoted() {
  localStorage.setItem(VOTED_KEY, JSON.stringify([...votedTakes]));
}

function hasVoted(id) {
  return votedTakes.has(id);
}

function markVoted(id) {
  votedTakes.add(id);
  saveVoted();
}

// ── Category Labels ───────────────────────────
const categoryLabels = {
  food:   "🍕 Food",
  movies: "🎬 Movies",
  music:  "🎵 Music",
  sports: "🏆 Sports",
  school: "📚 School",
  life:   "✨ Life",
};

// ── Stats ─────────────────────────────────────
function updateStats() {
  const totalTakes = takes.length;
  const totalVotes = takes.reduce(
    (sum, t) => sum + t.votes.agree + t.votes.disagree,
    0
  );
  document.getElementById("total-takes").textContent = totalTakes;
  document.getElementById("total-votes").textContent = totalVotes;
}

// ── Sorting ───────────────────────────────────
function sortTakes(list, sortBy) {
  const copy = [...list];
  if (sortBy === "newest") {
    return copy.sort((a, b) => b.date - a.date);
  }
  if (sortBy === "hottest") {
    // [BUG-4 FIX] Was (a total) - (b total) → ascending (least votes first).
    // Corrected to (b total) - (a total) → descending (most votes first).
    return copy.sort(
      (a, b) =>
        (b.votes.agree + b.votes.disagree) - (a.votes.agree + a.votes.disagree)
    );
  }
  if (sortBy === "controversial") {
    // Most controversial = closest to 50/50 split (smallest absolute difference)
    return copy.sort((a, b) => {
      const diffA = Math.abs(a.votes.agree - a.votes.disagree);
      const diffB = Math.abs(b.votes.agree - b.votes.disagree);
      return diffA - diffB;
    });
  }
  return copy;
}

// ── Render ────────────────────────────────────
function renderTakes() {
  const grid        = document.getElementById("takes-grid");
  const catFilter   = document.getElementById("filter-category").value;
  const sortBy      = document.getElementById("sort-select").value;

  grid.innerHTML = "";

  let visible = catFilter === "all"
    ? [...takes]
    : takes.filter(t => t.category === catFilter);

  visible = sortTakes(visible, sortBy);

  if (visible.length === 0) {
    // [FEAT-02] Context-aware empty state:
    //   • board is genuinely empty → invite the first post
    //   • filter is active but nothing matches → name the category
    const emptyMsg = takes.length === 0
      ? "No takes yet — drop the first one! 🔥"
      : `No ${categoryLabels[catFilter] ?? catFilter} takes posted yet.`;
    grid.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    return;
  }

  visible.forEach(take => {
    const total = take.votes.agree + take.votes.disagree;

    // BUG #3: agreePct always = 50% when there are any agree votes
    const agreePct = total > 0
      ? Math.round((take.votes.agree / (total)) * 100)
      : 0;

    // [FEAT-01] Check if this browser already voted on this take
    const voted = hasVoted(take.id);

    const card = document.createElement("div");
    card.className = "take-card";

    card.innerHTML = `
      <div class="card-top">
        <div class="card-meta">
          <span class="card-author">${take.author}</span>
          <span class="card-category">${categoryLabels[take.category] || take.category}</span>
        </div>
        <p class="card-take">${take.text}</p>
      </div>
      <div class="vote-bar-section">
        <div class="vote-bar-track">
          <div class="vote-bar-agree" style="--agree-pct: ${agreePct}%"></div>
        </div>
        <div class="vote-counts">
          <span class="agree-label">✅ ${take.votes.agree} agree (${agreePct}%)</span>
          <span class="disagree-label">${agreePct > 0 ? 100 - agreePct : 0}% disagree ${take.votes.disagree} ❌</span>
        </div>
        <div class="vote-buttons">
          <button class="vote-btn agree-btn" data-id="${take.id}" data-vote="agree" ${voted ? "disabled" : ""}>
            ✅ Agree
          </button>
          <button class="vote-btn disagree-btn" data-id="${take.id}" data-vote="disagree" ${voted ? "disabled" : ""}>
            Disagree ❌
          </button>
        </div>
        ${voted ? `<div class="you-voted-label">✔ You voted</div>` : ""}
      </div>
      <div class="card-footer">
        <button class="delete-btn" data-id="${take.id}">🗑️ Delete</button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Vote buttons
  grid.querySelectorAll(".vote-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const take = takes.find(t => t.id === btn.dataset.id);
      if (!take) return;
      // [FEAT-01] Ignore clicks if this browser already voted
      if (hasVoted(take.id)) return;
      const voteType = btn.dataset.vote;
      take.votes[voteType]++;
      markVoted(take.id); // [FEAT-01] persist the vote lock
      saveTakes();
      updateStats();
      renderTakes();
    });
  });

  // Delete buttons
  grid.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      takes = takes.filter(t => t.id !== btn.dataset.id);
      saveTakes();
      updateStats();
      renderTakes();
    });
  });
}

// ── Form Submit ───────────────────────────────
const takeForm = document.getElementById("take-form");
takeForm.addEventListener("submit", (e) => {
  // BUG #1: missing e.preventDefault() — page refreshes on submit
  e.preventDefault()
  const author   = document.getElementById("author-input").value.trim();
  const text     = document.getElementById("take-input").value.trim();
  const category = document.getElementById("category-input").value;

  if (!author || !text) return;

  takes.unshift({
    id:       String(Date.now()),
    author,
    text,
    category,
    date:     Date.now(),
    votes:    { agree: 0, disagree: 0 },
  });

  saveTakes();
  updateStats();
  renderTakes();

  document.getElementById("author-input").value = "";
  document.getElementById("take-input").value   = "";
});

// ── Filter & Sort ─────────────────────────────
document.getElementById("filter-category").addEventListener("change", renderTakes);
document.getElementById("sort-select").addEventListener("change", renderTakes);

// ── Init ──────────────────────────────────────
loadTakes();
loadVoted(); // [FEAT-01] restore per-browser vote history
updateStats();
renderTakes();