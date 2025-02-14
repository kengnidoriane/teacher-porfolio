"use client"; // Directive pour indiquer que c'est un composant client

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronRight, ArrowLeft } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [visibleLinks, setVisibleLinks] = useState<any[]>([]);
  const [moreLinks, setMoreLinks] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isResearchDropdownOpen, setIsResearchDropdownOpen] = useState(false);
  const [scrollBackground, setScrollBackground] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const researchLinks = [
    { name: "Patent", href: "#" },
    { name: "Journal Publications", href: "#" },
    { name: "Book/Chapter Publications", href: "#" },
    { name: "Conferences Publications", href: "#" },
    { name: "PhD Scholar Details", href: "#" },
  ];

  const mainLinks = [
    { name: "Home", href: "#" },
    { name: "Academic & Technical Experience", href: "#" },
    { name: "Development and Launch of New Courses", href: "#" },
    { name: "Awards & Recognition", href: "#" },
    { name: "Research", href: "#", dropdown: researchLinks },
    { name: "Fundings", href: "#" },
    { name: "International Collaboration", href: "#" },
    { name: "Resource Person", href: "#" },
    { name: "Events & Programs Photos", href: "#" },
    { name: "Information", href: "#" },
  ];

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
    let maxVisibleLinks = 2; // Par défaut pour 768px à 937px

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

  // Fonction pour gérer le scroll et changer le background du header
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrollBackground(true);
    } else {
      setScrollBackground(false);
    }
  };

  // Mettre à jour les liens lors du chargement et du redimensionnement de la fenêtre
  useEffect(() => {
    updateLinks();
    window.addEventListener('resize', updateLinks);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', updateLinks);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Focus sur l'input de recherche lorsque la recherche est ouverte
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrollBackground || isSearchOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="/" className="text-lg font-semibold text-gray-800 hover:text-gray-600">
          SamuelIrk
        </a>

        {/* Menu de navigation (visible sur les écrans larges) */}
        <nav className="hidden md:flex items-center space-x-4">
          {visibleLinks.map((link, index) => (
            <div key={index} className="relative group">
              <a
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-gray-800 hover:text-gray-600 whitespace-nowrap ${
                  activeLink === link.href ? "border-b-2 border-green-500" : ""
                }`}
              >
                {truncateLinkName(link.name, 20)}
              </a>
              {link.dropdown && (
                <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-lg">
                  {link.dropdown.map((subLink: any, subIndex: number) => (
                    <a
                      key={subIndex}
                      href={subLink.href}
                      onClick={() => handleLinkClick(subLink.href)}
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                      }`}
                    >
                      {subLink.name}
                    </a>
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
              <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-lg">
                {moreLinks.map((link, index) => (
                  <div key={index}>
                    {link.name === "Research" ? (
                      <div>
                        <button
                          onClick={() => setIsResearchDropdownOpen(!isResearchDropdownOpen)}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                          {link.name}
                        </button>
                        {isResearchDropdownOpen && (
                          <div className="ml-4">
                            {link.dropdown.map((subLink: any, subIndex: number) => (
                              <a
                                key={subIndex}
                                href={subLink.href}
                                onClick={() => handleLinkClick(subLink.href)}
                                className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                                  activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                                }`}
                              >
                                {subLink.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                          activeLink === link.href ? "border-b-2 border-green-500" : ""
                        }`}
                      >
                        {link.name}
                      </a>
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

        {/* Bouton de menu (visible uniquement sur les petits écrans) */}
        <button
          className="md:hidden text-gray-800 hover:text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu responsive (visible uniquement sur les petits écrans) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            {mainLinks.map((link, index) => (
              <div key={index}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-gray-800 hover:text-gray-600 ${
                    activeLink === link.href ? "border-b-2 border-green-500" : ""
                  }`}
                >
                  {truncateLinkName(link.name, 20)}
                </a>
                {link.dropdown && (
                  <div className="ml-4 mt-2">
                    {link.dropdown.map((subLink: any, subIndex: number) => (
                      <a
                        key={subIndex}
                        href={subLink.href}
                        onClick={() => handleLinkClick(subLink.href)}
                        className={`block text-gray-800 hover:text-gray-600 ${
                          activeLink === subLink.href ? "border-b-2 border-green-500" : ""
                        }`}
                      >
                        {subLink.name}
                      </a>
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
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="flex items-center w-full max-w-md px-4">
            <button
              className="text-gray-800 hover:text-gray-600 mr-4"
              onClick={() => setIsSearchOpen(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="text-gray-800 hover:text-gray-600 ml-4">
              <Search className="h-5 w-5" />
            </button>
          </div>
          {/* Résultats de la recherche (à implémenter) */}
          <div className="mt-4 w-full max-w-md px-4">
            {/* Placeholder pour les résultats de la recherche */}
            <div className="text-gray-800">Search results will appear here.</div>
          </div>
        </div>
      )}

      {/* Flou sur le reste de l'écran lorsque la recherche est ouverte */}
      {isSearchOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
    </header>
  );
}
