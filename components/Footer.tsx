'use client'

import Image from 'next/image'

export default function Footer() {

  // Smooth Scroll Function
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault()

    const element = document.getElementById(sectionId)

    if (element) {
      const headerOffset = 200

      const elementPosition = element.getBoundingClientRect().top

      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <footer className="bg-[#07225f] text-white pt-16 pb-8 relative overflow-hidden">

      {/* TOP GRADIENT LINE */}
      <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-pink-500" />

      <div className="container">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO & DESCRIPTION */}
          <div>

            <div className="flex items-center gap-3">

            <Image
              src="/images/new-logo-3.png"
              alt="logo"
              width={130}
              height={130}
              className="object-contain w-[130px] h-auto drop-shadow-md"
            />

              <div>
                <h2 className="font-black text-2xl">
                  CREST & CORE
                </h2>

                <p className="text-[#ffd633] text-xs font-black">
                  PHONICS CLASSES
                </p>
              </div>

            </div>

            <p className="mt-5 text-white/70 leading-relaxed">
              Helping children build strong reading and phonics skills.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="font-black text-xl mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-white/80">

              <li>
                <a
                  href="#home"
                  onClick={(e) => handleScrollToSection(e, 'home')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollToSection(e, 'about')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#program"
                  onClick={(e) => handleScrollToSection(e, 'program')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  Program
                </a>
              </li>

              <li>
                <a
                  href="#benefits"
                  onClick={(e) => handleScrollToSection(e, 'benefits')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  Benefits
                </a>
              </li>

              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleScrollToSection(e, 'testimonials')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollToSection(e, 'contact')}
                  className="hover:text-[#ffd633] transition-all duration-300"
                >
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* PROGRAMS */}
          <div>

            <h3 className="font-black text-xl mb-5">
              Programs
            </h3>

            <ul className="space-y-3 text-white/80">

              <li>Letter Sounds</li>

              <li>Blending</li>

              <li>Sight Words</li>

              <li>Fun Activities</li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="font-black text-xl mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-white/80">

              {/* PHONE */}
              <a
                href="tel:+917876535799"
                className="
                  flex
                  items-start
                  gap-2
                  hover:text-[#ffd633]
                  transition-all
                  duration-300
                "
              >
                <span>📞</span>

                <span>
                  +91 98826 20805
                </span>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:reenaminhas4426@gmail.com"
                className="
                  flex
                  items-start
                  gap-2
                  break-all
                  hover:text-[#ffd633]
                  transition-all
                  duration-300
                "
              >
                <span>✉️</span>

                <span>
                  reenaminhas4426@gmail.com
                </span>
              </a>

              {/* ADDRESS */}
              <a
                href="https://maps.google.com/?q=Mehatpur,Una,Himachal+Pradesh+174315"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-start
                  gap-2
                  leading-[1.7]
                  hover:text-[#ffd633]
                  transition-all
                  duration-300
                "
              >
                <span>📍</span>

                <span>
                  Mehatpur, District Una,
                  <br />
                  Himachal Pradesh – 174315,
                  <br />
                  India
                </span>
              </a>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/50">
          © 2024 Crest & Core Phonics Classes
        </div>

      </div>

    </footer>
  )
}