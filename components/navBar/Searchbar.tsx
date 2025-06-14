"use client";

import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  handleSearchItem: (e: any) => void;
}

const SearchBar = ({
  showSearch,
  setShowSearch,
  searchText,
  setSearchText,
  handleSearchItem,
}: SearchBarProps) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSearch]);

  return (
    <div className='search-container' ref={searchRef}>
      <div className='search-wrapper'>
        <form onSubmit={handleSearchItem}>
          <input
            type='search'
            className='search-input'
            placeholder='খবর অনুসন্ধান করুন...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSearch(true)}
          />
        </form>
        <button
          className='search-button '
          onClick={handleSearchItem}
          aria-label='Toggle search'
        >
          <FaSearch className='text-gray-400' />
        </button>
      </div>

      <style jsx>{`
        .search-container {
          display: inline-block;
          position: relative;
          height: 40px;
          vertical-align: middle;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;
          background: #f1f1f1;
          transition: all 0.3s ease-in-out;
          width: ${showSearch ? "240px" : "40px"};
        }

        .search-input {
          border: none;
          outline: none;
          background: none;
          padding: 0 10px 0 40px;
          height: 100%;
          width: 100%;
          font-size: 16px;
          color: #333;
          opacity: ${showSearch ? 1 : 0};
          transition: opacity 0.3s ease-in-out;
        }

        .search-input::placeholder {
          color: #999;
        }

        .search-button {
          position: absolute;
          left: 0;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: color 0.3s ease-in-out;
        }

        .search-button:hover {
          color: #e53e3e;
        }

        .search-icon {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
