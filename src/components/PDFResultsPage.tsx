import { useEffect, useState } from 'react';
import { CompleteResultsPage } from './CompleteResultsPage';
import { EDNAResults } from '../lib/scoring';

/**
 * PDF Results Page - Renders CompleteResultsPage for PDF generation
 * This component reads results from URL parameters and renders the full results page
 * Used by Puppeteer to generate PDFs from the actual React component
 */
export function PDFResultsPage() {
  const [results, setResults] = useState<EDNAResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      // Get results from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');

      if (!dataParam) {
        setError('No results data provided');
        setIsReady(true);
        return;
      }

      // Decode and parse results
      const decodedData = decodeURIComponent(dataParam);
      const parsedResults = JSON.parse(decodedData);

      console.log('📄 PDF Results Page - Data received:', parsedResults);
      setResults(parsedResults);
      setIsReady(true);

    } catch (err) {
      console.error('❌ Error parsing results:', err);
      setError(`Failed to load results data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsReady(true);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50" data-pdf-content="true">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Profile data not found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!results || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-pdf-content="true">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div data-pdf-content="true">
      <CompleteResultsPage
        results={results}
        userEmail={results.name || 'User'}
        isStandalone={true}
      />
    </div>
  );
}