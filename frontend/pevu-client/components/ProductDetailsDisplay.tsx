import React, { useState } from 'react';

interface ProductDetailsDisplayProps {
  details?: string;
  specifications?: string;
  category?: string;
}

export default function ProductDetailsDisplay({ details, specifications, category }: ProductDetailsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'usps'>('details');

  // Parse specifications into structured format
  const parseSpecifications = (specs: string) => {
    if (!specs) return null;

    // Try to parse structured specifications
    try {
      const lines = specs.split('\n').filter(line => line.trim());
      const structured: Record<string, string[]> = {};
      let currentSection = 'General';
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.includes(':')) {
          const [key, ...values] = trimmedLine.split(':');
          const value = values.join(':').trim();
          if (value) {
            if (!structured[currentSection]) {
              structured[currentSection] = [];
            }
            structured[currentSection].push(`${key.trim()}: ${value}`);
          }
        } else if (trimmedLine && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('•')) {
          // This might be a section header
          if (trimmedLine.length < 50 && !trimmedLine.includes('(')) {
            currentSection = trimmedLine;
          } else {
            if (!structured[currentSection]) {
              structured[currentSection] = [];
            }
            structured[currentSection].push(trimmedLine);
          }
        } else if (trimmedLine) {
          if (!structured[currentSection]) {
            structured[currentSection] = [];
          }
          structured[currentSection].push(trimmedLine);
        }
      });

      return structured;
    } catch (error) {
      return null;
    }
  };

  // Extract USPs from specifications
  const extractUSPs = (specs: string) => {
    if (!specs) return null;
    
    // Try multiple patterns to find USPs
    const patterns = [
      /USPs?\s*:\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i,
      /Key Features?\s*:\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i,
      /Unique Selling Points?\s*:\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i,
      /Features?\s*:\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i
    ];
    
    for (const pattern of patterns) {
      const uspMatch = specs.match(pattern);
      if (uspMatch) {
        const uspText = uspMatch[1];
        const usps = uspText
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*[-•*]\s*/, '').trim())
          .filter(line => line.length > 0 && line.length > 10); // Filter out very short lines
        
        if (usps.length > 0) {
          return usps;
        }
      }
    }
    
    // If no USPs section found, try to extract bullet points from the end of specs
    const lines = specs.split('\n').reverse();
    const bulletPoints = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        const cleaned = trimmed.replace(/^\s*[-•*]\s*/, '').trim();
        if (cleaned.length > 10) {
          bulletPoints.unshift(cleaned);
        }
      } else if (trimmed.length > 0 && !trimmed.includes(':')) {
        break; // Stop when we hit non-bullet content
      }
    }
    
    return bulletPoints.length > 0 ? bulletPoints : null;
  };

  const structuredSpecs = specifications ? parseSpecifications(specifications) : null;
  const usps = specifications ? extractUSPs(specifications) : null;

  if (!details && !specifications) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        {details && (
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
        )}
        {specifications && (
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'specs'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Specifications
          </button>
        )}
        {usps && usps.length > 0 && (
          <button
            onClick={() => setActiveTab('usps')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'usps'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Key Features
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 rounded-lg p-4">
        {activeTab === 'details' && details && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h3>
            <div className="prose prose-sm max-w-none">
              {details.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specs' && specifications && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Technical Specifications</h3>
            {structuredSpecs ? (
              <div className="space-y-4">
                {Object.entries(structuredSpecs).map(([section, items]) => (
                  <div key={section} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{section}</h4>
                    <div className="space-y-1">
                      {items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          {item.startsWith('-') || item.startsWith('•') ? (
                            <span className="ml-2">{item}</span>
                          ) : (
                            item
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                {specifications.split('\n').map((line, index) => (
                  <div key={index} className="mb-2 text-gray-700">
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'usps' && usps && usps.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Features & USPs</h3>
            <div className="grid gap-3">
              {usps.map((usp, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {usp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 