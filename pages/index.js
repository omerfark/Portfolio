import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { 
  Menu, 
  X, 
  Code, 
  Database, 
  Globe, 
  Server, 
  Terminal, 
  Settings, 
  Cloud, 
  GitBranch, 
  Layers, 
  Cpu, 
  Monitor, 
  Smartphone, 
  FileCode, 
  Box
} from "lucide-react";


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
  const [active, setActive] = useState('about');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);


  
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
            if (sectionId && ['about', 'skills', 'projects', 'contact'].includes(sectionId)) {
              setActive(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [aboutRef, skillsRef, projectsRef].forEach(ref => {
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
  

  const skills = [
    { name: "Python", icon: <Code className="w-6 h-6" />, color: "text-blue-500" },
    { name: "JavaScript", icon: <FileCode className="w-6 h-6" />, color: "text-yellow-500" },
    { name: "TypeScript", icon: <Code className="w-6 h-6" />, color: "text-blue-600" },
    { name: "React", icon: <Globe className="w-6 h-6" />, color: "text-cyan-500" },
    { name: "Next.js", icon: <Monitor className="w-6 h-6" />, color: "text-gray-900" },
    { name: "Node.js", icon: <Server className="w-6 h-6" />, color: "text-green-500" },
    { name: "C#", icon: <Code className="w-6 h-6" />, color: "text-purple-600" },
    { name: "Java", icon: <Cpu className="w-6 h-6" />, color: "text-red-600" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, color: "text-blue-600" },
    { name: "MongoDB", icon: <Database className="w-6 h-6" />, color: "text-green-500" },
    { name: "MySQL", icon: <Database className="w-6 h-6" />, color: "text-blue-500" },
    { name: "Docker", icon: <Box className="w-6 h-6" />, color: "text-blue-400" },
    { name: "Git", icon: <GitBranch className="w-6 h-6" />, color: "text-orange-600" },
    { name: "Linux", icon: <Terminal className="w-6 h-6" />, color: "text-yellow-600" },
    { name: "Tailwind", icon: <Layers className="w-6 h-6" />, color: "text-teal-500" },
    { name: "Cloud", icon: <Cloud className="w-6 h-6" />, color: "text-gray-600" }
  ];
  

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      {/* Header/Navigation - Now integrated in page */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo/Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ÖFE
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-900 dark:text-white">Ömer Faruk Ertaş</div>
                <div className="text-xs text-gray-500">Full Stack Developer</div>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'Experience', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setActive(item.id);
                  }}
                  className={`relative px-3 py-2 font-medium transition-all duration-200 ${
                    active === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {active === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
                      </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 absolute top-full left-0 right-0 z-50 shadow-lg">
              <nav className="px-4 py-4">
                <div className="flex flex-col space-y-2">
                  {[
                    { id: 'about', label: 'Experience' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'contact', label: 'Contact' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </header>

      {/* Hero Section - Professional */}
      <section id="hero" className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                ÖFE
              </div>
            </div>
            
            {/* Main Content */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Ömer Faruk Ertaş
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Full Stack Developer
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              İstanbul merkezli Full Stack Developer. Python, JavaScript, C# ve modern teknolojilerle enterprise seviyesinde 
              yazılım çözümleri geliştiriyorum. Web otomasyonu, veri analizi ve sistem entegrasyonu konularında uzmanım.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">2+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">12+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800" ref={aboutRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey from education to enterprise-level development
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
                             {/* Timeline */}
               <div className="relative">
                 {/* Timeline Line */}
                 <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                 
                 <div className="space-y-6 md:space-y-8">
                   {/* Current Position */}
                   <div className="relative flex items-start">
                     <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                       <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                     </div>
                     <div className="ml-4 md:ml-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Full Stack Developer
                        </h3>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          2023 - Present
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        Enterprise seviyesinde web uygulamaları ve otomasyon sistemleri geliştiriyorum. 
                        Python, JavaScript, C# teknolojileriyle REST API&apos;ler, mikroservis mimarileri ve 
                        modern frontend uygulamaları tasarlıyorum.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">Python</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">React</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">Node.js</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">Docker</span>
                      </div>
                    </div>
                  </div>

                                     {/* Previous Position */}
                   <div className="relative flex items-start">
                     <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center relative z-10">
                       <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                     </div>
                     <div className="ml-4 md:ml-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          System Administrator & IT Support
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          2022 - 2023
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        Linux sunucu yönetimi, ağ altyapısı kurulumu ve sistem otomasyonu konularında 
                        deneyim kazandım. Virtualization teknolojileri ve CI/CD süreçleri üzerinde çalıştım.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">Linux</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">Bash</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">Networking</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">VMware</span>
                      </div>
                    </div>
                  </div>

                                     {/* Education/Early Career */}
                   <div className="relative flex items-start">
                     <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center relative z-10">
                       <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                     </div>
                     <div className="ml-4 md:ml-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Junior Developer & Learning Phase
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          2021 - 2022
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        Programlama temelleri ve web teknolojilerini öğrenerek ilk projelerimi geliştirdim. 
                        Makine öğrenmesi, görüntü işleme ve web otomasyonu konularında deneyim edindim.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">Python</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">OpenCV</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">Selenium</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">ML</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
                <div className="space-y-3">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <span className="text-blue-600 group-hover:text-blue-800">→</span>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors group"
                  >
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">→</span>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Current Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Available for work</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Open to new opportunities</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Full Stack Development</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Current focus area</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Istanbul, Turkey</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Based in Çekmekoy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Tech Stack */}
      <section id="skills" className="py-12 md:py-20 bg-white dark:bg-gray-900" ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are my tech stack and tools I work with
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-5">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className={`mb-1 ${skill.color} group-hover:scale-110 transition-transform duration-200`}>
                  {skill.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of applications and solutions I&apos;ve built with passion and precision
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                    {project.category}
                  </div>
                  <div className="text-gray-400 font-mono text-xs md:text-sm">
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-mono"
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
                    className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 text-xs md:text-sm transition-colors group"
                  >
                    <span className="group-hover:scale-110 transition-transform">→</span>
                    <span>Source Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 md:space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs md:text-sm transition-colors group"
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

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let&apos;s discuss opportunities, collaborations, or just have a conversation about technology
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-800">
                      <span className="text-blue-600 text-sm font-mono">@</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <a href="mailto:mrertas12@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium break-all transition-colors">
                        mrertas12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-200 dark:border-green-800">
                      <span className="text-green-600 text-sm font-mono">📞</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <a href="tel:+905447452012" className="text-green-600 hover:text-green-800 font-medium transition-colors">
                        +90 544 745 2012
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-200 dark:border-purple-800">
                      <span className="text-purple-600 text-sm font-mono">📍</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">Çekmekoy, Istanbul</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Professional Links
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-mono text-sm">in</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Professional Network</div>
                    </div>
                    <div className="text-blue-600 group-hover:translate-x-1 transition-transform">→</div>
                  </a>
                  
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-mono text-sm">gh</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Source Code & Projects</div>
                    </div>
                    <div className="text-gray-600 group-hover:translate-x-1 transition-transform">→</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ÖFE
              </div>
              <span className="text-gray-900 dark:text-white font-semibold">Ömer Faruk Ertaş</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 Full Stack Developer
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              Built with Next.js & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
