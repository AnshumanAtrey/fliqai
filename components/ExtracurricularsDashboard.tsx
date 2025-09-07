import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useInView } from 'react-intersection-observer';

// Counter component for the animation
const Counter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!countRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setCount(Math.floor(progress * value));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          
          // Cleanup observer once animation starts
          if (countRef.current) {
            observer.unobserve(countRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(countRef.current);
    observerRef.current = observer;

    return () => {
      if (countRef.current && observerRef.current) {
        observerRef.current.unobserve(countRef.current);
      }
    };
  }, [value, duration]);

  return <span ref={countRef}>{count}%</span>;
};

const data = [
  { name: 'Arts', value: 12, color: '#B5E2FA' },
  { name: 'Sports', value: 28, color: '#B5F0B5' },
  { name: 'Volunteering', value: 36, color: '#FFE4A2' },
  { name: 'Leadership', value: 24, color: '#FFB7B7' },
];

const ExtracurricularsDashboard: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsActive(true);
    }
  }, [inView]);
  return (
    <div className="bg-white p-6 border-2 border-black">
      <h2 className="text-2xl font-bold text-black mb-6 font-outfit">Extracurriculars & Scholarships</h2>
      
      <div ref={ref} className="flex flex-col lg:flex-row gap-14">
        {/* Left Section - Legend */}
        <div className="w-full lg:w-1/2 text-black pt-12">
          <div className="border border-black bg-[#FFF3ED] p-4">
            <h3 className="font-outfit font-semibold text-lg mb-4">Activity Distribution</h3>
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-5 h-5 border border-black" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-outfit text-sm">{item.name}</span>
                  </div>
                  <span className="font-outfit font-medium">
                    <Counter value={item.value} duration={1000} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Donut Chart */}
        <div className="w-full lg:w-1/2">
          <div className="p-2">
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={0}
                    dataKey="value"
                    isAnimationActive={isActive}
                    animationBegin={0}
                    animationDuration={1000}
                    label={({ name, percent = 0 }: { name: string; percent?: number }) => (
                      <text 
                        x={0} 
                        y={0} 
                        textAnchor="middle"
                        fill="#000"
                        fontSize={12}
                        fontWeight={500}
                      >
                        {isActive ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                      </text>
                    )}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#000" 
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    className="font-outfit font-semibold text-sm"
                  >
                    Extracurriculars
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Section */}
      <div className="mt-12">
        <div className="text-black">
          {/* Tier 1 */}
          <div style={{ padding: '8px', backgroundColor: '#FFF3ED'}} className="w-1/4 ">
            <h3 className="font-outfit font-bold text-lg ">Tier 1: Local Scholarship</h3>
          </div>
          <div className="pt-4 pl-4 pr-4 bg-[#FFF3ED]">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-sm">Local or school-based recognition given by community groups or schools. These awards matter because they prove early initiative, leadership, and the ability to step beyond academics.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-sm">Rebecca launched a mentorship program connecting 30 top students with 60 struggling peers. She designed custom study guides, tracked weekly progress, and presented outcomes to faculty.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-sm">Won the City Youth Leadership Scholarship ($500), one of only 5 recipients in her district. Beyond the funds, it signaled to colleges her capacity to create impact at a grassroots level.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FFE3D4'}} className="w-1/4 ml-[25%]">
               <h3 className="font-outfit font-bold text-lg ">Tier 2: State Scholarship</h3>
            </div>
          </div>

          {/* Tier 2 */}
          
          <div className=" pt-4 pl-4 pr-4 bg-[#FFE3D4]">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-sm">State-level awards earned by outperforming peers across hundreds of schools. They validate that the student can compete and lead at a regional scale.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-sm">Rebecca’s team designed a solar-powered irrigation prototype, tested it in a community garden, and presented at the State Science Olympiad. Judges praised its practicality and community benefit.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-sm">Awarded the State STEM Excellence Grant ($2,000) and invited to the State Innovators Conference. Recognition placed her in the top 2% of state applicants, proving her ideas could scale impact beyond school.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FFC3A9'}} className="w-1/4 ml-[50%]">
              <h3 className="font-outfit font-bold text-lg ">Tier 3: National Scholarship</h3>
            </div>
          </div>

          {/* Tier 3 */}
          <div className=" pt-4 pl-4 pr-4 bg-[#FFC3A9]">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-sm">Nationwide scholarships for top academic, research, or leadership achievements. These mark students as operating in the top percentile nationally.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-sm">Rebecca wrote a paper, “The Psychology of Learning in Digital Environments,” blending psychology and AI research. With a university mentor, she tested how digital classrooms affect memory retention.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-sm">Chosen from 5,000 applicants as 1 of 50 winners of the National Innovation Scholarship ($10,000). This positioned her not just as high-achieving, but as a student driving original thought.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FF9269', }} className="w-1/4 ml-[76.4%]">
               <h3 className="font-outfit font-bold text-lg">Tier 4: International Scholarship</h3>
          </div>
          </div>

          {/* Tier 4 */}
          
          <div className=" p-4 bg-[#FF9269] ">
            
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-sm">Global awards or exchange bursaries, reserved for students who compete internationally and prove they can contribute on a world stage.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-sm">Rebecca presented her research on digital learning at the International Youth Psychology Conference in London, where she spoke alongside undergraduates and academics.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-sm">Won the International Exchange Bursary ($15,000) to study abroad in the UK. It placed her in the top 1% globally and demonstrated readiness for global academic environments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtracurricularsDashboard;
