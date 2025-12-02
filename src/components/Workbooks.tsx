/**
 * Workbooks Component
 * Modern UI for displaying workbooks/resources
 */

import React from 'react';
import { FileText, Download, BookOpen } from 'lucide-react';

interface WorkbooksProps {
  onViewChange?: (view: string) => void;
  coreType?: 'architect' | 'alchemist' | 'blurred';
}

export function Workbooks({ onViewChange, coreType = 'architect' }: WorkbooksProps) {
  console.log('Workbooks component rendering with coreType:', coreType);
  
  // Map core type to workbook data
  const allWorkbooks = {
    architect: {
      id: 1,
      title: 'E-DNA Decision Mastery for Architect',
      category: 'Architect',
      icon: FileText,
      color: 'purple',
      filePath: '/assets/EDNA_WORKBOOK_ARCHITECT101.docx',
      fileName: 'EDNA_Decision_Mastery_Architect.docx'
    },
    alchemist: {
      id: 2,
      title: 'E-DNA Decision Mastery for Alchemist',
      category: 'Alchemist',
      icon: BookOpen,
      color: 'orange',
      filePath: '/assets/ALCHEMISTWORKBOOK.docx',
      fileName: 'EDNA_Decision_Mastery_Alchemist.docx'
    },
    blurred: {
      id: 3,
      title: 'E-DNA Decision Mastery for Mixed',
      category: 'Mixed',
      icon: FileText,
      color: 'purple',
      filePath: '/assets/E-DNA_DECISION_mastery_WORKBOOK mixed111.docx',
      fileName: 'EDNA_Decision_Mastery_Mixed.docx'
    }
  };

  // Get the workbook for the user's core type
  const workbook = allWorkbooks[coreType];

  // Handle download
  const handleDownload = async () => {
    try {
      // Fetch the file
      const response = await fetch(workbook.filePath);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = workbook.fileName;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading workbook:', error);
      alert('Failed to download workbook. Please try again.');
    }
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{
            backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Workbooks & Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Downloadable templates, frameworks, and guides to accelerate your entrepreneurial journey.
          </p>
        </div>

        {/* Single Workbook Display */}
        <div className="max-w-md mx-auto">
          {(() => {
            const Icon = workbook.icon;
            const isPurple = workbook.color === 'purple';
            
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isPurple ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isPurple ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
                <div className="mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    isPurple 
                      ? 'bg-purple-50 text-purple-700' 
                      : 'bg-orange-50 text-orange-700'
                  }`}>
                    {workbook.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {workbook.title}
                </h3>
                <button
                  onClick={handleDownload}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isPurple
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  style={{ borderRadius: '5%' }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

