
import React from 'react';
import { EXTERNAL_LINK_SVG } from '../constants';

interface SourceLinkCardProps {
  uri: string;
  title?: string;
}

const SourceLinkCard: React.FC<SourceLinkCardProps> = ({ uri, title }) => {
  const displayTitle = title || uri;
  // Truncate long titles/URIs for display, but full URI in href
  const truncatedTitle = displayTitle.length > 70 ? displayTitle.substring(0, 67) + '...' : displayTitle;
  const truncatedUri = uri.length > 60 ? uri.substring(0, 57) + '...' : uri;


  return (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-slate-800 hover:bg-slate-700/70 rounded-lg shadow-md transition-all duration-200 border border-slate-700 hover:border-sky-600 group"
      title={displayTitle} // Show full title on hover
    >
      <h3 className="text-sky-400 font-semibold text-sm mb-1 group-hover:text-sky-300 break-words">
        {truncatedTitle} {EXTERNAL_LINK_SVG}
      </h3>
      <p className="text-xs text-slate-500 break-all group-hover:text-slate-400">
        {truncatedUri}
      </p>
    </a>
  );
};

export default SourceLinkCard;
    