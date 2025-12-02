import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Search, 
  Filter,
  PlayCircle,
  Download,
  CheckCircle,
  BarChart3,
  Trophy,
  Target,
  Building2,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface LMSDashboardProps {
  persona?: 'architect' | 'alchemist';
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  modules: number;
  rating: number;
  enrolled: number;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  persona: 'architect' | 'alchemist' | 'both';
  thumbnail: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Systems & Process Optimization',
    description: 'Learn to build scalable business systems that grow with your company',
    instructor: 'Sarah Chen',
    duration: '8 hours',
    modules: 12,
    rating: 4.8,
    enrolled: 1250,
    progress: 65,
    difficulty: 'Intermediate',
    category: 'Operations',
    persona: 'architect',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Innovation & Creativity Methods',
    description: 'Unlock breakthrough innovations through proven creative methodologies',
    instructor: 'Marcus Rodriguez',
    duration: '6 hours',
    modules: 8,
    rating: 4.9,
    enrolled: 980,
    progress: 0,
    difficulty: 'Beginner',
    category: 'Innovation',
    persona: 'alchemist',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Data-Driven Marketing',
    description: 'Master analytics and metrics to optimize your marketing ROI',
    instructor: 'Jennifer Kim',
    duration: '10 hours',
    modules: 15,
    rating: 4.7,
    enrolled: 2100,
    progress: 30,
    difficulty: 'Advanced',
    category: 'Marketing',
    persona: 'architect',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'Brand Storytelling & Vision',
    description: 'Create compelling narratives that inspire customers and teams',
    instructor: 'David Park',
    duration: '5 hours',
    modules: 7,
    rating: 4.6,
    enrolled: 1540,
    progress: 90,
    difficulty: 'Intermediate',
    category: 'Branding',
    persona: 'alchemist',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop'
  },
  {
    id: '5',
    title: 'Financial Planning & Analysis',
    description: 'Build robust financial models and forecasting systems',
    instructor: 'Robert Taylor',
    duration: '12 hours',
    modules: 18,
    rating: 4.8,
    enrolled: 890,
    progress: 0,
    difficulty: 'Advanced',
    category: 'Finance',
    persona: 'architect',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop'
  },
  {
    id: '6',
    title: 'Leadership & Team Building',
    description: 'Essential skills for leading high-performing teams',
    instructor: 'Lisa Wang',
    duration: '7 hours',
    modules: 10,
    rating: 4.9,
    enrolled: 3200,
    progress: 45,
    difficulty: 'Intermediate',
    category: 'Leadership',
    persona: 'both',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop'
  }
];

export function LMSDashboard({ persona = 'architect' }: LMSDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('dashboard');

  const completedCourses = mockCourses.filter(course => course.progress === 100);
  const inProgressCourses = mockCourses.filter(course => course.progress > 0 && course.progress < 100);
  const recommendedCourses = mockCourses.filter(course => 
    course.persona === persona || course.persona === 'both'
  );

  const totalProgress = mockCourses.reduce((sum, course) => sum + course.progress, 0) / mockCourses.length;

  const categories = ['All', 'Operations', 'Innovation', 'Marketing', 'Branding', 'Finance', 'Leadership'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isArchitect = persona === 'architect';

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Gradient */}
      <section className="bg-gradient-arch-scale py-12">
        <div className="container-bs-desktop">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              {isArchitect ? (
                <Building2 className="w-8 h-8 text-white" />
              ) : (
                <Sparkles className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="typo-h1-bs text-white">Learning Dashboard</h1>
              <p className="typo-body-bs text-white/90">
                Personalized for {isArchitect ? 'Architects' : 'Alchemists'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding-bs">
        <div className="container-bs-desktop">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-arch-scale data-[state=active]:text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-gradient-arch-scale data-[state=active]:text-white">All Courses</TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-arch-scale data-[state=active]:text-white">My Progress</TabsTrigger>
              <TabsTrigger value="workbooks" className="data-[state=active]:bg-gradient-arch-scale data-[state=active]:text-white">Workbooks</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="program-flow-card text-center">
                  <div className="w-12 h-12 bg-[var(--bs-color-indigo)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                  </div>
                  <p className="typo-h3-bs mb-1">{mockCourses.length}</p>
                  <p className="typo-caption-bs text-gray-600">Available Courses</p>
                </div>
                
                <div className="program-flow-card text-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="typo-h3-bs mb-1">{completedCourses.length}</p>
                  <p className="typo-caption-bs text-gray-600">Completed</p>
                </div>
                
                <div className="program-flow-card text-center">
                  <div className="w-12 h-12 bg-[var(--bs-color-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[var(--bs-color-orange)]" />
                  </div>
                  <p className="typo-h3-bs mb-1">{inProgressCourses.length}</p>
                  <p className="typo-caption-bs text-gray-600">In Progress</p>
                </div>
                
                <div className="program-flow-card text-center">
                  <div className="w-12 h-12 bg-[var(--bs-color-indigo)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                  </div>
                  <p className="typo-h3-bs mb-1">{Math.round(totalProgress)}%</p>
                  <p className="typo-caption-bs text-gray-600">Overall Progress</p>
                </div>
              </div>

            {/* Continue Learning */}
            {inProgressCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {inProgressCourses.slice(0, 2).map((course) => (
                      <CourseCard key={course.id} course={course} showProgress />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Recommended for {isArchitect ? 'Architects' : 'Alchemists'}</span>
                </CardTitle>
                <CardDescription>
                  Courses curated specifically for your business DNA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {recommendedCourses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress />
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Overall Completion</span>
                    <span>{Math.round(totalProgress)}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-3" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Trophy className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl text-green-600">{completedCourses.length}</p>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl text-blue-600">{inProgressCourses.length}</p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl text-orange-600">
                      {mockCourses.length - completedCourses.length - inProgressCourses.length}
                    </p>
                    <p className="text-sm text-gray-600">Not Started</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4>{course.title}</h4>
                        <p className="text-sm text-gray-600">{course.modules} modules</p>
                      </div>
                      <div className="w-32">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{course.progress}%</span>
                          {course.progress === 100 && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workbooks Tab */}
          <TabsContent value="workbooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Course Workbooks</span>
                </CardTitle>
                <CardDescription>
                  Download practical workbooks and templates for each course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4>{course.title}</h4>
                          <p className="text-sm text-gray-600">Workbook & Templates</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
  );
}

function CourseCard({ course, showProgress = false }: { course: Course; showProgress?: boolean }) {
  const isArchitect = course.persona === 'architect';
  const PersonaIcon = isArchitect ? Building2 : Sparkles;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
            <CardDescription className="mt-2">{course.description}</CardDescription>
          </div>
          {course.persona !== 'both' && (
            <PersonaIcon className={`w-5 h-5 ml-2 ${isArchitect ? 'text-purple-600' : 'text-orange-500'}`} />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.modules} modules</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{course.difficulty}</Badge>
          <span className="text-sm text-gray-600">{course.enrolled} enrolled</span>
        </div>

        {showProgress && course.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
          <PlayCircle className="w-4 h-4 mr-2" />
          {course.progress > 0 ? 'Continue' : 'Start Course'}
        </Button>
      </CardContent>
    </Card>
  );
}