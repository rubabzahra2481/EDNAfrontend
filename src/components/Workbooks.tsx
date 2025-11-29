/**
 * Workbooks Component
 * Modern UI for displaying workbooks/resources
 */

import { FileText, Download, BookOpen } from 'lucide-react';

interface WorkbooksProps {
  onViewChange?: (view: string) => void;
}

export function Workbooks({ onViewChange }: WorkbooksProps) {
  const workbooks = [
    {
      id: 1,
      title: 'Business Model Canvas',
      description: 'A strategic management template for developing new or documenting existing business models.',
      category: 'Strategy',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 2,
      title: 'Value Proposition Design',
      description: 'Create products and services customers want to buy.',
      category: 'Product',
      icon: BookOpen,
      color: 'orange'
    },
    {
      id: 3,
      title: 'Customer Journey Map',
      description: 'Visualize the customer experience from first contact to purchase.',
      category: 'Marketing',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Growth Strategy Framework',
      description: 'Systematic approach to scaling your business.',
      category: 'Growth',
      icon: BookOpen,
      color: 'orange'
    }
  ];

  return (
    <div className="w-full bg-gray-50">
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

        {/* Workbooks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workbooks.map((workbook) => {
            const Icon = workbook.icon;
            const isPurple = workbook.color === 'purple';
            
            return (
              <div
                key={workbook.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {workbook.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {workbook.description}
                </p>
                <button
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
          })}
        </div>
      </div>
    </div>
  );
}

