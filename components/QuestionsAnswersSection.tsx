import { useState } from 'react';

const QuestionsAnswersSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const qaData = [
    {
      id: 1,
      question: 'How long do you spend on each essay?',
      answer: 'I usually spend about 2-3 hours on each essay, including research and editing. However, the time can vary depending on the complexity of the topic and the amount of research needed.'
    },
    {
      id: 2,
      question: 'How did you approach writing your personal statement?',
      answer: 'Honestly, I started with a completely different story—one that I thought admissions officers wanted to hear. But it felt flat and disconnected. It wasn’t until I sat down and asked myself, ‘What’s the real story behind why I’ve worked this hard?’ that things clicked. I ended up writing about being a first-generation, low-income student in a private school environment—something I’d avoided at first because I didn’t want to sound like I was making excuses. But framing it as a story of growth, resilience, and agency changed everything. I spent about two weeks just brainstorming and journaling before writing a real draft. '
    },
    {
      id: 3,
      question: 'When should I start preparing for college applications?',
      answer: 'It\'s best to start preparing for college applications as early as freshman year of high school by maintaining good grades and exploring extracurricular interests. However, the main application process typically begins in junior year with test preparation and college research, while the actual applications are completed in the fall of senior year.'
    },
    {
      id: 4,
      question: 'How many colleges should I apply to?',
      answer: 'A balanced college list typically includes 8-12 schools: 2-3 reach schools, 4-6 target schools, and 2-3 safety schools. This gives you a good mix of options while managing the application workload. The exact number can vary based on your specific situation and the competitiveness of the schools you\'re considering.'
    },
    {
      id: 5,
      question: 'What makes a good college essay?',
      answer: 'A good college essay is authentic, well-written, and gives insight into who you are beyond your grades and test scores. It should tell a compelling story, demonstrate your unique perspective, and show personal growth. Avoid clichés, be specific with details, and make sure to thoroughly proofread your work.'
    },
    {
      id: 6,
      question: 'How important are extracurricular activities for college applications?',
      answer: 'Extracurricular activities are very important as they demonstrate your interests, passions, and commitment outside the classroom. Colleges look for depth and leadership in a few activities rather than superficial involvement in many. Quality and impact matter more than quantity, and it\'s better to show progression and achievement in areas you\'re passionate about.'
    },
  ];

  const visibleQAs = showAll ? qaData : qaData.slice(0, 4);

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mt-16 mb-16 border-2 border-black">
      <div className="bg-white p-6 w-full">
        <h2 className="text-3xl font-bold text-black mb-12 font-outfit">Questions & Answers</h2>
        
        <div className="space-y-2 text-black">
          {visibleQAs.map((item) => (
            <div 
              key={item.id}
              className={`border-[1px] border-black transition-all duration-300 ${expandedId === item.id ? 'bg-[#FFF3ED]' : 'bg-[#FFF3ED]'}`}
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => toggleQuestion(item.id)}
                aria-expanded={expandedId === item.id}
                aria-controls={`answer-${item.id}`}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <span className="text-2xl">
                  {expandedId === item.id ? '×' : '+'}
                </span>
              </button>
              
              <div 
                id={`answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ${expandedId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={expandedId !== item.id}
              >
                <div className="px-6 pb-6">
                  <p className="text-black">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!showAll && qaData.length > 4 && (
          <div className="mt-8 text-center ">
            <button 
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-[#FF9169] text-black font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors duration-300"
            >
              Show All FAQs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsAnswersSection;
