import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Users, Globe, 
  ArrowUpRight, Linkedin, GitBranch,
  Code, FileCode, Server, Database, Box, Terminal,
  Menu, X, Sun, Moon, ArrowUp, ChevronUp,
  Monitor, Layers, Cloud, Cpu
} from 'lucide-react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [active, setActive] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  // Dark Mode Management - Enhanced
  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(shouldUseDarkMode);
    
    // Apply theme immediately to prevent flash
    const root = document.documentElement;
    root.setAttribute('data-theme', shouldUseDarkMode ? 'dark' : 'light');
    
    // Also set background on body for better coverage
    document.body.style.backgroundColor = shouldUseDarkMode ? '#000000' : '#FFFFFF';
    document.body.style.color = shouldUseDarkMode ? '#FFFFFF' : '#000000';
  }, []);

  // Scroll Progress & Scroll to Top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Update DOM and localStorage immediately
    const root = document.documentElement;
    root.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Update body background immediately
    document.body.style.backgroundColor = newDarkMode ? '#000000' : '#FFFFFF';
    document.body.style.color = newDarkMode ? '#FFFFFF' : '#000000';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Mobile menu escape key handler
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  // Intersection Observer for scroll animations and active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-up');
            // Update active section based on scroll position
            const sectionId = entry.target.id;
            if (sectionId && ['hero', 'about', 'skills', 'projects', 'contact'].includes(sectionId)) {
              setActive(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [heroRef, aboutRef, skillsRef, projectsRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Also observe contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Projects data with tech focus
  const projects = [
    {
      title: "Üretim Takip Sistemi (MES)",
      description: "Python Flask RESTful API ve React.js frontend ile geliştirilmiş, QR kod takibi, çoklu bant yönetimi ve rol bazlı erişim sağlayan üretim takip sistemi.",
      tech: ["Python Flask", "React.js", "MySQL", "SQL Server", "Docker", "Redis"],
      github: "#",
      category: "Full Stack"
    },
    {
      title: "Altyapı ve Yol İnşaatlarında Fiyat Tahmin Sistemi",
      description: "Node.js ve MongoDB kullanarak geliştirilen, inşaat maliyetlerini tahmin etmeye yönelik web tabanlı uygulama.",
      tech: ["Node.js", "MongoDB", "JavaScript"],
      github: "#",
      category: "Backend & Data Analysis"
    },
    {
      title: "Makine Öğrenmesi ile İşaret Dili Tanıma Projesi",
      description: "Python görüntü işleme teknikleriyle kameradan işaret dilini algılayıp yazıya dönüştüren yenilikçi bir sistem.",
      tech: ["Python", "OpenCV", "Machine Learning"],
      github: "#",
      category: "Machine Learning"
    },
    {
      title: "Nesne Tanıma ve Gölgeli Alan Algılama",
      description: "YOLOv3 ile güvenlik kameralarında gerçek zamanlı nesne ve gölgeli alan tespiti yapan uygulama.",
      tech: ["Python", "YOLOv3", "OpenCV"],
      github: "#",
      category: "Computer Vision"
    },
    {
      title: "Web ve Telefon Otomasyon Yazılımı",
      description: "Python Selenium ile otomasyon süreçleri ve Bash scriptler kullanarak sunucu yönetimi sağlayan sistem.",
      tech: ["Python", "Selenium", "Bash", "Linux"],
      github: "#",
      category: "Automation & Scripting"
    }
  ];
  

  // Enhanced Skills with Experience Levels
  const skills = [
    { name: 'Python', icon: <Code size={20} />, color: 'text-yellow-600' },
    { name: 'JavaScript', icon: <FileCode size={20} />, color: 'text-yellow-500' },
    { name: 'React.js', icon: <Globe size={20} />, color: 'text-blue-600' },
    { name: 'Next.js', icon: <Server size={20} />, color: 'text-black' },
    { name: 'Node.js', icon: <Server size={20} />, color: 'text-green-600' },
    { name: 'PostgreSQL', icon: <Database size={20} />, color: 'text-blue-700' },
    { name: 'SQL Server', icon: <Database size={20} />, color: 'text-red-600' },
    { name: 'C#', icon: <Terminal size={20} />, color: 'text-purple-600' },
    { name: 'Docker', icon: <Box size={20} />, color: 'text-blue-500' },
    { name: 'Git', icon: <GitBranch size={20} />, color: 'text-orange-600' },
    { name: 'HTML/CSS', icon: <Globe size={20} />, color: 'text-orange-500' },
    { name: 'Tailwind', icon: <FileCode size={20} />, color: 'text-teal-500' }
  ];
  

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Alt + D for dark mode toggle
      if (event.altKey && event.key === 'd') {
        event.preventDefault();
        toggleDarkMode();
      }
      
      // Number keys for quick navigation
      const sectionMap = {
        '1': 'hero',
        '2': 'about', 
        '3': 'skills',
        '4': 'projects',
        '5': 'contact'
      };
      
      if (event.altKey && sectionMap[event.key]) {
        event.preventDefault();
        scrollToSection(sectionMap[event.key]);
      }
      
      // Alt + T for scroll to top
      if (event.altKey && event.key === 't') {
        event.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen`} style={{backgroundColor: 'var(--apple-bg-primary)', color: 'var(--apple-text-primary)'}}>
      {/* Header/Navigation - Apple Style Sticky */}
      <header className="shadow-sm border-b sticky top-0 z-50" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo/Name - Apple Style */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: 'var(--apple-blue)'}}>
                ÖFE
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold" style={{color: 'var(--apple-text-primary)'}}>Ömer Faruk Ertaş</div>
                <div className="text-xs" style={{color: 'var(--apple-text-secondary)'}}>Full Stack Developer</div>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'About Me', id: 'hero' },
                { name: 'Experience', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="transition-colors text-sm font-medium"
                  style={{
                    color: active === item.id ? 'var(--apple-blue)' : 'var(--apple-text-secondary)',
                    fontWeight: active === item.id ? '600' : '500'
                  }}
                  onMouseEnter={(e) => {
                    if (active !== item.id) {
                      e.target.style.color = 'var(--apple-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== item.id) {
                      e.target.style.color = 'var(--apple-text-secondary)';
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Dark Mode Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Improved Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: isDarkMode ? 'var(--apple-blue)' : 'var(--apple-gray-4)',
                  focusRingColor: 'var(--apple-blue)'
                }}
                aria-label="Toggle dark mode"
              >
                <span 
                  className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg"
                  style={{
                    transform: isDarkMode ? 'translateX(24px)' : 'translateX(2px)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
                  <Sun className="h-3 w-3 text-yellow-500 opacity-70" style={{opacity: isDarkMode ? 0.3 : 0.7}} />
                  <Moon className="h-3 w-3 text-blue-300 opacity-70" style={{opacity: isDarkMode ? 0.7 : 0.3}} />
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: isMobileMenuOpen ? 'var(--apple-bg-secondary)' : 'transparent',
                  color: 'var(--apple-text-secondary)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--apple-bg-secondary)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = isMobileMenuOpen ? 'var(--apple-bg-secondary)' : 'transparent'}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} style={{color: 'var(--apple-text-secondary)'}} />
                ) : (
                  <Menu size={24} style={{color: 'var(--apple-text-secondary)'}} />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t absolute top-full left-0 right-0 z-50 shadow-lg" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
              <nav className="px-4 py-4">
                <div className="flex flex-col space-y-2">
                  {[
                    { id: 'hero', label: 'About Me' },
                    { id: 'about', label: 'Experience' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'contact', label: 'Contact' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="px-4 py-3 rounded-lg text-left font-medium transition-all duration-200"
                      style={{
                        backgroundColor: activeSection === item.id ? 'var(--apple-blue)' : 'transparent',
                        color: activeSection === item.id ? 'white' : 'var(--apple-text-primary)'
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.target.style.backgroundColor = 'var(--apple-bg-secondary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Apple Style */}
      <section id="hero" ref={heroRef} className="relative overflow-hidden" style={{backgroundColor: 'var(--apple-bg-secondary)'}}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            {/* Profile Image - Apple Style with Float */}
            <div className="mb-8">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg apple-float apple-glow" style={{backgroundColor: 'var(--apple-blue)'}}>
                ÖFE
              </div>
            </div>
            
            {/* Main Content - Apple Style */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 apple-bounce-in" style={{color: 'var(--apple-text-primary)'}}>
              Ömer Faruk Ertaş
            </h1>
            
            <div className="text-xl sm:text-2xl mb-6" style={{color: 'var(--apple-text-secondary)'}}>
              <span className="apple-typewriter">Full Stack Developer</span>
            </div>
            
            <p className="text-base sm:text-lg mb-12 max-w-3xl mx-auto leading-relaxed" style={{color: 'var(--apple-text-secondary)'}}>
              İstanbul merkezli Full Stack Developer. Python, JavaScript, C# ve modern teknolojilerle enterprise seviyesinde 
              yazılım çözümleri geliştiriyorum. Web otomasyonu, veri analizi ve sistem entegrasyonu konularında uzmanım.
            </p>
            
            {/* Stats - Apple Style */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{color: 'var(--apple-blue)'}}>2+</div>
                <div className="text-sm sm:text-base" style={{color: 'var(--apple-text-secondary)'}}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{color: 'var(--apple-blue)'}}>10+</div>
                <div className="text-sm sm:text-base" style={{color: 'var(--apple-text-secondary)'}}>Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{color: 'var(--apple-blue)'}}>12+</div>
                <div className="text-sm sm:text-base" style={{color: 'var(--apple-text-secondary)'}}>Technologies</div>
              </div>
            </div>
            
            {/* CTA Buttons - Apple Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{backgroundColor: 'var(--apple-blue)'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--apple-blue-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--apple-blue)'}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 px-8 py-3 rounded-xl font-medium transition-all duration-200"
                style={{
                  borderColor: 'var(--apple-blue)',
                  color: 'var(--apple-blue)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--apple-blue)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--apple-blue)';
                }}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Apple Style */}
      <section id="about" className="py-12 md:py-20" style={{backgroundColor: 'var(--apple-bg-primary)'}} ref={aboutRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--apple-text-primary)'}}>
              Work Experience
            </h2>
            <p className="max-w-2xl mx-auto" style={{color: 'var(--apple-text-secondary)'}}>
              My professional journey from education to enterprise-level development
            </p>
            <div className="w-20 h-1 mx-auto mt-4" style={{backgroundColor: 'var(--apple-blue)'}}></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="relative">
                <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5" style={{backgroundColor: 'var(--apple-gray-4)'}}></div>
                <div className="space-y-6 md:space-y-8">

                {/* Ensmart Teknoloji - Apple Style */}
                <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative z-10" style={{backgroundColor: 'var(--apple-blue)'}}>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="ml-4 md:ml-6 p-4 md:p-6 rounded-xl shadow-sm border flex-1" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold" style={{color: 'var(--apple-text-primary)'}}>
                        Yazılım Geliştiricisi, Ensmart Teknoloji
                        </h3>
                        <span className="text-sm font-medium" style={{color: 'var(--apple-blue)'}}>
                        02/2025 – Devam ediyor
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--apple-text-secondary)'}}>
                        MES sistemi tasarımı ve geliştirmesi, Logo Tiger entegrasyonu, çoklu üretim bant yönetimi ve kurumsal IT destek süreçlerinde aktif görev alıyorum.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag">Python</span>
                        <span className="tag">SQL</span>
                        <span className="tag">Logo Tiger</span>
                        <span className="tag">MES</span>
                    </div>
                    </div>
                </div>

                {/* Meyer - Apple Style */}
                <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative z-10" style={{backgroundColor: 'var(--apple-gray)'}}>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="ml-4 md:ml-6 p-4 md:p-6 rounded-xl shadow-sm border flex-1" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold" style={{color: 'var(--apple-text-primary)'}}>
                        SQL Geliştirici ve Destek Uzmanı, Meyer
                        </h3>
                        <span className="text-sm font-medium" style={{color: 'var(--apple-text-secondary)'}}>
                        01/2025 – 02/2025
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--apple-text-secondary)'}}>
                        SQL sorguları, stored procedure&apos;ler geliştirdim ve veri tabanı yönetimi, optimizasyonları ile teknik destek sağladım.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag">SQL</span>
                        <span className="tag">Stored Procedure</span>
                        <span className="tag">Database</span>
                        <span className="tag">Support</span>
                    </div>
                    </div>
                </div>

                {/* Kocaeli İSU - Apple Style */}
                <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative z-10" style={{backgroundColor: 'var(--apple-gray)'}}>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="ml-4 md:ml-6 p-4 md:p-6 rounded-xl shadow-sm border flex-1" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold" style={{color: 'var(--apple-text-primary)'}}>
                        IT Stajyeri, Kocaeli İSU Genel Müdürlüğü
                        </h3>
                        <span className="text-sm font-medium" style={{color: 'var(--apple-text-secondary)'}}>
                        08/2024 – 09/2024
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--apple-text-secondary)'}}>
                        Fiziksel ağ kurulumu, C# ile IP tarayıcı geliştirme ve Python/YOLOv3 kullanarak nesne tanıma tabanlı güvenlik kamerası sistemi oluşturma.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag">C#</span>
                        <span className="tag">Python</span>
                        <span className="tag">YOLOv3</span>
                        <span className="tag">Networking</span>
                    </div>
                    </div>
                </div>

                {/* TÜBİTAK - Apple Style */}
                <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative z-10" style={{backgroundColor: 'var(--apple-gray)'}}>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="ml-4 md:ml-6 p-4 md:p-6 rounded-xl shadow-sm border flex-1" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold" style={{color: 'var(--apple-text-primary)'}}>
                        Yazılım Geliştirme Stajyeri, TÜBİTAK BİLGEM SGE
                        </h3>
                        <span className="text-sm font-medium" style={{color: 'var(--apple-text-secondary)'}}>
                        06/2023 – 08/2023
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--apple-text-secondary)'}}>
                        Spring Boot ile RESTful API geliştirdim, React.js ile ön yüz tasarımı yaptım ve PostgreSQL üzerinde veri modelleme deneyimi kazandım.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag">Spring Boot</span>
                        <span className="tag">React.js</span>
                        <span className="tag">PostgreSQL</span>
                        <span className="tag">REST API</span>
                    </div>
                    </div>
                </div>

                </div>
            </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="p-6 rounded-xl shadow-sm border" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                <h3 className="text-base md:text-lg font-semibold mb-4" style={{color: 'var(--apple-text-primary)'}}>Connect</h3>
                <div className="space-y-3">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 transition-colors group"
                    style={{color: 'var(--apple-blue)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--apple-blue-dark)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--apple-blue)'}
                  >
                    <span>→</span>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 transition-colors group"
                    style={{color: 'var(--apple-text-secondary)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--apple-text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--apple-text-secondary)'}
                  >
                    <span>→</span>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
              
              <div className="p-6 rounded-xl shadow-sm border" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
                <h3 className="text-base md:text-lg font-semibold mb-4" style={{color: 'var(--apple-text-primary)'}}>Current Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: 'var(--apple-green)'}}></div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Available for work</div>
                      <div className="text-xs" style={{color: 'var(--apple-text-secondary)'}}>Open to new opportunities</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--apple-blue)'}}></div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Full Stack Development</div>
                      <div className="text-xs" style={{color: 'var(--apple-text-secondary)'}}>Current focus area</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--apple-purple)'}}></div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Istanbul, Turkey</div>
                      <div className="text-xs" style={{color: 'var(--apple-text-secondary)'}}>Based in Çekmekoy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Apple Tech Stack */}
      <section id="skills" className="py-12 md:py-20" style={{backgroundColor: 'var(--apple-bg-secondary)'}} ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--apple-text-primary)'}}>
              Tech Stack
            </h2>
            <p className="max-w-2xl mx-auto" style={{color: 'var(--apple-text-secondary)'}}>
              Here are my tech stack and tools I work with
            </p>
            <div className="w-20 h-1 mx-auto mt-4" style={{backgroundColor: 'var(--apple-blue)'}}></div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-5">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-3 rounded-lg hover:shadow-md transition-all duration-200 border"
                style={{
                  backgroundColor: 'var(--apple-bg-primary)',
                  borderColor: 'var(--apple-gray-4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--apple-bg-secondary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--apple-bg-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className={`mb-1 ${skill.color} group-hover:scale-110 transition-transform duration-200`}>
                  {skill.icon}
                </div>
                <span className="text-xs font-medium text-center" style={{color: 'var(--apple-text-primary)'}}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Apple Style */}
      <section id="projects" className="py-12 md:py-20" style={{backgroundColor: 'var(--apple-bg-primary)'}} ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--apple-text-primary)'}}>
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{color: 'var(--apple-text-secondary)'}}>
              A showcase of applications and solutions I&apos;ve built with passion and precision
            </p>
            <div className="w-20 h-1 mx-auto mt-4" style={{backgroundColor: 'var(--apple-blue)'}}></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium" style={{backgroundColor: 'var(--apple-blue-light)', color: 'var(--apple-blue)'}}>
                    {project.category}
                  </div>
                  <div className="font-mono text-xs md:text-sm" style={{color: 'var(--apple-text-tertiary)'}}>
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{color: 'var(--apple-text-primary)'}}>
                  {project.title}
                </h3>
                
                <p className="mb-3 md:mb-4 text-xs md:text-sm leading-relaxed" style={{color: 'var(--apple-text-secondary)'}}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{backgroundColor: 'var(--apple-bg-secondary)', color: 'var(--apple-text-primary)'}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3 md:space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm transition-colors group"
                    style={{color: 'var(--apple-text-secondary)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--apple-text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--apple-text-secondary)'}
                  >
                    <span className="group-hover:scale-110 transition-transform">→</span>
                    <span>Source Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm transition-colors group"
                    style={{color: 'var(--apple-blue)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--apple-blue-dark)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--apple-blue)'}
                  >
                    <span className="group-hover:scale-110 transition-transform">↗</span>
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Apple Professional */}
      <section id="contact" className="py-16 md:py-24" style={{background: 'linear-gradient(to bottom right, var(--apple-bg-primary), var(--apple-bg-secondary))'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--apple-text-primary)'}}>
              Let&apos;s Work Together
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--apple-text-secondary)'}}>
              Ready to bring your next project to life? Let&apos;s discuss how we can collaborate.
            </p>
            <div className="w-20 h-1 mx-auto mt-6" style={{backgroundColor: 'var(--apple-blue)'}}></div>
          </div>
          
          {/* Professional Contact Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Card */}
            <div className="lg:col-span-2 rounded-2xl shadow-lg border p-8" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{backgroundColor: 'var(--apple-blue)'}}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold" style={{color: 'var(--apple-text-primary)'}}>Contact Information</h3>
                  <p style={{color: 'var(--apple-text-secondary)'}}>Preferred methods of communication</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-blue-light)'}}>
                      <Mail className="w-5 h-5" style={{color: 'var(--apple-blue)'}} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Email</div>
                      <a href="mailto:mrertas12@gmail.com" className="transition-colors" style={{color: 'var(--apple-blue)'}}>
                        mrertas12@gmail.com
                      </a>
                      <div className="text-xs mt-1" style={{color: 'var(--apple-text-tertiary)'}}>Response within 24 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-green-light)'}}>
                      <Phone className="w-5 h-5" style={{color: 'var(--apple-green)'}} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Phone</div>
                      <a href="tel:+905447452012" className="transition-colors" style={{color: 'var(--apple-green)'}}>
                        +90 544 745 2012
                      </a>
                      <div className="text-xs mt-1" style={{color: 'var(--apple-text-tertiary)'}}>Available 9 AM - 6 PM (UTC+3)</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-purple-light)'}}>
                      <MapPin className="w-5 h-5" style={{color: 'var(--apple-purple)'}} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Location</div>
                      <div style={{color: 'var(--apple-text-secondary)'}}>Çekmekoy, Istanbul</div>
                      <div className="text-xs mt-1" style={{color: 'var(--apple-text-tertiary)'}}>Open to remote work</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-orange-light)'}}>
                      <Clock className="w-5 h-5" style={{color: 'var(--apple-orange)'}} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{color: 'var(--apple-text-primary)'}}>Availability</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--apple-green)'}}></div>
                        <span className="text-sm" style={{color: 'var(--apple-green)'}}>Available for new projects</span>
                      </div>
                      <div className="text-xs mt-1" style={{color: 'var(--apple-text-tertiary)'}}>Starting February 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Links Card */}
            <div className="rounded-2xl shadow-lg border p-8" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{backgroundColor: 'var(--apple-gray)'}}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold" style={{color: 'var(--apple-text-primary)'}}>Professional</h3>
                  <p style={{color: 'var(--apple-text-secondary)'}}>Connect with me</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href="https://linkedin.com/in/ömerfarukertaş"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl border hover:shadow-md transition-all duration-200 group"
                  style={{borderColor: 'var(--apple-blue-light)'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--apple-blue-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-blue)'}}>
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{color: 'var(--apple-text-primary)'}}>LinkedIn</div>
                    <div className="text-sm" style={{color: 'var(--apple-text-secondary)'}}>Professional network</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{color: 'var(--apple-blue)'}} />
                </a>
                
                <a
                  href="https://github.com/omerfark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl border hover:shadow-md transition-all duration-200 group"
                  style={{borderColor: 'var(--apple-gray-4)'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--apple-bg-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--apple-gray)'}}>
                    <GitBranch className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{color: 'var(--apple-text-primary)'}}>GitHub</div>
                    <div className="text-sm" style={{color: 'var(--apple-text-secondary)'}}>Source code & projects</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{color: 'var(--apple-text-secondary)'}} />
                </a>
                
                <div className="pt-4 border-t" style={{borderColor: 'var(--apple-gray-4)'}}>
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1" style={{color: 'var(--apple-text-primary)'}}>Response Time</div>
                    <div className="text-xs" style={{color: 'var(--apple-text-tertiary)'}}>Usually responds within a few hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action - Apple Style */}
          <div className="text-center rounded-2xl shadow-lg border p-8" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
            <h3 className="text-2xl font-semibold mb-4" style={{color: 'var(--apple-text-primary)'}}>
              Ready to Start Your Next Project?
            </h3>
            <p className="mb-6 max-w-2xl mx-auto" style={{color: 'var(--apple-text-secondary)'}}>
              Whether you need a full-stack web application, MES system integration, or technical consultation, 
              I&apos;m here to help bring your ideas to life with modern technologies and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:mrertas12@gmail.com?subject=Project Inquiry&body=Hello Ömer, I'd like to discuss a project opportunity..."
                className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                style={{backgroundColor: 'var(--apple-blue)', color: 'white'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--apple-blue-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--apple-blue)'}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </a>
              <a
                href="https://linkedin.com/in/ömerfarukertaş"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                style={{borderColor: 'var(--apple-gray-4)', color: 'var(--apple-text-primary)'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--apple-bg-secondary)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="border-t py-8" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background: 'linear-gradient(135deg, var(--apple-blue), var(--apple-purple))'}}>
                ÖFE
              </div>
              <span className="font-semibold" style={{color: 'var(--apple-text-primary)'}}>Ömer Faruk Ertaş</span>
            </div>
            <div className="text-sm" style={{color: 'var(--apple-text-secondary)'}}>
              © 2024 Full Stack Developer
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Indicator - Apple Style */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="p-2 rounded-full shadow-lg flex items-center justify-center" style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)', border: '1px solid'}}>
          <span className="text-xs font-medium" style={{color: 'var(--apple-text-primary)'}}>{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Scroll to Top Button - Apple Style */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          style={{backgroundColor: 'var(--apple-bg-primary)', borderColor: 'var(--apple-gray-4)', border: '1px solid'}}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" style={{color: 'var(--apple-text-secondary)'}} />
        </button>
      )}
    </div>
  );
}
