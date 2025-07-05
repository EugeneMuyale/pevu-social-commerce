import React from 'react';
import SampleProductData from '../components/SampleProductData';

export default function TestProductDetails() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Enhanced Product Details Demo</h1>
          <p className="text-lg text-gray-600">
            This page demonstrates the new enhanced product details system that can handle comprehensive specification data.
          </p>
        </div>
        
        <SampleProductData />
        
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Tabbed Interface</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Details tab for product description</li>
                <li>• Specifications tab for technical details</li>
                <li>• Key Features tab for USPs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Smart Parsing</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Automatic section detection</li>
                <li>• USP extraction from specifications</li>
                <li>• Structured display of technical data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Comprehensive Data</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Detailed specifications</li>
                <li>• Key features and USPs</li>
                <li>• Color options and availability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">User Experience</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Clean, professional design</li>
                <li>• Easy navigation between sections</li>
                <li>• Mobile-responsive layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 