import { useState, useEffect } from 'react';
import SealLogo from './components/SealLogo';

const LEGAL_CONFIG = {
  TELEGRAM_URL: 'https://t.me/Lawyerakbarkulivand',
  RUBIKA_URL: 'https://rubika.ir/Lawyerakbarkulivand',
  PHONE_NUMBER: '09967766033',
  TELEPHONE_DISPLAY: '۰۹۹۶ ۷۷۶۶ ۰۳۳',
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('مشاوره عمومی');

  const openConsultationModal = (serviceName?: string) => {
    setSelectedService(serviceName || 'مشاوره عمومی');
    setModalOpen(true);
  };

  const closeConsultationModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeConsultationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const getPlatformUrl = (platform: 'telegram' | 'rubika') => {
    if (platform === 'telegram') {
      return LEGAL_CONFIG.TELEGRAM_URL;
    } else if (platform === 'rubika') {
      return LEGAL_CONFIG.RUBIKA_URL;
    }
    return '#';
  };

  const executeModalAction = (platform: 'telegram' | 'rubika') => {
    const targetUrl = getPlatformUrl(platform);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    closeConsultationModal();
  };

  const navigateToPlatform = (platform: 'telegram' | 'rubika') => {
    const targetUrl = getPlatformUrl(platform);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="app-root" className="min-h-screen bg-brand-black text-gray-100 selection:bg-brand-gold selection:text-black overflow-x-hidden antialiased relative">
      {/* TOP AMBIENT GLOW */}
      <div className="fixed top-0 left-0 right-0 h-[600px] glow-corner pointer-events-none z-0"></div>

      {/* ============================================== */}
      {/* HEADER / NAVIGATION (STICKY & BLURRED)         */}
      {/* ============================================== */}
      <header id="main-header" className="sticky top-0 z-40 w-full transition-all duration-300 bg-brand-black/85 backdrop-blur-md border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Seal Logo */}
            <a href="#" className="flex items-center justify-start group py-1 -mr-2 sm:-mr-3 md:-mr-3.5" aria-label="اکبر کولیوند کارآموز وکالت ۱۰۱۶۵۷">
              <SealLogo className="h-15 sm:h-17 md:h-19 w-auto" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <a href="#" className="hover:text-brand-gold transition-colors py-1">خانه</a>
              <a href="#services" className="hover:text-brand-gold transition-colors py-1">خدمات حقوقی</a>
              <button onClick={() => openConsultationModal('مشاوره آنلاین منو')} className="hover:text-brand-gold transition-colors py-1 cursor-pointer">
                مشاوره آنلاین
              </button>
              <a href="#process" className="hover:text-brand-gold transition-colors py-1">مراحل خدمات</a>
              <button onClick={() => openConsultationModal('تماس با ما')} className="hover:text-brand-gold transition-colors py-1 cursor-pointer">
                تماس با ما
              </button>
            </nav>

            {/* Mobile Menu Button Container */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                aria-label="منوی موبایل"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-brand-surface cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden py-4 border-t border-brand-border space-y-3">
              <a onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-brand-surface hover:text-brand-gold" href="#">خانه</a>
              <a onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-brand-surface hover:text-brand-gold" href="#services">خدمات حقوقی</a>
              <button onClick={() => { setMobileMenuOpen(false); openConsultationModal('مشاوره آنلاین موبایل'); }} className="w-full text-right block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-brand-surface hover:text-brand-gold cursor-pointer">
                مشاوره آنلاین
              </button>
              <a onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-brand-surface hover:text-brand-gold" href="#process">مراحل خدمات</a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultationModal('تماس با ما');
                }}
                className="w-full text-right block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-brand-surface hover:text-brand-gold cursor-pointer"
              >
                تماس با ما
              </button>
              <div className="pt-2">
                <button
                  id="mobile-menu-cta"
                  className="w-full py-2.5 rounded-full text-xs font-semibold bg-brand-gold text-black text-center cursor-pointer hover:bg-brand-goldHover transition"
                  onClick={() => { setMobileMenuOpen(false); openConsultationModal('مشاوره عمومی'); }}
                >
                  درخواست مشاوره فوری
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10">
        {/* ============================================== */}
        {/* HERO SECTION                                   */}
        {/* ============================================== */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center py-16 lg:py-24 overflow-hidden border-b border-brand-border/40">
          <div className="absolute inset-0 glow-olive pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Hero Text Content */}
              <div className="lg:col-span-7 flex flex-col justify-center text-right space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-brand-oliveLight/60 bg-brand-olive/50 text-xs w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-medium text-emerald-400">اکبر کولیوند | وکیل دادگستری</span>
                  <span className="font-sans font-bold text-emerald-400 tracking-wider">۱۰۱۶۵۷</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-gold leading-relaxed max-w-2xl">
                  ارائه مشاوره تخصصی و قبول وکالت در دعاوی حقوقی، کیفری، خانواده ، تجاری
                </h1>
                <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-xl">
                  با ارائه خدمات حقوقی تخصصی، مشاوره آنلاین و تلفنی و تنظیم اوراق قضایی، در مسیر پیگیری حقوق قانونی شما همراهتان هستم.
                </p>

                {/* Hero Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    id="hero-primary-cta"
                    className="px-7 py-3.5 rounded-full text-sm font-bold bg-brand-gold text-black hover:bg-brand-goldHover transition shadow-xl shadow-brand-gold/15 active:scale-95 flex items-center gap-2 cursor-pointer"
                    onClick={() => openConsultationModal('مشاوره از صفحه اصلی')}
                  >
                    <span>دریافت مشاوره حقوقی</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <a
                    href="#services"
                    className="px-6 py-3.5 rounded-full text-sm font-semibold border border-brand-border bg-brand-surface/60 text-gray-300 hover:text-white hover:border-brand-gold/50 transition"
                  >
                    مشاهده خدمات
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
                  <div className="p-4 rounded-xl border border-brand-border bg-brand-surface/40">
                    <div className="text-brand-gold font-bold text-sm mb-1">تخصص و تمرکز حقوقی</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      تحلیل همه‌جانبه ابعاد پرونده و جلوگیری از اتلاف زمان در فرآیندهای دادرسی.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-brand-border bg-brand-surface/40">
                    <div className="text-brand-gold font-bold text-sm mb-1">ارتباط مستقیم و پیوسته</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      دسترسی آسان و سریع موکل به جریان پرونده از طریق پیام‌رسان‌های تلگرام و روبیکا.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Image & Badge */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-brand-border/80 shadow-2xl bg-brand-surface/40 group">
                  {/* Luxury ambient border gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10 opacity-75"></div>
                  {/* Portrait Image */}
                  <img
                    alt="اکبر کولیوند وکیل دادگستری"
                    className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhyTHUeaxhtLh6FkYeGD-6vpChupQowXaaqymzokKwp-gkofPvNa5HfrO3hlC6osKYgmY4o5F10SPZLI1FTAr918c7CFtxsoxEqfgBtXr6dlP8YiFqQNJtDilgYA2jK2uZQp7RVCeoBayol-jyXWyq2kV4dD13aVogHKN4JS4peIjuNuJXOz8QXMOpmTLClv7ZB6AevB2-dzllyAVhq4YKcYCtYNwANUXT_LktCyPOgXrVp6hp0Piy"
                  />
                  {/* Floating Verified Badge */}
                  <div className="absolute bottom-6 right-6 left-6 z-20 p-4 rounded-xl backdrop-blur-md bg-brand-dark/85 border border-brand-border/70 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>اکبر کولیوند</span>
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </div>
                      <div className="text-xs text-brand-textMuted mt-0.5">وکیل رسمی دادگستری</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* LEGAL SERVICES SECTION                         */}
        {/* ============================================== */}
        <section id="services" className="py-20 lg:py-28 border-b border-brand-border/40 relative scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold">
                خدمات حقوقی
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-light">
                ارائه کلیه راهکارهای قانونی با تکیه بر دانش حقوقی، تجربه دادرسی و چارچوب‌های قانون مدنی و کیفری ایران.
              </p>
            </div>

            {/* 4 Primary Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Pillar 1: دعاوی حقوقی */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-olive/80 border border-brand-oliveLight flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                    {/* Scale / Justice icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">دعاوی حقوقی</h3>
                  <p className="text-xs text-gray-400 leading-relaxed text-justify">
                    قبول وکالت و ارائه مشاوره در دعاوی و اختلافات حقوقی از جمله دعاوی ملکی، قراردادها و تعهدات مالی.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <button
                    id="service-btn-legal"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-gray-300 group-hover:text-black group-hover:bg-brand-gold bg-brand-surface border border-brand-border transition-all text-center cursor-pointer"
                    onClick={() => openConsultationModal('دعاوی حقوقی')}
                  >
                    ثبت درخواست دعاوی حقوقی
                  </button>
                </div>
              </div>

              {/* Pillar 2: دعاوی کیفری */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-olive/80 border border-brand-oliveLight flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                    {/* Shield icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">دعاوی کیفری</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    قبول وکالت در پرونده‌ها و دعاوی کیفری، دادسراها و دادگاه‌های کیفری یک و دو.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <button
                    id="service-btn-criminal"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-gray-300 group-hover:text-black group-hover:bg-brand-gold bg-brand-surface border border-brand-border transition-all text-center cursor-pointer"
                    onClick={() => openConsultationModal('دعاوی کیفری')}
                  >
                    ثبت درخواست دعاوی کیفری
                  </button>
                </div>
              </div>

              {/* Pillar 3: دعاوی خانواده */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-olive/80 border border-brand-oliveLight flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                    {/* Family / Users icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">دعاوی خانواده</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    مشاوره و قبول وکالت در امور و دعاوی خانواده، مهریه، نفقه، حضانت فرزندان، طلاق و انحصار وراثت.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <button
                    id="service-btn-family"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-gray-300 group-hover:text-black group-hover:bg-brand-gold bg-brand-surface border border-brand-border transition-all text-center cursor-pointer"
                    onClick={() => openConsultationModal('دعاوی خانواده')}
                  >
                    ثبت درخواست دعاوی خانواده
                  </button>
                </div>
              </div>

              {/* Pillar 4: دعاوی تجاری */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-olive/80 border border-brand-oliveLight flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                    {/* Commercial / Building icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">دعاوی تجاری</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    ارائه خدمات حقوقی در اختلافات و دعاوی تجاری، شرکت‌ها، اسناد تجاری (چک و سفته) و قراردادها.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <button
                    id="service-btn-commercial"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-gray-300 group-hover:text-black group-hover:bg-brand-gold bg-brand-surface border border-brand-border transition-all text-center cursor-pointer"
                    onClick={() => openConsultationModal('دعاوی تجاری')}
                  >
                    ثبت درخواست دعاوی تجاری
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Specialized Consultation & Legal Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 5: مشاوره آنلاین */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">مشاوره آنلاین</h4>
                  <p className="text-xs text-brand-textMuted mt-1">از طریق تلگرام یا روبیکا بدون نیاز به حضور</p>
                </div>
                <button
                  id="subservice-online-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('مشاوره آنلاین')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Card 6: مشاوره تلفنی */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">مشاوره تلفنی</h4>
                  <p className="text-xs text-brand-textMuted mt-1">گفتگوی مستقیم تلفنی با وکیل در وقت هماهنگ شده</p>
                </div>
                <button
                  id="subservice-phone-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('مشاوره تلفنی')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Card 7: تنظیم دادخواست */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">تنظیم دادخواست</h4>
                  <p className="text-xs text-brand-textMuted mt-1">نگارش تخصصی دادخواست بدوی و تجدیدنظر</p>
                </div>
                <button
                  id="subservice-petition-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('تنظیم دادخواست')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Card 8: تنظیم شکواییه */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">تنظیم شکواییه</h4>
                  <p className="text-xs text-brand-textMuted mt-1">شکایت کیفری مستند به مواد قانونی در دادسرا</p>
                </div>
                <button
                  id="subservice-complaint-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('تنظیم شکواییه')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Card 9: تنظیم اظهارنامه */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">تنظیم اظهارنامه</h4>
                  <p className="text-xs text-brand-textMuted mt-1">ارسال اخطار رسمی و قانونی پیش از طرح دعوا</p>
                </div>
                <button
                  id="subservice-statement-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('تنظیم اظهارنامه')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Card 10: تنظیم سایر اوراق و لوایح */}
              <div className="p-5 rounded-xl border border-brand-border/70 bg-brand-surface/40 hover:border-brand-gold/40 transition flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">لوایح و اوراق قضایی</h4>
                  <p className="text-xs text-brand-textMuted mt-1">تنظیم لایحه دفاعیه، واخواهی و فرجام‌خواهی</p>
                </div>
                <button
                  id="subservice-briefs-btn"
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-gold hover:text-black text-brand-gold border border-brand-border transition cursor-pointer"
                  onClick={() => openConsultationModal('تنظیم لوایح و اوراق قضایی')}
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* PROCESS SECTION (TIMELINE)                     */}
        {/* ============================================== */}
        <section id="process" className="py-20 lg:py-28 border-b border-brand-border/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold">
                فرآیند دریافت خدمات حقوقی
              </h2>
              <p className="text-sm text-gray-400 font-light">
                فرآیندی شفاف، مشخص و مرحله‌بندی شده برای پیگیری امور شما از اولین تماس تا پایان مرحله دادرسی.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="relative p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 hover:border-brand-gold/40 transition">
                <div className="text-3xl font-extrabold text-brand-gold font-serif">۱</div>
                <h3 className="text-lg font-bold text-white">ثبت درخواست</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  کاربر از طریق سایت یکی از روش های دریافت مشاوره ( تلگرام ، روبیکا ) را انتخاب نموده و پس از پرداخت هزینه مشاوره، مشخصات پرونده خود را ثبت می نماید.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 hover:border-brand-gold/40 transition">
                <div className="text-3xl font-extrabold text-brand-gold font-serif">۲</div>
                <h3 className="text-lg font-bold text-white">بررسی اولیه</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  اطلاعات اولیه درخواست توسط وکیل بررسی شده و مدارک تکمیلی جهت ارزیابی حقوقی مطالبه می‌شود.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 hover:border-brand-gold/40 transition">
                <div className="text-3xl font-extrabold text-brand-gold font-serif">۳</div>
                <h3 className="text-lg font-bold text-white">مشاوره و بررسی حقوقی</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  موضوع پرونده و مدارک مرتبط تحلیل و ارزیابی شده و بهترین راهکار حقوقی به موکل پیشنهاد می‌شود.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 hover:border-brand-gold/40 transition">
                <div className="text-3xl font-extrabold text-brand-gold font-serif">۴</div>
                <h3 className="text-lg font-bold text-white">اقدام حقوقی</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  در صورت توافق، تنظیم اوراق قضایی یا قبول وکالت پرونده و پیگیری دادرسی در مراجع ذی‌صلاح انجام می‌شود.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* WHY CHOOSE (MINIMALIST CREDIBILITY)            */}
        {/* ============================================== */}
        <section className="py-20 lg:py-28 bg-brand-dark/30 border-b border-brand-border/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold">
                چرا انتخاب خدمات حقوقی ما ؟
              </h2>
              <p className="text-sm text-gray-400 font-light">
                تأکید بر شفافیت حقوقی، امانت‌داری حرفه‌ای و انطباق بر موازین قانونی دور از شعارهای غیرواقعی.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">پاسخگویی و ارتباط آسان</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  امکان ارتباط مستقیم و بدون واسطه برای پیگیری پرونده و کاهش استرس‌های ناشی از بی‌خبری از جریان دادرسی.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">مشاوره آنلاین و تلفنی</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  ارائه راهکارهای حقوقی برای هموطنان در سراسر کشور بدون ضرورت مراجعه حضوری و صرف وقت در ترافیک.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">بررسی تخصصی موضوع پرونده</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  تحلیل بی‌طرفانه شانس موفقیت و تشریح احتمالات پرونده بر اساس موازین قضایی جاری کشور.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">تنظیم اوراق قضایی</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  نگارش فنی و مستدل انواع لوایح، دادخواست‌ها و شکواییه‌ها با بالاترین دقت قلمی و استنادی.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">امکان ارتباط از طریق تلگرام و روبیکا</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  بهره‌گیری از زیرساخت‌های رباتیک و پیام‌رسان‌های در دسترس برای سهولت ارسال مدارک و فایل‌های صوتی.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/40 hover:border-brand-borderHover transition">
                <div className="w-8 h-8 rounded-lg bg-brand-olive text-emerald-300 flex items-center justify-center text-xs font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white mb-2">ارائه خدمات در حوزه‌های چهارگانه</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  پوشش جامع و منسجم دعاوی حقوقی، کیفری، خانواده و تجاری با تسلط بر قوانین خاص هر حوزه.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* CONTACT SECTION                                */}
        {/* ============================================== */}
        <section id="contact" className="py-20 lg:py-28 bg-brand-dark/40 border-b border-brand-border/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold">
                راه‌های ارتباط با وکیل
              </h2>
              <p className="text-sm text-gray-400 font-light">
                جهت ارسال اسناد، درخواست مشاوره و پیگیری پرونده از راه‌های ارتباطی زیر استفاده فرمایید.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {/* Telegram Dedicated Card */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface/70 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-olive/80 text-brand-gold border border-brand-oliveLight flex items-center justify-center group-hover:scale-105 group-hover:border-brand-gold/60 transition-all">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">تلگرام</h3>
                  <p className="text-xs text-brand-textMuted mt-1">مشاوره و ثبت سریع درخواست</p>
                </div>
                <button
                  id="contact-telegram-btn"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-black hover:bg-brand-goldHover transition-all shadow-md shadow-brand-gold/15 active:scale-95 cursor-pointer"
                  onClick={() => navigateToPlatform('telegram')}
                >
                  ارتباط در تلگرام
                </button>
              </div>

              {/* Rubika Dedicated Card */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface/70 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-olive/80 text-brand-gold border border-brand-oliveLight flex items-center justify-center group-hover:scale-105 group-hover:border-brand-gold/60 transition-all">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2L18.4 9 12 12.8 5.6 9 12 5.2zM5 10.3l6 3.6v5.8l-6-3.3v-6.1zm8 9.4v-5.8l6-3.6v6.1l-6 3.3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">روبیکا</h3>
                  <p className="text-xs text-brand-textMuted mt-1">پاسخگویی سریع درون‌برنامه‌ای</p>
                </div>
                <button
                  id="contact-rubika-btn"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-black hover:bg-brand-goldHover transition-all shadow-md shadow-brand-gold/15 active:scale-95 cursor-pointer"
                  onClick={() => navigateToPlatform('rubika')}
                >
                  ارتباط در روبیکا
                </button>
              </div>

              {/* Phone Consultation Card */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface/70 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-olive/80 text-brand-gold border border-brand-oliveLight flex items-center justify-center group-hover:scale-105 group-hover:border-brand-gold/60 transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">مشاوره تلفنی</h3>
                  <p className="text-xs text-brand-textMuted mt-1">هماهنگی وقت مکالمه مستقیم</p>
                </div>
                <button
                  id="contact-phone-btn"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-black hover:bg-brand-goldHover transition-all shadow-md shadow-brand-gold/15 active:scale-95 cursor-pointer"
                  onClick={() => openConsultationModal('مشاوره تلفنی مستقیم')}
                >
                  رزرو وقت تماس
                </button>
              </div>

              {/* Online Consultation Card */}
              <div className="p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gold/50 hover:bg-brand-surface/70 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-olive/80 text-brand-gold border border-brand-oliveLight flex items-center justify-center group-hover:scale-105 group-hover:border-brand-gold/60 transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">مشاوره آنلاین</h3>
                  <p className="text-xs text-brand-textMuted mt-1">بررسی اینترنتی مدارک پرونده</p>
                </div>
                <button
                  id="contact-online-btn"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-black hover:bg-brand-goldHover transition-all shadow-md shadow-brand-gold/15 active:scale-95 cursor-pointer"
                  onClick={() => openConsultationModal('مشاوره آنلاین مستقیم')}
                >
                  ارسال مدارک آنلاین
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================== */}
      {/* FOOTER                                         */}
      {/* ============================================== */}
      <footer className="bg-brand-black border-t border-brand-border/60 py-14 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-brand-border/40">
            {/* Brand Info */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <SealLogo className="w-16 h-10" />
                <span className="text-lg font-bold text-white">اکبر کولیوند | وکیل دادگستری</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                ارائه خدمات حقوقی، مشاوره و قبول وکالت در دعاوی حقوقی، کیفری، خانواده و تجاری. همراهی قانونی با اتکا به تخصص، تجربه دادرسی و حفظ امانت‌داری مراجعین.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase">لینک‌های دسترسی</h4>
              <ul className="space-y-2 text-xs">
                <li><a className="hover:text-brand-gold transition" href="#">خانه</a></li>
                <li><a className="hover:text-brand-gold transition" href="#services">خدمات</a></li>
                <li>
                  <button onClick={() => openConsultationModal('مشاوره فوتر')} className="hover:text-brand-gold transition cursor-pointer">
                    مشاوره
                  </button>
                </li>
                <li>
                  <button onClick={() => openConsultationModal('تماس با ما')} className="hover:text-brand-gold transition cursor-pointer">
                    تماس با ما
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-textMuted gap-4">
            <p>کلیه حقوق این وب‌سایت محفوظ است.</p>
          </div>
        </div>
      </footer>

      {/* ============================================== */}
      {/* MODAL: SELECT TELEGRAM / RUBIKA SYSTEM         */}
      {/* ============================================== */}
      {modalOpen && (
        <div
          id="consultation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeConsultationModal();
            }
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-brand-card border border-brand-border p-6 sm:p-8 shadow-2xl text-right space-y-6">
            {/* Close Button */}
            <button
              id="modal-close-btn"
              aria-label="بستن پنجره"
              className="absolute top-5 left-5 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-brand-surface cursor-pointer"
              onClick={closeConsultationModal}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-brand-olive text-emerald-300 text-[11px]">
                <span>خدمت انتخابی:</span>
                <span id="modal-service-badge" className="font-bold text-white">{selectedService}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                روش دریافت مشاوره را انتخاب کنید
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                برای دریافت مشاوره و ثبت درخواست خود، یکی از روش‌های زیر را انتخاب کنید تا مستقیماً هدایت شوید.
              </p>
            </div>

            {/* 2 Major Options: Telegram & Rubika */}
            <div className="space-y-4 pt-2">
              {/* Option 1: Telegram */}
              <div className="p-5 rounded-xl border border-brand-border hover:border-[#229ED9] bg-brand-surface/70 transition space-y-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 text-[#229ED9] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#229ED9] transition">ادامه در تلگرام</h4>
                    <p className="text-[11px] text-gray-400">ثبت درخواست و دریافت مشاوره از طریق تلگرام</p>
                  </div>
                </div>
                <button
                  id="modal-telegram-btn"
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#229ED9] text-white hover:bg-[#1e8ec3] transition shadow-md shadow-[#229ED9]/20 flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => executeModalAction('telegram')}
                >
                  <span>ورود به تلگرام</span>
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              {/* Option 2: Rubika */}
              <div className="p-5 rounded-xl border border-brand-border hover:border-purple-500 bg-brand-surface/70 transition space-y-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/15 text-purple-400 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2L18.4 9 12 12.8 5.6 9 12 5.2zM5 10.3l6 3.6v5.8l-6-3.3v-6.1zm8 9.4v-5.8l6-3.6v6.1l-6 3.3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition">ادامه در روبیکا</h4>
                    <p className="text-[11px] text-gray-400">ثبت درخواست و دریافت مشاوره از طریق روبیکا</p>
                  </div>
                </div>
                <button
                  id="modal-rubika-btn"
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 transition shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => executeModalAction('rubika')}
                >
                  <span>ورود به روبیکا</span>
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center border-t border-brand-border/40">
              <a
                className="inline-flex items-center justify-center gap-2 text-xs text-brand-textMuted hover:text-brand-gold transition-colors font-medium"
                href="tel:09967766033"
              >
                <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>ارتباط با پشتیبانی:</span>
                <span className="font-mono text-brand-gold font-bold tracking-normal inline-flex items-center" dir="ltr">
                  <span>۰۹۹۶</span>
                  <span className="inline-block w-1.5 text-center"> </span>
                  <span>۷۷۶۶</span>
                  <span className="inline-block w-1.5 text-center"> </span>
                  <span>۰۳۳</span>
                </span>
              </a>
            </div>

            <div className="text-center pt-1">
              <button
                id="modal-cancel-btn"
                className="text-xs text-gray-500 hover:text-gray-300 transition cursor-pointer"
                onClick={closeConsultationModal}
              >
                انصراف و بازگشت به صفحه
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* MOBILE FLOATING ACTION BUTTON                  */}
      {/* ============================================== */}
      <div className="fixed bottom-5 left-5 right-5 z-40 sm:hidden">
        <button
          id="mobile-floating-btn"
          className="w-full py-3.5 rounded-full bg-brand-gold text-black font-bold text-xs shadow-2xl shadow-brand-gold/30 flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
          onClick={() => openConsultationModal('دکمه شناور موبایل')}
        >
          {/* Chat icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>دریافت مشاوره حقوقی فوری</span>
        </button>
      </div>
    </div>
  );
}
