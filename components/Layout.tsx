import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpen, Facebook, Instagram, Twitter } from 'lucide-react';
import { NAV_ITEMS, APP_NAME } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = '#'}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <span className="font-bold text-xl text-primary">{APP_NAME}</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-gray-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary font-medium text-sm">로그인</button>
              <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                무료 체험
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-primary p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2 px-3">
                 <button className="w-full text-center py-2 text-gray-600 font-medium">로그인</button>
                 <button className="w-full bg-primary text-white py-2 rounded-lg font-bold">무료 체험 시작</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={24} className="text-blue-400" />
                <span className="font-bold text-xl">{APP_NAME}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                바쁜 학부모님을 위한 AI 맞춤 학습 솔루션.<br/>
                아이의 성적 향상과 부모님의 여유를 동시에 선물합니다.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><NavLink to="/curriculum" className="hover:text-white">교과 과정</NavLink></li>
                <li><NavLink to="/generator" className="hover:text-white">문제 만들기</NavLink></li>
                <li><NavLink to="/pricing" className="hover:text-white">요금제</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">고객 지원</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><NavLink to="/guide" className="hover:text-white">이용 가이드</NavLink></li>
                <li><NavLink to="/support" className="hover:text-white">FAQ</NavLink></li>
                <li><NavLink to="/support" className="hover:text-white">1:1 문의</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-gray-400 text-sm mb-2">support@edugen.ai</p>
              <p className="text-gray-400 text-sm mb-4">02-1234-5678</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
            © 2024 {APP_NAME}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;