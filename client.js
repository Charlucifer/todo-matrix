window.__ModuleLoader__.load({
  id: '@local/todo-matrix',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'todo-matrix';
    const STORAGE_KEY = 'dsh.todo-matrix.v1';
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

    const ZH = {
      appTitle: '待办矩阵',
      appSubtitle: '重要 × 紧急 · DDL 日历 · 紧急优先提醒',
      launcher: '待办矩阵',
      openApp: '打开待办矩阵',
      close: '关闭',
      statsPending: '待办',
      statsUrgent: '紧急',
      statsToday: '今日',
      addPlaceholder: '添加待办，例如：提交季度报告…',
      addButton: '添加',
      important: '重要',
      urgent: '紧急',
      dueLabel: 'DDL',
      noDeadline: '未设 DDL',
      emptyQuadrant: '拖拽待办到这里',
      emptyQuadrantHint: '或在上方添加一项',
      q1Title: '重要且紧急',
      q1Hint: '立即处理',
      q2Title: '重要不紧急',
      q2Hint: '规划推进',
      q3Title: '紧急不重要',
      q3Hint: '尽快处理',
      q4Title: '不重要不紧急',
      q4Hint: '有空再说',
      calendar: 'DDL 日历',
      today: '今天',
      tomorrow: '明天',
      prevMonth: '上个月',
      nextMonth: '下个月',
      selectedDay: '当日 DDL',
      clearFilter: '清除筛选',
      calendarHint: '点选日期，查看当天 DDL',
      upcoming: '即将到期',
      noUpcoming: '暂无即将到期的待办',
      urgentTitle: '优先提醒',
      noUrgent: '没有紧急事项，节奏很好',
      remaining: '剩余',
      overdue: '已逾期',
      minutesShort: '分钟',
      hoursShort: '小时',
      daysShort: '天',
      editTitle: '编辑待办',
      editorHint: '调整象限、DDL 或完成状态',
      titleLabel: '待办内容',
      dueField: '截止时间（可选）',
      quadrantLabel: '所属象限',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      confirmDelete: '再次点击确认删除',
      markDone: '标记完成',
      markOpen: '标记未完成',
      reminderNew: '紧急提醒',
      view: '查看',
      dismiss: '忽略',
      dragHint: '拖拽任务卡片可调整象限',
      persistHint: '数据仅保存在本机浏览器',
      openTask: '打开待办详情',
      moreReminders: '还有紧急事项'
    };

    const EN = {
      appTitle: 'Todo Matrix',
      appSubtitle: 'Importance × urgency · deadline calendar · priority alerts',
      launcher: 'Todo Matrix',
      openApp: 'Open Todo Matrix',
      close: 'Close',
      statsPending: 'Open',
      statsUrgent: 'Urgent',
      statsToday: 'Today',
      addPlaceholder: 'Add a task, e.g. submit the quarterly report…',
      addButton: 'Add',
      important: 'Important',
      urgent: 'Urgent',
      dueLabel: 'Due',
      noDeadline: 'No deadline',
      emptyQuadrant: 'Drop a task here',
      emptyQuadrantHint: 'or add one above',
      q1Title: 'Important & urgent',
      q1Hint: 'Do first',
      q2Title: 'Important, not urgent',
      q2Hint: 'Schedule it',
      q3Title: 'Urgent, not important',
      q3Hint: 'Do quickly',
      q4Title: 'Neither urgent nor important',
      q4Hint: 'Later',
      calendar: 'Deadline calendar',
      today: 'Today',
      tomorrow: 'Tomorrow',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      selectedDay: 'Deadlines that day',
      clearFilter: 'Clear filter',
      calendarHint: 'Pick a day to see its deadlines',
      upcoming: 'Upcoming',
      noUpcoming: 'No upcoming deadlines',
      urgentTitle: 'Priority alerts',
      noUrgent: 'No urgent items — nicely paced',
      remaining: 'Left',
      overdue: 'Overdue',
      minutesShort: 'min',
      hoursShort: 'h',
      daysShort: 'd',
      editTitle: 'Edit task',
      editorHint: 'Adjust its quadrant, deadline, or status',
      titleLabel: 'Task',
      dueField: 'Deadline (optional)',
      quadrantLabel: 'Quadrant',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      confirmDelete: 'Click again to delete',
      markDone: 'Mark done',
      markOpen: 'Mark open',
      reminderNew: 'Urgent reminder',
      view: 'View',
      dismiss: 'Dismiss',
      dragHint: 'Drag a task card to change its quadrant',
      persistHint: 'Data stays in this browser',
      openTask: 'Open task details',
      moreReminders: 'more urgent items'
    };

    const QUADRANTS = [
      { key: 'q1', titleKey: 'q1Title', hintKey: 'q1Hint', icon: 'alert', tone: 'var(--dsw-alias-state-error-primary)' },
      { key: 'q2', titleKey: 'q2Title', hintKey: 'q2Hint', icon: 'target', tone: 'var(--dsw-alias-brand-primary)' },
      { key: 'q3', titleKey: 'q3Title', hintKey: 'q3Hint', icon: 'bolt', tone: 'var(--dsw-alias-state-warn-primary)' },
      { key: 'q4', titleKey: 'q4Title', hintKey: 'q4Hint', icon: 'leaf', tone: 'var(--dsw-alias-state-success-primary)' }
    ];

    const CSS = `
.dsh-todo-launcher {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  min-width: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.dsh-todo-launcher[data-wide="true"] {
  flex: 1 1 auto;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  padding: 0 10px;
  border-radius: 999px;
}
.dsh-todo-launcher:hover {
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 84%, transparent);
  color: var(--dsw-alias-label-primary);
}
.dsh-todo-launcher[data-open="true"] {
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 11%, transparent);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 24%, transparent);
}
.dsh-todo-launcher-icon {
  display: grid;
  place-items: center;
  flex: none;
  color: currentColor;
}
.dsh-todo-launcher-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-badge {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--dsw-alias-state-error-primary);
  color: var(--dsw-alias-bg-base);
  font-size: 9px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}
.dsh-todo-launcher[data-wide="false"] .dsh-todo-badge {
  position: absolute;
  top: 1px;
  right: -1px;
}
.dsh-todo-launcher[data-wide="true"] .dsh-todo-badge {
  margin-left: auto;
}

.dsh-todo-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(10px, 2.4vw, 34px);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 34%, transparent);
  backdrop-filter: blur(5px);
  pointer-events: auto;
  animation: dshTodoFadeIn .18s ease-out;
}
.dsh-todo-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(1180px, 100%);
  height: min(860px, 100%);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 78%, transparent);
  border-radius: 26px;
  color: var(--dsw-alias-label-primary);
  font-family: inherit;
  background:
    radial-gradient(900px 340px at 8% -8%, color-mix(in srgb, var(--dsw-alias-brand-primary) 17%, transparent), transparent 70%),
    radial-gradient(720px 300px at 98% 2%, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 9%, transparent), transparent 72%),
    color-mix(in srgb, var(--dsw-alias-bg-overlay) 76%, transparent);
  backdrop-filter: blur(30px) saturate(150%);
  box-shadow:
    0 30px 90px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--dsw-alias-bg-overlay) 62%, transparent);
  animation: dshTodoPop .22s cubic-bezier(.2, .8, .2, 1);
}

.dsh-todo-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 62%, transparent);
}
.dsh-todo-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}
.dsh-todo-logo {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);
  border-radius: 13px;
  color: var(--dsw-alias-brand-primary);
  background: linear-gradient(145deg, color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent), color-mix(in srgb, var(--dsw-alias-bg-overlay) 62%, transparent));
  box-shadow: 0 7px 20px color-mix(in srgb, var(--dsw-alias-brand-primary) 17%, transparent);
}
.dsh-todo-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: .01em;
}
.dsh-todo-subtitle {
  margin: 3px 0 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 10.5px;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}
.dsh-todo-stats {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.dsh-todo-stat {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 25px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 46%, transparent);
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}
.dsh-todo-stat b {
  color: var(--dsw-alias-label-primary);
  font-size: 11px;
  font-weight: 750;
}
.dsh-todo-stat[data-tone="danger"] b { color: var(--dsw-alias-state-error-primary); }
.dsh-todo-stat[data-tone="brand"] b { color: var(--dsw-alias-brand-primary); }
.dsh-todo-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 58%, transparent);
  border-radius: 10px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 44%, transparent);
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.dsh-todo-close:hover {
  color: var(--dsw-alias-state-error-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 38%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 11%, transparent);
}

.dsh-todo-body {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(304px, .95fr);
  flex: 1;
  gap: 12px;
  padding: 13px 18px;
  min-height: 0;
  overflow: hidden;
}
.dsh-todo-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.dsh-todo-add {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  padding: 7px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 64%, transparent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 58%, transparent);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
}
.dsh-todo-add-input {
  flex: 1 1 220px;
  min-width: 150px;
  height: 36px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 62%, transparent);
  border-radius: 11px;
  outline: none;
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 58%, transparent);
  font: inherit;
  font-size: 12px;
  transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
}
.dsh-todo-add-input::placeholder { color: var(--dsw-alias-label-secondary); opacity: .78; }
.dsh-todo-add-input:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 58%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 15%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 74%, transparent);
}
.dsh-todo-add-input[data-invalid="true"] {
  border-color: var(--dsw-alias-state-error-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-error-primary) 16%, transparent);
  animation: dshTodoShake .24s ease-in-out;
}
.dsh-todo-duebox {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 62%, transparent);
  border-radius: 11px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 48%, transparent);
  font-size: 10px;
  font-weight: 650;
}
.dsh-todo-duebox input {
  width: 148px;
  padding: 0;
  border: 0;
  outline: 0;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  font: inherit;
  font-size: 10.5px;
  font-weight: 500;
}
.dsh-todo-duebox input::-webkit-calendar-picker-indicator { opacity: .55; cursor: pointer; }
.dsh-todo-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 66%, transparent);
  border-radius: 11px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 46%, transparent);
  font: inherit;
  font-size: 10.5px;
  font-weight: 650;
  cursor: pointer;
  transition: color .15s ease, background .15s ease, border-color .15s ease;
}
.dsh-todo-toggle:hover { color: var(--dsw-alias-label-primary); }
.dsh-todo-toggle[data-kind="important"][data-on="true"] {
  color: var(--dsw-alias-brand-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 42%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 13%, transparent);
}
.dsh-todo-toggle[data-kind="urgent"][data-on="true"] {
  color: var(--dsw-alias-state-error-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 42%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
}
.dsh-todo-add-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 11px;
  color: var(--dsw-alias-bg-base);
  background: linear-gradient(135deg, var(--dsw-alias-brand-primary), color-mix(in srgb, var(--dsw-alias-brand-primary) 62%, var(--dsw-alias-state-warn-primary)));
  box-shadow: 0 7px 18px color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
  font: inherit;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
}
.dsh-todo-add-btn:hover { filter: brightness(1.06); box-shadow: 0 9px 22px color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent); }
.dsh-todo-add-btn:active { transform: translateY(1px); }

.dsh-todo-matrix {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  flex: 1;
  gap: 9px;
  min-height: 0;
}
.dsh-todo-quad {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 56%, transparent);
  border-radius: 17px;
  background:
    linear-gradient(152deg, color-mix(in srgb, var(--q-tone) 12%, transparent), color-mix(in srgb, var(--dsw-alias-bg-layer-1) 48%, transparent));
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}
.dsh-todo-quad[data-drag="true"] {
  border-color: color-mix(in srgb, var(--q-tone) 62%, transparent);
  background: linear-gradient(152deg, color-mix(in srgb, var(--q-tone) 19%, transparent), color-mix(in srgb, var(--dsw-alias-bg-layer-1) 56%, transparent));
  transform: scale(1.004);
}
.dsh-todo-quad-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 2px 8px;
}
.dsh-todo-quad-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  border: 1px solid color-mix(in srgb, var(--q-tone) 26%, transparent);
  border-radius: 9px;
  color: var(--q-tone);
  background: color-mix(in srgb, var(--q-tone) 13%, transparent);
}
.dsh-todo-quad-titles { min-width: 0; }
.dsh-todo-quad-titles h3 {
  margin: 0;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-quad-titles p {
  margin: 2px 0 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 9.5px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-quad-count {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 20px;
  margin-left: auto;
  padding: 0 5px;
  border-radius: 999px;
  color: var(--q-tone);
  background: color-mix(in srgb, var(--q-tone) 12%, transparent);
  font-size: 9.5px;
  font-weight: 750;
}
.dsh-todo-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  padding: 1px 2px 3px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.dsh-todo-list::-webkit-scrollbar,
.dsh-todo-side::-webkit-scrollbar,
.dsh-todo-up-list::-webkit-scrollbar,
.dsh-todo-urgent-list::-webkit-scrollbar { width: 6px; }
.dsh-todo-list::-webkit-scrollbar-thumb,
.dsh-todo-side::-webkit-scrollbar-thumb,
.dsh-todo-up-list::-webkit-scrollbar-thumb,
.dsh-todo-urgent-list::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);
}
.dsh-todo-empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-height: 52px;
  padding: 10px;
  border: 1px dashed color-mix(in srgb, var(--q-tone) 28%, transparent);
  border-radius: 12px;
  color: var(--dsw-alias-label-secondary);
  text-align: center;
}
.dsh-todo-empty strong { font-size: 10px; font-weight: 600; }
.dsh-todo-empty span { font-size: 9px; opacity: .8; }

.dsh-todo-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 9px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 68%, transparent);
  border-radius: 11px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 54%, transparent);
  cursor: grab;
  transition: background .15s ease, border-color .15s ease, transform .15s ease, box-shadow .15s ease;
}
.dsh-todo-item:hover {
  border-color: color-mix(in srgb, var(--q-tone) 34%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, transparent);
  box-shadow: 0 5px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
  transform: translateY(-1px);
}
.dsh-todo-item:active { cursor: grabbing; }
.dsh-todo-item[data-done="true"] { opacity: .48; }
.dsh-todo-item[data-overdue="true"] {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
  padding-left: 8px;
}
.dsh-todo-check {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 1px;
  padding: 0;
  border: 1.5px solid color-mix(in srgb, var(--dsw-alias-label-secondary) 56%, transparent);
  border-radius: 50%;
  color: var(--dsw-alias-bg-base);
  background: transparent;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, transform .15s ease;
}
.dsh-todo-check:hover { border-color: var(--dsw-alias-state-success-primary); transform: scale(1.08); }
.dsh-todo-item[data-done="true"] .dsh-todo-check {
  border-color: var(--dsw-alias-state-success-primary);
  background: var(--dsw-alias-state-success-primary);
}
.dsh-todo-item-body { flex: 1; min-width: 0; outline: none; }
.dsh-todo-item-title {
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.dsh-todo-item[data-done="true"] .dsh-todo-item-title { text-decoration: line-through; text-decoration-thickness: 1px; }
.dsh-todo-item-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 3px;
  color: var(--dsw-alias-label-secondary);
  font-size: 9.5px;
  line-height: 1.2;
}
.dsh-todo-due {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  min-width: 0;
}
.dsh-todo-item[data-overdue="true"] .dsh-todo-due { color: var(--dsw-alias-state-error-primary); font-weight: 650; }
.dsh-todo-tag-urgent {
  padding: 1px 5px;
  border-radius: 999px;
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 11%, transparent);
  font-size: 8.5px;
  font-weight: 700;
}

.dsh-todo-side {
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-height: 0;
  padding-right: 2px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.dsh-todo-side-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 58%, transparent);
  border-radius: 17px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 48%, transparent);
}
.dsh-todo-side-head {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.dsh-todo-side-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 25px;
  height: 25px;
  border-radius: 8px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 58%, transparent);
}
.dsh-todo-side-title {
  margin: 0;
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-side-count {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  margin-left: auto;
  padding: 0 5px;
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 62%, transparent);
  font-size: 9px;
  font-weight: 700;
}
.dsh-todo-side-empty {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 4px 5px;
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.dsh-todo-urgent {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 22%, transparent);
  background:
    radial-gradient(320px 140px at 100% 0%, color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent), transparent 72%),
    color-mix(in srgb, var(--dsw-alias-bg-layer-1) 52%, transparent);
}
.dsh-todo-urgent .dsh-todo-side-icon {
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 13%, transparent);
}
.dsh-todo-urgent .dsh-todo-side-count {
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
}
.dsh-todo-urgent-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
  margin-top: 7px;
  overflow-y: auto;
}
.dsh-todo-urgent-row {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 8px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 44%, transparent);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;
}
.dsh-todo-urgent-row:hover {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 58%, transparent);
}
.dsh-todo-urgent-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-error-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);
  animation: dshTodoPulse 2.2s ease-in-out infinite;
}
.dsh-todo-urgent-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 10.5px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-urgent-time {
  flex: none;
  color: var(--dsw-alias-state-error-primary);
  font-size: 9px;
  font-weight: 750;
  white-space: nowrap;
}

.dsh-todo-cal { flex: none; }
.dsh-todo-cal-nav {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
}
.dsh-todo-icon-btn {
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 56%, transparent);
  border-radius: 7px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 48%, transparent);
  cursor: pointer;
}
.dsh-todo-icon-btn:hover {
  color: var(--dsw-alias-label-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 34%, transparent);
}
.dsh-todo-today-btn {
  height: 23px;
  padding: 0 7px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent);
  border-radius: 7px;
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent);
  font: inherit;
  font-size: 9px;
  font-weight: 700;
  cursor: pointer;
}
.dsh-todo-today-btn:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 15%, transparent); }
.dsh-todo-cal-week,
.dsh-todo-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 2px;
}
.dsh-todo-cal-week { margin-top: 8px; }
.dsh-todo-cal-week span {
  padding: 2px 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 8.5px;
  font-weight: 650;
  text-align: center;
}
.dsh-todo-cal-grid { margin-top: 2px; }
.dsh-todo-cal-day {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 32px;
  min-height: 32px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  font: inherit;
  cursor: pointer;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
}
.dsh-todo-cal-day:hover { background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 66%, transparent); }
.dsh-todo-cal-day[data-outside="true"] { opacity: .34; }
.dsh-todo-cal-day[data-today="true"] {
  color: var(--dsw-alias-brand-primary);
  font-weight: 800;
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 48%, transparent);
}
.dsh-todo-cal-day[data-selected="true"] {
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 58%, transparent);
}
.dsh-todo-cal-num { font-size: 9.5px; line-height: 1; }
.dsh-todo-cal-dots {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 4px;
}
.dsh-todo-cal-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--q-tone);
}
.dsh-todo-cal-hint {
  margin: 6px 1px 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 8.5px;
  line-height: 1.35;
}

.dsh-todo-upcoming { flex: 1; min-height: 128px; }
.dsh-todo-filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 20px;
  max-width: 138px;
  margin-left: auto;
  padding: 0 6px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);
  border-radius: 999px;
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  font: inherit;
  font-size: 8.5px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.dsh-todo-up-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  margin-top: 6px;
  overflow-y: auto;
}
.dsh-todo-up-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 5px;
  border: 0;
  border-radius: 8px;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.dsh-todo-up-row:hover { background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 54%, transparent); }
.dsh-todo-up-dot {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--q-tone);
}
.dsh-todo-up-body { flex: 1; min-width: 0; }
.dsh-todo-up-title {
  display: block;
  overflow: hidden;
  font-size: 9.5px;
  font-weight: 600;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-up-time {
  display: block;
  margin-top: 1px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 8.5px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-up-row[data-overdue="true"] .dsh-todo-up-time { color: var(--dsw-alias-state-error-primary); font-weight: 650; }

.dsh-todo-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 22px 10px;
  border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 46%, transparent);
  color: var(--dsw-alias-label-secondary);
  font-size: 9px;
}

.dsh-todo-toast {
  position: absolute;
  top: 78px;
  left: 50%;
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 9px;
  width: max-content;
  max-width: min(570px, calc(100% - 28px));
  padding: 9px 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, transparent);
  border-radius: 15px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, color-mix(in srgb, var(--dsw-alias-bg-overlay) 86%, transparent));
  backdrop-filter: blur(22px) saturate(150%);
  box-shadow: 0 14px 38px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
  transform: translateX(-50%);
  animation: dshTodoSlideDown .24s cubic-bezier(.2, .8, .2, 1);
}
.dsh-todo-toast-dot {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dsw-alias-state-error-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);
  animation: dshTodoPulse 1.9s ease-in-out infinite;
}
.dsh-todo-toast-body { min-width: 0; }
.dsh-todo-toast-kicker {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--dsw-alias-state-error-primary);
  font-size: 8.5px;
  font-weight: 750;
  letter-spacing: .03em;
  text-transform: uppercase;
}
.dsh-todo-toast-title {
  margin-top: 1px;
  overflow: hidden;
  max-width: 280px;
  font-size: 11px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-todo-toast-meta {
  margin-top: 1px;
  color: var(--dsw-alias-label-secondary);
  font-size: 9px;
  white-space: nowrap;
}
.dsh-todo-toast-more {
  flex: none;
  padding: 1px 5px;
  border-radius: 999px;
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
  font-size: 8.5px;
  font-weight: 750;
}
.dsh-todo-toast-action {
  flex: none;
  height: 26px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 34%, transparent);
  border-radius: 8px;
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 48%, transparent);
  font: inherit;
  font-size: 9px;
  font-weight: 700;
  cursor: pointer;
}
.dsh-todo-toast-close {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  color: var(--dsw-alias-label-secondary);
  background: transparent;
  cursor: pointer;
}
.dsh-todo-toast-close:hover { color: var(--dsw-alias-label-primary); background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 66%, transparent); }

.dsh-todo-editor-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 42%, transparent);
  backdrop-filter: blur(12px);
  animation: dshTodoFadeIn .16s ease-out;
}
.dsh-todo-editor {
  width: min(462px, 100%);
  max-height: 100%;
  padding: 18px;
  overflow-y: auto;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 78%, transparent);
  border-radius: 21px;
  background:
    radial-gradient(360px 180px at 100% 0%, color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent), transparent 72%),
    color-mix(in srgb, var(--dsw-alias-bg-overlay) 90%, transparent);
  box-shadow: 0 26px 70px color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);
  animation: dshTodoPop .2s cubic-bezier(.2, .8, .2, 1);
}
.dsh-todo-editor-head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
}
.dsh-todo-editor-head h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}
.dsh-todo-editor-head p {
  margin: 3px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}
.dsh-todo-editor-head .dsh-todo-close { margin-left: auto; flex: none; }
.dsh-todo-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 11px;
}
.dsh-todo-label {
  color: var(--dsw-alias-label-secondary);
  font-size: 9.5px;
  font-weight: 650;
  letter-spacing: .02em;
}
.dsh-todo-input {
  width: 100%;
  height: 38px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 66%, transparent);
  border-radius: 11px;
  outline: none;
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 56%, transparent);
  font: inherit;
  font-size: 12px;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.dsh-todo-input:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 58%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 15%, transparent);
}
.dsh-todo-quad-preview {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  height: 28px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--q-tone) 30%, transparent);
  border-radius: 999px;
  color: var(--q-tone);
  background: color-mix(in srgb, var(--q-tone) 10%, transparent);
  font-size: 10px;
  font-weight: 650;
}
.dsh-todo-quad-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--q-tone);
}
.dsh-todo-editor-toggles {
  display: flex;
  gap: 7px;
  margin: 1px 0 15px;
}
.dsh-todo-done-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 27px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, transparent);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 42%, transparent);
  font: inherit;
  font-size: 9.5px;
  font-weight: 650;
  cursor: pointer;
}
.dsh-todo-done-toggle[data-done="true"] {
  color: var(--dsw-alias-state-success-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 34%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);
}
.dsh-todo-editor-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.dsh-todo-editor-actions-right { display: flex; align-items: center; gap: 6px; }
.dsh-todo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 64%, transparent);
  border-radius: 9px;
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 42%, transparent);
  font: inherit;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
}
.dsh-todo-btn:hover { background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 68%, transparent); }
.dsh-todo-btn-danger { color: var(--dsw-alias-state-error-primary); }
.dsh-todo-btn-danger:hover { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
.dsh-todo-btn-primary {
  border-color: transparent;
  color: var(--dsw-alias-bg-base);
  background: var(--dsw-alias-brand-primary);
  box-shadow: 0 5px 14px color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
}
.dsh-todo-btn-primary:hover { filter: brightness(1.06); background: var(--dsw-alias-brand-primary); }

@keyframes dshTodoFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes dshTodoPop {
  from { opacity: 0; transform: translateY(14px) scale(.986); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes dshTodoSlideDown {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
@keyframes dshTodoPulse {
  0%, 100% { opacity: .55; transform: scale(.88); }
  50% { opacity: 1; transform: scale(1.16); }
}
@keyframes dshTodoShake {
  0%, 100% { transform: translateX(0); }
  30% { transform: translateX(-4px); }
  65% { transform: translateX(3px); }
}

@media (max-width: 940px) {
  .dsh-todo-body { grid-template-columns: 1fr; overflow-y: auto; }
  .dsh-todo-main { min-height: 500px; }
  .dsh-todo-side { overflow: visible; }
  .dsh-todo-matrix { min-height: 430px; }
}
@media (max-width: 640px) {
  .dsh-todo-backdrop { padding: 0; }
  .dsh-todo-panel { width: 100%; height: 100%; border-radius: 0; }
  .dsh-todo-header { flex-wrap: wrap; padding: 13px 14px 10px; }
  .dsh-todo-subtitle { display: none; }
  .dsh-todo-stats { display: none; }
  .dsh-todo-body { padding: 10px; }
  .dsh-todo-main { min-height: 0; }
  .dsh-todo-matrix { grid-template-columns: 1fr; grid-template-rows: none; min-height: 0; }
  .dsh-todo-quad { min-height: 176px; }
  .dsh-todo-foot { display: none; }
  .dsh-todo-toast { top: 68px; }
  .dsh-todo-duebox { flex: 1 1 170px; }
  .dsh-todo-duebox input { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-todo-backdrop,
  .dsh-todo-panel,
  .dsh-todo-toast,
  .dsh-todo-editor-layer,
  .dsh-todo-editor,
  .dsh-todo-urgent-dot,
  .dsh-todo-toast-dot { animation: none !important; }
}
`;

    function pad2(value) {
      return String(value).padStart(2, '0');
    }

    function dayKeyOf(date) {
      const value = new Date(date);
      return value.getFullYear() + '-' + pad2(value.getMonth() + 1) + '-' + pad2(value.getDate());
    }

    function dateFromDayKey(key) {
      const parts = String(key).split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
    }

    function sameDay(a, b) {
      return dayKeyOf(a) === dayKeyOf(b);
    }

    function toDateTimeInput(iso) {
      if (!iso) return '';
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return '';
      return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) +
        'T' + pad2(date.getHours()) + ':' + pad2(date.getMinutes());
    }

    function fromDateTimeInput(value) {
      if (!value) return null;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date.toISOString();
    }

    function makeId() {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      return 'tm-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
    }

    function quadrantForFlags(important, urgent) {
      if (important) return urgent ? QUADRANTS[0] : QUADRANTS[1];
      return urgent ? QUADRANTS[2] : QUADRANTS[3];
    }

    function quadrantOf(todo) {
      return quadrantForFlags(Boolean(todo.important), Boolean(todo.urgent));
    }

    function sortTodos(todos) {
      return todos.slice().sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        const aDue = a.due ? new Date(a.due).getTime() : Infinity;
        const bDue = b.due ? new Date(b.due).getTime() : Infinity;
        if (aDue !== bDue) return aDue - bDue;
        return (a.createdAt || 0) - (b.createdAt || 0);
      });
    }

    function formatTime(iso, lang) {
      try {
        return new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
      } catch (error) {
        return new Date(iso).toLocaleTimeString();
      }
    }

    function formatDue(iso, lang, t, now) {
      const date = new Date(iso);
      const base = new Date(now);
      const tomorrow = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 1);
      const time = formatTime(iso, lang);
      if (sameDay(date, base)) return t('today') + ' ' + time;
      if (sameDay(date, tomorrow)) return t('tomorrow') + ' ' + time;
      let text;
      try {
        text = new Intl.DateTimeFormat(lang, {
          year: date.getFullYear() === base.getFullYear() ? undefined : 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(date);
      } catch (error) {
        text = date.toLocaleDateString();
      }
      return text + ' ' + time;
    }

    function relativeDelta(diff, t) {
      const abs = Math.abs(diff);
      if (abs < HOUR) return { value: Math.max(1, Math.ceil(abs / MINUTE)), unitKey: 'minutesShort' };
      if (abs < DAY) return { value: Math.max(1, Math.ceil(abs / HOUR)), unitKey: 'hoursShort' };
      return { value: Math.ceil(abs / DAY), unitKey: 'daysShort' };
    }

    function dueLine(todo, lang, now, t) {
      if (!todo.due) return { text: t('noDeadline'), overdue: false, soon: false };
      const diff = new Date(todo.due).getTime() - now;
      if (diff < 0) {
        const delta = relativeDelta(diff, t);
        return { text: t('overdue') + ' ' + delta.value + ' ' + t(delta.unitKey), overdue: true, soon: false };
      }
      return { text: formatDue(todo.due, lang, t, now), overdue: false, soon: diff < DAY };
    }

    function countdown(todo, t) {
      if (!todo.due) return t('noDeadline');
      const diff = new Date(todo.due).getTime() - Date.now();
      const delta = relativeDelta(diff, t);
      return (diff < 0 ? t('overdue') : t('remaining')) + ' ' + delta.value + ' ' + t(delta.unitKey);
    }

    function normalizeTodo(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const title = String(raw.title || '').trim().slice(0, 120);
      if (!title) return null;
      const due = typeof raw.due === 'string' && !Number.isNaN(new Date(raw.due).getTime()) ? raw.due : null;
      return {
        id: String(raw.id || makeId()),
        title,
        done: Boolean(raw.done),
        important: Boolean(raw.important),
        urgent: Boolean(raw.urgent),
        due,
        createdAt: Number(raw.createdAt) || Date.now()
      };
    }

    function loadTodos() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map(normalizeTodo).filter(Boolean);
      } catch (error) {
        return [];
      }
    }

    function createStore() {
      let state = { todos: loadTodos(), open: false };
      const listeners = new Set();
      const emit = () => listeners.forEach((listener) => listener());
      const persist = () => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
        } catch (error) {
          /* Storage can be unavailable in restricted origins; keep the board in memory. */
        }
      };
      return {
        get() {
          return state;
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        setTodos(updater) {
          state = { ...state, todos: typeof updater === 'function' ? updater(state.todos) : updater };
          persist();
          emit();
        },
        setOpen(open) {
          if (state.open === open) return;
          state = { ...state, open };
          emit();
        }
      };
    }

    function useStore(store) {
      const [, force] = React.useReducer((value) => value + 1, 0);
      React.useEffect(() => store.subscribe(force), [store]);
      return store.get();
    }

    function useNow(interval) {
      const [now, setNow] = React.useState(() => Date.now());
      React.useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), interval);
        return () => clearInterval(timer);
      }, [interval]);
      return now;
    }

    function useLocaleRevision(ctx) {
      const [, force] = React.useReducer((value) => value + 1, 0);
      React.useEffect(() => ctx.locale.subscribe(force), [ctx]);
    }

    function iconChildren(name) {
      switch (name) {
        case 'matrix':
          return h('g', null,
            h('rect', { x: 3.5, y: 3.5, width: 7, height: 7, rx: 2 }),
            h('rect', { x: 13.5, y: 3.5, width: 7, height: 7, rx: 2 }),
            h('rect', { x: 3.5, y: 13.5, width: 7, height: 7, rx: 2 }),
            h('rect', { x: 13.5, y: 13.5, width: 7, height: 7, rx: 2 })
          );
        case 'plus':
          return h('g', null, h('path', { d: 'M12 5v14M5 12h14' }));
        case 'x':
          return h('g', null, h('path', { d: 'M6 6l12 12M18 6L6 18' }));
        case 'chevronLeft':
          return h('g', null, h('path', { d: 'M15 5l-7 7 7 7' }));
        case 'chevronRight':
          return h('g', null, h('path', { d: 'M9 5l7 7-7 7' }));
        case 'clock':
          return h('g', null, h('circle', { cx: 12, cy: 12, r: 8.5 }), h('path', { d: 'M12 7.5V12l3 2' }));
        case 'check':
          return h('g', null, h('path', { d: 'M5 12.5l4.2 4.2L19 7' }));
        case 'alert':
          return h('g', null, h('path', { d: 'M12 4l9 16H3L12 4z' }), h('path', { d: 'M12 9.5v4.2' }), h('path', { d: 'M12 17.2h.01' }));
        case 'target':
          return h('g', null, h('circle', { cx: 12, cy: 12, r: 8 }), h('circle', { cx: 12, cy: 12, r: 3.6 }), h('path', { d: 'M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3' }));
        case 'bolt':
          return h('g', null, h('path', { d: 'M13.5 3L5.5 13.2h5l-1 7.8 8-10.3h-5l1-7.7z' }));
        case 'leaf':
          return h('g', null, h('path', { d: 'M20 4c-8.8 0-14 3.9-14 10a5.2 5.2 0 005.2 5.2C17.4 19.2 20 13 20 4z' }), h('path', { d: 'M4 21c1.4-5.1 4.7-8.5 9.5-10.5' }));
        case 'trash':
          return h('g', null, h('path', { d: 'M4 7h16M9.5 7V4.5h5V7M6.5 7l.8 12.2h9.4L17.5 7' }), h('path', { d: 'M10 11v5M14 11v5' }));
        case 'bell':
          return h('g', null, h('path', { d: 'M6.5 10a5.5 5.5 0 0111 0c0 4 1.5 5.5 2.3 6.4H4.2C5 15.5 6.5 14 6.5 10z' }), h('path', { d: 'M10 19.2a2.3 2.3 0 004 0' }));
        case 'calendar':
          return h('g', null, h('rect', { x: 3.5, y: 5.5, width: 17, height: 15, rx: 3 }), h('path', { d: 'M8 3v4M16 3v4M3.5 10.5h17' }));
        case 'flag':
          return h('g', null, h('path', { d: 'M6 21V4M6 4.5h11l-2.3 4L17 13H6' }));
        case 'spark':
          return h('g', null, h('path', { d: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z' }));
        default:
          return h('g', null, h('circle', { cx: 12, cy: 12, r: 8 }));
      }
    }

    function Icon({ name, size = 16, strokeWidth = 1.8 }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
        style: { display: 'block', flex: 'none' }
      }, iconChildren(name));
    }

    function Styles() {
      return h('style', { 'data-dsh-todo-matrix': 'true' }, CSS);
    }

    function Launcher({ store, ctx, wide }) {
      useLocaleRevision(ctx);
      const t = ctx.locale.bind(NS);
      const state = useStore(store);
      const urgent = state.todos.filter((todo) => todo.urgent && !todo.done).length;
      return h('button', {
        type: 'button',
        className: 'dsh-todo-launcher',
        'data-wide': wide ? 'true' : 'false',
        'data-open': state.open ? 'true' : 'false',
        title: t('openApp'),
        'aria-label': t('launcher'),
        'aria-expanded': state.open,
        onClick: () => store.setOpen(!state.open)
      },
        h('span', { className: 'dsh-todo-launcher-icon' }, h(Icon, { name: 'matrix', size: wide ? 16 : 18 })),
        wide ? h('span', { className: 'dsh-todo-launcher-label' }, t('launcher')) : null,
        urgent > 0 ? h('span', { className: 'dsh-todo-badge' }, urgent > 99 ? '99+' : String(urgent)) : null
      );
    }

    function Stat({ label, value, tone }) {
      return h('span', { className: 'dsh-todo-stat', 'data-tone': tone || 'neutral' },
        h('b', null, String(value)),
        h('span', null, label)
      );
    }

    function Header({ todos, now, t, onClose }) {
      const pending = todos.filter((todo) => !todo.done).length;
      const urgent = todos.filter((todo) => todo.urgent && !todo.done).length;
      const todayKey = dayKeyOf(new Date(now));
      const today = todos.filter((todo) => !todo.done && todo.due && dayKeyOf(new Date(todo.due)) === todayKey).length;
      return h('header', { className: 'dsh-todo-header' },
        h('div', { className: 'dsh-todo-brand' },
          h('div', { className: 'dsh-todo-logo' }, h(Icon, { name: 'matrix', size: 21, strokeWidth: 1.7 })),
          h('div', { style: { minWidth: 0 } },
            h('h1', { className: 'dsh-todo-title' }, t('appTitle')),
            h('p', { className: 'dsh-todo-subtitle' }, t('appSubtitle'))
          )
        ),
        h('div', { className: 'dsh-todo-header-right' },
          h('div', { className: 'dsh-todo-stats' },
            h(Stat, { label: t('statsPending'), value: pending }),
            h(Stat, { label: t('statsUrgent'), value: urgent, tone: 'danger' }),
            h(Stat, { label: t('statsToday'), value: today, tone: 'brand' })
          ),
          h('button', {
            type: 'button',
            className: 'dsh-todo-close',
            title: t('close'),
            'aria-label': t('close'),
            onClick: onClose
          }, h(Icon, { name: 'x', size: 17 }))
        )
      );
    }

    function AddForm({ t, onAdd }) {
      const [title, setTitle] = React.useState('');
      const [due, setDue] = React.useState('');
      const [important, setImportant] = React.useState(false);
      const [urgent, setUrgent] = React.useState(false);
      const [invalid, setInvalid] = React.useState(false);
      const inputRef = React.useRef(null);

      React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
      }, []);

      const submit = (event) => {
        event.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
          setInvalid(true);
          if (inputRef.current) inputRef.current.focus();
          return;
        }
        onAdd({ title: trimmed, due: fromDateTimeInput(due), important, urgent });
        setTitle('');
        setDue('');
        setImportant(false);
        setUrgent(false);
        setInvalid(false);
        if (inputRef.current) inputRef.current.focus();
      };

      return h('form', { className: 'dsh-todo-add', onSubmit: submit },
        h('input', {
          ref: inputRef,
          className: 'dsh-todo-add-input',
          'data-invalid': invalid ? 'true' : 'false',
          value: title,
          maxLength: 120,
          placeholder: t('addPlaceholder'),
          'aria-label': t('addPlaceholder'),
          onChange: (event) => {
            setTitle(event.target.value);
            if (invalid) setInvalid(false);
          }
        }),
        h('label', { className: 'dsh-todo-duebox', title: t('dueField') },
          h(Icon, { name: 'calendar', size: 13 }),
          h('span', null, t('dueLabel')),
          h('input', {
            type: 'datetime-local',
            value: due,
            'aria-label': t('dueField'),
            onChange: (event) => setDue(event.target.value)
          })
        ),
        h('button', {
          type: 'button',
          className: 'dsh-todo-toggle',
          'data-kind': 'important',
          'data-on': important ? 'true' : 'false',
          'aria-pressed': important,
          onClick: () => setImportant(!important)
        }, h(Icon, { name: 'target', size: 12 }), t('important')),
        h('button', {
          type: 'button',
          className: 'dsh-todo-toggle',
          'data-kind': 'urgent',
          'data-on': urgent ? 'true' : 'false',
          'aria-pressed': urgent,
          onClick: () => setUrgent(!urgent)
        }, h(Icon, { name: 'bolt', size: 12 }), t('urgent')),
        h('button', { type: 'submit', className: 'dsh-todo-add-btn' },
          h(Icon, { name: 'plus', size: 13, strokeWidth: 2.1 }),
          t('addButton')
        )
      );
    }

    function TodoItem({ todo, t, lang, now, onOpen, onToggle }) {
      const due = dueLine(todo, lang, now, t);
      return h('div', {
        className: 'dsh-todo-item',
        'data-done': todo.done ? 'true' : 'false',
        'data-overdue': due.overdue ? 'true' : 'false',
        draggable: true,
        onDragStart: (event) => {
          event.dataTransfer.setData('text/plain', todo.id);
          event.dataTransfer.effectAllowed = 'move';
        }
      },
        h('button', {
          type: 'button',
          className: 'dsh-todo-check',
          title: todo.done ? t('markOpen') : t('markDone'),
          'aria-label': todo.done ? t('markOpen') : t('markDone'),
          'aria-pressed': todo.done,
          onClick: (event) => {
            event.stopPropagation();
            onToggle(todo.id);
          }
        }, todo.done ? h(Icon, { name: 'check', size: 9, strokeWidth: 2.8 }) : null),
        h('div', {
          className: 'dsh-todo-item-body',
          role: 'button',
          tabIndex: 0,
          title: t('openTask'),
          onClick: () => onOpen(todo.id),
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onOpen(todo.id);
            }
          }
        },
          h('div', { className: 'dsh-todo-item-title' }, todo.title),
          h('div', { className: 'dsh-todo-item-meta' },
            h('span', { className: 'dsh-todo-due' },
              h(Icon, { name: due.overdue ? 'alert' : 'clock', size: 9 }),
              h('span', null, due.text)
            ),
            todo.urgent && !todo.done ? h('span', { className: 'dsh-todo-tag-urgent' }, t('urgent')) : null
          )
        )
      );
    }

    function Quadrant({ quad, todos, t, lang, now, onOpen, onToggle, onMove }) {
      const [over, setOver] = React.useState(false);
      const items = sortTodos(todos.filter((todo) => quadrantKey(todo) === quad.key));
      return h('section', {
        className: 'dsh-todo-quad',
        style: { '--q-tone': quad.tone },
        'data-drag': over ? 'true' : 'false',
        onDragOver: (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          if (!over) setOver(true);
        },
        onDragLeave: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOver(false);
        },
        onDrop: (event) => {
          event.preventDefault();
          setOver(false);
          const id = event.dataTransfer.getData('text/plain');
          if (id) onMove(id, quad);
        }
      },
        h('header', { className: 'dsh-todo-quad-head' },
          h('span', { className: 'dsh-todo-quad-icon' }, h(Icon, { name: quad.icon, size: 14 })),
          h('div', { className: 'dsh-todo-quad-titles' },
            h('h3', null, t(quad.titleKey)),
            h('p', null, t(quad.hintKey))
          ),
          h('span', { className: 'dsh-todo-quad-count', title: t(quad.titleKey) }, String(items.length))
        ),
        items.length
          ? h('div', { className: 'dsh-todo-list' }, items.map((todo) => h(TodoItem, {
            key: todo.id,
            todo,
            t,
            lang,
            now,
            onOpen,
            onToggle
          })))
          : h('div', { className: 'dsh-todo-empty' },
            h(Icon, { name: 'flag', size: 13 }),
            h('strong', null, t('emptyQuadrant')),
            h('span', null, t('emptyQuadrantHint'))
          )
      );
    }

    function UrgentCard({ items, t, now, onOpen }) {
      return h('section', { className: 'dsh-todo-side-card dsh-todo-urgent' },
        h('div', { className: 'dsh-todo-side-head' },
          h('span', { className: 'dsh-todo-side-icon' }, h(Icon, { name: 'bell', size: 13 })),
          h('h2', { className: 'dsh-todo-side-title' }, t('urgentTitle')),
          h('span', { className: 'dsh-todo-side-count' }, String(items.length))
        ),
        items.length
          ? h('div', { className: 'dsh-todo-urgent-list' }, items.slice(0, 4).map((todo) => h('button', {
            type: 'button',
            key: todo.id,
            className: 'dsh-todo-urgent-row',
            onClick: () => onOpen(todo.id),
            title: todo.title
          },
            h('span', { className: 'dsh-todo-urgent-dot' }),
            h('span', { className: 'dsh-todo-urgent-title' }, todo.title),
            h('span', { className: 'dsh-todo-urgent-time' }, countdown(todo, t))
          )))
          : h('div', { className: 'dsh-todo-side-empty' },
            h(Icon, { name: 'leaf', size: 13 }),
            h('span', null, t('noUrgent'))
          )
      );
    }

    function buildCalendar(cursor) {
      const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      const offset = (first.getDay() + 6) % 7;
      const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
      return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
    }

    function CalendarCard({ todos, now, lang, t, cursor, onCursor, selected, onSelect }) {
      const cells = buildCalendar(cursor);
      const byDay = new Map();
      todos.forEach((todo) => {
        if (todo.done || !todo.due) return;
        const key = dayKeyOf(new Date(todo.due));
        const list = byDay.get(key) || [];
        list.push(todo);
        byDay.set(key, list);
      });
      const weekdays = Array.from({ length: 7 }, (_, index) => {
        try {
          return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2024, 0, 1 + index));
        } catch (error) {
          return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
        }
      });
      let monthLabel;
      try {
        monthLabel = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long' }).format(cursor);
      } catch (error) {
        monthLabel = cursor.getFullYear() + ' / ' + (cursor.getMonth() + 1);
      }
      const todayKey = dayKeyOf(new Date(now));
      return h('section', { className: 'dsh-todo-side-card dsh-todo-cal' },
        h('div', { className: 'dsh-todo-side-head' },
          h('span', { className: 'dsh-todo-side-icon' }, h(Icon, { name: 'calendar', size: 13 })),
          h('h2', { className: 'dsh-todo-side-title', 'aria-live': 'polite' }, monthLabel),
          h('div', { className: 'dsh-todo-cal-nav' },
            h('button', {
              type: 'button',
              className: 'dsh-todo-icon-btn',
              title: t('prevMonth'),
              'aria-label': t('prevMonth'),
              onClick: () => onCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }, h(Icon, { name: 'chevronLeft', size: 12 })),
            h('button', {
              type: 'button',
              className: 'dsh-todo-today-btn',
              onClick: () => {
                const today = new Date();
                onCursor(new Date(today.getFullYear(), today.getMonth(), 1));
                onSelect(dayKeyOf(today));
              }
            }, t('today')),
            h('button', {
              type: 'button',
              className: 'dsh-todo-icon-btn',
              title: t('nextMonth'),
              'aria-label': t('nextMonth'),
              onClick: () => onCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }, h(Icon, { name: 'chevronRight', size: 12 }))
          )
        ),
        h('div', { className: 'dsh-todo-cal-week' }, weekdays.map((label, index) => h('span', { key: index }, label))),
        h('div', { className: 'dsh-todo-cal-grid' }, cells.map((date) => {
          const key = dayKeyOf(date);
          const list = byDay.get(key) || [];
          return h('button', {
            type: 'button',
            key,
            className: 'dsh-todo-cal-day',
            'data-outside': date.getMonth() !== cursor.getMonth() ? 'true' : 'false',
            'data-today': key === todayKey ? 'true' : 'false',
            'data-selected': key === selected ? 'true' : 'false',
            title: list.length ? key + ' · ' + list.length + ' ' + t('dueLabel') : key,
            onClick: () => {
              if (date.getMonth() !== cursor.getMonth()) {
                onCursor(new Date(date.getFullYear(), date.getMonth(), 1));
              }
              onSelect(key === selected ? null : key);
            }
          },
            h('span', { className: 'dsh-todo-cal-num' }, String(date.getDate())),
            list.length
              ? h('span', { className: 'dsh-todo-cal-dots' }, list.slice(0, 3).map((todo, index) => h('span', {
                key: todo.id + '-' + index,
                className: 'dsh-todo-cal-dot',
                style: { '--q-tone': quadrantOf(todo).tone }
              })))
              : null
          );
        })),
        h('p', { className: 'dsh-todo-cal-hint' }, t('calendarHint'))
      );
    }

    function UpcomingCard({ todos, t, lang, now, selected, onSelect, onOpen }) {
      const list = sortTodos(todos.filter((todo) => !todo.done && todo.due && (!selected || dayKeyOf(new Date(todo.due)) === selected))).slice(0, 8);
      let selectedLabel = '';
      if (selected) {
        try {
          selectedLabel = new Intl.DateTimeFormat(lang, { month: 'long', day: 'numeric', weekday: 'short' }).format(dateFromDayKey(selected));
        } catch (error) {
          selectedLabel = selected;
        }
      }
      return h('section', { className: 'dsh-todo-side-card dsh-todo-upcoming' },
        h('div', { className: 'dsh-todo-side-head' },
          h('span', { className: 'dsh-todo-side-icon' }, h(Icon, { name: 'clock', size: 13 })),
          h('h2', { className: 'dsh-todo-side-title' }, t('upcoming')),
          selected
            ? h('button', {
              type: 'button',
              className: 'dsh-todo-filter-chip',
              onClick: () => onSelect(null),
              title: t('clearFilter')
            }, h(Icon, { name: 'x', size: 9 }), selectedLabel)
            : h('span', { className: 'dsh-todo-side-count' }, String(list.length))
        ),
        list.length
          ? h('div', { className: 'dsh-todo-up-list' }, list.map((todo) => {
            const due = dueLine(todo, lang, now, t);
            return h('button', {
              type: 'button',
              key: todo.id,
              className: 'dsh-todo-up-row',
              'data-overdue': due.overdue ? 'true' : 'false',
              onClick: () => onOpen(todo.id),
              title: todo.title
            },
              h('span', { className: 'dsh-todo-up-dot', style: { '--q-tone': quadrantOf(todo).tone } }),
              h('span', { className: 'dsh-todo-up-body' },
                h('span', { className: 'dsh-todo-up-title' }, todo.title),
                h('span', { className: 'dsh-todo-up-time' }, due.text)
              )
            );
          }))
          : h('div', { className: 'dsh-todo-side-empty' },
            h(Icon, { name: 'calendar', size: 13 }),
            h('span', null, t('noUpcoming'))
          )
      );
    }

    function ReminderToast({ reminder, extra, t, lang, now, onOpen, onDismiss }) {
      return h('div', { className: 'dsh-todo-toast', role: 'status' },
        h('span', { className: 'dsh-todo-toast-dot' }),
        h('div', { className: 'dsh-todo-toast-body' },
          h('div', { className: 'dsh-todo-toast-kicker' },
            h(Icon, { name: 'bell', size: 10 }),
            h('span', null, t('reminderNew'))
          ),
          h('div', { className: 'dsh-todo-toast-title' }, reminder.title),
          h('div', { className: 'dsh-todo-toast-meta' }, countdown(reminder, t) + ' · ' + formatDue(reminder.due, lang, t, now))
        ),
        extra > 0 ? h('span', { className: 'dsh-todo-toast-more', title: t('moreReminders') }, '+' + extra) : null,
        h('button', { type: 'button', className: 'dsh-todo-toast-action', onClick: () => onOpen(reminder.id) }, t('view')),
        h('button', {
          type: 'button',
          className: 'dsh-todo-toast-close',
          title: t('dismiss'),
          'aria-label': t('dismiss'),
          onClick: onDismiss
        }, h(Icon, { name: 'x', size: 12 }))
      );
    }

    function Editor({ todo, t, onClose, onSave, onDelete, onToggle }) {
      const [title, setTitle] = React.useState(todo.title);
      const [due, setDue] = React.useState(toDateTimeInput(todo.due));
      const [important, setImportant] = React.useState(todo.important);
      const [urgent, setUrgent] = React.useState(todo.urgent);
      const [confirmDelete, setConfirmDelete] = React.useState(false);
      const titleRef = React.useRef(null);
      const timerRef = React.useRef(null);
      const quad = quadrantForFlags(important, urgent);

      React.useEffect(() => {
        if (titleRef.current) titleRef.current.focus();
        return () => {
          if (timerRef.current) clearTimeout(timerRef.current);
        };
      }, []);

      const submit = (event) => {
        event.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
          if (titleRef.current) titleRef.current.focus();
          return;
        }
        onSave(todo.id, { title: trimmed, due: fromDateTimeInput(due), important, urgent });
      };

      const askDelete = () => {
        if (!confirmDelete) {
          setConfirmDelete(true);
          timerRef.current = setTimeout(() => setConfirmDelete(false), 3000);
          return;
        }
        if (timerRef.current) clearTimeout(timerRef.current);
        onDelete(todo.id);
      };

      return h('div', {
        className: 'dsh-todo-editor-layer',
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        }
      },
        h('form', {
          className: 'dsh-todo-editor',
          onSubmit: submit,
          onMouseDown: (event) => event.stopPropagation()
        },
          h('div', { className: 'dsh-todo-editor-head' },
            h('div', null,
              h('h2', null, t('editTitle')),
              h('p', null, t('editorHint'))
            ),
            h('button', {
              type: 'button',
              className: 'dsh-todo-close',
              title: t('close'),
              'aria-label': t('close'),
              onClick: onClose
            }, h(Icon, { name: 'x', size: 17 }))
          ),
          h('label', { className: 'dsh-todo-field' },
            h('span', { className: 'dsh-todo-label' }, t('titleLabel')),
            h('input', {
              ref: titleRef,
              className: 'dsh-todo-input',
              value: title,
              maxLength: 120,
              onChange: (event) => setTitle(event.target.value)
            })
          ),
          h('label', { className: 'dsh-todo-field' },
            h('span', { className: 'dsh-todo-label' }, t('dueField')),
            h('input', {
              className: 'dsh-todo-input',
              type: 'datetime-local',
              value: due,
              onChange: (event) => setDue(event.target.value)
            })
          ),
          h('div', { className: 'dsh-todo-field' },
            h('span', { className: 'dsh-todo-label' }, t('quadrantLabel')),
            h('span', { className: 'dsh-todo-quad-preview', style: { '--q-tone': quad.tone } },
              h('span', { className: 'dsh-todo-quad-dot' }),
              h('span', null, t(quad.titleKey))
            )
          ),
          h('div', { className: 'dsh-todo-editor-toggles' },
            h('button', {
              type: 'button',
              className: 'dsh-todo-toggle',
              'data-kind': 'important',
              'data-on': important ? 'true' : 'false',
              'aria-pressed': important,
              onClick: () => setImportant(!important)
            }, h(Icon, { name: 'target', size: 12 }), t('important')),
            h('button', {
              type: 'button',
              className: 'dsh-todo-toggle',
              'data-kind': 'urgent',
              'data-on': urgent ? 'true' : 'false',
              'aria-pressed': urgent,
              onClick: () => setUrgent(!urgent)
            }, h(Icon, { name: 'bolt', size: 12 }), t('urgent')),
            h('button', {
              type: 'button',
              className: 'dsh-todo-done-toggle',
              'data-done': todo.done ? 'true' : 'false',
              onClick: () => onToggle(todo.id)
            }, h(Icon, { name: 'check', size: 11 }), todo.done ? t('markOpen') : t('markDone'))
          ),
          h('div', { className: 'dsh-todo-editor-actions' },
            h('button', {
              type: 'button',
              className: 'dsh-todo-btn dsh-todo-btn-danger',
              onClick: askDelete
            }, h(Icon, { name: 'trash', size: 12 }), confirmDelete ? t('confirmDelete') : t('delete')),
            h('div', { className: 'dsh-todo-editor-actions-right' },
              h('button', { type: 'button', className: 'dsh-todo-btn', onClick: onClose }, t('cancel')),
              h('button', { type: 'submit', className: 'dsh-todo-btn dsh-todo-btn-primary' }, t('save'))
            )
          )
        )
      );
    }

    function Panel({ todos, store, t, lang, onClose }) {
      const [editingId, setEditingId] = React.useState(null);
      const [selectedDate, setSelectedDate] = React.useState(null);
      const [cursor, setCursor] = React.useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
      });
      const [dismissed, setDismissed] = React.useState(() => new Set());
      const now = useNow(30000);
      const panelRef = React.useRef(null);

      React.useEffect(() => {
        const onKey = (event) => {
          if (event.key !== 'Escape') return;
          if (editingId) {
            setEditingId(null);
          } else {
            onClose();
          }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, [editingId, onClose]);

      const trapFocus = (event) => {
        if (event.key !== 'Tab' || !panelRef.current) return;
        const nodes = panelRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], select, textarea, [tabindex]:not([tabindex="-1"])');
        const focusable = Array.from(nodes).filter((node) => node.offsetParent !== null || node === document.activeElement);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      const updateTodo = (id, patch) => {
        store.setTodos((list) => list.map((todo) => todo.id === id ? { ...todo, ...patch } : todo));
      };
      const addTodo = (draft) => {
        store.setTodos((list) => [{
          id: makeId(),
          title: draft.title,
          important: draft.important,
          urgent: draft.urgent,
          due: draft.due,
          done: false,
          createdAt: Date.now()
        }, ...list]);
      };
      const toggleTodo = (id) => {
        store.setTodos((list) => list.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo));
      };
      const deleteTodo = (id) => {
        store.setTodos((list) => list.filter((todo) => todo.id !== id));
        setEditingId(null);
      };
      const saveTodo = (id, patch) => {
        updateTodo(id, patch);
        setEditingId(null);
      };
      const moveTodo = (id, quad) => {
        updateTodo(id, { important: quad.key === 'q1' || quad.key === 'q2', urgent: quad.key === 'q1' || quad.key === 'q3' });
      };

      const editingTodo = editingId ? todos.find((todo) => todo.id === editingId) : null;
      const urgentItems = sortTodos(todos.filter((todo) => todo.urgent && !todo.done));
      const reminders = sortTodos(todos.filter((todo) => {
        if (todo.done || !todo.due) return false;
        return new Date(todo.due).getTime() - now <= HOUR;
      }));
      const activeReminders = reminders.filter((todo) => !dismissed.has(todo.id + '@' + todo.due));
      const reminder = activeReminders[0] || null;

      return h('div', {
        className: 'dsh-todo-backdrop',
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        }
      },
        h('section', {
          ref: panelRef,
          className: 'dsh-todo-panel',
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': t('appTitle'),
          onKeyDown: trapFocus,
          onMouseDown: (event) => event.stopPropagation()
        },
          h(Header, { todos, now, t, onClose }),
          reminder ? h(ReminderToast, {
            reminder,
            extra: activeReminders.length - 1,
            t,
            lang,
            now,
            onOpen: (id) => setEditingId(id),
            onDismiss: () => {
              setDismissed((previous) => {
                const next = new Set(previous);
                next.add(reminder.id + '@' + reminder.due);
                return next;
              });
            }
          }) : null,
          h('div', { className: 'dsh-todo-body' },
            h('main', { className: 'dsh-todo-main' },
              h(AddForm, { t, onAdd: addTodo }),
              h('div', { className: 'dsh-todo-matrix' }, QUADRANTS.map((quad) => h(Quadrant, {
                key: quad.key,
                quad,
                todos,
                t,
                lang,
                now,
                onOpen: setEditingId,
                onToggle: toggleTodo,
                onMove: moveTodo
              })))
            ),
            h('aside', { className: 'dsh-todo-side' },
              h(UrgentCard, { items: urgentItems, t, now, onOpen: setEditingId }),
              h(CalendarCard, {
                todos,
                now,
                lang,
                t,
                cursor,
                onCursor: setCursor,
                selected: selectedDate,
                onSelect: setSelectedDate
              }),
              h(UpcomingCard, {
                todos,
                t,
                lang,
                now,
                selected: selectedDate,
                onSelect: setSelectedDate,
                onOpen: setEditingId
              })
            )
          ),
          h('footer', { className: 'dsh-todo-foot' },
            h('span', null, t('dragHint')),
            h('span', null, t('persistHint'))
          ),
          editingTodo ? h(Editor, {
            todo: editingTodo,
            t,
            onClose: () => setEditingId(null),
            onSave: saveTodo,
            onDelete: deleteTodo,
            onToggle: toggleTodo
          }) : null
        )
      );
    }

    function Root({ store, ctx }) {
      useLocaleRevision(ctx);
      const t = ctx.locale.bind(NS);
      const lang = ctx.locale.getLocale().active;
      const state = useStore(store);
      return h(React.Fragment, null,
        h(Styles),
        state.open ? h(Panel, {
          todos: state.todos,
          store,
          t,
          lang,
          onClose: () => store.setOpen(false)
        }) : null
      );
    }

    function quadrantKey(todo) {
      return quadrantOf(todo).key;
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const store = createStore();
        ctx.effect(() => {
          const disposers = [
            ctx.locale.register(NS, 'zh-CN', ZH),
            ctx.locale.register(NS, 'zh-Hans', ZH),
            ctx.locale.register(NS, 'zh', ZH),
            ctx.locale.register(NS, 'en-US', EN),
            ctx.locale.register(NS, 'en', EN)
          ];
          return () => disposers.forEach((dispose) => dispose());
        });
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'todo-matrix',
          order: 20
        }, (props) => h(Launcher, { store, ctx, wide: Boolean(props.wide) })));
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'todo-matrix.panel',
          order: 40
        }, () => h(Root, { store, ctx })));
      }
    };
  }
});
