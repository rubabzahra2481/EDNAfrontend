import logo from '../assets/4ffc1593ac524b5a444c05cca1a8149a7e87be86.png';

interface LayerIntroductionCardProps {
  number: number;
  title: string;
  line1: string;
  line2: string;
  onBegin: () => void;
}

export function LayerIntroductionCard({ number, title, line1, line2, onBegin }: LayerIntroductionCardProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="BrandScaling" 
            className="w-[280px]"
          />
        </div>

        {/* Layer Card with Gradient Border */}
        <div className="rounded-[32px] p-[3px] shadow-md" style={{
          background: 'linear-gradient(to right, #8b2f8f, #d97439)'
        }}>
          <div className="bg-white rounded-[30px] px-16 py-14">
            {/* Decorative line */}
            <div className="flex justify-center mb-8">
              <div className="h-[4px] w-[120px] rounded-full bg-gradient-to-r from-[#5e2282] via-[#d97439] to-[#d97439]"></div>
            </div>

            {/* Title */}
            <h2 className="text-center text-[#5e2282] text-3xl font-bold mb-8 tracking-wide">
              LAYER {number} – {title}
            </h2>

            {/* Description Lines */}
            <p className="text-center text-black text-lg mb-5 leading-relaxed">
              {line1}
            </p>

            <p className="text-center text-black text-lg mb-10 leading-relaxed">
              {line2}
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button 
                onClick={onBegin}
                className="bg-[#5e2282] text-white px-10 py-4 rounded-full hover:bg-[#4d1b6b] transition-colors text-lg font-medium"
              >
                Begin Layer {number} Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
