// Layers 4-7 Questions for EDNA Assessment

interface Question {
  id: string;
  layer: number;
  dimension?: string;
  question: string;
  context?: string;
  options: {
    text: string;
    value: string;
  }[];
}

// Layer 4: Learning Style Preferences
export const layer4Questions: Question[] = [
  {
    id: 'L4_Q19',
    layer: 4,
    dimension: 'modality',
    question: 'You want to learn a new skill, like playing an instrument or using a new app. How would you prefer to learn it?',
    context: 'This identifies your primary learning modality',
    options: [
      { text: '"I\'ll look for a video tutorial or demonstration so I can watch how it\'s done." (Visual)', value: 'visual' },
      { text: '"I\'d like someone to explain it to me out loud, or maybe I\'ll find a podcast where it\'s discussed." (Auditory)', value: 'auditory' },
      { text: '"Hand me a written guide or manual – I prefer reading instructions and possibly taking notes." (Read/Write)', value: 'read_write' },
      { text: '"Let me roll up my sleeves and try it myself – I learn best by doing and practicing hands-on." (Kinesthetic)', value: 'kinesthetic' },
      { text: '"I like a mix of methods. I might watch a video, read about it, and then try it out to really understand." (Multimodal)', value: 'multimodal' }
    ]
  },
  {
    id: 'L4_Q20',
    layer: 4,
    dimension: 'approach',
    question: 'When tackling a complex task, I prefer to:',
    context: 'Learning approach: Sequential vs Global',
    options: [
      { text: 'Follow a clear, step-by-step outline (Sequential, Structured).', value: 'sequential' },
      { text: 'First get the overall summary or big-picture overview (Global, Exploratory).', value: 'global' },
      { text: 'Jump in and figure things out as I go (Global, Kinesthetic).', value: 'kinesthetic' },
      { text: 'Stick closely to a detailed plan or checklist (Sequential, Structured).', value: 'structured' }
    ]
  },
  {
    id: 'L4_Q21',
    layer: 4,
    dimension: 'concept_processing',
    question: 'When learning a concept, I feel more comfortable with:',
    context: 'Concrete vs Abstract',
    options: [
      { text: 'Concrete examples and real-world applications (Concrete/Sensing).', value: 'concrete' },
      { text: 'Theoretical principles and abstract models (Abstract/Intuitive).', value: 'abstract' },
      { text: 'Hands-on practice problems or case studies (Concrete/Sensing).', value: 'hands_on' },
      { text: 'Discussing implications and ideas broadly (Abstract/Intuitive).', value: 'abstract_discussion' }
    ]
  },
  {
    id: 'L4_Q22',
    layer: 4,
    dimension: 'working_environment',
    question: 'In a working environment, I prefer to:',
    context: 'Individual vs Collaborative',
    options: [
      { text: 'Work alone and run through materials at my own pace (Individual, Self-paced).', value: 'individual' },
      { text: 'Participate in group discussions or team activities (Collaborative).', value: 'collaborative' },
      { text: 'Have one-on-one guidance or mentoring (Guided, Collaborative).', value: 'guided' },
      { text: 'Learn independently using self-check exercises (Individual).', value: 'self_check' }
    ]
  },
  {
    id: 'L4_Q23',
    layer: 4,
    dimension: 'pace',
    question: 'Regarding study pacing, I prefer:',
    context: 'Fast vs Slow pacing',
    options: [
      { text: 'Intense, concentrated learning sessions (fast/deep dives).', value: 'fast' },
      { text: 'Spreading learning out in shorter, regular sessions (slow/steady pace).', value: 'slow' },
      { text: 'Occasional focused marathons when needed (fast).', value: 'marathon' },
      { text: 'Consistent daily or weekly review (slow).', value: 'consistent' }
    ]
  },
  {
    id: 'L4_Q24',
    layer: 4,
    dimension: 'modality_repeat',
    question: 'You want to learn a new skill, like playing an instrument or using a new app. How would you prefer to learn it?',
    context: 'Additional modality check',
    options: [
      { text: '"I\'ll look for a video tutorial or demonstration so I can watch how it\'s done." (Visual)', value: 'visual' },
      { text: '"I\'d like someone to explain it to me out loud, or maybe I\'ll find a podcast where it\'s discussed." (Auditory)', value: 'auditory' },
      { text: '"Hand me a written guide or manual – I prefer reading instructions and possibly taking notes." (Read/Write)', value: 'read_write' },
      { text: '"Let me roll up my sleeves and try it myself – I learn best by doing and practicing hands-on." (Kinesthetic)', value: 'kinesthetic' },
      { text: '"I like a mix of methods. I might watch a video, read about it, and then try it out to really understand." (Multimodal)', value: 'multimodal' }
    ]
  },
  {
    id: 'L4_Q25',
    layer: 4,
    dimension: 'approach_project',
    question: 'You have a big assignment or project with many parts to complete. How would you approach it?',
    context: 'Sequential vs Global approach',
    options: [
      { text: '"I\'d create a detailed step-by-step plan or checklist and work through each task in order." (Sequential/Structured)', value: 'sequential' },
      { text: '"I would start with a broad overview of the project, then dive into the parts that interest me most first." (Global/Exploratory)', value: 'global' },
      { text: '"I prefer a structured method: I tackle tasks one at a time according to a clear schedule." (Sequential/Structured)', value: 'structured' },
      { text: '"I map out different sections out of order to see how they all connect, then fill in the details as I go." (Global/Exploratory)', value: 'exploratory' }
    ]
  },
  {
    id: 'L4_Q26',
    layer: 4,
    dimension: 'concept_understanding',
    question: 'You\'re learning about a new concept or idea. What helps you understand it best?',
    context: 'Concrete vs Abstract understanding',
    options: [
      { text: '"Show me a real example or a practical case – I learn best when I can see how it works in real life." (Concrete)', value: 'concrete' },
      { text: '"Give me the underlying theory or idea – I enjoy understanding the concepts behind the topic." (Abstract)', value: 'abstract' },
      { text: '"I prefer hands-on experiences or specific examples; they help me grasp the idea by making it tangible." (Concrete)', value: 'hands_on' },
      { text: '"I like to think about it in abstract terms (maybe by imagining different scenarios) before worrying about real-world examples." (Abstract)', value: 'abstract_thinking' }
    ]
  },
  {
    id: 'L4_Q27',
    layer: 4,
    dimension: 'work_preference',
    question: 'You have an important project to complete. How would you prefer to work on it?',
    context: 'Individual vs Collaborative preference',
    options: [
      { text: '"I would work on it by myself so I can concentrate and handle everything my way." (Individual)', value: 'individual' },
      { text: '"I\'d team up with others so we can share ideas and work on it as a group." (Collaborative)', value: 'collaborative' },
      { text: '"I do my best work alone, where I can focus without distractions or group meetings." (Individual)', value: 'alone' },
      { text: '"Working with others energizes me – I enjoy bouncing ideas off teammates and tackling tasks together." (Collaborative)', value: 'team' }
    ]
  },
  {
    id: 'L4_Q28',
    layer: 4,
    dimension: 'learning_pace',
    question: 'When you\'re learning something new, what pace feels most comfortable for you?',
    context: 'Learning pace preference',
    options: [
      { text: '"I like to move quickly through new material, covering a lot in a short time (even if it\'s just the basics)." (Fast)', value: 'fast' },
      { text: '"I prefer a slower, steady pace so I can go through details carefully and absorb everything thoroughly." (Slow)', value: 'slow' },
      { text: '"I often jump right in and learn on the go – I enjoy keeping a fast pace without too many pauses." (Fast)', value: 'fast_learn' },
      { text: '"I feel more comfortable taking my time, making sure I fully understand each part before moving on." (Slow)', value: 'slow_thorough' }
    ]
  }
];

// Layer 5: Neurodiversity and Accessibility
export const layer5Questions: Question[] = [
  {
    id: 'L5_Q24',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'Which of the following statements best describes your preferred method of learning new material?',
    context: 'Identifying accessibility needs - not diagnostic',
    options: [
      { text: 'Short, interactive sessions (e.g., videos, quizzes) with frequent breaks help me learn best. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'I learn best through consistent routines and step-by-step, structured instructions. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'Audio narration or dyslexia-friendly text formatting significantly improves my comprehension. (Trait: Dyslexia-related)', value: 'dyslexia' },
      { text: 'I require a quiet, minimally distracting environment (low noise, soft lighting) to focus. (Trait: Sensory sensitivity)', value: 'sensory' }
    ]
  },
  {
    id: 'L5_Q25',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'Which of the following statements best matches your typical experience with reading or writing tasks?',
    context: 'Reading and writing preferences',
    options: [
      { text: 'I often struggle with reading quickly or accurately and benefit from text-to-speech or similar aids. (Trait: Dyslexia-related)', value: 'dyslexia' },
      { text: 'I become easily distracted or restless during long reading or writing sessions. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'I prefer clear, bullet-pointed instructions and large text; large blocks of dense text frustrate me. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'I get overwhelmed by cluttered layouts or excessive visual stimuli on the page. (Trait: Sensory sensitivity)', value: 'sensory' }
    ]
  },
  {
    id: 'L5_Q26',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'How do you usually react when a planned schedule or routine is disrupted unexpectedly?',
    context: 'Response to routine disruption',
    options: [
      { text: 'I feel very anxious or upset; I strongly prefer predictable routines. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'I adapt to change quickly but feel restless without new stimuli or variety. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'Even small changes in my sensory environment (like lighting or noise) disrupt my focus. (Trait: Sensory sensitivity)', value: 'sensory' },
      { text: 'When plans change suddenly, I tend to forget steps or need help reorganizing my tasks. (Trait: ADHD-related)', value: 'adhd_reorganize' }
    ]
  },
  {
    id: 'L5_Q27',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'When planning tasks or managing time, which statement is most accurate for you?',
    context: 'Time management and planning',
    options: [
      { text: 'I often procrastinate or lose track of details unless I have reminders or alarms. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'I create detailed schedules or checklists and follow them closely. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'I break tasks into smaller steps and set milestones to stay on track. (Trait: ADHD-related)', value: 'adhd_steps' },
      { text: 'I need a calm, clutter-free workspace (organized desk, minimal noise) to effectively plan my tasks. (Trait: Sensory sensitivity)', value: 'sensory' }
    ]
  },
  {
    id: 'L5_Q28',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'Which of the following helps you maintain concentration when learning or studying?',
    context: 'Concentration and focus needs',
    options: [
      { text: 'Short, game-like activities and clear visuals keep me engaged and focused. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'A logically structured, detailed presentation of information helps me focus best. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'Controlling the sensory environment (for example, using noise-cancelling headphones) is critical for my focus. (Trait: Sensory sensitivity)', value: 'sensory' },
      { text: 'Using audio narration or following along with spoken words helps me understand and concentrate. (Trait: Dyslexia-related)', value: 'dyslexia' }
    ]
  },
  {
    id: 'L5_Q29',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'How do sensory factors like noise and lighting affect your study or learning process?',
    context: 'Sensory environmental factors',
    options: [
      { text: 'I focus best in silence and with low-light conditions. (Trait: Sensory sensitivity)', value: 'sensory' },
      { text: 'I often need to move around or have background music/noise to help me concentrate. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'Consistent sensory conditions are important to me; I notice even slight changes in my environment. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'I benefit from multisensory input (audio plus visuals) because text-only formats can be tiring. (Trait: Dyslexia-related)', value: 'dyslexia' }
    ]
  },
  {
    id: 'L5_Q30',
    layer: 5,
    dimension: 'neurodiversity',
    question: 'Which statement best describes your experience with writing or producing written work?',
    context: 'Writing experience',
    options: [
      { text: 'I frequently make spelling or grammar errors and often use aids like spellcheck or dictation. (Trait: Dyslexia-related)', value: 'dyslexia' },
      { text: 'I often get distracted or need to take breaks in the middle of writing tasks. (Trait: ADHD-related)', value: 'adhd' },
      { text: 'I write best when I have a clear outline, and I feel anxious if instructions or expectations are unclear. (Trait: Autism-spectrum)', value: 'autism' },
      { text: 'I feel restless and tend to fidget when writing for extended periods of time. (Trait: ADHD-related)', value: 'adhd_restless' }
    ]
  }
];

// Layer 6: Mindset and Personality
export const layer6Questions: Question[] = [
  {
    id: 'L6_Q31',
    layer: 6,
    dimension: 'mindset',
    question: 'When faced with a difficult challenge in business, I usually...',
    context: 'Growth vs Fixed Mindset',
    options: [
      { text: 'See it as an opportunity to learn and improve my skills. (Growth Mindset)', value: 'growth' },
      { text: 'Feel that I may not be naturally good enough to overcome it. (Fixed Mindset)', value: 'fixed' },
      { text: 'Break it down into smaller tasks and use it as practice. (Growth Mindset, Structured)', value: 'growth_structured' },
      { text: 'Avoid it if I think it might expose my weaknesses. (Fixed Mindset)', value: 'fixed_avoid' }
    ]
  },
  {
    id: 'L6_Q32',
    layer: 6,
    dimension: 'risk_tolerance',
    question: 'When planning a new business initiative, I tend to...',
    context: 'Risk Tolerance',
    options: [
      { text: 'Set bold, ambitious goals, even if success is uncertain. (High Risk Tolerance, Ambitious)', value: 'high_ambitious' },
      { text: 'Create a careful, step-by-step plan with minimal surprises. (Low Risk Tolerance, Cautious)', value: 'low_cautious' },
      { text: 'Balance ambition with a realistic view of risks. (Moderate Risk Tolerance, Strategic)', value: 'moderate_strategic' },
      { text: 'Delay action until I am confident it\'s "safe enough." (Low Risk Tolerance, Fixed Mindset)', value: 'low_fixed' }
    ]
  },
  {
    id: 'L6_Q33',
    layer: 6,
    dimension: 'extraversion',
    question: 'When working through strategic decisions, I prefer to...',
    context: 'Extraversion vs Introversion',
    options: [
      { text: 'Brainstorm ideas with a group and feed off others\' energy. (Extraversion, Collaborative)', value: 'extroverted_collaborative' },
      { text: 'Reflect quietly on my own before sharing conclusions. (Introversion, Independent)', value: 'introverted_independent' },
      { text: 'Alternate between team discussions and solo thinking. (Balanced Extraversion/Introversion)', value: 'balanced' },
      { text: 'Avoid group input as it distracts me from clear thinking. (Introversion, Structured)', value: 'introverted_structured' }
    ]
  },
  {
    id: 'L6_Q34',
    layer: 6,
    dimension: 'adaptability',
    question: 'When a key routine is disrupted unexpectedly, I...',
    context: 'Adaptability and Response to Change',
    options: [
      { text: 'Adapt quickly and reframe it as a new opportunity. (Growth Mindset, High Adaptability)', value: 'growth_adaptable' },
      { text: 'Feel anxious and prefer to stick to the original plan. (Fixed Mindset, Low Risk Tolerance)', value: 'fixed_anxious' },
      { text: 'Reorganize systematically and seek clarity before moving forward. (Introversion, Structured)', value: 'introverted_systematic' },
      { text: 'Thrive in the spontaneity and enjoy finding a creative solution. (Extraversion, High Energy)', value: 'extroverted_creative' }
    ]
  },
  {
    id: 'L6_Q35',
    layer: 6,
    dimension: 'feedback_response',
    question: 'When I receive constructive feedback on my work, I prefer...',
    context: 'Response to Feedback',
    options: [
      { text: 'Direct, candid input that highlights what needs to improve. (Growth Mindset, High Risk Tolerance)', value: 'growth_direct' },
      { text: 'Supportive feedback that emphasizes strengths first. (Fixed/Growth Blend, Reassurance-Seeking)', value: 'blend_supportive' },
      { text: 'Balanced feedback with both strengths and weaknesses noted. (Balanced, Moderate Risk Tolerance)', value: 'balanced_feedback' },
      { text: 'Minimal feedback, as too much criticism can demotivate me. (Fixed Mindset, Low Risk Tolerance)', value: 'fixed_minimal' }
    ]
  },
  {
    id: 'L6_Q36',
    layer: 6,
    dimension: 'energy_motivation',
    question: 'When tackling a large project with a tight deadline, I usually...',
    context: 'Energy and Motivation patterns',
    options: [
      { text: 'Dive in with high energy and work intensely for long hours. (High Energy/Motivation, Extraversion)', value: 'high_energy' },
      { text: 'Break it into smaller steps to avoid overwhelm. (Structured, Low–Moderate Energy)', value: 'structured_steps' },
      { text: 'Work steadily and consistently at a measured pace. (Moderate Energy, Introversion)', value: 'steady_pace' },
      { text: 'Struggle to maintain focus and often procrastinate. (Low Energy/Motivation, Fixed Mindset)', value: 'low_energy' }
    ]
  },
  {
    id: 'L6_Q37',
    layer: 6,
    dimension: 'goal_approach',
    question: 'In terms of my overall approach to goals, I...',
    context: 'Goal setting and achievement approach',
    options: [
      { text: 'Push myself toward stretch targets that go beyond comfort zones. (Ambitious, Growth Mindset)', value: 'ambitious' },
      { text: 'Prefer achievable, realistic milestones with predictable outcomes. (Cautious, Low Risk Tolerance)', value: 'cautious_realistic' },
      { text: 'Mix ambitious goals with smaller checkpoints along the way. (Balanced, Structured)', value: 'balanced_goals' },
      { text: 'Focus on maintaining stability rather than chasing rapid growth. (Cautious, Fixed Mindset)', value: 'stability_focus' }
    ]
  },
  {
    id: 'L6_Q38',
    layer: 6,
    dimension: 'innovation_approach',
    question: 'When exploring new strategies or innovations, I am more likely to...',
    context: 'Innovation and experimentation approach',
    options: [
      { text: 'Eagerly experiment with new methods, even if unproven. (High Innovativeness, High Risk Tolerance)', value: 'high_innovation' },
      { text: 'Observe first, then adopt only if others prove it works. (Low–Moderate Risk Tolerance, Cautious)', value: 'observe_adopt' },
      { text: 'Use small-scale trials before committing fully. (Moderate Innovativeness, Strategic)', value: 'small_trials' },
      { text: 'Stick to familiar, tested methods I trust. (Low Innovativeness, Fixed Mindset)', value: 'familiar_methods' }
    ]
  }
];

// Layer 7: Meta-Beliefs & Values
export const layer7Questions: Question[] = [
  {
    id: 'L7_Q39',
    layer: 7,
    dimension: 'growth_belief',
    question: 'When planning to expand your business, which statement best reflects your attitude?',
    context: 'Beliefs about scaling and growth',
    options: [
      { text: '"Growth is the priority – we can refine quality later." (Belief: bold scaling)', value: 'bold_scaling' },
      { text: '"I worry that expanding too fast will hurt our product\'s quality." (Belief: growth compromises quality)', value: 'quality_concern' },
      { text: '"Maintaining excellence is more important than rapid growth." (Belief: quality first)', value: 'quality_first' },
      { text: '"I prefer a very controlled, steady pace of growth." (Belief: cautious pacing)', value: 'cautious_pacing' }
    ]
  },
  {
    id: 'L7_Q40',
    layer: 7,
    dimension: 'financial_belief',
    question: 'Which belief best describes how you handle financial details?',
    context: 'Beliefs about numbers and financial management',
    options: [
      { text: '"I\'m confident with numbers and regularly review our financial metrics." (Belief: strong self-efficacy in finances)', value: 'strong_efficacy' },
      { text: '"Numbers always confuse me – I delegate or avoid them when possible." (Belief: avoidance due to low confidence)', value: 'avoidance' },
      { text: '"I\'m okay with numbers if I use tools, but I double-check everything." (Belief: cautious numerical trust)', value: 'cautious_trust' },
      { text: '"I know I should understand the finances, but I tend to feel anxious about them." (Belief: anxiety about math)', value: 'anxiety_math' }
    ]
  },
  {
    id: 'L7_Q41',
    layer: 7,
    dimension: 'money_success',
    question: 'How do you view money and revenue in relation to success?',
    context: 'Beliefs about financial wealth and success',
    options: [
      { text: '"Making profit is the ultimate sign of success." (Belief: financial wealth = success)', value: 'financial_wealth' },
      { text: '"Success is about impact or customer satisfaction more than money." (Belief: values over income)', value: 'values_over_income' },
      { text: '"Money is a tool, but it\'s not the most important measure." (Belief: balanced view)', value: 'balanced_view' },
      { text: '"I fear becoming wealthy because it might change me or others\' perceptions." (Belief: success brings drawbacks)', value: 'success_drawbacks' }
    ]
  },
  {
    id: 'L7_Q42',
    layer: 7,
    dimension: 'achievement_response',
    question: 'How do you typically feel when you achieve a business goal?',
    context: 'Response to achievement and success',
    options: [
      { text: '"I feel motivated and immediately set a bigger goal." (Belief: achievement fuels ambition)', value: 'achievement_fuels' },
      { text: '"I worry about maintaining it or fear people will expect too much." (Belief: anxiety about sustaining success)', value: 'anxiety_sustaining' },
      { text: '"I feel uneasy, as if I don\'t really deserve it." (Belief: impostor feelings)', value: 'impostor_feelings' },
      { text: '"I\'m happy, but I quickly move on without much celebration." (Belief: never satisfied)', value: 'never_satisfied' }
    ]
  },
  {
    id: 'L7_Q43',
    layer: 7,
    dimension: 'completion_approach',
    question: 'Which statement matches your approach to completing projects?',
    context: 'Beliefs about perfectionism and completion',
    options: [
      { text: '"Nothing leaves the office unless it\'s practically perfect." (Belief: perfectionism)', value: 'perfectionism' },
      { text: '"I aim high but accept that shipping is better than stalling." (Belief: iterative progress)', value: 'iterative_progress' },
      { text: '"I often double-check everything and struggle to finish." (Belief: over-checking/procrastination)', value: 'over_checking' },
      { text: '"I prefer to get it done quickly and refine later if needed." (Belief: speed over polish)', value: 'speed_over_polish' }
    ]
  },
  {
    id: 'L7_Q44',
    layer: 7,
    dimension: 'competition_view',
    question: 'How do you view competitors and collaboration?',
    context: 'Beliefs about competition and cooperation',
    options: [
      { text: '"For me to win, someone else must lose." (Belief: zero-sum mindset)', value: 'zero_sum' },
      { text: '"Working with others can create win-win outcomes." (Belief: abundance/partnering)', value: 'abundance_partnering' },
      { text: '"I focus on my success and don\'t worry much about others." (Belief: independent approach)', value: 'independent_approach' },
      { text: '"I share resources when possible, but I stay guarded." (Belief: cautious cooperation)', value: 'cautious_cooperation' }
    ]
  },
  {
    id: 'L7_Q45',
    layer: 7,
    dimension: 'challenge_response',
    question: 'When you encounter an unexpected challenge, what is your first instinct?',
    context: 'Response to unexpected challenges',
    options: [
      { text: '"Take immediate action, even if it\'s risky." (Belief: bold risk-taking)', value: 'bold_risk' },
      { text: '"Consult trusted advisors and proceed carefully." (Belief: collaborative caution)', value: 'collaborative_caution' },
      { text: '"Feel paralyzed or doubt myself before deciding." (Belief: fear leading to hesitation)', value: 'fear_hesitation' },
      { text: '"Stick with proven solutions instead of trying something new." (Belief: aversion to risk/innovation)', value: 'aversion_innovation' }
    ]
  },
  {
    id: 'L7_Q46',
    layer: 7,
    dimension: 'opportunity_mindset',
    question: 'Which best describes your mindset about future opportunity?',
    context: 'Growth/abundance vs scarcity mindset',
    options: [
      { text: '"There\'s always more to achieve; I don\'t see a limit to success." (Belief: growth/abundance mindset)', value: 'growth_abundance' },
      { text: '"I must be realistic – opportunities are limited." (Belief: scarcity mindset)', value: 'scarcity_mindset' },
      { text: '"I wait to see if resources appear before making big plans." (Belief: cautious resource mindset)', value: 'cautious_resource' },
      { text: '"I plan for expansion but keep contingency plans for setbacks." (Belief: balanced optimism)', value: 'balanced_optimism' }
    ]
  }
];

// Backward compatibility: Export combined questions array
export const allQuestions = [
  ...layer4Questions,
  ...layer5Questions,
  ...layer6Questions,
  ...layer7Questions
];

// Export question count for each layer
export const questionCounts = {
  layer4: layer4Questions.length,
  layer5: layer5Questions.length,
  layer6: layer6Questions.length,
  layer7: layer7Questions.length,
  total: allQuestions.length
};

// Export default for convenience
export default {
  layer4: layer4Questions,
  layer5: layer5Questions,
  layer6: layer6Questions,
  layer7: layer7Questions,
  all: allQuestions,
  counts: questionCounts
};
