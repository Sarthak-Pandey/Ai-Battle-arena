import { MessageSquare, Plus, Settings, User, Moon, Sun } from 'lucide-react';

export default function Sidebar({ conversations = [], activeId, onNewChat, onSelectChat, darkMode, toggleDarkMode }) {
  return (
    <aside className="w-64 bg-[#f9f9f9] dark:bg-[#111111] flex flex-col h-full flex-shrink-0 hidden md:flex">
      <div className="p-5 flex items-center gap-3">
        <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black text-xs font-bold shadow-sm">
          AI
        </div>
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Judge Chat
        </h1>
      </div>
      
      <div className="px-3 pb-4">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-[#27272A] border border-gray-200 dark:border-[#3F3F46] rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#3f3f46]/70 transition-all shadow-sm"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 px-2">
          Recent
        </div>
        
        {conversations.length === 0 ? (
          <div className="text-sm text-gray-400 dark:text-gray-600 px-2 py-4 text-center">No recent chats</div>
        ) : (
          conversations.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-left truncate transition-colors ${
                activeId === chat.id 
                  ? 'bg-gray-200/50 dark:bg-[#27272A] text-gray-900 dark:text-gray-100 font-medium' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#27272A]/50'
              }`}
            >
              <MessageSquare size={15} className={activeId === chat.id ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"} />
              <span className="truncate">{chat.title || "New Conversation"}</span>
            </button>
          ))
        )}
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <button className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#27272A]/50 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#3F3F46] flex items-center justify-center">
            <User size={14} className="text-gray-600 dark:text-gray-300" />
          </div>
          User
        </button>
        <div className="flex items-center">
          <button 
            onClick={toggleDarkMode}
            className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#27272A]/50 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
