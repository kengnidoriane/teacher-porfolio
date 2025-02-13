"use client"; 

import { AppContainer } from "./app-container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  return (
    <header className="bg-white shadow-md">
      <AppContainer>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-lg font-semibold text-gray-800 hover:text-gray-600">
            SamuelIrk
          </a>

          {/* Menu de navigation (visible sur les écrans larges) */}
          <nav className="hidden lg:flex items-center space-x-4">
            {mainLinks.map((link, index) => (
              link.dropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-800 hover:text-gray-600">
                      {link.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.dropdown.map((subLink, subIndex) => (
                      <DropdownMenuItem key={subIndex}>
                        <a href={subLink.href}>{subLink.name}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={index} variant="ghost" className="text-gray-800 hover:text-gray-600">
                  <a href={link.href}>{link.name}</a>
                </Button>
              )
            ))}
          </nav>

          {/* Bouton de recherche (visible sur tous les écrans) */}
          <Button variant="ghost" className="text-gray-800 hover:text-gray-600">
            <Search />
          </Button>

          {/* Bouton de menu (visible sur les écrans mobiles) */}
          <Button onClick={toggleMenu} className="lg:hidden text-gray-800">
            {isMenuOpen ? <X className="transform rotate-90 transition-transform" /> : <Menu />}
          </Button>
        </div>

        {/* Menu déroulant pour les écrans mobiles */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {mainLinks.map((link, index) => (
                link.dropdown ? (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-gray-800 hover:text-gray-600">
                        {link.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {link.dropdown.map((subLink, subIndex) => (
                        <DropdownMenuItem key={subIndex}>
                          <a href={subLink.href}>{subLink.name}</a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button key={index} variant="ghost" className="text-gray-800 hover:text-gray-600">
                    <a href={link.href}>{link.name}</a>
                  </Button>
                )
              ))}
            </nav>
          </div>
        )}
      </AppContainer>
    </header>
  );
}