import { useEffect, useState } from 'react';
import { EDNAResultsPage } from './EDNAResultsPage';
import { EDNAResults } from './EDNAQuiz';

/**
 * PDF Results Page - Renders EDNAResultsPage for PDF generation
 * This component reads results from URL parameters and renders the full results page
 * Used by Puppeteer to generate PDFs from the actual React component
 */
export function PDFResultsPage() {
  const [results, setResults] = useState<EDNAResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get results from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');

      if (!dataParam) {
        setError('No results data provided');
        return;
      }

      // Decode and parse results
      const decodedData = decodeURIComponent(dataParam);
      const parsedResults = JSON.parse(decodedData);

      setResults(parsedResults);

      // Add a data attribute for Puppeteer to detect when ready
      document.body.setAttribute('data-pdf-content', 'true');

    } catch (err) {
      console.error('Error parsing results:', err);
      setError('Failed to load results data');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div data-pdf-content="true">
      <EDNAResultsPage
        results={results}
        onRetakeQuiz={() => {}}
        onViewChange={() => {}}
      />
    </div>
  );
}
