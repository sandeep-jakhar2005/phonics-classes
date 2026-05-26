'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header() {

  const [isScrolled, setIsScrolled] = useState(false)

  const [activeSection, setActiveSection] = useState('Home')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [])

  // Smooth Scroll
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    label: string
  ) => {

    e.preventDefault()

    setActiveSection(label)

    setMobileMenuOpen(false)

    const element = document.getElementById(sectionId)

    if (element) {

      const headerOffset = 120

      const elementPosition = element.getBoundingClientRect().top

      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Our Program', id: 'program' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ]

  const whatsappUrl =
    'https://wa.me/919882620805?text=Hi,%20I%20am%20interested%20in%20Phonics%20Classes!'

  return (

    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        transition-all
        duration-300
        ${isScrolled
          ? 'bg-[#16b5f5] py-3 shadow-md'
          : 'bg-[#16b5f5] py-5'}
      `}
    >

      <div className="container mx-auto max-w-[1280px] px-5">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) =>
              handleScrollToSection(e, 'home', 'Home')
            }
            className="relative z-20 block cursor-pointer"
          >

        <Image
          src="/images/new-logo-3.png"
          alt="logo"
          width={130}
          height={130}
          className="object-contain w-[130px] h-auto drop-shadow-md"
        />

          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-9">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) =>
                  handleScrollToSection(
                    e,
                    item.id,
                    item.label
                  )
                }
                className="
                  relative
                  text-white
                  font-black
                  text-[15px]
                  hover:text-[#ffd633]
                  transition-all
                "
              >

                {item.label}

                {activeSection === item.label && (
                  <span className="absolute left-0 -bottom-2 w-full h-[4px] bg-[#ffd633] rounded-full"></span>
                )}

              </a>

            ))}

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* WHATSAPP BUTTON */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden
                sm:flex
                bg-[#19c339]
                text-white
                font-black
                px-5
                py-3
                rounded-full
                border-[4px]
                border-[#123b91]
                shadow-[4px_4px_0_#123b91]
                items-center
                gap-2
                hover:translate-y-[-2px]
                transition-all
              "
            >

              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.848.502 3.576 1.377 5.064L2.04 21.68a.422.422 0 00.523.523l4.613-1.337a9.96 9.96 0 004.828 1.238c5.523 0 10.003-4.48 10.003-10.004C22.007 6.48 17.527 2 12.004 2z"
                  fill="currentColor"
                />
              </svg>

              WhatsApp Us

            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="
                lg:hidden
                flex
                items-center
                justify-center
                w-14
                h-14
                rounded-full
                bg-white
                border-[4px]
                border-[#123b91]
                shadow-[3px_3px_0_#123b91]
                transition-all
              "
            >

              <div className="flex flex-col gap-[5px]">

                <span className="w-6 h-[3px] bg-[#123b91] rounded-full"></span>

                <span className="w-6 h-[3px] bg-[#123b91] rounded-full"></span>

                <span className="w-6 h-[3px] bg-[#123b91] rounded-full"></span>

              </div>

            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (

        <div
          className="
            lg:hidden
            absolute
            top-full
            left-0
            w-full
            bg-[#eaf8ff]
            backdrop-blur-xl
            border-t-[4px]
            border-[#123b91]
            shadow-[0_10px_40px_rgba(0,0,0,0.12)]
            rounded-b-[35px]
            overflow-hidden
            animate-slideDown
          "
        >

          {/* TOP GRADIENT */}
          <div className="h-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-sky-400"></div>

          <div className="relative px-6 py-8">

            {/* DECORATION */}
            <div className="absolute top-6 left-4 w-3 h-3 bg-yellow-300 rounded-full"></div>

            <div className="absolute top-10 right-8 w-4 h-4 bg-pink-300 rounded-full"></div>

            <div className="absolute bottom-8 left-10 w-3 h-3 bg-sky-300 rounded-full"></div>

            <div className="flex flex-col items-center gap-5">

              {navItems.map((item) => (

                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) =>
                    handleScrollToSection(
                      e,
                      item.id,
                      item.label
                    )
                  }
                  className="
                    relative
                    text-[#123b91]
                    font-black
                    text-[22px]
                    hover:text-[#ff4d88]
                    transition-all
                    duration-300
                    hover:scale-110
                  "
                >

                  {item.label}

                </a>

              ))}

              {/* MOBILE WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4
                  bg-[#19c339]
                  text-white
                  font-black
                  px-8
                  py-4
                  rounded-full
                  border-[4px]
                  border-[#123b91]
                  shadow-[4px_4px_0_#123b91]
                  hover:translate-y-[-2px]
                  transition-all
                "
              >

                WhatsApp Us

              </a>

            </div>

          </div>

        </div>

      )}

      {/* CLOUD BORDER */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full overflow-hidden leading-none pointer-events-none">

        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[48px]"
          preserveAspectRatio="none"
        >

          <path
            fill="#16b5f5"
            d="M0,64 C60,90 120,90 180,64 C240,38 300,38 360,64 C420,90 480,90 540,64 C600,38 660,38 720,64 C780,90 840,90 900,64 C960,38 1020,38 1080,64 C1140,90 1200,90 1260,64 C1320,38 1380,38 1440,64 L1440,0 L0,0 Z"
          />

        </svg>

      </div>

    </header>
  )
}