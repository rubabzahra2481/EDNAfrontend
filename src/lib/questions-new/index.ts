/**
 * Master Questions Export
 * All 7 layers of E-DNA Quiz questions
 */

export * from './layer1';
export * from './layer2';
export * from './layer3';
export * from './layer4';
export * from './layer5';
export * from './layer6';
export * from './layer7';

import { layer1Questions } from './layer1';
import { layer2ArchitectQuestions, layer2AlchemistQuestions, layer2MixedQuestions } from './layer2';
import { layer3Questions } from './layer3';
import { layer4Questions } from './layer4';
import { layer5Questions } from './layer5';
import { layer6Questions } from './layer6';
import { layer7Questions } from './layer7';

export interface AllQuestions {
  layer1: typeof layer1Questions;
  layer2: {
    architect: typeof layer2ArchitectQuestions;
    alchemist: typeof layer2AlchemistQuestions;
    mixed: typeof layer2MixedQuestions;
  };
  layer3: typeof layer3Questions;
  layer4: typeof layer4Questions;
  layer5: typeof layer5Questions;
  layer6: typeof layer6Questions;
  layer7: typeof layer7Questions;
}

export const allQuestions: AllQuestions = {
  layer1: layer1Questions,
  layer2: {
    architect: layer2ArchitectQuestions,
    alchemist: layer2AlchemistQuestions,
    mixed: layer2MixedQuestions
  },
  layer3: layer3Questions,
  layer4: layer4Questions,
  layer5: layer5Questions,
  layer6: layer6Questions,
  layer7: layer7Questions
};

/**
 * Get total question count
 */
export function getTotalQuestionCount(): number {
  return (
    layer1Questions.length +
    8 + // Layer 2 (one path)
    layer3Questions.length +
    layer4Questions.length +
    layer5Questions.length +
    layer6Questions.length +
    layer7Questions.length
  );
}

/**
 * Get questions for a specific layer
 */
export function getLayerQuestions(layer: number, layer1Result?: string): any[] {
  switch (layer) {
    case 1:
      return layer1Questions;
    case 2:
      if (layer1Result?.includes('Architect')) return layer2ArchitectQuestions;
      if (layer1Result?.includes('Alchemist')) return layer2AlchemistQuestions;
      return layer2MixedQuestions;
    case 3:
      return layer3Questions;
    case 4:
      return layer4Questions;
    case 5:
      return layer5Questions;
    case 6:
      return layer6Questions;
    case 7:
      return layer7Questions;
    default:
      return [];
  }
}
