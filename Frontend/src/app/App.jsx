import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatMessage from '../components/ChatMessage';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ChatInput from '../components/ChatInput';
import '../index.css';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  
  // State for the active conversation's messages
  const [messages, setMessages] = useState([]);
  const [loadingPhase, setLoadingPhase] = useState(null); // 'generating', 'judging', or null
  const [currentProblem, setCurrentProblem] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const activeChat = conversations.find(c => c.id === activeChatId);
  const title = activeChat ? activeChat.title : "New Conversation";

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setLoadingPhase(null);
    setCurrentProblem('');
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    // In a real app, you would load the messages for this chat here
  };

  const handleSendMessage = async (text) => {
    // If this is the first message, create a new conversation
    if (!activeChatId) {
      const newChatId = Date.now().toString();
      setConversations([{ id: newChatId, title: text.substring(0, 30) + '...' }, ...conversations]);
      setActiveChatId(newChatId);
    }

    setCurrentProblem(text);
    setLoadingPhase('generating');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Backend logic evaluates to 'judging' roughly when the request returns before we parse if we want, 
      // but realistically it just returns when all done. We'll simulate 'judging' briefly for UX or just rely on backend speed.
      setLoadingPhase('judging');

      const data = await response.json();
      
      const newMessage = {
        problem: text,
        solution_1: data.solution_1 || "No solution provided.",
        solution_2: data.solution_2 || "No solution provided.",
        judge: {
          solution_1_score: data.judge?.solution_1_score || 0,
          solution_2_score: data.judge?.solution_2_score || 0,
          solution_1_reasoning: data.judge?.solution_1_reasoning || "",
          solution_2_reasoning: data.judge?.solution_2_reasoning || "",
          recommendation: data.judge?.solution_1_score >= data.judge?.solution_2_score ? "Solution 1 is recommended based on the higher score." : "Solution 2 is recommended based on the higher score."
        }
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error("Error generating solution:", error);
      // Fallback message on error
      const errorMessage = {
        problem: text,
        solution_1: "Error generating response.",
        solution_2: "Error generating response.",
        judge: {
          solution_1_score: 0,
          solution_2_score: 0,
          solution_1_reasoning: "API call failed.",
          solution_2_reasoning: "API call failed.",
          recommendation: "Please try again later."
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoadingPhase(null);
      setCurrentProblem('');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile & Desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-out md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          conversations={conversations}
          activeId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-[#18181B] relative z-10 border-l border-gray-200 dark:border-[#27272A]">
        <ChatHeader 
          title={title} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 overflow-y-auto scroll-smooth pb-10">
          {messages.length === 0 && !loadingPhase ? (
            <EmptyState onExampleClick={handleSendMessage} />
          ) : (
            <div className="flex flex-col w-full pb-4">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              
              {loadingPhase && (
                <LoadingState problem={currentProblem} phase={loadingPhase} />
              )}
            </div>
          )}
        </div>
        
        {/* Chat Input Container - No Gradient, just solid or transparent */}
        <div className="w-full bg-white dark:bg-[#18181B]">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={loadingPhase !== null}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
