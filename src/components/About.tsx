/**
 * About Page Component
 * Brandscaling - About Us
 */

import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Footer } from './Footer';

interface AboutProps {
  onViewChange: (view: string) => void;
}

export function About({ onViewChange }: AboutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="typo-h1-bs mb-6">
              Meet the Duo Behind the Brandscaling Method™
            </h1>
            <p className="typo-body-bs text-gray-700 max-w-3xl mx-auto">
              Alchemist Meets Architect. Emotion Meets Execution.
            </p>
            <p className="typo-body-bs text-gray-700 max-w-3xl mx-auto mt-4">
              Together, Fariza Javed and Hanif Khan built Brandscaling to further expand their own portfolio of investments and help entrepreneurs scale without distortion—by aligning structure with energy, profit with purpose, and frameworks with frequency.
            </p>
          </div>
        </div>
      </section>

      {/* Fariza Javed - The Alchemist */}
      <section className="py-12">
        <div className="container-bs-desktop">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-12 bg-gradient-to-br from-pink-500 via-orange-500 to-orange-600 text-white">
              <h2 className="typo-h2-bs mb-4">Fariza Javed — The Alchemist</h2>
              <p className="typo-h3-bs mb-6 opacity-90">Warm. Magnetic. Empowering.</p>
              <div className="space-y-4 typo-body-bs">
                <p>
                  Fariza brings ignition to everything she touches. With an instinctive gift for emotional clarity and high-frequency leadership, she helps clients unlock momentum by leaning into their inner brilliance. Her intuitive lens sees beyond surface problems, helping founders align with their purpose, attract with presence, and scale without abandoning who they are.
                </p>
                <p>
                  At just 23, she launched her first business: Property People, a letting agency. She then ventured into building and investing across various industries. Her most recent company before retiring was a global beauty distribution business that scaled across the UK, Europe, South Korea, and the United States—supplying hundreds of SKUs from multiple brands to every major retailer, including Harrods, Sephora, Selfridges, Boots, Next, Beauty Bay, Look Fantastic, Cult Beauty, Feel Unique, Urban Outfitters—the list was endless—all whilst raising four children.
                </p>
                <p>
                  As a mentor and strategist, Fariza helps founders unlock growth by removing internal resistance, simplifying brand messaging, and reconnecting to the parts of their business that still feel magnetic. She helps founders scale without silencing themselves—leading without leaking energy and finding their business's true voice and vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hanif Khan - The Architect */}
      <section className="py-12">
        <div className="container-bs-desktop">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-12 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600 text-white">
              <h2 className="typo-h2-bs mb-4">Hanif Khan — The Architect</h2>
              <p className="typo-h3-bs mb-6 opacity-90">Strategic. Analytical. Systems-Driven.</p>
              <div className="space-y-4 typo-body-bs">
                <p>
                  Hanif brings order to chaos. A former software architect turned scaling strategist, he specializes in designing frameworks that turn scattered ideas into scalable systems. He sees the invisible logic behind growth—mapping structure, automation, and team layers around a business that's ready to multiply.
                </p>
                <p>
                  After entering property, Hanif co-founded Albright Estates, building a portfolio with automation at its core. He then launched the TYCOON mastermind alliance to help property entrepreneurs grow and scale. An angel investor who collaborates closely with multiple VCs, Hanif also patented the Loft Storage Stilt and built a multi-million-pound distribution business supplying UK hardware giants like B&Q, Screwfix, and Travis Perkins.
                </p>
                <p>
                  Hanif has an unrivaled ability to identify what's broken in a business—before the founder can even name it—and then builds what's needed to fix it. His frameworks have helped countless founders move from scattered to strategically empowered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Together Section */}
      <section className="py-12">
        <div className="container-bs-desktop">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-12 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 text-white">
              <h2 className="typo-h2-bs mb-6">Together: The Founders of the Brandscaling Operating System</h2>
              <div className="space-y-4 typo-body-bs">
                <p className="text-xl font-semibold">
                  Fariza and Hanif built Brandscaling around a revolutionary insight:
                </p>
                <p className="text-xl italic">
                  "Scaling doesn't fail because of the wrong strategy. It fails because the strategy doesn't match the person executing it."
                </p>
                <p>
                  After semi-retiring during the COVID lockdown to focus on their newborn and travel the world, Fariza and Hanif shifted focus from their own ventures to mentoring others. What began as a way to increase their bandwidth evolved into a movement—helping founders and entrepreneurs move from stuck to scaling through their dual-mode method: The Architect & The Alchemist.
                </p>
                <p>
                  Today, they lead Brandscaling's high-ticket mastermind, live events, and embedded consulting—partnering with founders to scale without burnout, build ecosystems, and embed their genius into something that lasts.
                </p>
                <p className="text-xl font-semibold mt-6">
                  This is more than business strategy. More than an energetic infrastructure for scaling.
                </p>
                <p className="text-xl font-semibold">
                  This is Infinite Scaling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Frameworks Section */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="typo-h2-bs mb-6">Original Frameworks Created by Hanif & Fariza</h2>
            <p className="typo-body-bs text-gray-700">
              Unlike typical business programs that recycle surface-level tactics, the Brandscaling system is entirely original—built from scratch, based on years of hands-on work with real founders scaling infinitely.
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {/* The Architect–Alchemist Model */}
            <div className="rounded-2xl p-10 bg-gradient-to-br from-purple-900 via-purple-700 to-orange-500 text-white">
              <h3 className="typo-h2-bs mb-4">The Architect–Alchemist Model™</h3>
              <p className="typo-body-bs mb-4">
                A proprietary lens for how entrepreneurs think, operate, and scale.
              </p>
              <p className="typo-body-bs mb-4">
                Every founder is guided to discover their Entrepreneurial DNA—then learns through tailored frameworks built for that exact style.
              </p>
              <p className="typo-body-bs font-semibold">
                → No more one-size-fits-all strategies.
              </p>
            </div>

            {/* The Infinite Scaling Methodology */}
            <div className="rounded-2xl p-10 bg-gradient-to-br from-pink-500 via-orange-500 to-orange-600 text-white">
              <h3 className="typo-h2-bs mb-4">The Infinite Scaling Methodology™</h3>
              <p className="typo-body-bs mb-4">
                A multi-layered pyramid showing how to scale in sequence:
              </p>
              <p className="typo-body-bs mb-4 font-semibold">
                Profit Maximisation → Automate → Asset Builder → Multiple Exits → Platform → Ecosystem → Infinite Layer
              </p>
              <p className="typo-body-bs mb-4">
                Each layer includes Architect and Alchemist approaches—so you grow using your strength and understand your blind spots.
              </p>
              <p className="typo-body-bs font-semibold">
                Most models teach "more." This teaches better sequencing, better wiring, and better scale.
              </p>
            </div>

            {/* The F.U.S.E. Framework */}
            <div className="rounded-2xl p-10 bg-gradient-to-br from-purple-800 via-purple-600 to-pink-600 text-white">
              <h3 className="typo-h2-bs mb-4">The F.U.S.E. Framework™ for Founders</h3>
              <p className="typo-body-bs mb-4 font-semibold">
                Partner-Led Scaling. Built for Embedding.
              </p>
              <p className="typo-body-bs mb-6">
                You're not here to sell another service. You're here to become infrastructure inside someone else's business.
              </p>
              <p className="typo-body-bs mb-4 font-semibold">What F.U.S.E. Stands For:</p>
              <div className="space-y-3 mb-6">
                <p className="typo-body-bs">
                  <span className="font-bold">F —</span> Find a Problem that truly matters to the business you want to collaborate with.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">U —</span> Unite it with your services—match your offer to their friction.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">S —</span> Solve it with adaptation—wrap your solution to fit their existing journey.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">E —</span> Extend into their system—keep building until your offer becomes essential.
                </p>
              </div>
              <p className="typo-body-bs mb-4">
                Each phase supports both: Architect (logic, systems, structure) and Alchemist (emotion, energy, resonance)
              </p>
              <p className="typo-body-bs font-semibold">
                F.U.S.E. isn't about adding offers. It's about embedding into ecosystems.
              </p>
            </div>

            {/* The Profit Maximisation Blueprint */}
            <div className="rounded-2xl p-10 bg-gradient-to-br from-orange-600 via-orange-500 to-pink-500 text-white">
              <h3 className="typo-h2-bs mb-4">The Profit Maximisation Blueprint™</h3>
              <p className="typo-body-bs mb-6">
                More than making money—this is about building a machine that keeps it, compounds it, and protects your energy while doing it.
              </p>
              <p className="typo-body-bs mb-4 font-semibold">What's Inside:</p>
              <div className="space-y-2 mb-6">
                <p className="typo-body-bs">
                  <span className="font-bold">Sustainable Customer Creation Factory —</span> Turn visibility into consistently activated, paying customers.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Fan Creation Factory —</span> Build a loyal audience that buys, refers, and advocates—on autopilot.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Partner Creation Factory —</span> Plug into power partnerships that multiply reach without multiplying work.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Painkiller Product Positioning —</span> Design offers that solve urgent problems and become non-negotiable.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Recruitment Engine —</span> Attract and install the right people in the right seats—without draining your time.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Sales Strategy Stack —</span> Close more, with less friction—aligned to both your pricing model and your buyer psychology.
                </p>
                <p className="typo-body-bs">
                  <span className="font-bold">Power Play Protocol —</span> Strip your business back to what actually drives profit—and turn that into a repeatable, dominant edge.
                </p>
              </div>
              <p className="typo-body-bs mb-4 font-semibold">Dual Perspective Integration:</p>
              <p className="typo-body-bs mb-2">
                <span className="font-bold">Architect —</span> Optimize systems, pricing, cost-to-delivery ratios, and operational profit structure.
              </p>
              <p className="typo-body-bs mb-6">
                <span className="font-bold">Alchemist —</span> Align profit with purpose, energy, time freedom, and personal bandwidth.
              </p>
              <p className="typo-body-bs font-semibold">
                Profit isn't just what's left over. In this blueprint, it becomes the fuel, filter, and foundation for everything that follows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes These Frameworks Unique */}
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto">
            <h2 className="typo-h2-bs mb-8 text-center">What Makes These Frameworks Unique?</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="typo-h3-bs mb-3">Dual-Mode Learning</h3>
                <p className="typo-body-bs text-gray-700">
                  Every tool, course, and workbook is built in two styles—Architect (logic-first) and Alchemist (energy-first). No other platform in the market is designed this way.
                </p>
              </div>

              <div>
                <h3 className="typo-h3-bs mb-3">Founder-Led, Field-Tested</h3>
                <p className="typo-body-bs text-gray-700">
                  These aren't theories—they've been applied in scaling real companies, tested in masterminds, and stress-tested by hundreds of founders.
                </p>
              </div>

              <div>
                <h3 className="typo-h3-bs mb-3">Emotionally-Aware + Strategically-Precise</h3>
                <p className="typo-body-bs text-gray-700">
                  No fluffy mindset work. No rigid frameworks. Brandscaling meets you at your depth and builds upward from who you already are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-bs bg-gradient-arch-scale">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typo-h2-bs text-white mb-6">
              Ready to Discover Your DNA?
            </h2>
            <p className="typo-body-bs text-white/90 mb-12">
              Take the assessment and join thousands of entrepreneurs who've found their path to sustainable, scalable success.
            </p>
            <button
              onClick={() => onViewChange('quiz')}
              className="cta-gradient-bs px-8 bg-white text-[var(--bs-color-indigo)] hover:bg-gray-50 inline-flex items-center gap-2"
              style={{ 
                background: 'white',
                color: 'var(--bs-color-indigo)'
              }}
            >
              <span>Take Your DNA Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer onViewChange={onViewChange} />
    </div>
  );
}