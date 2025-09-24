import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, TrendingUp, Award, Building2, GraduationCap, 
  Briefcase, ChevronRight, Star, ArrowRight, Mail, Phone, 
  MapPin, Check, Quote, Play, Target, Shield, Zap, Eye 
} from 'lucide-react';
import AIChatAssistant from '../components/ui/AIChatAssistant';

const HomePage = () => {
  const [stats, setStats] = useState({
    institutions: 0,
    users: 0,
    opportunities: 0,
    success: 0
  });

  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const animateStats = () => {
      const targets = {
        institutions: 250,
        users: 89000,
        opportunities: 15000,
        success: 95
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          institutions: Math.floor(targets.institutions * progress),
          users: Math.floor(targets.users * progress),
          opportunities: Math.floor(targets.opportunities * progress),
          success: Math.floor(targets.success * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            if (entry.target.id === 'impact') {
              animateStats();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Tech Innovations Inc.",
      text: "EduConnect transformed my career journey. The alumni network and mentorship opportunities opened doors I never thought possible. Within 6 months, I landed my dream job!"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Professor & Department Head",
      company: "IIT Delhi",
      text: "As an educator, EduConnect has revolutionized how I connect with students and industry partners. The platform bridges the gap between academia and real-world applications."
    },
    {
      name: "Sarah Chen",
      role: "Global Talent Acquisition Lead",
      company: "Microsoft",
      text: "EduConnect is our go-to platform for campus recruitment. The quality of candidates and the streamlined process has improved our hiring efficiency by 300%."
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = (id) => isVisible[id] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-sm z-50 border-b border-gray-100/50">
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  EduConnect
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Features</a>
                <a href="#impact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Impact</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">About</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Testimonials</a>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-10 w-10 h-10 sm:w-12 sm:h-12 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '4s'}}></div>
        
        <div className="relative w-full max-w-none mx-auto text-center">
          <div className="w-full mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Trusted by 250+ Institutions
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Connecting the Entire
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                Education Ecosystem
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              EduConnect bridges the gap between <strong>Students, Alumni, Faculty, Recruiters,</strong> and 
              Educational Institutes. Foster meaningful connections and accelerate your career growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/register"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
              >
                Join EduConnect Today
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="group border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
              >
                Already a Member?
                <span className="ml-2 text-sm opacity-70">Sign In</span>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Secure & Trusted
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                89,000+ Active Users
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-500" />
                95% Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className={`py-12 sm:py-16 bg-white transition-all duration-1000 w-full ${fadeInUp('impact')}`}>
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transforming education through meaningful connections and innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {stats.institutions}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Partner Institutions</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Active Users</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {stats.opportunities.toLocaleString()}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Job Opportunities</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {stats.success}%
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Placement Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-12 sm:py-16 bg-gray-50 transition-all duration-1000 w-full ${fadeInUp('features')}`}>
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Everyone in Education</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed for different roles in the education ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: GraduationCap,
                title: "For Students",
                description: "Access study materials, track grades, connect with alumni, and discover job opportunities.",
                features: ["Academic Progress Tracking", "Alumni Mentorship", "Job & Internship Portal", "Study Materials Access"],
                color: "blue",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "For Alumni",
                description: "Stay connected with your alma mater, mentor students, and expand your professional network.",
                features: ["Mentorship Programs", "Networking Events", "Career Opportunities", "Alumni Directory"],
                color: "green",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: BookOpen,
                title: "For Faculty",
                description: "Manage courses, connect with industry, and collaborate with colleagues worldwide.",
                features: ["Course Management", "Industry Partnerships", "Research Collaboration", "Student Analytics"],
                color: "purple",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: Briefcase,
                title: "For Recruiters",
                description: "Connect with top talent, post opportunities, and streamline recruitment processes.",
                features: ["Talent Discovery", "Campus Recruitment", "Application Management", "Skill Assessment"],
                color: "orange",
                gradient: "from-orange-500 to-orange-600"
              },
              {
                icon: Building2,
                title: "For Institutes",
                description: "Manage your institution effectively, track performance, and enhance outcomes.",
                features: ["Student Management", "Performance Analytics", "Alumni Relations", "Resource Planning"],
                color: "red",
                gradient: "from-red-500 to-red-600"
              },
              {
                icon: Target,
                title: "For Admins",
                description: "Comprehensive oversight and management of the entire educational ecosystem.",
                features: ["System Administration", "User Management", "Analytics Dashboard", "Platform Monitoring"],
                color: "indigo",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Check className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 text-${feature.color}-500 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-12 sm:py-16 bg-white transition-all duration-1000 w-full ${fadeInUp('about')}`}>
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">About EduConnect</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                EduConnect creates meaningful connections in the education ecosystem. We bridge gaps 
                between students and alumni, faculty and industry, institutions and talent - fostering 
                growth, innovation, and success for everyone involved.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Users, title: "Community", description: "Connect with like-minded professionals", color: "blue" },
                  { icon: Shield, title: "Secure & Reliable", description: "Enterprise-grade security for your data", color: "green" },
                  { icon: Zap, title: "Easy to Use", description: "Intuitive interface designed for everyone", color: "purple" },
                  { icon: TrendingUp, title: "Proven Results", description: "Track record of measurable success", color: "orange" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`w-12 h-12 bg-${benefit.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className={`w-6 h-6 text-${benefit.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-white shadow-2xl">
                  <div className="w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl">
                    <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6" />
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">EduConnect</h3>
                    <p className="text-blue-100 text-base sm:text-lg">Bridging Education</p>
                    <div className="mt-4 sm:mt-6 flex space-x-2">
                      <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`py-12 sm:py-16 bg-gray-50 transition-all duration-1000 w-full ${fadeInUp('testimonials')}`}>
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students, alumni, faculty, and recruiters about their transformative experiences
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-100">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-200" />
              
              <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-bold text-white">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-2xl text-gray-700 mb-8 leading-relaxed font-light italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-12 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
            Ready to Transform Your Educational Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students, alumni, and professionals already connected on EduConnect. 
            Start building meaningful relationships today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/register"
              className="group bg-white text-blue-600 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              Get Started Now
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login"
              className="group border-2 border-white text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              Sign In
              <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 w-full">
        <div className="w-full max-w-none mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold">EduConnect</span>
              </div>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Connecting the entire education ecosystem for better learning outcomes, 
                meaningful relationships, and accelerated career growth.
              </p>
              <div className="flex space-x-6">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Features', 'About', 'Testimonials', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-lg">support@educonnect.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-lg">+91 98765 43210</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-lg">Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base sm:text-lg">
              &copy; 2025 EduConnect. All rights reserved.
            </p>
            <p className="text-gray-500 mt-4 md:mt-0">
              Made with ❤️ for the education community
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default HomePage;