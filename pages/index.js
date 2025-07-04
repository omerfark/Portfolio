import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
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

    return () => {
      clearInterval(typeTimer);
      clearInterval(timeInterval);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    [aboutRef, skillsRef, projectsRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Projects data with tech focus
  const projects = [
    {
      title: "Enterprise Web Automation Suite",
      description: "Selenium ve Python kullanarak kurumsal web süreçlerinin otomasyonu, veri toplama ve raporlama sistemi",
      tech: ["Python", "Selenium", "PostgreSQL", "Django", "Redis"],
      github: "https://github.com/omerfark/enterprise-automation",
      demo: "#",
      category: "Backend & Automation"
    },
    {
      title: "Microservices API Gateway",
      description: "Node.js ve Express ile mikroservis mimarisi, load balancing ve API rate limiting",
      tech: ["Node.js", "Express", "MongoDB", "Docker", "Nginx"],
      github: "https://github.com/omerfark/api-gateway",
      demo: "#",
      category: "Backend Architecture"
    },
    {
      title: "Industrial IoT Management Platform",
      description: "Endüstriyel IoT cihazları için C# .NET Core ile geliştirilmiş gerçek zamanlı izleme sistemi",
      tech: ["C#", ".NET Core", "SQL Server", "SignalR", "Angular"],
      github: "https://github.com/omerfark/iot-platform",
      demo: "#",
      category: "Full Stack"
    },
    {
      title: "ML Data Analytics Pipeline",
      description: "Python TensorFlow ile büyük veri analizi, makine öğrenmesi modelleri ve prediction API'ları",
      tech: ["Python", "TensorFlow", "Pandas", "FastAPI", "Docker"],
      github: "https://github.com/omerfark/ml-pipeline",
      demo: "#",
      category: "Machine Learning"
    },
    {
      title: "Real-time Monitoring Dashboard",
      description: "React ve WebSocket teknolojisi ile sistem metrikleri ve performans izleme dashboard'u",
      tech: ["React", "Socket.io", "Node.js", "InfluxDB", "Grafana"],
      github: "https://github.com/omerfark/monitoring-dashboard",
      demo: "#",
      category: "Frontend & DevOps"
    },
    {
      title: "Cloud Infrastructure Manager",
      description: "AWS ve Docker Container yönetimi için geliştirilmiş infrastructure automation tool",
      tech: ["Python", "AWS", "Docker", "Terraform", "Kubernetes"],
      github: "https://github.com/omerfark/cloud-manager",
      demo: "#",
      category: "DevOps & Cloud"
    }
  ];

  const skillCategories = [
    { 
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Python", level: 95, color: "bg-yellow-500" },
        { name: "C#/.NET", level: 90, color: "bg-purple-500" },
        { name: "Java", level: 85, color: "bg-red-500" },
        { name: "Node.js", level: 88, color: "bg-green-500" },
        { name: "Django", level: 92, color: "bg-emerald-600" },
        { name: "Express.js", level: 85, color: "bg-gray-600" }
      ]
    },
    { 
      title: "Frontend & UI",
      icon: "💻",
      skills: [
        { name: "JavaScript", level: 92, color: "bg-yellow-400" },
        { name: "React", level: 88, color: "bg-blue-500" },
        { name: "Next.js", level: 85, color: "bg-gray-800" },
        { name: "Angular", level: 80, color: "bg-red-600" },
        { name: "HTML5/CSS3", level: 95, color: "bg-orange-500" },
        { name: "Tailwind CSS", level: 90, color: "bg-cyan-500" }
      ]
    },
    { 
      title: "Database & Storage",
      icon: "🗄️",
      skills: [
        { name: "PostgreSQL", level: 90, color: "bg-blue-600" },
        { name: "SQL Server", level: 88, color: "bg-red-500" },
        { name: "MongoDB", level: 85, color: "bg-green-600" },
        { name: "Redis", level: 82, color: "bg-red-400" },
        { name: "MySQL", level: 87, color: "bg-orange-600" }
      ]
    },
    { 
      title: "DevOps & Tools",
      icon: "🔧",
      skills: [
        { name: "Docker", level: 85, color: "bg-blue-500" },
        { name: "Git/GitHub", level: 95, color: "bg-gray-700" },
        { name: "Linux/Unix", level: 88, color: "bg-yellow-600" },
        { name: "AWS", level: 80, color: "bg-orange-500" },
        { name: "CI/CD", level: 82, color: "bg-purple-500" }
      ]
    }
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      {/* Header/Navigation - Now integrated in page */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
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
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'About', id: 'about', icon: '</>' },
                { name: 'Skills', id: 'skills', icon: '{}' },
                { name: 'Projects', id: 'projects', icon: '[]' },
                { name: 'Contact', id: 'contact', icon: '()' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-mono"
                >
                  <span className="text-blue-500">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500 font-mono">Online</span>
            </div>
          </div>
        </div>
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">5+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">50+</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>
            </div>

            {/* Right side - Profile */}
            <div className="text-center md:text-left">
              <div className="mb-8">
                <div className="w-40 h-40 mx-auto md:mx-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold shadow-xl transform hover:scale-105 transition-transform duration-300">
                  ÖFE
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ömer Faruk Ertaş
              </h1>
              
              <div className="text-xl text-blue-400 mb-6 font-mono">
                &lt;/&gt; Full Stack Developer
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
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
      <section id="about" className="py-20 bg-white dark:bg-gray-900" ref={aboutRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">&lt;</span>
              About Me
              <span className="text-blue-600 font-mono">/&gt;</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-3">💼</span>
                  Professional Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Python, JavaScript, C#, Java ve SQL teknolojileriyle geniş bir teknik deneyime sahibim. 
                  Enterprise seviyesinde web otomasyonu, REST API geliştirme, frontend teknolojileri, 
                  makine öğrenmesi ve endüstriyel üretim takibi sistemleri üzerinde uygulamalı projeler geliştirdim.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Technical Leadership
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Çeşitli sektörlerde kazandığım deneyimle yalnızca kodlama değil, aynı zamanda sistem kurulumu, 
                  IT destek ve ağ yönetimi alanlarında da aktif roller üstlendim. Full-stack çözümler geliştirme 
                  konusunda uzmanlaştım.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Future Goals
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Kariyerimde sürekli öğrenmeyi ve modern yazılım mimarilerini araştırarak üretim, 
                  otomasyon ve veri odaklı projelerde uzmanlaşmayı hedefliyorum. Teknoloji liderliği 
                  sorumlulukları alarak büyük ölçekli yazılım projelerinde stratejik katkılar sunmayı amaçlıyorum.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
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
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Currently</h3>
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
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">{"{"}</span>
              Technical Skills
              <span className="text-blue-600 font-mono">{"}"}</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 font-mono">
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
      <section id="projects" className="py-20 bg-white dark:bg-gray-900" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">[</span>
              Projects
              <span className="text-blue-600 font-mono">]</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enterprise-level applications and innovative solutions I've developed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                  >
                    <span>⚡</span>
                    <span>Source</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
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
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 font-mono">(</span>
              Contact
              <span className="text-blue-600 font-mono">)</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">📧</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <a href="mailto:mrertas12@gmail.com" className="text-blue-600 hover:text-blue-800">
                        mrertas12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">📱</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <a href="tel:+905447452012" className="text-green-600 hover:text-green-800">
                        +90 544 745 2012
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">📍</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <span className="text-gray-600 dark:text-gray-300">Çekmekoy, Istanbul</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Professional Links
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://linkedin.com/in/ömerfarukertaş"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white">🔗</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                      <div className="text-sm text-gray-500">Professional Network</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://github.com/omerfark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-white">⚡</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                      <div className="text-sm text-gray-500">Source Code & Projects</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gray-800 inline-block px-6 py-3 rounded-lg mb-6">
              <div className="font-mono text-green-400">
                <span className="text-gray-500">~/</span>
                <span>portfolio</span>
                <span className="text-blue-400">$</span>
                <span className="text-white ml-2">echo "Thanks for visiting!"</span>
              </div>
            </div>
            <div className="text-gray-400 mb-4">
              © 2024 Ömer Faruk Ertaş - Full Stack Developer
            </div>
            <div className="text-sm text-gray-500">
              Built with Next.js, Tailwind CSS, and passion for clean code
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
