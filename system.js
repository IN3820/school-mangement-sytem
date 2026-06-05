/* ══════════════════════════════════════════════════════════
     JAVASCRIPT
══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────── */
const students = [
  {
    id: 'STU-2025-0001', name: 'Fatima Hassan',    gender: 'Female', grade: 'Grade 10',
    attendRate: '92%', avg: 78.4, rank: '#1', initials: 'FH', color: 'from-indigo-400 to-purple-500',
    subjects: [
      { name:'Mathematics',      ca:34, exam:52, total:86 },
      { name:'English Language', ca:30, exam:48, total:78 },
      { name:'Physics',          ca:28, exam:42, total:70 },
      { name:'Chemistry',        ca:32, exam:50, total:82 },
      { name:'Biology',          ca:26, exam:40, total:66 },
      { name:'Islamic Studies',  ca:36, exam:55, total:91 },
    ]
  },
  {
    id: 'STU-2025-0002', name: 'Abdi Warsame',    gender: 'Male',   grade: 'Grade 10',
    attendRate: '88%', avg: 71.2, rank: '#2', initials: 'AW', color: 'from-emerald-400 to-teal-500',
    subjects: [
      { name:'Mathematics',      ca:28, exam:44, total:72 },
      { name:'English Language', ca:25, exam:40, total:65 },
      { name:'Physics',          ca:30, exam:46, total:76 },
      { name:'Chemistry',        ca:27, exam:43, total:70 },
      { name:'Biology',          ca:24, exam:38, total:62 },
      { name:'Islamic Studies',  ca:33, exam:50, total:83 },
    ]
  },
  {
    id: 'STU-2025-0003', name: 'Hibo Mohamed',    gender: 'Female', grade: 'Grade 10',
    attendRate: '95%', avg: 82.1, rank: '#3', initials: 'HM', color: 'from-pink-400 to-rose-500',
    subjects: [
      { name:'Mathematics',      ca:35, exam:53, total:88 },
      { name:'English Language', ca:32, exam:50, total:82 },
      { name:'Physics',          ca:29, exam:45, total:74 },
      { name:'Chemistry',        ca:31, exam:49, total:80 },
      { name:'Biology',          ca:33, exam:51, total:84 },
      { name:'Islamic Studies',  ca:37, exam:57, total:94 },
    ]
  },
  {
    id: 'STU-2025-0004', name: 'Cabdi Xasan',     gender: 'Male',   grade: 'Grade 9',
    attendRate: '79%', avg: 61.8, rank: '#4', initials: 'CX', color: 'from-amber-400 to-orange-500',
    subjects: [
      { name:'Mathematics',      ca:22, exam:36, total:58 },
      { name:'English Language', ca:20, exam:33, total:53 },
      { name:'Physics',          ca:25, exam:39, total:64 },
      { name:'Chemistry',        ca:21, exam:35, total:56 },
      { name:'Biology',          ca:23, exam:37, total:60 },
      { name:'Islamic Studies',  ca:30, exam:48, total:78 },
    ]
  },
  {
    id: 'STU-2025-0005', name: 'Safia Omar',      gender: 'Female', grade: 'Grade 11',
    attendRate: '85%', avg: 74.6, rank: '#5', initials: 'SO', color: 'from-violet-400 to-indigo-500',
    subjects: [
      { name:'Mathematics',      ca:29, exam:46, total:75 },
      { name:'English Language', ca:27, exam:43, total:70 },
      { name:'Physics',          ca:31, exam:47, total:78 },
      { name:'Chemistry',        ca:28, exam:44, total:72 },
      { name:'Biology',          ca:26, exam:41, total:67 },
      { name:'Islamic Studies',  ca:34, exam:52, total:86 },
    ]
  },
  {
    id: 'STU-2025-0006', name: 'Mustafe Jama',    gender: 'Male',   grade: 'Grade 9',
    attendRate: '70%', avg: 54.3, rank: '#6', initials: 'MJ', color: 'from-cyan-400 to-sky-500',
    subjects: [
      { name:'Mathematics',      ca:18, exam:30, total:48 },
      { name:'English Language', ca:17, exam:28, total:45 },
      { name:'Physics',          ca:20, exam:32, total:52 },
      { name:'Chemistry',        ca:19, exam:31, total:50 },
      { name:'Biology',          ca:22, exam:35, total:57 },
      { name:'Islamic Studies',  ca:26, exam:42, total:68 },
    ]
  },
];
 
/* Attendance state */
const attendanceState = {};
 
/* ─────────────────────────────────────────────────────────────
   PAGE SWITCHING
───────────────────────────────────────────────────────────── */
const pageTitles = {
  'registration':   { title: 'Registration',    sub: 'Register new students into the system' },
  'student-report': { title: 'Student Report',  sub: 'View individual student performance details' },
  'exam-report':    { title: 'Exam Report',     sub: 'Class-wide exam results and analytics' },
  'attendance':     { title: 'Attendance',      sub: 'Record and manage daily attendance' },
};
 
function showPage(page) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  // Show requested section
  document.getElementById('page-' + page).classList.add('active');
 
  // Update nav link active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
 
  // Update header
  const info = pageTitles[page];
  document.getElementById('page-title').textContent    = info.title;
  document.getElementById('page-subtitle').textContent = info.sub;
 
  // Page-specific init
  if (page === 'student-report') initStudentReport();
  if (page === 'exam-report')    renderExamReport();
  if (page === 'attendance')     renderAttendance();
 
  // Close sidebar on mobile
  closeSidebar();
}
 
/* ─────────────────────────────────────────────────────────────
   MOBILE SIDEBAR
───────────────────────────────────────────────────────────── */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}
 
/* ─────────────────────────────────────────────────────────────
   PAGE 1: REGISTRATION
───────────────────────────────────────────────────────────── */
function handleRegistration(e) {
  e.preventDefault();
  const name  = document.getElementById('reg-name').value;
  const grade = document.getElementById('reg-class').value;
  document.getElementById('toast-msg').textContent = `${name} registered in ${grade}.`;
  showToast();
  e.target.reset();
}
 
function showToast() {
  const t = document.getElementById('toast');
  t.classList.remove('hide');
  t.classList.add('show');
  setTimeout(hideToast, 4000);
}
function hideToast() {
  const t = document.getElementById('toast');
  t.classList.remove('show');
  t.classList.add('hide');
}
 
/* ─────────────────────────────────────────────────────────────
   PAGE 2: STUDENT REPORT
───────────────────────────────────────────────────────────── */
let currentStudentIndex = 0;
 
function initStudentReport() {
  renderStudentList(students);
  selectStudent(0);
}
 
function renderStudentList(list) {
  const container = document.getElementById('student-list');
  document.getElementById('student-count').textContent = list.length;
  container.innerHTML = list.map((s, i) => `
    <div onclick="selectStudentById('${s.id}')"
      class="px-5 py-3.5 flex items-center gap-3 cursor-pointer transition hover:bg-slate-50
             ${students.indexOf(s) === currentStudentIndex ? 'bg-indigo-50 border-l-2 border-indigo-500' : ''}">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center
                  text-white font-display font-700 text-xs flex-shrink-0" style="font-weight:700">
        ${s.initials}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-slate-800 text-sm truncate">${s.name}</p>
        <p class="text-slate-400 text-xs">${s.id} · ${s.grade}</p>
      </div>
      <span class="text-xs font-semibold text-emerald-600">${s.avg}</span>
    </div>
  `).join('');
}
 
function selectStudentById(id) {
  const idx = students.findIndex(s => s.id === id);
  selectStudent(idx);
}
 
function selectStudent(idx) {
  currentStudentIndex = idx;
  const s = students[idx];
 
  // Update profile card
  document.getElementById('student-avatar').textContent    = s.initials;
  document.getElementById('student-avatar').className =
    `w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-display font-700 text-2xl flex-shrink-0 shadow-lg`;
  document.getElementById('sd-name').textContent    = s.name;
  document.getElementById('sd-id').textContent      = `${s.id} · ${s.grade}`;
  document.getElementById('sd-attend').textContent  = s.attendRate;
  document.getElementById('sd-avg').textContent     = s.avg;
  document.getElementById('sd-rank').textContent    = s.rank;
  document.getElementById('sd-class').textContent   = s.grade.replace('Grade ','G-');
 
  // Performance table
  const tbody = document.getElementById('performance-table');
  tbody.innerHTML = s.subjects.map(sub => {
    const grade = getLetterGrade(sub.total);
    const remark = sub.total >= 50 ? 'Passed' : 'Failed';
    const badgeClass = remark === 'Passed' ? 'badge-passed' : 'badge-failed';
    const barPct = sub.total;
    const barColor = sub.total >= 75 ? '#10b981' : sub.total >= 50 ? '#6366f1' : '#f43f5e';
    return `
      <tr>
        <td class="px-6 py-3.5 font-medium text-slate-700">${sub.name}</td>
        <td class="px-4 py-3.5 text-center">
          <span class="font-semibold text-slate-800">${sub.ca}</span>
        </td>
        <td class="px-4 py-3.5 text-center">
          <span class="font-semibold text-slate-800">${sub.exam}</span>
        </td>
        <td class="px-4 py-3.5">
          <div class="flex items-center gap-2">
            <span class="font-700 text-slate-800 w-8 text-center" style="font-weight:700">${sub.total}</span>
            <div class="score-bar flex-1">
              <div class="score-bar-fill" style="width:${barPct}%;background:${barColor}"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-3.5 text-center">
          <span class="font-display font-700 text-slate-700" style="font-weight:700">${grade}</span>
        </td>
        <td class="px-4 py-3.5 text-center">
          <span class="${badgeClass} text-xs font-semibold px-2.5 py-1 rounded-full">${remark}</span>
        </td>
      </tr>`;
  }).join('');
 
  // Re-render list to update selection highlight
  filterStudentList();
}
 
function filterStudentList() {
  const q     = (document.getElementById('student-search').value || '').toLowerCase();
  const cls   = document.getElementById('student-class-filter').value;
  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) &&
    (cls === '' || s.grade === cls)
  );
  renderStudentList(filtered);
}
 
function getLetterGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}
 
/* ─────────────────────────────────────────────────────────────
   PAGE 3: EXAM REPORT
───────────────────────────────────────────────────────────── */
function renderExamReport() {
  const cls  = document.getElementById('exam-class').value;
  const term = document.getElementById('exam-term').value;
 
  // Filter students by class
  const filtered = students.filter(s => s.grade === cls);
  if (filtered.length === 0) {
    document.getElementById('exam-results-table').innerHTML =
      `<tr><td colspan="7" class="text-center py-10 text-slate-400">No students found for ${cls}</td></tr>`;
    return;
  }
 
  // Compute per-student totals (avg of all subjects)
  const rows = filtered.map(s => ({
    ...s,
    totalMarks: s.subjects.reduce((a,b) => a + b.total, 0),
    examAvg:    Math.round(s.subjects.reduce((a,b) => a + b.total, 0) / s.subjects.length * 10) / 10,
  })).sort((a,b) => b.examAvg - a.examAvg);
 
  const classAvg  = Math.round(rows.reduce((a,b) => a + b.examAvg, 0) / rows.length * 10) / 10;
  const highest   = Math.max(...rows.map(r => r.totalMarks));
  const passing   = rows.filter(r => r.examAvg >= 50).length;
  const passRate  = Math.round(passing / rows.length * 100);
 
  document.getElementById('exam-avg').textContent  = classAvg;
  document.getElementById('exam-high').textContent = highest;
  document.getElementById('exam-pass').textContent = passRate + '%';
  document.getElementById('exam-table-subtitle').textContent = `${cls} · ${term} · 2024–2025`;
 
  const tbody = document.getElementById('exam-results-table');
  tbody.innerHTML = rows.map((r, i) => {
    const grade    = getLetterGrade(r.examAvg);
    const passed   = r.examAvg >= 50;
    const rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
    return `
      <tr>
        <td class="px-6 py-4">
          <span class="font-display font-700 text-slate-600 text-base" style="font-weight:700">${rankIcon}</span>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center
                        text-white font-display font-700 text-xs flex-shrink-0" style="font-weight:700">
              ${r.initials}
            </div>
            <span class="font-semibold text-slate-800">${r.name}</span>
          </div>
        </td>
        <td class="px-4 py-4 text-slate-500 text-sm">${r.id}</td>
        <td class="px-4 py-4 text-center font-700 text-slate-800 font-display" style="font-weight:700">${r.totalMarks}</td>
        <td class="px-4 py-4 text-center">
          <div class="inline-flex flex-col items-center">
            <span class="font-700 text-slate-800" style="font-weight:700">${r.examAvg}</span>
            <div class="score-bar w-16 mt-1">
              <div class="score-bar-fill" style="width:${r.examAvg}%;background:${r.examAvg>=75?'#10b981':r.examAvg>=50?'#6366f1':'#f43f5e'}"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="font-display font-700 text-lg ${r.examAvg>=80?'text-emerald-600':r.examAvg>=60?'text-indigo-600':'text-rose-600'}"
                style="font-weight:700">${grade}</span>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="${passed ? 'badge-passed' : 'badge-failed'} text-xs font-semibold px-2.5 py-1 rounded-full">
            ${passed ? 'Passed' : 'Failed'}
          </span>
        </td>
      </tr>`;
  }).join('');
}
 
/* ─────────────────────────────────────────────────────────────
   PAGE 4: ATTENDANCE
───────────────────────────────────────────────────────────── */
function renderAttendance() {
  const cls  = document.getElementById('attend-class').value;
  const date = document.getElementById('attend-date').value;
 
  document.getElementById('att-subtitle').textContent =
    `${cls} · ${date ? new Date(date + 'T00:00').toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : 'Today'}`;
 
  const classStudents = students.filter(s => s.grade === cls);
  document.getElementById('att-total').textContent = classStudents.length;
 
  const stateKey = `${cls}_${date}`;
  if (!attendanceState[stateKey]) {
    attendanceState[stateKey] = {};
    classStudents.forEach(s => attendanceState[stateKey][s.id] = null);
  }
 
  const state = attendanceState[stateKey];
 
  const tbody = document.getElementById('attendance-table');
  tbody.innerHTML = classStudents.map((s, i) => {
    const status = state[s.id];
    return `
      <tr>
        <td class="px-6 py-4 text-slate-400 text-sm font-medium">${String(i+1).padStart(2,'0')}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center
                        text-white font-display font-700 text-xs flex-shrink-0" style="font-weight:700">
              ${s.initials}
            </div>
            <span class="font-semibold text-slate-800">${s.name}</span>
          </div>
        </td>
        <td class="px-4 py-4 text-slate-500 text-sm">${s.id}</td>
        <td class="px-4 py-4 text-center" id="status-${s.id}">
          ${status
            ? `<span class="${status==='present'?'badge-active':status==='absent'?'badge-absent':'badge-late'} text-xs font-semibold px-2.5 py-1 rounded-full capitalize">${status}</span>`
            : '<span class="text-slate-300 text-xs font-medium">—</span>'}
        </td>
        <td class="px-4 py-4 text-center">
          <div class="toggle-group justify-center">
            <button onclick="markAttendance('${cls}','${date}','${s.id}','present')"
              class="toggle-btn ${status==='present'?'present':'inactive'}">Present</button>
            <button onclick="markAttendance('${cls}','${date}','${s.id}','absent')"
              class="toggle-btn ${status==='absent'?'absent':'inactive'}">Absent</button>
            <button onclick="markAttendance('${cls}','${date}','${s.id}','late')"
              class="toggle-btn ${status==='late'?'late':'inactive'}">Late</button>
          </div>
        </td>
      </tr>`;
  }).join('');
 
  updateAttendanceSummary(cls, date);
}
 
function markAttendance(cls, date, id, status) {
  const key = `${cls}_${date}`;
  if (!attendanceState[key]) attendanceState[key] = {};
  // Toggle off if same
  attendanceState[key][id] = attendanceState[key][id] === status ? null : status;
  renderAttendance();
}
 
function updateAttendanceSummary(cls, date) {
  const key     = `${cls}_${date}`;
  const state   = attendanceState[key] || {};
  const values  = Object.values(state);
  const present = values.filter(v => v === 'present').length;
  const absent  = values.filter(v => v === 'absent').length;
  const late    = values.filter(v => v === 'late').length;
  const total   = students.filter(s => s.grade === cls).length;
  const rate    = total > 0 ? Math.round((present + late) / total * 100) : 0;
 
  document.getElementById('att-present').textContent = present;
  document.getElementById('att-absent').textContent  = absent;
  document.getElementById('att-late').textContent    = late;
  document.getElementById('att-rate').textContent    = rate + '%';
  document.getElementById('att-rate-bar').style.width = rate + '%';
}
 
function saveAttendance() {
  const cls  = document.getElementById('attend-class').value;
  const date = document.getElementById('attend-date').value;
  const key  = `${cls}_${date}`;
  const state = attendanceState[key] || {};
  const unmarked = Object.values(state).filter(v => v === null).length;
 
  if (unmarked > 0) {
    alert(`⚠️ ${unmarked} student(s) are not yet marked. Please mark all students before saving.`);
    return;
  }
  document.getElementById('toast-msg').textContent = `Attendance for ${cls} saved successfully.`;
  showToast();
}
 
/* ─────────────────────────────────────────────────────────────
   INITIALISATION
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date in attendance date picker
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('attend-date').value = today;
 
  // Set today's date in registration admission date
  document.getElementById('reg-admission').value = today;
 
  // Initial renders (Registration is shown first, others lazy-load on tab click)
  initStudentReport();
});
