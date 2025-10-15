import React from 'react';

const suggestions = [
  {
    title: 'Show, Don\'t Tell',
    description: 'Add more specific examples and anecdotes to illustrate your points rather than just stating them.',
    icon: '💡'
  },
  {
    title: 'Stronger Opening',
    description: 'Consider starting with a compelling hook to grab the reader\'s attention immediately.',
    icon: '✏️'
  },
  {
    title: 'Word Choice',
    description: 'Some words could be more precise. Try using more specific vocabulary.',
    icon: '📝'
  }
];

export const SuggestionsSection = () => (
  <div className="absolute w-[477px] top-[872px] left-6">
    <div className="flex flex-col gap-4">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="flex items-start gap-3 p-4 bg-white border border-solid border-black">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span>{suggestion.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold">{suggestion.title}</h3>
            <p className="text-sm text-gray-700">{suggestion.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
