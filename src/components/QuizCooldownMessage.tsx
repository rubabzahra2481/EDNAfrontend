import React from 'react';
import { Brain, Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface QuizCooldownMessageProps {
  completedAt: Date;
  onViewDashboard: () => void;
}

export function QuizCooldownMessage({ completedAt, onViewDashboard }: QuizCooldownMessageProps) {
  const now = new Date();
  const daysSinceCompletion = (now.getTime() - completedAt.getTime()) / (1000 * 60 * 60 * 24);
  const daysRemaining = Math.ceil(7 - daysSinceCompletion);
  const availableDate = new Date(completedAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-purple-200 shadow-xl">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full">
                <Brain className="w-16 h-16 text-purple-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border-2 border-purple-200">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz Cooldown Active
          </h2>

          {/* Message */}
          <p className="text-lg text-gray-700 mb-6">
            You've recently completed the E-DNA assessment. To ensure accurate results and 
            allow time for personal growth, you can retake the quiz after a 7-day period.
          </p>

          {/* Countdown Info */}
          <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
              </span>
            </div>
            <p className="text-gray-600">
              You can retake the quiz on <strong>{formatDate(availableDate)}</strong>
            </p>
          </div>

          {/* Quiz Completion Info */}
          <div className="text-sm text-gray-500 mb-8">
            <p>Quiz completed on {formatDate(completedAt)}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onViewDashboard}
              className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 text-lg px-8"
            >
              <Brain className="w-5 h-5 mr-2" />
              View My Results
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              💡 <strong>Why 7 days?</strong> This cooldown period helps ensure that your 
              reassessment reflects genuine personal development and provides meaningful insights 
              into your entrepreneurial growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
