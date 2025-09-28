import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { searchIndex, type SearchItem } from '@data/searchIndex';
import { getTranslation, type Language } from '@utils/i18n';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface SearchResult extends SearchItem {
  score: number;
  highlightedTitle: string;
  highlightedDescription: string;
}

export default function SearchModal({ isOpen, onClose, lang }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Search function
  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    searchIndex.forEach((item) => {
      let score = 0;
      const title = lang === 'ko' ? item.title : item.titleEn;
      const description = lang === 'ko' ? item.description : item.descriptionEn;
      const keywords = lang === 'ko' ? item.keywords : item.keywordsEn;

      // Title match (highest priority)
      if (title.toLowerCase().includes(query)) {
        score += 100;
      }

      // Description match
      if (description.toLowerCase().includes(query)) {
        score += 50;
      }

      // Keywords match
      keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(query)) {
          score += 30;
        }
      });

      // Fuzzy matching for Korean/English mixed search
      const allText = `${title} ${description} ${keywords.join(' ')}`.toLowerCase();
      if (allText.includes(query)) {
        score += 20;
      }

      if (score > 0) {
        // Create highlighted versions
        const highlightedTitle = highlightText(title, query);
        const highlightedDescription = highlightText(description, query);

        results.push({
          ...item,
          score,
          highlightedTitle,
          highlightedDescription
        });
      }
    });

    // Sort by score (highest first) and limit to 8 results
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  };

  // Highlight matching text
  const highlightText = (text: string, query: string): string => {
    if (!query) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-gradient-to-r from-teal-200 to-emerald-200 px-1 py-0.5 rounded font-medium text-teal-900">$1</mark>');
  };

  // Handle search input change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const searchResults = performSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 150); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, lang]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus input when modal opens and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // 모바일에서 body 스크롤 방지
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // 모달 닫을 때 body 스크롤 복원
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleResultClick = (result: SearchItem) => {
    const url = lang === 'ko' ? result.url : result.urlEn;

    // Track search click event
    if (typeof window !== 'undefined' && window.gaTrack) {
      window.gaTrack('search_result_click', {
        event_category: 'Search',
        event_label: result.title,
        search_query: query
      });
    }

    // Navigate to result
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "w-5 h-5";
    switch (category) {
      case 'page':
        return (
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className={`${iconClass} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'event':
        return (
          <div className="p-2 bg-purple-100 rounded-lg">
            <svg className={`${iconClass} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'news':
        return (
          <div className="p-2 bg-orange-100 rounded-lg">
            <svg className={`${iconClass} text-orange-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        );
      case 'board':
        return (
          <div className="p-2 bg-green-100 rounded-lg">
            <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'club':
        return (
          <div className="p-2 bg-pink-100 rounded-lg">
            <svg className={`${iconClass} text-pink-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'about':
        return (
          <div className="p-2 bg-indigo-100 rounded-lg">
            <svg className={`${iconClass} text-indigo-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-lg">
            <svg className={`${iconClass} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      page: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      event: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      news: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      board: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      club: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
      about: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    };

    const badge = badges[category as keyof typeof badges] || badges.page;
    const categoryNames = {
      ko: { page: '페이지', event: '행사', news: '소식', board: '게시판', club: '동아리', about: '소개' },
      en: { page: 'Page', event: 'Event', news: 'News', board: 'Board', club: 'Club', about: 'About' }
    };

    const categoryName = categoryNames[lang][category as keyof typeof categoryNames.ko] || category;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
        {categoryName}
      </span>
    );
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
      {/* Enhanced Backdrop with blur */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" style={{ zIndex: 9998 }} />

      {/* Modal - 모바일에서는 전체 화면, 데스크톱에서는 중앙 정렬 */}
      <div className="relative min-h-screen flex items-start justify-center sm:p-4 sm:pt-[8vh]" style={{ zIndex: 9999 }}>
        <div
          ref={modalRef}
          className="relative w-full max-w-3xl bg-white sm:rounded-2xl shadow-2xl border-0 sm:border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100 h-screen sm:h-auto"
          style={{
            zIndex: 9999,
            animation: isOpen ? 'slideInUp 0.3s ease-out' : 'slideOutDown 0.3s ease-in'
          }}
        >
          {/* Enhanced Header with gradient - 모바일 최적화 */}
          <div className="relative bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-100">
            <div className="flex items-center gap-3 p-4 sm:p-6">
              <div className="flex-shrink-0">
                <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'ko' ? '검색어를 입력하세요...' : 'Search for pages, events, news...'}
                className="search-input flex-1 text-lg sm:text-xl bg-transparent outline-none placeholder-gray-500 text-gray-900 font-medium min-h-[44px] flex items-center"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <button
                onClick={onClose}
                className="flex-shrink-0 p-3 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={lang === 'ko' ? '검색 닫기' : 'Close search'}
              >
                <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Search Results - 모바일 최적화 */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              maxHeight: 'calc(100vh - 140px)',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-teal-500 rounded-full animate-spin"></div>
                  <span className="text-sm">{lang === 'ko' ? '검색 중...' : 'Searching...'}</span>
                </div>
              </div>
            ) : query.trim() && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {lang === 'ko' ? '검색 결과가 없습니다' : 'No results found'}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  {lang === 'ko'
                    ? '다른 키워드로 검색해 보거나 아래 인기 페이지를 확인해보세요'
                    : 'Try searching with different keywords or check out popular pages below'
                  }
                </p>
              </div>
            ) : !query.trim() ? (
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {lang === 'ko' ? '빠른 링크' : 'Quick links'}
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                  {searchIndex.slice(0, 6).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(item)}
                      className="flex items-center gap-3 p-4 sm:p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 group min-h-[60px] active:bg-gray-100"
                    >
                      <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {lang === 'ko' ? item.title : item.titleEn}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {lang === 'ko' ? item.description : item.descriptionEn}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-1 sm:py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.url}-${index}`}
                    onClick={() => handleResultClick(result)}
                    className={`w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-5 text-left transition-all duration-200 border-l-4 min-h-[80px] active:bg-gray-100 ${
                      index === selectedIndex
                        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-l-teal-500 shadow-sm'
                        : 'hover:bg-gray-50 border-l-transparent hover:border-l-gray-300'
                    }`}
                  >
                    <div className={`flex-shrink-0 transition-transform duration-200 ${
                      index === selectedIndex ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {getCategoryIcon(result.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryBadge(result.category)}
                        {result.url.startsWith('http') && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            External
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-lg font-semibold mb-1 leading-tight ${
                          index === selectedIndex ? 'text-teal-900' : 'text-gray-900'
                        }`}
                        dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                      />
                      <p
                        className="text-sm text-gray-600 leading-relaxed line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: result.highlightedDescription }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Footer - 모바일에서는 간소화 */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="hidden sm:flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm">↵</kbd>
                  {lang === 'ko' ? '선택' : 'to select'}
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm">↑↓</kbd>
                  {lang === 'ko' ? '이동' : 'to navigate'}
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm">esc</kbd>
                  {lang === 'ko' ? '닫기' : 'to close'}
                </span>
              </div>
              <div className="flex items-center gap-1 mx-auto sm:mx-0">
                <span className="text-xs sm:text-xs">{lang === 'ko' ? 'KSA 검색' : 'KSA Search'}</span>
                <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideOutDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );

  // Portal을 사용해서 document.body에 직접 렌더링
  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}