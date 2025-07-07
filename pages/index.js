import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Code, Layers, Box, MessageSquare, Menu, X } from "lucide-react";

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
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  // Terminal-style typing animation
  const commands = [
    "Full Stack Developer",
    "Python & JavaScript Expert", 
    "System Administrator",
    "Problem Solver"
  ];
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('tr-TR'));
    }, 1000);

    // Typing effect for multiple commands
    let index = 0;
    let commandIndex = 0;
    const typeTimer = setInterval(() => {
      const currentCommand = commands[commandIndex];
      if (index < currentCommand.length) {
        setTypedText(currentCommand.slice(0, index + 1));
        index++;
      } else {
        setTimeout(() => {
          setTypedText('');
          index = 0;
          commandIndex = (commandIndex + 1) % commands.length;
          setCurrentCommandIndex(commandIndex);
        }, 2000);
      }
    }, 100);

    // Mobile menu escape key handler
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      clearInterval(typeTimer);
      clearInterval(timeInterval);
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
  

  const skillCategories = [
    { 
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Python", level: 95, color: "bg-yellow-500" },
        { name: "C#/.NET", level: 80, color: "bg-purple-500" },
        { name: "Java (Spring Boot)", level: 75, color: "bg-red-500" },
        { name: "Node.js", level: 75, color: "bg-green-500" }
      ]
    },
    { 
      title: "Frontend & UI",
      icon: "💻",
      skills: [
        { name: "JavaScript", level: 85, color: "bg-yellow-400" },
        { name: "React.js", level: 90, color: "bg-blue-500" },
        { name: "Vue.js", level: 80, color: "bg-green-500" },
        { name: "HTML5/CSS3", level: 90, color: "bg-orange-500" },
        { name: "Tailwind CSS", level: 70, color: "bg-cyan-500" }
      ]
    },
    { 
      title: "Database & Storage",
      icon: "🗄️",
      skills: [
        { name: "PostgreSQL", level: 88, color: "bg-blue-600" },
        { name: "MongoDB", level: 80, color: "bg-green-600" },
        { name: "MySQL", level: 85, color: "bg-orange-600" },
        { name: "SQL Server", level: 75, color: "bg-red-500" },
        { name: "Redis", level: 75, color: "bg-red-400" }
      ]
    },
    { 
      title: "DevOps & Tools",
      icon: "🔧",
      skills: [
        { name: "Docker", level: 75, color: "bg-blue-500" },
        { name: "Git/GitHub", level: 95, color: "bg-gray-700" },
        { name: "Linux/Unix", level: 80, color: "bg-yellow-600" },
        { name: "CI/CD (GitHub Actions)", level: 85, color: "bg-purple-500" }
      ]
    }
  ];
  

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      {/* Header/Navigation - Now integrated in page */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo/Name with terminal style */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 dark:bg-gray-700 text-green-400 px-4 py-2 rounded-lg font-mono text-sm">
                <span className="text-gray-500">~/</span>
                <span className="text-white">omer-ertas</span>
                <span className="text-green-400 animate-pulse">$</span>
              </div>
              <div className="hidden md:block text-sm text-gray-500 font-mono">
                Last login: {currentTime}
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-6">
              {[
                { name: 'About', id: 'about', icon: <Code size={16} /> },
                { name: 'Skills', id: 'skills', icon: <Layers size={16} /> },
                { name: 'Projects', id: 'projects', icon: <Box size={16} /> },
                { name: 'Contact', id: 'contact', icon: <MessageSquare size={16} /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setActive(item.id);
                  }}
                  className={`group flex items-center space-x-2 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 ${
                    active === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="border border-blue-500 rounded p-1 group-hover:bg-blue-500 group-hover:text-white transition">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Status indicator & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 font-mono">Online</span>
              </div>
              
              {/* Mobile Menu Button */}
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
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 absolute top-full left-0 right-0 z-50">
              <nav className="px-4 py-4">
                <div className="flex flex-col space-y-3">
                  {[
                    { id: 'about', label: 'About', icon: Code },
                    { id: 'skills', label: 'Skills', icon: Layers },
                    { id: 'projects', label: 'Projects', icon: Box },
                    { id: 'contact', label: 'Contact', icon: MessageSquare }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>
          )}
        </header>

      {/* Hero Section - Terminal Style */}
      <section id="hero" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Code pattern background */}
        <div className="absolute inset-0 opacity-10">
          <pre className="text-xs text-green-400 leading-relaxed p-8 font-mono">
{`function fullStackDeveloper() {
  const skills = ['Python', 'JavaScript', 'C#', 'Java'];
  const experience = 'Enterprise Solutions';
  const passion = 'Problem Solving';
  
  return {
    role: 'Full Stack Developer',
    location: 'Istanbul, Turkey',
    availability: 'Open to opportunities',
    focus: 'Innovation & Quality'
  };
}`}
          </pre>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Terminal */}
            <div className="space-y-8">
              {/* Terminal Window */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-700 rounded-t-lg">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-300 text-sm font-mono">terminal</div>
                  <div></div>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-green-400">
                    <span className="text-gray-500">omer@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~/developer</span>
                    <span className="text-white">$ </span>
                    <span>whoami</span>
                  </div>
                  <div className="text-white pl-0">
                    <div className="text-cyan-400">Name: Ömer Faruk Ertaş</div>
                    <div className="text-yellow-400">Role: {typedText}<span className="animate-pulse">|</span></div>
                    <div className="text-green-400">Status: Available for hire</div>
                    <div className="text-purple-400">Location: Çekmekoy, Istanbul</div>
                  </div>
                  <div className="text-green-400">
                    <span className="text-gray-500">omer@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~/developer</span>
                    <span className="text-white">$ </span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">2+</div>
                  <div className="text-xs sm:text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-400">10+</div>
                  <div className="text-xs sm:text-sm text-gray-300">Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">12+</div>
                <div className="text-xs sm:text-sm text-gray-300">Teknoloji Yetkinliği</div>
            </div>
              </div>
            </div>

            {/* Right side - Profile */}
            <div className="text-center md:text-left order-first md:order-last">
              <div className="mb-6 md:mb-8">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto md:mx-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-xl transform hover:scale-105 transition-transform duration-300">
                  ÖFE
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ömer Faruk Ertaş
              </h1>
              
              <div className="text-lg sm:text-xl text-blue-400 mb-6 font-mono">
                &lt;/&gt; Full Stack Developer
              </div>
              
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
                Enterprise seviyesinde yazılım çözümleri geliştiren, problem çözme odaklı 
                full stack developer. Python, JavaScript, C# ve modern teknolojilerle 
                ölçeklenebilir sistemler tasarlıyorum.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>📁</span>
                  <span>View Projects</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>📧</span>
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-white dark:bg-gray-900" ref={aboutRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">&lt;</span>
              About Me
              <span className="text-blue-600 font-mono">/&gt;</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Professional Experience */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="text-xl md:text-2xl mr-3">💼</span>
                    Professional Experience
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Python, JavaScript, C#, Java ve SQL gibi farklı teknolojilerle backend ve frontend geliştirme deneyimine sahibim. 
                    Web otomasyonu, REST API tasarımı, makine öğrenmesi entegrasyonu ve üretim takibi çözümleri üzerine çeşitli projelerde aktif rol aldım. 
                    Docker, Linux sunucu yönetimi ve CI/CD süreçleri gibi modern yazılım pratiklerini projelerime entegre ettim.
                </p>
              </div>
              
              {/* Technical Leadership */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="text-xl md:text-2xl mr-3">🚀</span>
                    Technical Leadership
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Full-stack yazılım geliştirme, veri tabanı tasarımı, container mimarisi ve sistem otomasyonu konularında uygulamalı deneyim kazandım. 
                    Projelerimde altyapı kurulumundan canlıya alma süreçlerine kadar uçtan uca sorumluluk aldım. 
                    Ayrıca IT destek, sanallaştırma ve ağ yönetimi gibi disiplinlerde de aktif görevler üstlendim.
                </p>
              </div>
              
              {/* Future Goals */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="text-xl md:text-2xl mr-3">🎯</span>
                    Future Goals
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Üretim, otomasyon ve veri odaklı çözümler geliştirmede derinleşerek teknoloji liderliği sorumlulukları üstlenmeyi hedefliyorum. 
                    Modern yazılım mimarileri üzerine uzmanlaşarak büyük ölçekli projelerde stratejik katkı sağlamak ve yenilikçi uygulamalar üretmek önceliklerim arasında yer alıyor.
                </p>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
                <div className="space-y-3">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>🔗</span>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  >
                    <span>⚡</span>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Currently</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="text-green-500 font-medium">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Focus</span>
                    <span className="text-blue-500 font-medium">Full Stack</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location</span>
                    <span className="text-gray-500 font-medium">Istanbul, TR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Progress Bars */}
      <section id="skills" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800" ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">{"{"}</span>
              Technical Skills
              <span className="text-blue-600 font-mono">{"}"}</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-900 dark:text-white flex items-center">
                  <span className="text-xl md:text-2xl mr-3">{category.icon}</span>
                  {category.title}
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1 md:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 bg-white dark:bg-gray-900" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">[</span>
              Projects
              <span className="text-blue-600 font-mono">]</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enterprise-level applications and innovative solutions I&apos;ve developed
            </p>
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
                    className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 text-xs md:text-sm"
                  >
                    <span>⚡</span>
                    <span>Source</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 md:space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs md:text-sm"
                  >
                    <span>🚀</span>
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">(</span>
              Contact
              <span className="text-blue-600 font-mono">)</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm md:text-base">📧</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs md:text-sm text-gray-500">Email</div>
                      <a href="mailto:mrertas12@gmail.com" className="text-blue-600 hover:text-blue-800 text-sm md:text-base break-all">
                        mrertas12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm md:text-base">📱</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs md:text-sm text-gray-500">Phone</div>
                      <a href="tel:+905447452012" className="text-green-600 hover:text-green-800 text-sm md:text-base">
                        +90 544 745 2012
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-sm md:text-base">📍</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs md:text-sm text-gray-500">Location</div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Çekmekoy, Istanbul</span>
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
                <div className="space-y-3 md:space-y-4">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm md:text-base">🔗</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">LinkedIn</div>
                      <div className="text-xs md:text-sm text-gray-500">Professional Network</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm md:text-base">⚡</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">GitHub</div>
                      <div className="text-xs md:text-sm text-gray-500">Source Code & Projects</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gray-800 inline-block px-3 md:px-6 py-2 md:py-3 rounded-lg mb-4 md:mb-6 max-w-full">
              <div className="font-mono text-green-400 text-xs sm:text-sm md:text-base overflow-x-auto">
                <span className="text-gray-500">~/</span>
                <span>portfolio</span>
                <span className="text-blue-400">$</span>
                <span className="text-white ml-1 md:ml-2">echo &quot;Thanks for visiting!&quot;</span>
              </div>
            </div>
            <div className="text-gray-400 mb-4 text-xs sm:text-sm">
              © 2024 Ömer Faruk Ertaş - Full Stack Developer
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
