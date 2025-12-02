import { EDNAResults } from '../components/EDNAQuiz';

export async function generateResultsPDF(results: EDNAResults, userEmail: string): Promise<void> {
  const { core_type, subtype, core_type_mastery, subtype_mastery } = results;
  
  // Get primary subtype
  const primarySubtype = Array.isArray(subtype) ? subtype[0] : subtype;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to download the PDF');
    return;
  }

  // Determine gradient colors based on core type
  const getGradientColors = () => {
    if (core_type === 'architect') {
      return { from: '#9333ea', to: '#6b21a8' }; // purple
    } else if (core_type === 'alchemist') {
      return { from: '#f97316', to: '#c2410c' }; // orange
    } else {
      return { from: '#9333ea', to: '#f97316' }; // blurred
    }
  };

  const colors = getGradientColors();
  
  // HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>E-DNA Quiz Results - ${core_type.charAt(0).toUpperCase() + core_type.slice(1)}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: linear-gradient(135deg, #faf5ff 0%, #fff7ed 100%);
          padding: 40px 20px;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%);
          color: white;
          padding: 60px 40px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        
        .header .subtype {
          font-size: 24px;
          opacity: 0.95;
          font-weight: 500;
        }
        
        .content {
          padding: 40px;
        }
        
        .info-section {
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .info-section:last-child {
          border-bottom: none;
        }
        
        .info-label {
          font-size: 14px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .info-value {
          font-size: 18px;
          color: #1f2937;
          font-weight: 500;
        }
        
        .scores-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 40px 0;
        }
        
        .score-card {
          text-align: center;
          padding: 30px;
          background: #f9fafb;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
        }
        
        .score-value {
          font-size: 56px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .score-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .features-list {
          list-style: none;
          margin: 20px 0;
        }
        
        .features-list li {
          padding: 12px 0;
          padding-left: 32px;
          position: relative;
          font-size: 16px;
          color: #4b5563;
        }
        
        .features-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
          font-size: 20px;
        }
        
        .footer {
          background: #f9fafb;
          padding: 30px 40px;
          text-align: center;
          border-top: 2px solid #e5e7eb;
        }
        
        .footer-logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .footer-tagline {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 20px;
        }
        
        .footer-info {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .timestamp {
          margin-top: 12px;
          font-size: 12px;
          color: #9ca3af;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          
          .container {
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>The ${core_type.charAt(0).toUpperCase() + core_type.slice(1)}</h1>
          <div class="subtype">${primarySubtype}</div>
        </div>
        
        <div class="content">
          <div class="info-section">
            <div class="info-label">Quiz Completed By</div>
            <div class="info-value">${userEmail}</div>
          </div>
          
          <div class="scores-grid">
            <div class="score-card">
              <div class="score-value">${core_type_mastery}%</div>
              <div class="score-label">Core Type Mastery</div>
            </div>
            <div class="score-card">
              <div class="score-value">${subtype_mastery || 0}%</div>
              <div class="score-label">Subtype Mastery</div>
            </div>
          </div>
          
          <div class="info-section">
            <h2 style="font-size: 24px; margin-bottom: 20px; color: #1f2937;">Your E-DNA Profile Summary</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.8;">
              You have been identified as <strong>The ${core_type.charAt(0).toUpperCase() + core_type.slice(1)}</strong> 
              with a ${core_type_mastery}% mastery level. Your primary subtype is <strong>${primarySubtype}</strong> 
              with ${subtype_mastery || 0}% mastery.
            </p>
          </div>
          
          <div class="info-section">
            <h3 style="font-size: 20px; margin-bottom: 16px; color: #1f2937;">What This Means For You</h3>
            <ul class="features-list">
              <li>Detailed personality analysis tailored to your DNA type</li>
              <li>Mirror pair awareness insights for balanced growth</li>
              <li>Learning style preferences optimized for your type</li>
              <li>Neurodiversity assessment and recommendations</li>
              <li>Mindset and personality traits breakdown</li>
              <li>Meta-beliefs and values alignment</li>
              <li>Personalized growth strategies for scaling</li>
            </ul>
          </div>
          
          <div class="info-section">
            <h3 style="font-size: 20px; margin-bottom: 16px; color: #1f2937;">Next Steps</h3>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.8;">
              This is your short E-DNA result. To unlock your complete analysis with detailed insights, 
              personalized strategies, and actionable growth plans, consider upgrading to the full E-DNA report.
            </p>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-logo">
            <span style="color: #9333ea;">Brand</span><span style="color: #f97316;">scaling</span>
          </div>
          <div class="footer-tagline">Purpose → Profit → Purpose</div>
          <div class="footer-info">
            © ${new Date().getFullYear()} Brandscaling. Scaling entrepreneurs from purpose to 9-figure profit.
          </div>
          <div class="timestamp">
            Generated on ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Write content to the new window
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    }, 250);
  };
}
