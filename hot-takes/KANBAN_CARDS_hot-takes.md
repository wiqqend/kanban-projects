# HOT TAKES
## Kanban Project Starter App

## 📋 KANBAN CARDS

---

### 🐛 BUG FIX CARDS (5)

---

**[BUG-01] Page refreshes when submitting a take**
Priority: 🔴 Critical

Clicking "POST IT 🔥" causes the whole page to reload and nothing gets posted.
The author and take text disappear and the board stays empty.

Acceptance criteria:
- Clicking the button adds the take to the board without a page reload
- The author and take inputs clear after a successful post
- Stats in the header update immediately

---

**[BUG-02] Takes disappear after every page refresh**
Priority: 🔴 Critical

Takes appear on the board and votes seem to work, but everything is lost
on page refresh. The app uses localStorage to save data.

Acceptance criteria:
- All takes and their vote counts persist across page refreshes
- Verify by posting, voting, refreshing, and confirming data is still there

---

**[BUG-03] Vote bar always shows exactly 50%**
Priority: 🟠 High

No matter how lopsided the votes are (e.g. 10 agrees and 0 disagrees),
the green bar always fills to exactly half and the percentage always reads 50%.

Acceptance criteria:
- A take with 10 agrees and 0 disagrees shows 100% agree
- A take with 3 agrees and 7 disagrees shows 30% agree
- The bar width and label percentages are always accurate
- A take with 0 total votes shows 0%

---

**[BUG-04] "Most Votes" sort puts least-voted takes at the top**
Priority: 🟠 High

Selecting "Most Votes" from the sort dropdown does sort by votes, but in the
wrong direction — takes with the fewest votes appear first.

Acceptance criteria:
- "Most Votes" sorts takes from highest total vote count to lowest
- "Newest First" still sorts by date correctly
- "Most Controversial" still works correctly

---

**[BUG-05] The agree/disagree bar fill never appears**
Priority: 🟡 Medium

The bar track (background) is visible but the green fill representing
agree votes is always invisible, even when votes have been cast.

Acceptance criteria:
- Green fill grows from left to right proportionally to agree votes
- Bar animates smoothly when a vote is cast
- Empty state (0 votes) shows an empty bar

---

### ✨ FEATURE CARDS (8)

---

**[FEAT-01] Prevent voting more than once on the same take**
Priority: 🟠 High

Right now there's nothing stopping a user from clicking Agree 100 times
on the same take. Each click counts as a new vote.

Acceptance criteria:
- Store voted-on take IDs in localStorage (keyed per browser)
- Once a user votes on a take, both vote buttons become disabled for that take
- A small "You voted" label appears on the card
- Note: this is per-browser, not per-user — that's fine for this app

---

**[FEAT-02] Show empty state messages based on filter context**
Priority: 🟠 High

The empty state just says "No takes here yet" regardless of whether the
board is truly empty or just filtered to show nothing.

Acceptance criteria:
- Board has no takes at all: "No takes yet — drop the first one! 🔥"
- Filter active with no results: "No [Category] takes posted yet."
- Filtered empty state should name the active category

---

**[FEAT-03] Add a character countdown on the take textarea**
Priority: 🟡 Medium

The textarea has a 200-character limit but users can't see how close they are.

Acceptance criteria:
- A live counter shows "X / 200 characters" below the textarea
- Counter updates on every keystroke
- Counter turns red when under 25 characters remaining
- Counter resets after a successful post

---

**[FEAT-04] Show a timestamp on each take card**
Priority: 🟡 Medium

There's no way to know when a take was posted.

Acceptance criteria:
- Each card shows a posted time (e.g. "Posted Apr 6, 2026" or "2 hours ago")
- Timestamp is stored with the take and persists across refreshes
- Appears in a subtle style (small, muted color)

---

**[FEAT-05] Add a "Most Spicy" badge to the top-voted take**
Priority: 🟡 Medium

Highlight the take with the most total votes as the most engaging one.

Acceptance criteria:
- The take with the highest total vote count gets a "🌶️ Most Spicy" badge
- Badge updates dynamically when votes change
- If multiple takes tie for most votes, all tied takes get the badge
- No badge shows when there are no votes

---

**[FEAT-06] Allow submitting a take anonymously**
Priority: 🟢 Low

Some students may not want to attach their name to a spicy opinion.

Acceptance criteria:
- A "Post Anonymously" checkbox appears near the author input
- When checked, the author field is hidden and the name is stored as "Anonymous"
- The input clears but the checkbox state can stay as-is

---

**[FEAT-07] Add a "Share this take" copy button**
Priority: 🟢 Low

Let users copy a take as text to share outside the app.

Acceptance criteria:
- Each card has a "Copy" icon button in the footer
- Clicking it copies the take text + author + vote stats to the clipboard
- A brief "Copied!" confirmation appears near the button for 2 seconds

---

**[FEAT-08] Show a leaderboard of the top 3 authors by total takes**
Priority: 🟢 Low

Add a small sidebar or header section showing who's posted the most.

Acceptance criteria:
- Top 3 authors by take count are listed with their count
- Updates live as new takes are added
- Ties can be broken by total votes received

---

### 🎨 POLISH CARDS (4)

---

**[POLISH-01] Make the app mobile responsive**
Priority: 🟡 Medium

The multi-column grid needs to collapse on small screens.

Acceptance criteria:
- Cards stack to a single column on screens under 600px
- The form row (name + category) stacks vertically on mobile
- Header stats remain readable

---

**[POLISH-02] Add a card entrance animation**
Priority: 🟢 Low

New takes just pop in. Add a subtle entrance.

Acceptance criteria:
- New cards slide or fade into the top of the grid
- Animation is under 400ms
- Does not re-trigger on filter changes or re-renders

---

**[POLISH-03] Color-code cards by category**
Priority: 🟢 Low

All cards look identical. Differentiate by category.

Acceptance criteria:
- Each category has a unique accent color applied to the top border or badge
- Colors are distinct but cohesive with the overall design

---

**[POLISH-04] Animate the vote bar when a vote is cast**
Priority: 🟢 Low

The bar updates immediately without any animation.

Acceptance criteria:
- The green agree bar animates smoothly to its new width after a vote
- Animation takes ~400ms
- Smooth enough to feel satisfying to interact with

---

## 📅 SUGGESTED DAY-BY-DAY FLOW

| Day | Focus | Ceremonies |
|-----|-------|------------|
| Day 1 | Board setup, backlog grooming, pull first cards | Standup (10 min) |
| Day 2 | Continuous flow — pull, build, review, move cards | Standup (10 min) |
| Day 3 | Continue flow; team identifies bottlenecks; WIP limits tested | Standup (10 min) |
| Day 4 | Final cards, freeze board at end of class, retrospective | Retro (20 min) |

## 📊 METRICS TRACKER GUIDANCE

Log at end of each day:
- Cards in Done / In Progress / In Review / Blocked

Present a throughput chart at retrospective (cards completed per day).
