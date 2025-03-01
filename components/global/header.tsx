"use client";
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronRight, ArrowLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import data from '@/data/data.json';

interface Link {
  name: string;
  href: string;
  dropdown?: Link[]; // Optionnel, si certains liens ont des sous-liens
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);
  const [moreLinks, setMoreLinks] = useState<Link[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isResearchDropdownOpen, setIsResearchDropdownOpen] = useState<boolean>(false);
  const [scrollBackground, setScrollBackground] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mainLinks: Link[] = data.header.mainLinks;

  // Fonction pour tronquer les noms de liens trop longs
  const truncateLinkName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  // Fonction pour gérer le clic sur un lien
  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  // Fonction pour ajuster les liens visibles et les liens dans "More" en fonction de la largeur de l'écran
  const updateLinks = () => {
    const screenWidth = window.innerWidth;
    let maxVisibleLinks = 2;

    if (screenWidth >= 938 && screenWidth <= 1121) maxVisibleLinks = 3;
    if (screenWidth >= 1122 && screenWidth <= 1236) maxVisibleLinks = 4;
    if (screenWidth >= 1237 && screenWidth <= 1327) maxVisibleLinks = 5;
    if (screenWidth >= 1328 && screenWidth <= 1545) maxVisibleLinks = 6;
    if (screenWidth >= 1546 && screenWidth <= 1695) maxVisibleLinks = 7;
    if (screenWidth >= 1696 && screenWidth <= 1915) maxVisibleLinks = 8;
    if (screenWidth >= 1916) maxVisibleLinks = 9;

    setVisibleLinks(mainLinks.slice(0, maxVisibleLinks));
    setMoreLinks(mainLinks.slice(maxVisibleLinks));
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrollBackground(true);
    } else {
      setScrollBackground(false);
    }
  };

  useEffect(() => {
    updateLinks();
    window.addEventListener('resize', updateLinks);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', updateLinks);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className={`flex ${isMenuOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 transition-colors duration-300 ${
          scrollBackground || isSearchOpen ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-gray-800">
              SamuelIrk
            </Link>
          </div>

          {/* Logo (visible uniquement sur les écrans larges) */}
          <Link href="/" className="hidden md:block text-lg font-semibold text-gray-800 hover:text-gray-600">
            SamuelIrk
          </Link>

          {/* Menu de navigation (visible sur les écrans larges) */}
          <nav className="hidden md:flex items-center space-x-8">
            {visibleLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-gray-800 hover:text-gray-600 whitespace-nowrap ${
                    activeLink === link.href ? "border-b-2 border-green-500" : ""
                  }`}
                >
                  {truncateLinkName(link.name, 25)}
                </Link>
                {link.dropdown && (
                  <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-lg">
                    {link.dropdown.map((subLink: Link) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        onClick={() => handleLinkClick(subLink.href)}
                        className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                          activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                        }`}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Dropdown "More" */}
            {moreLinks.length > 0 && (
              <div className="relative group">
                <button className="text-gray-800 hover:text-gray-600 flex items-center">
                  More
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:rotate-90 transition-transform" />
                </button>
                <div className="absolute hidden right-0 left-0 group-hover:block w-52 bg-white shadow-md rounded-lg">
                  {moreLinks.map((link) => (
                    <div key={link.name}>
                      {link.name === "Research" ? (
                        <div>
                          <button
                            onClick={() => setIsResearchDropdownOpen(!isResearchDropdownOpen)}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left flex items-center justify-between"
                          >
                            {link.name}
                            <ChevronDown className={`h-4 w-4 transition-transform ${isResearchDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isResearchDropdownOpen && (
                            <div className="ml-4">
                              {link.dropdown?.map((subLink: Link) => (
                                <Link
                                  key={subLink.name}
                                  href={subLink.href}
                                  onClick={() => handleLinkClick(subLink.href)}
                                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                                    activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                                  }`}
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                            activeLink === link.href ? "border-b-2 border-green-500" : ""
                          }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Bouton de recherche (visible sur tous les écrans) */}
          <button
            className="text-gray-800 hover:text-gray-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Menu responsive (visible uniquement sur les petits écrans) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col space-y-2 p-4">
              {mainLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-gray-800 hover:text-gray-600 ${
                      activeLink === link.href ? "border-b-2 border-green-500" : ""
                    }`}
                  >
                    {truncateLinkName(link.name, 20)}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 mt-2">
                      {link.dropdown.map((subLink: Link) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          onClick={() => handleLinkClick(subLink.href)}
                          className={`block text-gray-800 hover:text-gray-600 ${
                            activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                          }`}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Recherche (s'ouvre en plein écran) */}
        {isSearchOpen && (
          <>
            {/* Arrière-plan flou */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={() => setIsSearchOpen(false)}></div>

            {/* Fenêtre de recherche */}
            <div className="fixed top-0 left-0 w-full bg-white z-50 flex flex-col items-center rounded-b-lg shadow-lg">
              <div className="flex items-center justify-center w-full px-4 py-5 relative">
                {/* Flèche de retour à l'extrême gauche */}
                <button
                  title='Retour au site'
                  className="text-gray-800 hover:text-gray-600 absolute left-4"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Champ de recherche centré */}
                <div className="w-1/2 gap-4 py-2 border flex items-center justify-start border-gray-300 rounded-lg focus:ring-green-500">
                  <button className="text-gray-800 hover:text-gray-600 ml-4">
                    <Search className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search..."
                    className='outline-none focus:outline-none border-none flex-grow'
                  />
                </div>
              </div>

              {/* Résultats de la recherche (à implémenter) */}
              <div className="mt-4 w-full px-4 pb-4">
                <div className="text-gray-800">Search results will appear here.</div>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
