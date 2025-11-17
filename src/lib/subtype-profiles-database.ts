/**
 * Complete Subtype Profile Database for E-DNA Results Page
 * Contains all content for 12 subtypes across Architect, Alchemist, and Blurred types
 */

export interface SubtypeProfile {
  dna_type: 'architect' | 'alchemist' | 'blurred';
  hero_subtitle: string;
  decision_loop: string;
  loop_description: string;
  subtype_name: string;
  subtype_description: string;
  identity?: string;
  expression?: string;
  destabilisation_path?: string;
  root_cause?: string;
  stabilisation_path?: string;
  strengths: string;
  risks_and_blind_spots: string;
  mirror_pair: string;
  mirror_description: string;
  where_you_struggle: string;
  where_they_lead: string;
  where_they_struggle: string;
  where_you_lead: string;
}

export const subtypeProfiles: Record<string, SubtypeProfile> = {
  // ALCHEMIST SUBTYPES
  magnetic_perfectionist: {
    dna_type: 'alchemist',
    hero_subtitle: "You're someone who understands people and situations on a deep, emotional level. You notice things others miss — the mood of a room, when energy shifts, or when motivation fades.",
    decision_loop: "Emotion → Logic → Emotion",
    loop_description: "Your decisions begin as feelings. Logic enters next, helping you structure and interpret your emotions. As long as emotion can validate your logic, the decision can be made.",
    subtype_name: "Magnetic Perfectionist",
    subtype_description: "You bring emotion to life through design, detail, and presence. Where others express ideas, you refine them — shaping experiences that feel complete, harmonious, and deeply human.",
    identity: "You perceive the world through feeling and form — always sensing when something is slightly off or perfectly aligned. To you, emotion has texture, and ideas have rhythm. You can feel when a message, a space, or a moment resonates — and when it doesn't.",
    expression: "You stabilize through refinement — adjusting until harmony returns. For you, progress isn't about speed; it's about resonance. Your strength lies in turning emotion into experience.",
    strengths: "You elevate everything you touch — turning the ordinary into something meaningful and unforgettable.",
    risks_and_blind_spots: "You can get lost chasing perfection — refining endlessly without ever feeling finished.",
    mirror_pair: "Magnetic Perfectionist ↔ Internal Analyzer",
    mirror_description: "Your mirror pair is someone who seeks truth through logic, structure, and proof. Where you refine through emotion and perfection, they refine through clarity and precision.",
    where_you_struggle: "You can lose track of timing, still polishing when it's time to deliver",
    where_they_lead: "They define completion with data and logic, showing you when the work is ready to release",
    where_they_struggle: "They see accuracy but sometimes miss the emotional connection that makes it meaningful",
    where_you_lead: "You remind them that truth should not only make sense but also move hearts"
  },

  visionary_oracle: {
    dna_type: 'alchemist',
    hero_subtitle: "You're someone who understands people and situations on a deep, emotional level. You notice things others miss — the mood of a room, when energy shifts, or when motivation fades.",
    decision_loop: "Emotion → Logic → Emotion",
    loop_description: "Your decisions begin as feelings. Logic enters next, helping you structure and interpret your emotions. As long as emotion can validate your logic, the decision can be made.",
    subtype_name: "Visionary Oracle",
    subtype_description: "You translate emotion into meaning — turning intuitive energy into clarity that others can trust and follow.",
    identity: "You naturally experience the world through emotion and connection. You can feel what's happening around you — the mood in a conversation, the energy of a team, or when something important is shifting — often before anyone says a word. You rely on instinct and empathy.",
    expression: "You move through the world by sensing meaning before it takes shape. You notice subtle shifts — in people, ideas, or moments — that hint something is about to change. Where others see random events, you see patterns forming beneath the surface.",
    strengths: "You connect scattered insights into a vision that feels clear and meaningful, giving direction when others see only noise",
    risks_and_blind_spots: "You can drift into over-interpretation when insight turns vague or abstract",
    mirror_pair: "Visionary Oracle ↔ Master Strategist",
    mirror_description: "Your mirror pair is someone who thinks in structure, steps, and clear direction. Where you sense possibilities and read patterns others can't yet see, they turn those ideas into practical plans that can be tested and scaled.",
    where_you_struggle: "You sense what's coming but can lose focus on how to get there",
    where_they_lead: "They ground your vision with steps, structure, and timelines",
    where_they_struggle: "They focus so much on planning that they can lose touch with timing or emotional alignment",
    where_you_lead: "You help them sense when the moment is right, not just when the plan is ready"
  },

  ultimate_alchemist: {
    dna_type: 'alchemist',
    hero_subtitle: "You're someone who understands people and situations on a deep, emotional level. You notice things others miss — the mood of a room, when energy shifts, or when motivation fades.",
    decision_loop: "Emotion → Logic → Emotion",
    loop_description: "Your decisions begin as feelings. Logic enters next, helping you structure and interpret your emotions. As long as emotion can validate your logic, the decision can be made.",
    subtype_name: "The Ultimate Alchemist",
    subtype_description: "You embody the full expression of emotional intelligence — the ability to sense what's real, connect what's apart, and restore balance where things fall out of sync.",
    identity: "You move through life with a deep awareness of what connects people, ideas, and timing. You can sense when something is off long before anyone says a word — not to react, but to realign. You bring presence that calms, vision that uplifts, and understanding that bridges what others can't see.",
    expression: "You have a natural sense of timing — when to speak, when to wait, when to lead, and when to let things unfold. You don't chase balance anymore — you embody it. You don't just read energy — you guide it with presence and understanding.",
    strengths: "You balance intuition with awareness — grounding insight in steady, clear action.",
    risks_and_blind_spots: "You can delay action while waiting for the perfect alignment of the energy.",
    mirror_pair: "Ultimate Alchemist ↔ Ultimate Architect",
    mirror_description: "You and your mirror represent the two most complete expressions of the human decision loop — feeling and form, intuition and structure. You begin with emotion and intuition; they begin with reason and design. You sense what wants to come alive; they shape how it can endure.",
    where_you_struggle: "You can get carried away by ideas or emotions that feel exciting but don't always have a clear next step.",
    where_they_lead: "They create order and structure so progress can be tracked and sustained over time.",
    where_they_struggle: "They can become over-reliant on logic and structure, losing the emotional connection that gives meaning to their work.",
    where_you_lead: "You bring intuition and emotional timing — helping them reconnect with the purpose behind their structure."
  },

  energetic_empath: {
    dna_type: 'alchemist',
    hero_subtitle: "You're someone who understands people and situations on a deep, emotional level. You notice things others miss — the mood of a room, when energy shifts, or when motivation fades.",
    decision_loop: "Emotion → Logic → Emotion",
    loop_description: "Your decisions begin as feelings. Logic enters next, helping you structure and interpret your emotions. As long as emotion can validate your logic, the decision can be made.",
    subtype_name: "Energetic Empath",
    subtype_description: "You turn emotion into understanding, helping people and teams find their rhythm again when things feel off. Your strength lies in creating emotional alignment — helping others feel seen, heard, and safe enough to move forward together.",
    identity: "You experience the world as a flow of emotions and connections. Every person, space, or situation carries a feeling that you instinctively pick up on — even when no one says a thing. Your empathy isn't just sensitivity — it's insight.",
    expression: "You stabilise through presence. When things feel disconnected, you step in quietly and realign through empathy, attention, and care. At your best, you use your emotional awareness to bring people back together and restore clarity. At your worst, you can lose yourself trying to fix what others won't face — absorbing tension instead of transforming it.",
    strengths: "You bring emotional energy to teams and processes, making sure progress stays kind, balanced, and people-focused.",
    risks_and_blind_spots: "You may take on too much — carrying others' feelings as your own",
    mirror_pair: "Energetic Empath ↔ Systemized Builder",
    mirror_description: "Your mirror pair is someone who leads with structure, order, and clear systems. Where you work through emotion, connection, and presence, they operate through process, design, and consistency.",
    where_you_struggle: "You focus on how people feel, but may overlook the systems that help keep things stable",
    where_they_lead: "They create order and structure that keep emotions from turning into chaos",
    where_they_struggle: "They can get so focused on efficiency that things start to feel cold or mechanical.",
    where_you_lead: "You remind them that systems work best when they serve people, not just processes."
  },

  // ARCHITECT SUBTYPES
  systemised_builder: {
    dna_type: 'architect',
    hero_subtitle: "You're someone who sees how things fit together — the structure behind the chaos. Where others get lost in the details or emotion of the moment, you naturally step back to find the pattern and build a plan.",
    decision_loop: "Logic → Emotion → Logic",
    loop_description: "Your decisions begin with logic — you gather facts, analyze patterns, and map out how each part connects. Emotion enters next, helping you gauge whether your plan makes sense in practice and feels stable to pursue. You return to logic to confirm your choice — testing if it's realistic, efficient, and sustainable.",
    subtype_name: "Systemized Builder",
    subtype_description: "You build systems that make progress predictable, reliable, and repeatable. Your calm, structured approach turns big visions into working realities.",
    identity: "You see the world as a system of moving parts. Where others react, you design. You take what's uncertain and build the structure that make it stable.",
    expression: "You stabilise by design — ensuring every piece fits before you move forward. You measure progress not by excitement, but by stability: Does it hold? Can it repeat? Will it last? Where others look for speed, you look for dependability. You build things that work not just today, but tomorrow too.",
    strengths: "You lead through process, helping others stay grounded and focused when things get overwhelming",
    risks_and_blind_spots: "You might assume that if something works mechanically, it's successful — even if it's lost its spark",
    mirror_pair: "Systemized Builder ↔ Energetic Empath",
    mirror_description: "Your mirror pair is someone who leads through emotion, connection, and presence. Where you create order, they create harmony.",
    where_you_struggle: "You can prioritise order so much that people start feeling managed instead of supported",
    where_they_lead: "They bring empathy and emotional insight — sensing when people need connection before correction",
    where_they_struggle: "They avoid boundaries when trying to keep everyone comfortable, which leads to burnout.",
    where_you_lead: "You define boundaries that protect their energy and make emotional work repeatable."
  },

  master_strategist: {
    dna_type: 'architect',
    hero_subtitle: "You're someone who sees how things fit together — the structure behind the chaos. Where others get lost in the details or emotion of the moment, you naturally step back to find the pattern and build a plan.",
    decision_loop: "Logic → Emotion → Logic",
    loop_description: "Your decisions begin with logic — you gather facts, analyze patterns, and map out how each part connects. Emotion enters next, helping you gauge whether your plan makes sense in practice and feels stable to pursue. You return to logic to confirm your choice — testing if it's realistic, efficient, and sustainable.",
    subtype_name: "Master Strategist",
    subtype_description: "You turn ideas into clear, actionable plans — creating direction and structure that keep everything moving with purpose.",
    identity: "You see life as a series of interconnected moves — every choice leading to the next. Where others see uncertainty, you see patterns, systems, and sequences waiting to be organized.",
    expression: "You lead with clarity and direction. Your mind constantly seeks structure — what's happening, why it matters, and how it fits into the bigger picture. Emotion enters your process as a check for alignment. For you, certainty doesn't come from chance — it comes from seeing how each piece fits within a stable, deliberate plan.",
    strengths: "You bring order to complexity through strategic thinking, turning uncertainty into clear direction and actionable steps",
    risks_and_blind_spots: "You may mistake a logical plan for a working one, assuming that if something makes sense on paper, it will succeed in reality",
    mirror_pair: "Master Strategist ↔ Visionary Oracle",
    mirror_description: "Your mirror pair is someone who leads with intuition and emotional timing. Where you design systems and direction through structure and foresight, they navigate through instinct and meaning.",
    where_you_struggle: "You can become overly focused on logic and planning, losing touch with emotional timing or subtle shifts around you",
    where_they_lead: "The Visionary Oracle senses patterns and timing long before they can be measured. They bring emotional alignment, helping you act when ideas 'feel right,' not just when they're proven. They return meaning and energy into your structure, ensuring the plan connects with people as much as it convinces them.",
    where_they_struggle: "They can drift into possibilities without anchoring them in practical steps. Their ideas may inspire but lack clear follow-through or accountability. They sometimes trust timing so deeply that they delay execution until the moment feels perfect.",
    where_you_lead: "You turn vision into strategy — mapping steps, priorities, and proof points. You keep ideas grounded in timelines and systems that make progress measurable. You provide the structure that keeps inspiration from fading, giving their intuition a real-world shape."
  },

  internal_analyser: {
    dna_type: 'architect',
    hero_subtitle: "You're someone who sees how things fit together — the structure behind the chaos. Where others get lost in the details or emotion of the moment, you naturally step back to find the pattern and build a plan.",
    decision_loop: "Logic → Emotion → Logic",
    loop_description: "Your decisions begin with logic — you gather facts, analyze patterns, and map out how each part connects. Emotion enters next, helping you gauge whether your plan makes sense in practice and feels stable to pursue. You return to logic to confirm your choice — testing if it's realistic, efficient, and sustainable.",
    subtype_name: "Internal Analyzer",
    subtype_description: "You notice patterns others overlook and refine ideas until logic and truth align. Your strength lies in turning complexity into something that makes perfect sense — clean, precise, and reliable",
    identity: "You see the world as a puzzle waiting to be solved. Where others see noise or contradiction, you instinctively look for structure. You make sense of the unseen by breaking it down, studying its moving parts, and reassembling it into something that holds together.",
    expression: "You stabilise yourself through understanding — clarity is your form of control. When others react impulsively, you pause to study why things are happening. Your gift is precision, but your challenge is knowing when to stop analyzing and start trusting that it's enough.",
    strengths: "You are exceptional at finding the root cause behind problems instead of just the symptoms",
    risks_and_blind_spots: "You may get stuck overanalyzing, mistaking endless refinement for real progress",
    mirror_pair: "Internal Analyzer ↔ Magnetic Perfectionist",
    mirror_description: "Your mirror pair is someone who leads through emotional refinement. Where you seek clarity through structure and logic, they seek harmony through beauty and tone. You perfect ideas through precision; they perfect them through feeling.",
    where_you_struggle: "You can get stuck analyzing details — knowing every reason but struggling to decide when to stop",
    where_they_lead: "They bring warmth, timing, and emotional instinct — helping you sense when something's ready, not just when it's proven",
    where_they_struggle: "They chase perfection through feeling, often refining endlessly without clear closure",
    where_you_lead: "You help them anchor their vision with clear reasoning and structure — showing them when it's ready to deliver"
  },

  ultimate_architect: {
    dna_type: 'architect',
    hero_subtitle: "You're someone who sees how things fit together — the structure behind the chaos. Where others get lost in the details or emotion of the moment, you naturally step back to find the pattern and build a plan.",
    decision_loop: "Logic → Emotion → Logic",
    loop_description: "Your decisions begin with logic — you gather facts, analyze patterns, and map out how each part connects. Emotion enters next, helping you gauge whether your plan makes sense in practice and feels stable to pursue. You return to logic to confirm your choice — testing if it's realistic, efficient, and sustainable.",
    subtype_name: "The Ultimate Architect",
    subtype_description: "You represent the peak of structure and clarity — the place where logic, precision, and purpose come together. You don't just organize systems; you build order that lasts, turning complexity into calm and vision into reality.",
    identity: "You move through life with steady logic and clear design. You see how things connect, what needs fixing, and how to make it work better. You create stability where others see chaos — building plans that don't just succeed once, but keep working over time.",
    expression: "You check with emotion only to ensure it feels right before confirming it with reason again. This balance keeps you composed, decisive, and focused on what truly matters — progress that's strong, consistent, and lasting.",
    strengths: "You create order where others see confusion, turning big goals into clear, workable steps.",
    risks_and_blind_spots: "You can undervalue emotional insight — forgetting that precision alone doesn't always inspire people to move.",
    mirror_pair: "Ultimate Architect ↔ Ultimate Alchemist",
    mirror_description: "You and your mirror represent the structure and energy, logic and intuition. You begin with reason and design; they begin with feeling and instinct. You build what endures; they bring it to life.",
    where_you_struggle: "You can hesitate to move until all variables are clear — sometimes missing the emotional momentum that drives action.",
    where_they_lead: "Their emotional intelligence helps you remember why your structure exists — grounding efficiency in meaning.",
    where_they_struggle: "They can get caught in the flow of emotion, struggling to turn inspiration into a clear plan",
    where_you_lead: "You give their ideas shape and sequence, helping emotion find expression through structure"
  },

  // BLURRED SUBTYPES
  performer: {
    dna_type: 'blurred',
    hero_subtitle: "You're someone who can see both sides of life — the logic that builds things and the emotion that gives them meaning — but often struggle to know which to trust first.",
    decision_loop: "No Default Loop",
    loop_description: "As a Blurred type, you don't have a stable decision loop. Your decisions start in one loop sometimes and other times may start in other. As a blurred state, you keep switching between the loops, not sure what to trust.",
    subtype_name: "Over-Promiser",
    subtype_description: "You move fast on ideas that feel exciting — building momentum through vision and words that inspire others. But in the rush to keep energy alive, big promises turn into pressure that's hard to deliver.",
    identity: "In daily life, you're the motivator. You can sense where things are headed and get others onboard quickly. But when it's time to follow through, the details feel heavy and your focus slips.",
    destabilisation_path: "You swing from building structured strategies to chasing emotional resonance — making futures that sound and feel right but stall once execution begins. Each cycle starts with energy and ends with frustration.",
    root_cause: "You lose discipline around proof, trusting the feeling of momentum more than measurable traction. Excitement replaces validation — emotion becomes your signal for progress, even when the logic isn't ready.",
    stabilisation_path: "You find balance when you ground your vision in proof — testing ideas first, building on what works, and letting results turn inspiration into real, lasting progress.",
    strengths: "You can inspire and motivate others with vision and energy",
    risks_and_blind_spots: "You over-promise and under-deliver, creating pressure without follow-through",
    mirror_pair: "Master Strategist-Visionary Oracle",
    mirror_description: "You are a collapsed state of someone who is good at strategic planning and structure, and one who gives meaning to thoughts and emotions and look for the bigger picture. But because you are a blurred identity, it's hard to exactly pinpoint which core identity you are.",
    where_you_struggle: "You build momentum but struggle with execution and follow-through",
    where_they_lead: "They provide structure, timelines, and accountability that ground your vision",
    where_they_struggle: "They can get stuck in planning without the emotional energy to inspire action",
    where_you_lead: "You bring energy and vision that motivates people to believe in the possibility"
  },

  self_forsaker: {
    dna_type: 'blurred',
    hero_subtitle: "You're someone who can see both sides of life — the logic that builds things and the emotion that gives them meaning — but often struggle to know which to trust first",
    decision_loop: "No Default Loop",
    loop_description: "As a Blurred type, you don't have a stable decision loop. Your decisions start in one place and often end somewhere else.",
    subtype_name: "Over-Pleaser",
    subtype_description: "You try to keep everyone happy, but in trying to please everyone, your clarity dissolves and your structure bends until nothing truly holds.",
    identity: "You read the room, sense what people want, and adapt your plans to meet every request. The problem is, by the time you've kept everyone satisfied, your original direction has vanished.",
    destabilisation_path: "You expand plans to accommodate every opinion, trading order for harmony. What begins as collaboration turns into compromise. The more you please, the less progress you make.",
    root_cause: "You over-identify with others' emotions and avoid taking authority for fear of conflict or rejection. You mistake peace for alignment and comfort for connection.",
    stabilisation_path: "Your balance returns when you set clear structure and boundaries first — because real harmony comes from order, not from pleasing everyone.",
    strengths: "You create harmony and connection by understanding what people need",
    risks_and_blind_spots: "You lose your direction by trying to please everyone, compromising clarity for comfort",
    mirror_pair: "Systemized Builder – Energetic Empath",
    mirror_description: "You are a collapsed state of someone who builds and rationalize frameworks and gives structure to thoughts, and the one who gives feels deeply about others and builds connections. But because you are a blurred identity, it's hard to exactly pinpoint which core identity you are.",
    where_you_struggle: "You accommodate everyone's needs but lose your own structure and boundaries",
    where_they_lead: "They maintain clear systems and empathetic presence without losing themselves",
    where_they_struggle: "They can either become too rigid or too emotionally absorbed",
    where_you_lead: "You show them the importance of flexibility and understanding different perspectives"
  },

  overthinker: {
    dna_type: 'blurred',
    hero_subtitle: "You're someone who can see both sides of life — the logic that builds things and the emotion that gives them meaning — but often struggle to know which to trust first",
    decision_loop: "No Default Loop",
    loop_description: "As a Blurred type, you don't have a stable decision loop. Your decisions start in one place and often end somewhere else — sometimes beginning in logic, sometimes in emotion, sometimes never fully closing. You may validate with the wrong signal — trusting something that feels right but isn't grounded, or something that makes sense but doesn't feel true.",
    subtype_name: "Over-Thinker",
    subtype_description: "You chase certainty through endless analysis — always testing, refining, and adjusting until things feel 'safe enough' to release. But in trying to eliminate every risk, you delay progress and lose momentum.",
    identity: "You think deeply and act cautiously. You value accuracy and logic, but your mind rarely rests — always finding one more detail to fix. What starts as a strength for precision can turn into paralysis when nothing ever feels ready.",
    destabilisation_path: "Your loop collapses between over-analysis and over-refining, spinning between testing and polishing without ever declaring 'done.'",
    root_cause: "You crave certainty and fear exposure — wanting proof that something will work before you let it into the world.",
    stabilisation_path: "You regain balance when you let 'good enough' count. Treat feedback as data, and let real-world results finish the work your analysis began.",
    strengths: "You analyze deeply and catch details others miss",
    risks_and_blind_spots: "You get stuck in endless analysis, never feeling ready to move forward",
    mirror_pair: "Internal Analyzer – Magnetic Perfectionist",
    mirror_description: "You are a collapsed state of someone who overanalyze situations and frameworks and someone who keeps refining endlessly. Because you are a blurred identity, it's hard to exactly pinpoint which default identity you are.",
    where_you_struggle: "You analyze endlessly, refining without ever declaring something finished",
    where_they_lead: "They know when analysis is complete and when refinement has reached its end",
    where_they_struggle: "They can get stuck in their own perfectionism or analysis paralysis",
    where_you_lead: "You recognize both the need for precision and the danger of never finishing"
  },

  self_betrayer: {
    dna_type: 'blurred',
    hero_subtitle: "You're someone who can see both sides of life — the logic that builds things and the emotion that gives them meaning — but often struggle to know which to trust first",
    decision_loop: "No Default Loop",
    loop_description: "As a Blurred type, you don't have a stable decision loop. Your decisions start in one place and often end somewhere else, sometimes never fully closing. You may validate with the wrong signal — trusting something that feels right but isn't grounded, or something that makes sense but doesn't feel true.",
    subtype_name: "Ultimate Blurred",
    subtype_description: "You live in two modes — one that plans and one that feels — often trying to make both work at the same time. When misaligned, your clarity and intuition pull in opposite directions, leaving you drained and unsure which to follow.",
    identity: "You're both a thinker and a feeler — someone who can understand structure but also sense emotion. You can organize people and ideas with precision, yet also read the energy of a room. This combination makes you deeply perceptive but can also leave you conflicted — you second-guess your choices, wondering whether to trust your logic or your instincts.",
    destabilisation_path: "You lose balance when you keep switching between thinking and feeling instead of letting one lead. You plan carefully but act on impulse, or feel deeply but ignore structure. This can leave you feeling productive but going in circles.",
    root_cause: "You want to be both understood and in control — to build something that feels right and makes sense. But trying to meet both needs at once spreads your focus thin and blurs your direction.",
    stabilisation_path: "Pick one starting point and stay with it. Either think it through first or feel it through first — but commit long enough for clarity to emerge. Let consistency be your anchor. When your actions match your intentions, your natural balance returns — and both your logic and emotion begin to work together instead of against each other.",
    strengths: "You can see both the logical and emotional sides of any situation",
    risks_and_blind_spots: "You switch between modes without committing, leaving you stuck in circles",
    mirror_pair: "Ultimate Architect – Ultimate Alchemist",
    mirror_description: "As a blurred identity, your mirror pair is a collapse state of the someone who is a good strategic planner and logically sound and someone who makes connections effortlessly and feels deeply for human. But because you are in a blurred state, it's hard to exactly pinpoint your default identity.",
    where_you_struggle: "You keep switching between logic and emotion without committing to either",
    where_they_lead: "They have a clear starting point and follow through with consistency",
    where_they_struggle: "They can become too rigid in their approach, either all logic or all emotion",
    where_you_lead: "You understand the value of both approaches and can bridge the gap when they work together"
  }
};

/**
 * Get subtype profile by subtype key
 */
export function getSubtypeProfileFromDatabase(subtype: string): SubtypeProfile | null {
  return subtypeProfiles[subtype] || null;
}
