/**
 * Layer 1: Core Type Identification Questions
 * 
 * Each option is tagged with the type it represents:
 * - 'architect': 1 point
 * - 'alchemist': 1 point  
 * - 'blurred': 0.5 points
 */

export interface Layer1Question {
  id: string;
  layer: number;
  question: string;
  context?: string;
  options: {
    text: string;
    value: string;
    tags: string[]; // ['architect'], ['alchemist'], or ['blurred']
  }[];
}

export const layer1Questions: Layer1Question[] = [
  {
    id: 'L1_Q1',
    layer: 1,
    question: 'You have to go on a trip for the weekend. How do you prepare for it?',
    options: [
      { 
        text: 'I make a mental note of what\'s needed and start packing when everything is planned (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I write a full list, check everything off as I pack, add something if it comes to mind, but still keep thinking if I\'m missing something (Blurred)', 
        value: 'B', 
        tags: ['blurred']
      },
      { 
        text: 'I procrastinate and just pack everything in the last minute without any prior planning (Alchemist)', 
        value: 'C', 
        tags: ['alchemist']
      },
      { 
        text: 'I pack stuff, add some more, remove some of it that\'s not needed, ending up feeling overwhelmed (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q2',
    layer: 1,
    question: 'You get into an argument with one of your close friends and end up getting hurt unintentionally, how do you respond?',
    options: [
      { 
        text: 'Wait for them to figure it out and sort the matter or I\'ll move on (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I take some time off, analyzing and to gather my thoughts, might address now or later, but will do eventually (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I cannot leave the conflict unresolved and try to address it ASAP, even with a hurting heart (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'I overanalyze the patterns and feel conflicted, whether to say something or not (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q3',
    layer: 1,
    question: 'You walk into a room full of strangers. What do you do?',
    options: [
      { 
        text: 'I observe the crowd, looking for the vibe and engage where my interests align (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I tune into the energy, be one with the flow, but I might not interact with others, depending on my mood (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I wait for others to make the first move (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'I feel confident in interacting with new people but I second guess myself if it will go smooth (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q4',
    layer: 1,
    question: 'When imagining the future, do you see images or only abstract steps?',
    options: [
      { 
        text: 'I picture the future as concrete images and visions that inspire me. (Alchemist)', 
        value: 'A', 
        tags: ['alchemist']
      },
      { 
        text: 'I see the future as a logical sequence of steps to be planned and followed. (Architect)', 
        value: 'B', 
        tags: ['architect']
      },
      { 
        text: 'I sometimes see images, other times just steps, but I doubt which one is reliable. (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'My vision flips between being clear and cloudy, leaving me uncertain. (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q5',
    layer: 1,
    question: 'You have committed to do a task for a week to be consistent, day 3 you feel exhausted. What do you do?',
    options: [
      { 
        text: 'I keep going, keeping my eyes on the goal, commitment comes first (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I look at the reason, if it still matters, I keep going. If not, I adjust accordingly (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I take a day off, and continue from tomorrow (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'I feel conflicted if I should take a day off or keep going (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q6',
    layer: 1,
    question: 'You have completed a project and it works as expected. How do you feel about it?',
    options: [
      { 
        text: 'If the results are strong, I\'m satisfied (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I look at how it can be better or what other things can be added (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I feel good about it, but I keep wondering if I left something important (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'My satisfaction depends on other\'s approval of the project (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q7',
    layer: 1,
    question: 'When solving problems, do you see steps or patterns?',
    options: [
      { 
        text: 'I map out a step-by-step sequence to reach the solution. (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'I notice patterns and connections, letting them guide me intuitively. (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I shift between seeing steps and patterns but struggle to decide which matters most. (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'I overthink, seeing both too many steps and too many patterns, which makes me stuck. (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L1_Q8',
    layer: 1,
    question: 'You have set out on a new path that no one else has ever ventured on. How do you feel about that?',
    options: [
      { 
        text: 'I like to plan everything ahead and see an example or path strategy on achieving that goal (Architect)', 
        value: 'A', 
        tags: ['architect']
      },
      { 
        text: 'As long as I know it\'s possible, I can do it, I just need the initial steps to be calculated (Alchemist)', 
        value: 'B', 
        tags: ['alchemist']
      },
      { 
        text: 'I have my doubts but I have "you miss 100% of the chances you do not take" mentality (Blurred)', 
        value: 'C', 
        tags: ['blurred']
      },
      { 
        text: 'Some days I feel confident while others, I might doubt myself, depending on the mood (Blurred)', 
        value: 'D', 
        tags: ['blurred']
      }
    ]
  }
];
