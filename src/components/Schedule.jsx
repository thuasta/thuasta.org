import React from 'react';
import clsx from 'clsx';

export function ScheduleItem({date, time, type, title, theme, icon, children}) {
  return (
    <tr className="schedule-item">
      <td>
        <strong>{date}</strong>
      </td>
      <td>{time}</td>
      <td>
        <span
          className={clsx(
            'schedule-badge',
            type.includes('讲座') ? 'badge--primary' : 'badge--success',
          )}>
          {type}
        </span>
      </td>
      <td>
        <div className="schedule-title">
          {icon} {title}
          {children && <div className="schedule-desc">{children}</div>}
        </div>
      </td>
      <td>
        <span className="schedule-theme">{theme}</span>
      </td>
    </tr>
  );
}

export function ScheduleTable({children}) {
  return (
    <div className="schedule-table-container">
      <table className="schedule-table">{children}</table>
    </div>
  );
}
