import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { Product } from '../data/products';

export const FlavorChart: React.FC<{ product: Product }> = ({ product }) => {
  const data = [
    { subject: 'Aroma', value: product.flavorProfile.aroma, fullMark: 10 },
    { subject: 'Strength', value: product.flavorProfile.strength, fullMark: 10 },
    { subject: 'Liquor Color', value: product.flavorProfile.color, fullMark: 10 },
    { subject: 'Flavor', value: product.flavorProfile.flavor, fullMark: 10 },
  ];

  return (
    <div className="w-full h-64 bg-brand-charcoal/70 rounded-2xl border border-brand-gold/30 p-4 flex flex-col items-center justify-center">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 text-center">
        Flavor & Sensory Profile Matrix (Score / 10)
      </div>
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#D4A017" strokeOpacity={0.25} />
            <PolarAngleAxis dataKey="subject" stroke="#FAF6F0" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#D4A017" fontSize={9} />
            <Radar
              name={product.name}
              dataKey="value"
              stroke="#D4A017"
              fill="#D4A017"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlavorChart;
