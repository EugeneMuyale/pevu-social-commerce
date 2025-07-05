import React from 'react';

export type ProductSpecs = {
  specifications: string;
};

const defaultSpecs: ProductSpecs = {
  specifications: '',
};

// Function to format specifications into structured text
export function formatSpecifications(specs: ProductSpecs): string {
  return specs.specifications;
}

export default function ProductSpecificationsForm({ value, onChange }: {
  value?: ProductSpecs;
  onChange: (specs: ProductSpecs) => void;
}) {
  const specs = value || defaultSpecs;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange({ specifications: e.target.value });
  }

  return (
    <textarea
      placeholder="Enter product specifications..."
      value={specs.specifications}
      onChange={handleChange}
      maxLength={1000}
      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows={4}
      required
    />
  );
} 