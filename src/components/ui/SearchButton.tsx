import React, { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import type { Language } from '@utils/i18n';

interface SearchButtonProps {
  lang: Language;
  isMobile?: boolean;
}

export default function SearchButton({ lang, isMobile = false }: SearchButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);

        // Track search open event
        if (typeof window !== 'undefined' && window.gaTrack) {
          window.gaTrack('search_open', {
            event_category: 'Search',
            event_label: 'Keyboard Shortcut',
            method: 'keyboard'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);

    // Track search open event
    if (typeof window !== 'undefined' && window.gaTrack) {
      window.gaTrack('search_open', {
        event_category: 'Search',
        event_label: 'Button Click',
        method: 'button'
      });
    }
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={handleOpenModal}
          className="w-full group relative overflow-hidden flex items-center gap-4 p-4 text-left bg-white hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-teal-200 shadow-sm hover:shadow-md"
        >
          <div className="flex-shrink-0 relative">
            <div className="p-3 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 mb-1">
              {lang === 'ko' ? '검색하기' : 'Search'}
            </div>
            <div className="text-sm text-gray-500">
              {lang === 'ko' ? '페이지, 행사, 소식 검색...' : 'Search pages, events, news...'}
            </div>
          </div>
          <div className="flex-shrink-0">
            <kbd className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-mono bg-gray-50 text-gray-500 border border-gray-200 rounded-lg shadow-sm group-hover:bg-white group-hover:border-teal-200 transition-all duration-200">
              ⌘K
            </kbd>
          </div>

          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-emerald-400/0 to-teal-400/0 group-hover:from-teal-400/5 group-hover:via-emerald-400/5 group-hover:to-teal-400/5 transition-all duration-500 rounded-xl"></div>
        </button>
        <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden flex items-center gap-3 px-4 py-2.5 text-sm bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-teal-50 border border-gray-200 hover:border-teal-300 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
        title={lang === 'ko' ? '검색 (Ctrl+K)' : 'Search (Ctrl+K)'}
      >
        {/* Icon with enhanced styling */}
        <div className="relative">
          <div className={`p-2 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg transition-all duration-300 ${isHovered ? 'scale-110 shadow-md' : ''}`}>
            <svg className={`w-4 h-4 text-teal-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-lg opacity-0 transition-opacity duration-300 -z-10 ${isHovered ? 'opacity-20' : ''}`}></div>
        </div>

        {/* Text */}
        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          {lang === 'ko' ? '검색' : 'Search'}
        </span>

        {/* Keyboard shortcut */}
        <div className="flex items-center gap-1">
          <kbd className="hidden md:inline-flex items-center px-2 py-1 text-xs font-mono bg-gray-100 text-gray-500 border border-gray-300 rounded shadow-sm group-hover:bg-white group-hover:border-teal-300 group-hover:text-gray-700 transition-all duration-200">
            ⌘
          </kbd>
          <kbd className="hidden md:inline-flex items-center px-2 py-1 text-xs font-mono bg-gray-100 text-gray-500 border border-gray-300 rounded shadow-sm group-hover:bg-white group-hover:border-teal-300 group-hover:text-gray-700 transition-all duration-200">
            K
          </kbd>
        </div>

        {/* Animated background ripple */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-emerald-400/0 to-teal-400/0 group-hover:from-teal-400/5 group-hover:via-emerald-400/10 group-hover:to-teal-400/5 transition-all duration-500 rounded-xl"></div>

        {/* Shine effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
      </button>
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </>
  );
}