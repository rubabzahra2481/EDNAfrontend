import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Layer1IntroductionProps {
  onBegin: () => void;
  onPrevious: () => void;
}

export function Layer1Introduction({ onBegin, onPrevious }: Layer1IntroductionProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full">
        {/* Main Card */}
        <div 
          className="bg-white rounded-xl mx-auto flex flex-col items-center justify-center w-full px-4"
          style={{
            border: '1px solid #9B4DCE',
            padding: '40px 30px',
            maxWidth: '600px',
            minWidth: '320px',
            marginTop: '60px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Gradient Line */}
          <div 
            className="rounded-full mx-auto"
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, var(--bs-color-indigo), var(--bs-color-orange))',
              marginBottom: '24px'
            }}
          />
          
          {/* Title */}
          <h2 
            className="text-center uppercase font-bold text-[var(--bs-color-indigo)]"
            style={{ 
              fontSize: '24px',
              marginBottom: '16px'
            }}
          >
            LAYER 1 – DECISION IDENTITY
          </h2>
          
          {/* Description Text */}
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <p 
              className="text-gray-700 mb-2"
              style={{ 
                lineHeight: '1.5',
                marginBottom: '8px'
              }}
            >
              This layer shows the natural pattern your mind uses to make decisions.
            </p>
            <p 
              className="text-gray-700"
              style={{ 
                lineHeight: '1.5'
              }}
            >
              It reveals which sequence you naturally follow and what drives your decision at the core
            </p>
          </div>
          
          {/* Button */}
          <button 
            className="rounded-full text-white font-semibold flex items-center gap-2 transition-all"
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(to right, var(--bs-color-indigo), #C72170)',
              marginTop: '20px'
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
            <span>Begin Layer 1 Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

