/**
 * UpgradeModal Component
 * Brandscaling Design Guidelines Section 14
 * 
 * Specs:
 * - Backdrop blur + 70% dark overlay
 * - Panel 720×auto, radius 24, white, lg shadow
 * - Gradient stripe 6px at top
 * - Table comparing Current vs Next tier
 * - Primary CTA: gradient (Orange→Pink)
 * - Secondary: outline Indigo
 * - Dismiss link
 */

import { X, Check, ArrowRight } from 'lucide-react';
import { PricingTier, getAccessMatrix, AccessMatrixItem } from '../lib/pricing-tiers';
import { Button } from './ui/button';

interface UpgradeModalProps {
  currentTier: PricingTier;
  nextTier: PricingTier;
  onUpgrade: () => void;
  onDismiss: () => void;
  isOpen: boolean;
}

export function UpgradeModal({ 
  currentTier, 
  nextTier, 
  onUpgrade, 
  onDismiss,
  isOpen 
}: UpgradeModalProps) {
  if (!isOpen) return null;

  const accessMatrix = getAccessMatrix(currentTier.id);

  const handleUpgradeClick = () => {
    // Track event: cta_click
    console.log('Event: cta_click', { from: currentTier.id, to: nextTier.id });
    onUpgrade();
  };

  const handleDismissClick = () => {
    // Track event: dismiss
    console.log('Event: dismiss', { tier: currentTier.id });
    onDismiss();
  };

  // Track modal view
  if (isOpen) {
    console.log('Event: modal_view', { current: currentTier.id, next: nextTier.id });
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={handleDismissClick}
    >
      {/* Modal Panel */}
      <div 
        className="relative bg-white w-full max-w-[720px] overflow-hidden"
        style={{
          borderRadius: '24px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Stripe 6px at top */}
        <div 
          className="h-[6px] bg-gradient-arch-scale-90"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={handleDismissClick}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="typo-h2-bs mb-3">
              Upgrade to {nextTier.name}
            </h2>
            <p className="typo-body-bs text-gray-600">
              {nextTier.tagline}
            </p>
          </div>

          {/* Outcomes - What You'll Get */}
          <div className="mb-8">
            <h3 className="typo-h3-bs mb-4">What You'll Unlock</h3>
            <ul className="space-y-3">
              {nextTier.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-arch-scale flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="typo-body-bs">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Access Matrix Table */}
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left typo-caption-bs text-gray-600">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-center typo-caption-bs text-gray-600">
                    Current ({currentTier.name})
                  </th>
                  <th className="py-3 px-4 text-center typo-caption-bs text-[var(--bs-color-orange)]">
                    Next ({nextTier.name})
                  </th>
                </tr>
              </thead>
              <tbody>
                {accessMatrix.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 px-4 typo-body-bs">
                      {item.feature}
                    </td>
                    <td className="py-3 px-4 text-center typo-body-bs text-gray-600">
                      {typeof item.current === 'boolean' ? (
                        item.current ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        item.current
                      )}
                    </td>
                    <td className="py-3 px-4 text-center typo-body-bs font-medium text-[var(--bs-color-orange)]">
                      {typeof item.next === 'boolean' ? (
                        item.next ? (
                          <Check className="w-5 h-5 text-[var(--bs-color-orange)] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        item.next
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Credits Comparison */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="typo-body-bs font-medium">AI Credits per Month</span>
              <div className="flex items-center gap-3">
                <span className="typo-h3-bs text-gray-600">{currentTier.aiCredits}</span>
                <ArrowRight className="w-5 h-5 text-[var(--bs-color-orange)]" />
                <span className="typo-h3-bs text-[var(--bs-color-orange)]">{nextTier.aiCredits}</span>
              </div>
            </div>
            <div className="space-y-2">
              {/* Current tier bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="typo-caption-bs text-gray-600">Current</span>
                  <span className="typo-caption-bs text-gray-600">{currentTier.aiCreditsLabel}</span>
                </div>
                <div className="ai-credits-bar">
                  <div 
                    className="ai-credits-bar-fill opacity-40" 
                    style={{ width: `${currentTier.aiCredits}%` }}
                  />
                </div>
              </div>
              {/* Next tier bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="typo-caption-bs text-[var(--bs-color-orange)]">Next</span>
                  <span className="typo-caption-bs text-[var(--bs-color-orange)]">{nextTier.aiCreditsLabel}</span>
                </div>
                <div className="ai-credits-bar">
                  <div 
                    className="ai-credits-bar-fill" 
                    style={{ width: `${nextTier.aiCredits}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8 text-center">
            <div className="typo-h2-bs text-[var(--bs-color-orange)] mb-2">
              {nextTier.price}
            </div>
            <p className="typo-caption-bs text-gray-600">
              {nextTier.stage}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary CTA: Gradient (Orange→Pink) */}
            <button
              onClick={handleUpgradeClick}
              className="flex-1 cta-gradient-bs px-6 flex items-center justify-center gap-2"
            >
              <span>Upgrade to {nextTier.name}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Secondary: Outline Indigo */}
            <Button
              variant="outline"
              onClick={handleDismissClick}
              className="flex-1 h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white transition-all duration-300"
            >
              Maybe Later
            </Button>
          </div>

          {/* Dismiss Link */}
          <div className="mt-4 text-center">
            <button
              onClick={handleDismissClick}
              className="typo-caption-bs text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Continue with {currentTier.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeModal;
