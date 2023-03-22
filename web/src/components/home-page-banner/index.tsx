import React from 'react';

export function HomePageBanner() {
  return (
    <div className="shadow-[inset_0_8px_8px_-8px_rgb(0_0_0_/_30%),inset_0_-8px_8px_-8px_rgb(0_0_0_/_30%)] bg-[#5cb85c] text-white mb-8 p-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-bold text-center text-[3.5rem] pb-2 drop-shadow-lg">
          Realworld
        </h1>
        <p className="text-white text-center text-2xl font-light mb-0">
          A place to share your knowledge.
        </p>
      </div>
    </div>
  );
}
