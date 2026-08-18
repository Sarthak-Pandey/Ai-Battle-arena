import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

export default function ChatInput({ onSendMessage, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 bg-gray-50 dark:bg-[#27272A] rounded-[24px] border border-gray-200 dark:border-[#3F3F46] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 dark:focus-within:border-blue-500 transition-all shadow-sm"
      >
        <button 
          type="button"
          className="p-3 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 self-end mb-0.5 ml-1 rounded-full transition-colors"
          disabled={disabled}
        >
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a problem or ask a question..."
          className="flex-1 max-h-[200px] py-3.5 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 text-base leading-relaxed"
          rows={1}
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center gap-1 self-end mb-1.5 mr-1.5">
          <button
            type="submit"
            disabled={!text.trim() || disabled}
            className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
              text.trim() && !disabled 
                ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-sm' 
                : 'bg-transparent text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <Send size={18} className={text.trim() && !disabled ? "ml-0.5" : ""} />
          </button>
        </div>
      </form>
      <div className="text-center mt-2">
        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium select-none">
          AI Judge can make mistakes. Consider verifying critical information.
        </span>
      </div>
    </div>
  );
}
