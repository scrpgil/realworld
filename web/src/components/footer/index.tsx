import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="absolute w-full mt-12 px-0 py-4 bottom-0 block bg-[#f3f3f3]">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/">
          <a className="align-middle">Realworld</a>
        </Link>
        <span className="align-middle text-[0.8rem] text-[#bbb] font-light ml-2.5">
          An interactive learning project from{' '}
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
