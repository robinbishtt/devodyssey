import  React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa';
import { useLocation, Link } from "react-router-dom";

export default function PageHeader({className}) {
    const { pathname } = useLocation();
    const pathParts = pathname
        .split("/")
        .filter(Boolean)
        .map(part => decodeURIComponent(part).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()));

    return (
        <span className={`flex items-center gap-1 px-1 py-2 font-semibold text-white/70 ${className}`}>

            <Link to="/" className="transition-colors duration-200 text-white/70 hover:text-white">
                <BiSolidHome size={15} />
            </Link>
            {pathParts.length > 0 && <span className="text-white/70"><FaChevronRight /></span>}

            {pathParts.map((part, index) => (
                <React.Fragment key={part}>
                    <Link
                        to={`/${pathParts.slice(0, index + 1).join("/")}`}
                        className="transition-colors duration-200 text-white/70 hover:text-white hover:underline"
                    >
                        {part}
                    </Link>
                    {index < pathParts.length - 1 && (
                        <span className="text-white/70"><FaChevronRight /></span>
                    )}
                </React.Fragment>
            ))}
        </span>
    );
}