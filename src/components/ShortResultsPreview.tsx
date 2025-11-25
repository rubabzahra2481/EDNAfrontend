import { EDNAResults } from './EDNAQuiz';
import { Navigation } from './Navigation';
import { generateResultsPDF } from '../utils/pdfGenerator';
import { Download } from 'lucide-react';

interface ShortResultsPreviewProps {
  results: EDNAResults;
  userEmail: string;
  onGetFullReport: () => void;
  onViewChange?: (view: string) => void;
}

export function ShortResultsPreview({ results, userEmail, onGetFullReport, onViewChange }: ShortResultsPreviewProps) {
  const { core_type, subtype, core_type_mastery } = results;

  // Get primary subtype (subtype is an array)
  const primarySubtype = Array.isArray(subtype) ? subtype[0] : subtype;

  // Determine gradient based on core type
  const getGradient = () => {
    if (core_type === 'architect') {
      return 'from-purple-600 to-purple-800';
    } else if (core_type === 'alchemist') {
      return 'from-orange-500 to-orange-700';
    } else {
      return 'from-purple-600 via-orange-500 to-purple-600';
    }
  };

  const getTypeColor = () => {
    if (core_type === 'architect') return 'text-purple-600';
    if (core_type === 'alchemist') return 'text-orange-600';
    return 'text-purple-600';
  };

  return (
    <>
      <Navigation onViewChange={onViewChange || (() => {})} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-4">
            <svg className="w-12 h-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h1>
          <p className="text-gray-600">
            Results sent to <strong>{userEmail}</strong>
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${getGradient()} p-8 text-white text-center`}>
            <h2 className="text-4xl font-bold mb-2">
              The {core_type.charAt(0).toUpperCase() + core_type.slice(1)}
            </h2>
            <p className="text-xl opacity-90">{primarySubtype}</p>
          </div>

          {/* Scores */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {core_type_mastery}%
                </div>
                <div className="text-sm text-gray-600">Core Type Mastery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {results.subtype_mastery || 0}%
                </div>
                <div className="text-sm text-gray-600">Subtype Mastery</div>
              </div>
            </div>

            {/* What's Included in Full Report */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Get Your Complete E-DNA Report
                </h3>
                <button
                  onClick={() => generateResultsPDF(results, userEmail)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                  title="Download Short Results as PDF"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Detailed personality analysis',
                  'Mirror pair awareness insights',
                  'Learning style preferences',
                  'Neurodiversity assessment',
                  'Mindset and personality traits',
                  'Meta-beliefs and values',
                  'Personalized growth strategies'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={onGetFullReport}
                className={`w-full py-4 px-6 bg-gradient-to-r ${getGradient()} text-white rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg`}
              >
                Get Full Report - Unlock Complete Analysis
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your detailed PDF report will be emailed to you after purchase
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Why Get the Full Report?
              </h4>
              <p className="text-blue-800 text-sm">
                Your complete E-DNA report provides deep insights into your entrepreneurial DNA, 
                helping you understand your unique strengths, challenges, and growth opportunities. 
                It's a comprehensive guide to building a business that aligns with who you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

