import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, Home } from 'lucide-react';
import type { QuizResults } from '../lib/scoring';

interface NewResultsPageProps {
  results: QuizResults;
  onBackToHome?: () => void;
}

export function NewResultsPage({ results, onBackToHome }: NewResultsPageProps) {
  const handleDownload = () => {
    // TODO: Implement PDF download
    alert('PDF download will be implemented');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your E-DNA Profile Results
          </h1>
          <p className="text-lg text-gray-600">
            Complete analysis of your entrepreneurial decision-making patterns
          </p>
        </div>

        {/* Layer 1: Decision Identity */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
            <CardTitle>Layer 1: Decision Identity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Core Type</p>
                <p className="text-2xl font-bold text-purple-600">{results.layer1.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Score Distribution</p>
                <p className="text-lg">
                  Architect: {results.layer1.architectCount}/8 | 
                  Alchemist: {results.layer1.alchemistCount}/8
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layer 2: Execution Style */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <CardTitle>Layer 2: Execution Style Subtype</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Subtype</p>
                <p className="text-2xl font-bold text-blue-600">{results.layer2.subtype}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Path</p>
                <p className="text-lg capitalize">{results.layer2.path}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layer 3: Mirror Awareness */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
            <CardTitle>Layer 3: Mirror Awareness</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Overall Score</p>
              <p className="text-2xl font-bold text-green-600">
                {results.layer3.totalScore} / {results.layer3.maxScore}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(results.layer3.dimensions).map(([key, value]) => (
                <div key={key} className="border-l-4 border-green-500 pl-3">
                  <p className="text-sm font-medium text-gray-700">{key}</p>
                  <p className="text-sm text-gray-600">{value.label} ({value.score}/2)</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layer 4: Learning Style */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white">
            <CardTitle>Layer 4: Learning Style (VARK)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Dominant Modality</p>
              <p className="text-2xl font-bold text-yellow-600 capitalize">
                {results.layer4.dominantModality}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(results.layer4.percentages).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-600 capitalize">{key}</p>
                  <p className="text-xl font-bold text-yellow-600">{value}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layer 5: Neuro Performance */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
            <CardTitle>Layer 5: Neuro Performance Pattern</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(results.layer5.profile).map(([key, value]) => (
                <div key={key} className="border-l-4 border-orange-500 pl-3">
                  <p className="text-sm font-medium text-gray-700">{key}</p>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layer 6: Mindset & Personality */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white">
            <CardTitle>Layer 6: Mindset & Personality</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Mindset Orientations</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {Object.entries(results.layer6.mindset).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-red-500 pl-3">
                    <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Personality Profile</h4>
              <p className="text-lg text-red-600 font-medium">{results.layer6.personality.coreType}</p>
              <p className="text-gray-600">{results.layer6.personality.communicationStyle}</p>
            </div>
          </CardContent>
        </Card>

        {/* Layer 7: Meta-Beliefs & Values */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
            <CardTitle>Layer 7: Meta-Beliefs & Values</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(results.layer7.beliefs).map(([key, value]) => (
                <div key={key} className="border-l-4 border-indigo-500 pl-3">
                  <p className="text-sm font-medium text-gray-700">{key}</p>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
          >
            <Download className="w-4 h-4" />
            Download Full Report
          </Button>
          {onBackToHome && (
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
