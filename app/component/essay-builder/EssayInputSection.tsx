import React, { useState } from 'react';

interface EssayInputSectionProps {
  onAnalyze: (essay: string, prompt: string) => void;
  isAnalyzing: boolean;
}

export const EssayInputSection: React.FC<EssayInputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [essay, setEssay] = useState('');
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);

  // Common college application essay prompts
  const essayPrompts = [
    "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
    "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
    "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
    "Describe a problem you've solved or a problem you'd like to solve. It can be an intellectual challenge, a research query, an ethical dilemma - anything that is of personal importance, no matter the scale.",
    "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
    "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
    "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.",
    "Custom prompt (enter your own)"
  ];

  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handlePromptSelect = (prompt: string) => {
    if (prompt === "Custom prompt (enter your own)") {
      setSelectedPrompt('custom');
      setCustomPrompt('');
    } else {
      setSelectedPrompt(prompt);
      setCustomPrompt('');
    }
    setShowPromptDropdown(false);
  };

  const handleSubmit = () => {
    if (!essay.trim()) {
      alert('Please enter your essay before submitting.');
      return;
    }

    const promptToUse = selectedPrompt === 'custom' ? customPrompt : selectedPrompt;
    onAnalyze(essay, promptToUse);
  };

  return (
  <div className="sticky top-[20px] min-w-[752px] h-[609px] max-w-[100%] left-[40px] bg-light-bg dark:bg-dark-secondary border border-solid border-black dark:border-dark-text shadow-[4px_4px_0px_#000000] p-[32px]">
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <label className="block text-2xl font-semibold mb-4 text-light-text dark:text-dark-text">
          Select a question or enter your own one
        </label>
        <div className="relative">
          <div 
            className="w-full p-4 border-[1px] border-black dark:border-dark-text text-light-text dark:text-dark-text bg-light-secondary dark:bg-dark-tertiary cursor-pointer flex justify-between items-center"
            onClick={() => setShowPromptDropdown(!showPromptDropdown)}
          >
            <span className="truncate pr-2">
              {selectedPrompt === 'custom' ? 'Custom prompt' : 
               selectedPrompt || 'Select a question'}
            </span>
            <span className={`transform transition-transform ${showPromptDropdown ? 'rotate-180' : ''}`}>▼</span>
          </div>
          
          {showPromptDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text max-h-60 overflow-y-auto">
              {essayPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-light-bg dark:hover:bg-dark-bg cursor-pointer border-b border-gray-300 dark:border-gray-600 text-light-text dark:text-dark-text text-sm"
                  onClick={() => handlePromptSelect(prompt)}
                >
                  {prompt}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedPrompt === 'custom' && (
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-3 border-[1px] border-black dark:border-dark-text bg-light-secondary dark:bg-dark-tertiary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your custom prompt here..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-medium text-light-text dark:text-dark-text">Your essay</label>
          <span className="text-sm text-light-p dark:text-dark-text">
            {wordCount}/650 words
          </span>
        </div>
        <textarea
          className="flex-1 w-full p-4 border-[1px] border-black dark:border-dark-text bg-light-secondary dark:bg-dark-tertiary focus:outline-none focus:ring-2 focus:ring-black resize-none text-light-text dark:text-dark-text"
          placeholder="Start writing your essay here..."
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        />
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={isAnalyzing || !essay.trim()}
          className={`font-bold px-8 py-3 border border-black dark:border-dark-text transition-colors ${
            isAnalyzing || !essay.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#FF9966] text-black hover:bg-black hover:text-[#FF9966]'
          }`}
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Submit Essay'}
        </button>
      </div>
    </div>
  </div>
);
};
