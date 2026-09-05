import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative h-10 w-[68px] shrink-0 rounded-full border border-ink-100/15 bg-workshop-800 transition-colors hover:border-brass-500"
    >
      {/* track icons */}
      <span className="pointer-events-none absolute inset-y-0 left-[8px] right-[8px] flex items-center justify-between">
        <Sun size={12} className={isDark ? 'text-ink-400' : 'text-brass-500'} />
        <Moon size={12} className={isDark ? 'text-brass-500' : 'text-ink-400'} />
      </span>
      {/* knob */}
      <span
        className="absolute left-[4px] top-[4px] grid h-8 w-8 place-items-center rounded-full bg-brass-500 text-workshop-900 shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: isDark ? 'translateX(28px)' : 'translateX(0)' }}
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  );
}
