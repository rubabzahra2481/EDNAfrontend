import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OnboardingFlow } from './OnboardingFlow';
import { LayerIntroduction } from './LayerIntroduction';
import { allQuestions, getLayerQuestions } from '../lib/questions-new';
import { calculateAllResults, transformToEDNAResults, type UserAnswers, type QuizResults, type EDNAResults } from '../lib/scoring';

interface NewEDNAQuizProps {
  onComplete: (results: EDNAResults) => void;
  onBackToHome?: () => void;
  userEmail?: string | null;
}

export function NewEDNAQuiz({ onComplete, onBackToHome, userEmail }: NewEDNAQuizProps) {
  // Check if user has already seen onboarding (persist in localStorage)
  const hasSeenOnboarding = localStorage.getItem('edna-onboarding-completed') === 'true';
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [layer1Result, setLayer1Result] = useState<string | null>(null);
  const [showLayerIntroduction, setShowLayerIntroduction] = useState(false);
  const [layerToIntroduce, setLayerToIntroduce] = useState<number | null>(null);
  
  // Get current questions based on layer and layer1 result
  const getCurrentQuestions = () => {
    if (currentLayer === 1) return allQuestions.layer1;
    if (currentLayer === 2) {
      if (layer1Result?.includes('Architect')) return allQuestions.layer2.architect;
      if (layer1Result?.includes('Alchemist')) return allQuestions.layer2.alchemist;
      return allQuestions.layer2.mixed;
    }
    if (currentLayer === 3) return allQuestions.layer3;
    if (currentLayer === 4) return allQuestions.layer4;
    if (currentLayer === 5) return allQuestions.layer5;
    if (currentLayer === 6) return allQuestions.layer6;
    if (currentLayer === 7) return allQuestions.layer7;
    return [];
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  // Calculate total questions in previous layers for continuous numbering
  const getTotalQuestionsInPreviousLayers = () => {
    let total = 0;
    for (let layer = 1; layer < currentLayer; layer++) {
      const layerQuestions = getLayerQuestions(layer, layer1Result || undefined);
      total += layerQuestions.length;
    }
    return total;
  };
  
  // Calculate continuous question number
  const globalQuestionNumber = getTotalQuestionsInPreviousLayers() + currentQuestionIndex + 1;
  
  // Calculate total questions across all layers
  const getTotalQuestions = () => {
    let total = 0;
    for (let layer = 1; layer <= 7; layer++) {
      const layerQuestions = getLayerQuestions(layer, layer1Result || undefined);
      total += layerQuestions.length;
    }
    return total;
  };
  
  // Calculate total questions answered
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = getTotalQuestions();
  const progress = (totalAnswered / totalQuestions) * 100;

  // Handle onboarding complete
  const handleOnboardingComplete = () => {
    // Mark onboarding as completed in localStorage so it doesn't show again
    localStorage.setItem('edna-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  // Handle answer selection
  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  // Handle next question
  const handleNext = () => {
    if (!currentAnswer) return;

    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
    setAnswers(newAnswers);
    setCurrentAnswer('');

    // Check if we're at the end of current layer
    if (currentQuestionIndex >= currentQuestions.length - 1) {
      // End of layer
      let calculatedLayer1Result = layer1Result;
      if (currentLayer === 1) {
        // Calculate Layer 1 result to determine Layer 2 path
        const layer1Answers: UserAnswers = {};
        for (let i = 1; i <= 8; i++) {
          layer1Answers[`L1_Q${i}`] = newAnswers[`L1_Q${i}`];
        }
        
        let architectCount = 0;
        for (let i = 1; i <= 8; i++) {
          if (newAnswers[`L1_Q${i}`] === 'a') architectCount++;
        }
        
        let type = '';
        if (architectCount >= 6) type = 'Architect';
        else if (architectCount <= 2) type = 'Alchemist';
        else type = 'Blurred';
        
        calculatedLayer1Result = type;
        setLayer1Result(type);
      }

      // Move to next layer
      if (currentLayer < 7) {
        const nextLayer = currentLayer + 1;
        // Check if next layer has questions (Layer 3 might be skipped for Blurred)
        // Use calculatedLayer1Result if we just calculated it, otherwise use layer1Result state
        const nextLayerQuestions = getLayerQuestions(nextLayer, calculatedLayer1Result || undefined);
        
        if (nextLayerQuestions.length > 0) {
          // Show layer introduction before starting questions
          setLayerToIntroduce(nextLayer);
          setShowLayerIntroduction(true);
        } else {
          // Skip layers with no questions (e.g., Layer 3 for Blurred)
          // Find the next layer with questions
          let foundNextLayer = false;
          for (let layer = nextLayer + 1; layer <= 7; layer++) {
            const layerQuestions = getLayerQuestions(layer, calculatedLayer1Result || undefined);
            if (layerQuestions.length > 0) {
              setLayerToIntroduce(layer);
              setShowLayerIntroduction(true);
              foundNextLayer = true;
              break;
            }
          }
          if (!foundNextLayer) {
            // Quiz complete
            console.log('📊 [Quiz Complete] Calculating results from answers:', Object.keys(newAnswers).length, 'answers');
            const quizResults = calculateAllResults(newAnswers);
            console.log('📊 [Quiz Complete] Quiz results calculated:', quizResults);
            const ednaResults = transformToEDNAResults(quizResults);
            console.log('📊 [Quiz Complete] EDNA results transformed:', ednaResults);
            onComplete(ednaResults);
          }
        }
      } else {
        // Quiz complete - calculate all results
        console.log('📊 [Quiz Complete] Calculating results from answers:', Object.keys(newAnswers).length, 'answers');
        const quizResults = calculateAllResults(newAnswers);
        console.log('📊 [Quiz Complete] Quiz results calculated:', quizResults);
        const ednaResults = transformToEDNAResults(quizResults);
        console.log('📊 [Quiz Complete] EDNA results transformed:', ednaResults);
        onComplete(ednaResults);
      }
    } else {
      // Move to next question in current layer
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Load previous answer if exists
      const prevQuestion = currentQuestions[currentQuestionIndex - 1];
      setCurrentAnswer(answers[prevQuestion.id] || '');
    } else if (currentLayer > 1) {
      // Go to previous layer - go directly to last question (skip introduction when going back)
      const prevLayer = currentLayer - 1;
      // Skip layers with no questions when going back
      let targetLayer = prevLayer;
      while (targetLayer > 1) {
        const layerQuestions = getLayerQuestions(targetLayer, layer1Result || undefined);
        if (layerQuestions.length > 0) {
          break;
        }
        targetLayer--;
      }
      
      setCurrentLayer(targetLayer);
      const prevLayerQuestions = getLayerQuestions(targetLayer, layer1Result || undefined);
      setCurrentQuestionIndex(prevLayerQuestions.length - 1);
      // Load answer if exists
      const prevQuestion = prevLayerQuestions[prevLayerQuestions.length - 1];
      setCurrentAnswer(answers[prevQuestion.id] || '');
    }
  };

  // Handle layer introduction complete
  const handleLayerIntroductionComplete = () => {
    if (layerToIntroduce) {
      setCurrentLayer(layerToIntroduce);
      setCurrentQuestionIndex(0);
      setShowLayerIntroduction(false);
      setLayerToIntroduce(null);
    }
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Show layer introduction if needed
  if (showLayerIntroduction && layerToIntroduce) {
    return (
      <LayerIntroduction
        layerNumber={layerToIntroduce}
        title=""
        description1=""
        description2=""
        onBegin={handleLayerIntroductionComplete}
      />
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Layer {currentLayer} of 7
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
            <CardTitle className="text-2xl">
              Question {globalQuestionNumber} of {totalQuestions}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              {currentQuestion.text}
            </h3>

            <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
              <div className="space-y-4">
                {currentQuestion.options.map((option: any) => (
                  <div
                    key={option.value}
                    onClick={() => handleAnswerChange(option.value)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      currentAnswer === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-base whitespace-pre-line"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentLayer === 1 && currentQuestionIndex === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
              >
                {currentLayer === 7 && currentQuestionIndex === currentQuestions.length - 1
                  ? 'Complete Quiz'
                  : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Layer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            {currentLayer === 1 && 'Layer 1: Decision Identity'}
            {currentLayer === 2 && 'Layer 2: Execution Style Subtype'}
            {currentLayer === 3 && 'Layer 3: Mirror Awareness'}
            {currentLayer === 4 && 'Layer 4: Learning Style'}
            {currentLayer === 5 && 'Layer 5: Neuro Performance'}
            {currentLayer === 6 && 'Layer 6: Mindset & Personality'}
            {currentLayer === 7 && 'Layer 7: Meta-Beliefs & Values'}
          </p>
        </div>
      </div>
    </div>
  );
}
