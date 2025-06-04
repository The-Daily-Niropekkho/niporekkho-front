// components/common/Breadcrumb.tsx

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface BreadcrumbItem {
  label: string | React.ReactNode; // Label can be a string or an icon (like FaHome)
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className='py-2'>
      <ol className='flex items-center gap-0 text-sm font-medium'>
        {items.map((item, index) => (
          <li key={index} className='breadcrumb-item flex items-center'>
            {index > 0 && (
              <svg
                className='w-3 h-3 text-gray-500 mx-1'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 12 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='m2 9 4-4-4-4'
                />
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='m6 9 4-4-4-4'
                />
              </svg>
            )}
            <Link
              className='flex items-center gap-2 px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-200 text-lg'
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

// Add the CSS in the same file or a separate CSS module
<style jsx>{`
  /* Remove unnecessary background and shadow to match the minimalistic design */
  .breadcrumb-item + .breadcrumb-item::before {
    content: "";
    display: none;
  }

  .breadcrumb-item a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .breadcrumb-item a:hover {
    color: var(--text-primary) !important; /* Adjust to a red shade similar to the image */
  }

  /* Ensure the Home icon matches the image's gray tone */
  .breadcrumb-item a svg {
    color: #6b7280; /* Gray color to match the image */
    width: 1rem;
    height: 1rem;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .breadcrumb-item a {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
    }
  }
`}</style>;