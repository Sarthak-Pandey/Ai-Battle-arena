import { PanelLeftClose, PanelLeft, MoreHorizontal, ShieldCheck } from 'lucide-react';

export default function ChatHeader({ title = "New Conversation", sidebarOpen, toggleSidebar }) {
  return (
    <header className="h-14 bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md flex items-center justify-between px-4 flex-shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 -ml-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#27272A] rounded-xl transition-colors md:hidden"
        >
          {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
        </button>
        
        <h2 className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base truncate max-w-[200px] md:max-w-md">
          {title}
        </h2>
        
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 dark:bg-[#27272A] text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
          <ShieldCheck size={13} />
          <span>AI Judge</span>
        </div>
      </div>
      
      <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#27272A] transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </header>
  );
}
