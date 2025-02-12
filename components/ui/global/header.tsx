"use client"
import { AppContainer } from "./app-container";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white shadow-md">
    <AppContainer>
      <div className="flex items-center justify-between h-16">
        <div className="text-lg font-semibold">Mon Site</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-600">Accueil</a>
          <a href="#" className="hover:text-gray-600">À propos</a>
          <a href="#" className="hover:text-gray-600">Services</a>
          <a href="#" className="hover:text-gray-600">Contact</a>
        </nav>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="hover:text-gray-600">Accueil</a>
            <a href="#" className="hover:text-gray-600">À propos</a>
            <a href="#" className="hover:text-gray-600">Services</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </nav>
        </div>
      )}
    </AppContainer>
  </header>
  );
}

