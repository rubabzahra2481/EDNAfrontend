import React from 'react';
import { Brain, Target, CheckCircle2, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface ResultsDashboardProps {
  profile: any;
  userEmail: string;
}

export function ResultsDashboard({ profile, userEmail }: ResultsDashboardProps) {
  // Handle case where profile might not have all data
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="text-center py-16">
            <CardContent>
              <Brain className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Quiz Results Found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't completed the E-DNA assessment yet.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90"
                onClick={() => window.location.href = '/quiz'}
              >
                <Brain className="w-5 h-5 mr-2" />
                Take the E-DNA Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const persona = profile.core_type === 'blurred' ? 'architect' : profile.core_type?.toLowerCase() || 'architect';
  const layer7 = profile.layer7_profile || {};
  const headline = layer7.headline || `Your ${persona === 'architect' ? 'Architect' : 'Alchemist'} Profile`;
  const strengths = layer7.strengths || [];
  const watchouts = layer7.watchouts || [];
  const oppositeAwareness = profile.opposite_awareness || { R: 0, T: 0, I: 0 };
  const scoreBand = profile.score_band || 'Developing';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-full">
              <Brain className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">My E-DNA Results</h1>
              <p className="text-lg opacity-90">Your Entrepreneurial DNA Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Core Profile Card */}
          <Card className="border-2 border-purple-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Brain className="w-8 h-8 text-purple-600" />
                Your E-DNA Profile
              </CardTitle>
              <CardDescription className="text-base">
                Complete analysis of your entrepreneurial DNA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Core Type */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-2">
                  Core Type: {persona === 'architect' ? 'Architect' : 'Alchemist'}
                </h3>
                <p className="text-gray-700 text-lg mb-4">{headline}</p>
                <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-base px-4 py-2">
                  {scoreBand} Mirror Awareness
                </Badge>
              </div>

              {/* RTI Scores */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  RTI Awareness Scores
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Recognition</span>
                      <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.R}%</span>
                    </div>
                    <Progress value={oppositeAwareness.R} className="h-3" />
                  </div>
                  <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Translation</span>
                      <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.T}%</span>
                    </div>
                    <Progress value={oppositeAwareness.T} className="h-3" />
                  </div>
                  <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Integration</span>
                      <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.I}%</span>
                    </div>
                    <Progress value={oppositeAwareness.I} className="h-3" />
                  </div>
                </div>
              </div>

              {/* Strengths & Growth Areas */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Your Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {strengths.length > 0 ? (
                        strengths.map((strength: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">Strengths data will be available after completing all quiz sections</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Growth Areas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {watchouts.length > 0 ? (
                        watchouts.map((area: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{area}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">Growth areas data will be available after completing all quiz sections</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 text-lg px-8 py-6"
                  onClick={() => {
                    // Encode profile data and pass to PDF page
                    const encodedData = encodeURIComponent(JSON.stringify(profile));
                    window.open(`/pdf-results?data=${encodedData}`, '_blank');
                  }}
                >
                  <FileText className="w-6 h-6 mr-2" />
                  Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}


// import React from 'react';
// import { Brain, Target, CheckCircle2, FileText, TrendingUp } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { Progress } from './ui/progress';

// interface ResultsDashboardProps {
//   profile: any;
//   userEmail: string;
// }

// export function ResultsDashboard({ profile, userEmail }: ResultsDashboardProps) {
//   // Handle case where profile might not have all data
//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
//         <div className="container mx-auto px-4 py-12">
//           <Card className="text-center py-16">
//             <CardContent>
//               <Brain className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 No Quiz Results Found
//               </h3>
//               <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                 You haven't completed the E-DNA assessment yet.
//               </p>
//               <Button 
//                 size="lg"
//                 className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90"
//                 onClick={() => window.location.href = '/quiz'}
//               >
//                 <Brain className="w-5 h-5 mr-2" />
//                 Take the E-DNA Quiz
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   const persona = profile.core_type === 'blurred' ? 'architect' : profile.core_type?.toLowerCase() || 'architect';
//   const layer7 = profile.layer7_profile || {};
//   const headline = layer7.headline || `Your ${persona === 'architect' ? 'Architect' : 'Alchemist'} Profile`;
//   const strengths = layer7.strengths || [];
//   const watchouts = layer7.watchouts || [];
//   const oppositeAwareness = profile.opposite_awareness || { R: 0, T: 0, I: 0 };
//   const scoreBand = profile.score_band || 'Developing';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="p-4 bg-white/20 rounded-full">
//               <Brain className="w-12 h-12" />
//             </div>
//             <div>
//               <h1 className="text-4xl font-bold">My E-DNA Results</h1>
//               <p className="text-lg opacity-90">Your Entrepreneurial DNA Profile</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-5xl mx-auto space-y-8">
          
//           {/* Core Profile Card */}
//           <Card className="border-2 border-purple-200 shadow-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Brain className="w-8 h-8 text-purple-600" />
//                 Your E-DNA Profile
//               </CardTitle>
//               <CardDescription className="text-base">
//                 Complete analysis of your entrepreneurial DNA
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Core Type */}
//               <div className="p-6 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
//                 <h3 className="text-2xl font-bold mb-2">
//                   Core Type: {persona === 'architect' ? 'Architect' : 'Alchemist'}
//                 </h3>
//                 <p className="text-gray-700 text-lg mb-4">{headline}</p>
//                 <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-base px-4 py-2">
//                   {scoreBand} Mirror Awareness
//                 </Badge>
//               </div>

//               {/* RTI Scores */}
//               <div>
//                 <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-purple-600" />
//                   RTI Awareness Scores
//                 </h4>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="font-semibold text-gray-700">Recognition</span>
//                       <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.R}%</span>
//                     </div>
//                     <Progress value={oppositeAwareness.R} className="h-3" />
//                   </div>
//                   <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="font-semibold text-gray-700">Translation</span>
//                       <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.T}%</span>
//                     </div>
//                     <Progress value={oppositeAwareness.T} className="h-3" />
//                   </div>
//                   <div className="p-5 bg-white border-2 border-purple-200 rounded-lg">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="font-semibold text-gray-700">Integration</span>
//                       <span className="text-3xl font-bold text-purple-600">{oppositeAwareness.I}%</span>
//                     </div>
//                     <Progress value={oppositeAwareness.I} className="h-3" />
//                   </div>
//                 </div>
//               </div>

//               {/* Strengths & Growth Areas */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Strengths */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-lg flex items-center gap-2">
//                       <CheckCircle2 className="w-5 h-5 text-green-600" />
//                       Your Strengths
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-3">
//                       {strengths.length > 0 ? (
//                         strengths.map((strength: string, idx: number) => (
//                           <li key={idx} className="flex items-start gap-2">
//                             <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                             <span className="text-gray-700">{strength}</span>
//                           </li>
//                         ))
//                       ) : (
//                         <li className="text-gray-500 italic">Strengths data will be available after completing all quiz sections</li>
//                       )}
//                     </ul>
//                   </CardContent>
//                 </Card>

//                 {/* Growth Areas */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-lg flex items-center gap-2">
//                       <Target className="w-5 h-5 text-orange-600" />
//                       Growth Opportunities
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-3">
//                       {watchouts.length > 0 ? (
//                         watchouts.map((area: string, idx: number) => (
//                           <li key={idx} className="flex items-start gap-2">
//                             <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
//                             <span className="text-gray-700">{area}</span>
//                           </li>
//                         ))
//                       ) : (
//                         <li className="text-gray-500 italic">Growth areas data will be available after completing all quiz sections</li>
//                       )}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Action Button */}
//               <div className="flex justify-center pt-4">
//                 <Button 
//                   size="lg"
//                   className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 text-lg px-8 py-6"
//                   onClick={() => window.open('/pdf-results', '_blank')}
//                 >
//                   <FileText className="w-6 h-6 mr-2" />
//                   Download Full Report
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//         </div>
//       </div>
//     </div>
//   );
// }
