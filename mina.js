let tasks = [
  { title: "Capcut video edit", due: "Jan 14", status: "pending" },
  { title: "Powerpoint slide", due: "Jan 20", status: "pending" },
  { title: "Frontier website", due: "Feb 03", status: "pending" },
  { title: "Mobile redesign", due: "Feb 11", status: "new" },
  { title: "Client PPTX", due: "Feb 05", status: "done" },
  { title: "Tiktok marketing", due: "Feb 13", status: "done" },
];

const $ = (id) => document.getElementById(id);
const count = (s) => tasks.filter((t) => t.status === s).length;
const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function render() {
  $("total").textContent = tasks.length;
  $("completeCount").textContent = count("done");
  $("pendingCount").textContent = count("pending");
  $("newCount").textContent = count("new");

  $("taskList").innerHTML = tasks
    .map((t, i) => ({ ...t, i }))
    .filter((t) => t.status !== "done")
    .map(
      (t) => `
      <li data-index="${t.i}" class="flex cursor-pointer items-center justify-between">
        <span class="text-slate-700">${esc(t.title)}</span>
        <span class="rounded-full bg-white/70 px-2 py-0.5 text-slate-600">Due: ${esc(t.due)}</span>
      </li>`
    )
    .join("");
}

$("addTaskBtn").addEventListener("click", () => {
  const title = prompt("Task name?");
  if (!title || !title.trim()) return;
  const due = prompt("Due date? (e.g. Mar 05)") || "-";
  tasks.push({ title: title.trim(), due, status: "new" });
  render();
});

$("taskList").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  tasks[li.dataset.index].status = "done";
  render();
});

render();