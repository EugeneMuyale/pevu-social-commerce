import React, { useEffect, useRef, useState } from 'react';
import { getNotifications, markNotificationAsRead, Notification } from '../api/notification';
import { useAuth } from '../store/auth';

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return then.toLocaleDateString();
}

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getNotifications(user.id)
      .then(setNotifications)
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (id: number) => {
    if (!user) return;
    try {
      const updated = await markNotificationAsRead(id, user.id);
      setNotifications(notifications => notifications.map(n => n.id === id ? updated : n));
    } catch {}
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    const unread = notifications.filter(n => !n.isRead);
    await Promise.all(unread.map(n => markNotificationAsRead(n.id, user.id)));
    setNotifications(notifications => notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleBellKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setOpen(o => !o);
      e.preventDefault();
    }
  };

  return (
    <div className="relative inline-block text-left mr-4">
      <button
        ref={bellRef}
        className="relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleBellKeyDown}
        tabIndex={0}
      >
        {/* SVG Bell Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lg">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 py-0.5 border border-white" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto"
          role="menu"
          aria-label="Notifications"
        >
          <div className="p-2 font-semibold border-b flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button
                className="text-xs text-blue-600 hover:underline focus:outline-none"
                onClick={handleMarkAllAsRead}
                tabIndex={0}
              >Mark all as read</button>
            )}
          </div>
          {loading && <div className="p-2 text-gray-500">Loading...</div>}
          {!loading && notifications.length === 0 && <div className="p-2 text-gray-400">No notifications</div>}
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-2 border-b last:border-b-0 cursor-pointer group ${n.isRead ? 'bg-gray-50' : 'bg-blue-50 font-semibold'} hover:bg-blue-100 focus:bg-blue-100 focus:outline-none`}
              tabIndex={0}
              role="menuitem"
              aria-label={n.message}
              title={n.message}
              onClick={() => handleMarkAsRead(n.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleMarkAsRead(n.id); }}
            >
              <div className="truncate" style={{ maxWidth: '90%' }}>{n.message}</div>
              <div className="text-xs text-gray-400 mt-1" aria-live="polite">{timeAgo(n.createdAt)}</div>
            </div>
          ))}
          <div className="p-2 text-center border-t">
            <button className="text-xs text-blue-600 hover:underline focus:outline-none" tabIndex={0} aria-label="View all notifications">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
} 