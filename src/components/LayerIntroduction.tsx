import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LayerIntroductionProps {
  layerNumber: number;
  title: string;
  description1: string;
  description2: string;
  onBegin: () => void;
}

const layerData: Record<number, { title: string; desc1: string; desc2: string }> = {
  1: {
    title: 'LAYER 1 – DECISION IDENTITY',
    desc1: 'This layer shows the natural pattern your mind uses to make decisions.',
    desc2: 'It reveals which sequence you naturally follow and what drives your decision at the core'
  },
  2: {
    title: 'LAYER 2 – EXECUTION STYLE',
    desc1: 'This layer shows how your decisions turn into action.',
    desc2: 'It highlights why execution feels smooth in some situations and inconsistent in others.'
  },
  3: {
    title: 'LAYER 3 – DECISION LOOP AWARENESS',
    desc1: 'This layer shows how you relate to people who think and decide differently from you.',
    desc2: 'It reflects how you stay clear and steady when working with other decision styles.'
  },
  4: {
    title: 'LAYER 4 – LEARNING STYLE PREFERENCES',
    desc1: 'This layer shows how you naturally take in and process information.',
    desc2: 'It reveals your instinctive way of turning information into understanding and action.'
  },
  5: {
    title: 'LAYER 5 – NEURO PERFORMANCE PATTERN',
    desc1: 'This layer shows how your body (brain, heart and gut) manages focus, emotion, and sensory input.',
    desc2: 'It reveals your instinctive way of turning information into understanding and action.'
  },
  6: {
    title: 'LAYER 6 – MINDSET & PERSONALITY',
    desc1: 'This layer shows the natural tendencies you bring into every decision before logic or feelings activate.',
    desc2: 'It reflects the internal framework that shapes how you interpret challenges and move forward.'
  },
  7: {
    title: 'LAYER 7 – META-BELIEF & VALUES',
    desc1: 'This layer shows the deeper beliefs and values that guide you.',
    desc2: 'It reveals what ultimately drives your decisions.'
  }
};

export function LayerIntroduction({ layerNumber, title, description1, description2, onBegin }: LayerIntroductionProps) {
  const data = layerData[layerNumber] || { title, desc1: description1, desc2: description2 };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-4 sm:py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Main Card */}
        <div 
          className="bg-white rounded-xl mx-auto flex flex-col items-center justify-center w-full"
          style={{
            border: '1px solid #9B4DCE',
            padding: '24px 20px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Gradient Line */}
          <div 
            className="rounded-full mx-auto"
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(to right, var(--bs-color-indigo), var(--bs-color-orange))',
              marginBottom: '20px'
            }}
          />
          
          {/* Title */}
          <h2 
            className="text-center uppercase font-bold text-[var(--bs-color-indigo)] text-lg sm:text-xl md:text-2xl px-2"
            style={{ 
              marginBottom: '12px',
              lineHeight: '1.3'
            }}
          >
            {data.title}
          </h2>
          
          {/* Description Text */}
          <div className="text-center px-2 sm:px-4" style={{ marginBottom: '24px' }}>
            <p 
              className="text-gray-700 text-sm sm:text-base mb-2 sm:mb-3"
              style={{ 
                lineHeight: '1.6',
                marginBottom: '8px'
              }}
            >
              {data.desc1}
            </p>
            <p 
              className="text-gray-700 text-sm sm:text-base"
              style={{ 
                lineHeight: '1.6'
              }}
            >
              {data.desc2}
            </p>
          </div>
          
          {/* Button */}
          <button 
            className="rounded-full text-white font-semibold flex items-center gap-2 transition-all text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            style={{
              background: 'linear-gradient(to right, var(--bs-color-indigo), #C72170)',
              marginTop: '16px',
              width: 'auto',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #5205a0, #d5287d)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, var(--bs-color-indigo), #C72170)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
            onClick={onBegin}
          >
            <span className="whitespace-nowrap">Begin Layer {layerNumber} Assessment</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

