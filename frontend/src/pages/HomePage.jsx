import React, { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import MentalHealthIssues from '../components/home/MentalHealthIssues';
export default function HomePage() {
  return (
    <div className='bg-[#fef4ee] ' >
      <HeroBanner />
      <MentalHealthIssues/>
    </div>
  );
}
