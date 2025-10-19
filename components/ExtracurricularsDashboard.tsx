import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

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
  { name: 'Leadership', value: 24, color: '#FFB7B9' },
];

const ExtracurricularsDashboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const drawDonutChart = (canvas: HTMLCanvasElement, data: ChartSegment[]) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(canvas.width, canvas.height) * 0.4;
    const innerRadius = outerRadius * 0.5;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2; // Start from top
    const total = data.reduce((sum: number, segment: ChartSegment) => sum + segment.value, 0);
    
    data.forEach((segment: ChartSegment) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;
      
      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const chartData = data.map(item => ({
        label: `${item.name} - ${item.value}%`,
        value: item.value,
        color: item.color
      }));
      drawDonutChart(canvasRef.current, chartData);
    }
  }, []);

  useEffect(() => {
    // This effect is no longer needed as we're not using isActive state anymore
  }, [inView]);
  return (
    <div className="bg-white dark:bg-dark-tertiary p-6 border border-black dark:border-dark-text">
      
      <div ref={ref} className="flex flex-col lg:flex-row gap-14">
        {/* Left Section - Legend */}
        <div className="w-full flex flex-col lg:w-1/2 text-black pt-6 gap-6">
          <h2 className="text-3xl font-bold text-black dark:text-white pt-4 font-outfit">Extracurriculars & Scholarships</h2>
          <div className="border border-black bg-[#FFF3ED] p-4">
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-5 h-5 border border-black" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-outfit text-xl">{item.name}</span>
                  </div>
                  <span className="font-outfit text-xl font-bold">
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
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center text-black">
                <div className="relative w-[400px] h-[400px] mb-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="w-full h-full"
                  ></canvas>
                  
                  {/* Labels */}
                  <div className="absolute top-10 left-[210px] transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black px-2 py-1 rounded-sm">
                    <span className="font-outfit text-sm font-medium">Arts - 12%</span>
                  </div>
                  <div className="absolute top-20 -left-6 transform translate-x-0 -translate-y-1/2 bg-white border-2 border-black px-2 py-1 rounded-sm">
                    <span className="font-outfit text-sm font-medium">Leadership - 24%</span>
                  </div>
                  <div className="absolute bottom-10 left-1/4 transform -translate-x-1/2 translate-y-1/2 bg-white border-2 border-black px-2 py-1 rounded-sm">
                    <span className="font-outfit text-sm font-medium">Volunteering - 36%</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 transform -translate-x-0 -translate-y-1/2 bg-white border-2 border-black px-2 py-1 rounded-sm">
                    <span className="font-outfit text-sm font-medium">Sports - 28%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Section */}
      <div>
        <div className="text-black">
          {/* Tier 1 */}
          <div style={{ padding: '8px', backgroundColor: '#FFF3ED'}} className="w-1/4 relative z-10 top-[1px] border-[1px] border-black border-b-0">
            <h3 className=" font-outfit font-bold text-lg  ">Tier 1: Local Scholarship</h3>
          </div>
          <div className="pt-4 pl-4 pr-4 bg-[#FFF3ED] border-[1px] border-b-0 border-black">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-lg">Local or school-based recognition given by community groups or schools. These awards matter because they prove early initiative, leadership, and the ability to step beyond academics.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-lg">Rebecca launched a mentorship program connecting 30 top students with 60 struggling peers. She designed custom study guides, tracked weekly progress, and presented outcomes to faculty.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-lg">Won the City Youth Leadership Scholarship ($500), one of only 5 recipients in her district. Beyond the funds, it signaled to colleges her capacity to create impact at a grassroots level.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FFE3D4'}} className="w-1/4 ml-[25%] relative z-10 top-[1px] border-[1px] border-black border-b-0">
               <h3 className="font-outfit font-bold text-lg ">Tier 2: State Scholarship</h3>
            </div>
          </div>

          {/* Tier 2 */}
          
          <div className=" pt-4 pl-4 pr-4 bg-[#FFE3D4] border-[1px] border-b-0 border-black">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-lg">State-level awards earned by outperforming peers across hundreds of schools. They validate that the student can compete and lead at a regional scale.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-lg">Rebecca’s team designed a solar-powered irrigation prototype, tested it in a community garden, and presented at the State Science Olympiad. Judges praised its practicality and community benefit.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-lg">Awarded the State STEM Excellence Grant ($2,000) and invited to the State Innovators Conference. Recognition placed her in the top 2% of state applicants, proving her ideas could scale impact beyond school.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FFC3A9'}} className="w-1/4 ml-[50%] relative z-10 top-[1px] border-[1px] border-black border-b-0">
              <h3 className="font-outfit font-bold text-lg ">Tier 3: National Scholarship</h3>
            </div>
          </div>

          {/* Tier 3 */}
          <div className=" pt-4 pl-4 pr-4 bg-[#FFC3A9] border-[1px] border-b-0 border-black">
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-lg">Nationwide scholarships for top academic, research, or leadership achievements. These mark students as operating in the top percentile nationally.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-lg">Rebecca wrote a paper, “The Psychology of Learning in Digital Environments,” blending psychology and AI research. With a university mentor, she tested how digital classrooms affect memory retention.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-lg">Chosen from 5,000 applicants as 1 of 50 winners of the National Innovation Scholarship ($10,000). This positioned her not just as high-achieving, but as a student driving original thought.</p>
              </div>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#FF9269', }} className="w-1/4 ml-[76.4%] relative z-10 top-[1px] border-[1px] border-black border-b-0">
               <h3 className="font-outfit font-bold text-lg">Tier 4: International Scholarship</h3>
          </div>
          </div>

          {/* Tier 4 */}
          
          <div className=" p-4 bg-[#FF9269] border-[1px] border-black">
            
            <div className="grid md:grid-cols-3 gap-20 pb-10 pt-2">
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT IT IS</h4>
                <p className="text-lg">Global awards or exchange bursaries, reserved for students who compete internationally and prove they can contribute on a world stage.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">WHAT STUDENT DID</h4>
                <p className="text-lg">Rebecca presented her research on digital learning at the International Youth Psychology Conference in London, where she spoke alongside undergraduates and academics.</p>
              </div>
              <div>
                <h4 className="font-outfit font-semibold mb-2">OUTCOME</h4>
                <p className="text-lg">Won the International Exchange Bursary ($15,000) to study abroad in the UK. It placed her in the top 1% globally and demonstrated readiness for global academic environments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtracurricularsDashboard;
