import { useState } from 'react'

const navLinks = ['About', 'Services', 'Journal', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        {/* Brand */}
        <a
          href="#"
          className="text-white text-2xl md:text-3xl"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Serene
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="hidden md:block bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow">
          Book a consultation
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-8 h-6 flex flex-col justify-between items-center z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Top line: rotates 45deg + translates down 9px when open */}
          <span
            className="block w-full h-[2px] bg-white origin-center transition-all duration-500"
            style={{
              transform: menuOpen
                ? 'translateY(9px) rotate(45deg)'
                : 'translateY(0) rotate(0deg)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          {/* Middle line: fades/scales to 0 when open */}
          <span
            className="block w-full h-[2px] bg-white origin-center transition-all duration-500"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          {/* Bottom line: rotates -45deg + translates up 9px when open */}
          <span
            className="block w-full h-[2px] bg-white origin-center transition-all duration-500"
            style={{
              transform: menuOpen
                ? 'translateY(-9px) rotate(-45deg)'
                : 'translateY(0) rotate(0deg)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className="md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 z-[55] transition-transform duration-500"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-12">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-white/80 hover:text-white text-lg tracking-wide transition-all duration-500"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                  transitionDelay: menuOpen ? `${150 + i * 75}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <button
              className="w-full bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-500 button-glow"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: menuOpen ? '450ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Book a consultation
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      <div
        className={`md:hidden fixed inset-0 z-[54] bg-black/40 transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
