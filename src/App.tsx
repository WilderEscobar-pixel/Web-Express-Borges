import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, LogIn, ExternalLink, MessageCircle, ShieldCheck, 
  Scale, FileSignature, Lock, TrendingUp, Gavel, Landmark, 
  BookOpen, FileText, Cpu, Handshake, Smartphone, Globe, 
  MoreHorizontal, Download, Calculator, MessagesSquare, 
  Check, Info, Presentation, MapPin, Phone, Send, Loader2,
  ChevronLeft, ChevronRight, PenLine, MessageSquareDashed,
  AlertCircle, CheckCircle, ArrowRight, Bot, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Review {
  name: string;
  case: string;
  rating: number;
  text: string;
}

interface Slide {
  label: string;
  desc: string;
}

// --- Constants ---
const carouselSlides = [
  { 
    label: 'Cobranza Inteligente', 
    desc: 'Automatización general', 
    icon: CheckCircle,
    headline: 'Cobranza Inteligente que trabaja por ti.',
    subheadline: 'Deja de perseguir pagos. Nuestra interfaz automatiza los recordatorios y les muestra el camino a la solvencia. Descansa mientras el sistema gestiona.',
    image: 'https://lh3.googleusercontent.com/d/13hCkP8i_pVcRfW_uhpt5xDj0QH_Mdms5'
  },
  { 
    label: 'Conciliación', 
    desc: 'Sala de chat legal', 
    icon: MessagesSquare,
    headline: 'Comunicación blindada y 100% documentada.',
    subheadline: 'Cada mensaje, acuerdo o validación queda registrado permanentemente en el expediente digital. Una Sala de Conciliación que elimina los "yo no dije eso" y convierte el diálogo en respaldo legal para tu cobranza.',
    image: 'https://lh3.googleusercontent.com/d/1uUBPzyxsso13gT0uVIJkW-0Ts91wLQ7L'
  },
  { 
    label: 'Abogado Virtual', 
    desc: 'Consultoría IA', 
    icon: Bot,
    headline: 'Un experto legal en tu bolsillo, 24/7.',
    subheadline: 'Consultas jurídicas instantáneas con Borges Legal AI. Obtén respuestas precisas sobre la legislación venezolana en cualquier momento y lugar.',
    image: 'https://lh3.googleusercontent.com/d/1beUSII6jLWaZmViFYRrH9jNo7PJnnjDc'
  },
  { 
    label: 'Gestión de Casos', 
    desc: 'Seguimiento de cobranzas', 
    icon: FileText,
    headline: 'Gestión Experta: Usted delegue, nosotros automatizamos.',
    subheadline: 'El facilitador se encarga de la ingeniería legal y financiera de su caso. Desde la configuración de tasas hasta la generación de llaves de acceso, estructuramos su cobranza para que usted solo se preocupe por ver los resultados.',
    image: 'https://lh3.googleusercontent.com/d/1Am1et7nJ1wOcDRif3EQTI05ee71_7Gid'
  },
  { 
    label: 'Reportes', 
    desc: 'Estadísticas y gráficos', 
    icon: TrendingUp,
    headline: 'La salud de tu capital bajo control absoluto.',
    subheadline: 'Visualiza la curva de recuperación de tu dinero en tiempo real. Desde el primer abono hasta el saldo total, monitorea el progreso de cada caso con gráficas detalladas y transparencia total en el cálculo de comisiones.',
    image: 'https://lh3.googleusercontent.com/d/1BzmjCPwle1cBK9ELuojHdodDgljg6l-5'
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalManualOpen, setIsModalManualOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'info' | 'error' }[]>([]);

  // Refs for observers
  const countersRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedReviews = localStorage.getItem('express-borges-reviews');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (e) {
        console.error("Error parsing stored reviews", e);
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="text-charcoal font-sans selection:bg-copper/30">
      {/* SCROLL PROGRESS */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[100] transition-[width] duration-75" 
        style={{ 
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #1B3A5F, #FF6B35)' 
        }} 
      />

      {/* NAVIGATION */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-500 ${
          scrollY > 80 ? 'shadow-[0_1px_30px_rgba(27,58,95,0.06)]' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <img 
              src="https://z-cdn-media.chatglm.cn/files/a763293d-ae2d-4f9c-bc7d-dc64f457fbfe.png?auth_key=1876989270-365afbf34afb402a96fff1a447105b8f-0-805f3c22748200796b6621255598960e" 
              alt="Express Borges" 
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </a>
          
          <div className="hidden lg:flex items-center gap-1">
            {['Qué Hacemos', 'Plataforma', 'Beneficios', 'Seguridad', 'Reseñas'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-[13px] text-gray-500 hover:text-navy transition-colors font-medium px-4 py-2 rounded-xl hover:bg-navy-50/50"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setIsModalManualOpen(true)}
              className="text-[12px] text-gray-400 hover:text-navy transition-colors font-medium px-3 py-2 cursor-pointer"
            >
              Manual de Marca
            </button>
            <a 
              href="https://express-borges.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-copper text-[12px] px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              <LogIn size={14} />
              Acceso Clientes
            </a>
          </div>

          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-navy-50/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-navy-50"
            >
              <div className="px-4 pb-5 pt-2 flex flex-col gap-0.5">
                {['Qué Hacemos', 'Plataforma', 'Beneficios', 'Seguridad', 'Reseñas'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-gray-600 hover:text-navy py-3 px-3 rounded-xl hover:bg-navy-50/50 transition-all font-medium"
                  >
                    {item}
                  </a>
                ))}
                <div className="border-t border-navy-50 my-2" />
                <button 
                  onClick={() => { setIsModalManualOpen(true); setIsMenuOpen(false); }}
                  className="text-left text-sm text-gray-400 hover:text-navy py-2.5 px-3 rounded-xl hover:bg-navy-50/50 transition-all font-medium"
                >
                  Manual de Identidad
                </button>
                <a 
                  href="https://express-borges.vercel.app/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-copper text-sm px-5 py-3 rounded-full flex items-center justify-center gap-2 mt-2"
                >
                  <LogIn size={16} />
                  Acceso Clientes
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center hero-bg">
        <div className="hero-grid absolute inset-0 z-[2]" />
        <div className="absolute w-[500px] h-[500px] bg-copper/[0.06] -top-40 -right-40 rounded-full blur-[100px] z-[2]" />
        <div className="absolute w-[350px] h-[350px] bg-navy/[0.08] bottom-0 -left-32 rounded-full blur-[80px] z-[2]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Content */}
            <div className="lg:col-span-7 xl:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-7"
              >
                <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
                <span className="text-[11px] font-semibold text-copper-light tracking-wider uppercase">Gestión de Cobranzas Profesional</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.6rem] font-bold text-white leading-[1.08] tracking-tight mb-6"
              >
                Gestión Inteligente de{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-copper-light to-copper">Cobranzas</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-copper/15 -z-0 rounded-sm" />
                </span>{' '}
                con Respaldo Legal
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl mb-4 font-light"
              >
                Express Borges une tecnología, derecho y estrategia para recuperar tu capital. Sin riesgo financiero, sin costos anticipados. Operamos bajo el marco jurídico venezolano con más de 20 años de experiencia.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-copper/10 border border-copper/20">
                  <ShieldCheck size={14} className="text-copper" />
                  <span className="text-[11px] font-bold text-copper tracking-wide uppercase">Si no cobramos, no cobramos</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 mb-12"
              >
                <a 
                  href="https://express-borges.vercel.app/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-copper text-sm sm:text-[15px] px-7 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={18} />
                  <div className="text-left">
                    <div className="text-[9px] font-medium opacity-70 leading-none">Plataforma</div>
                    <div className="text-sm font-bold leading-tight">Acceder Ahora</div>
                  </div>
                </a>
                <button 
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="btn-outline text-sm sm:text-[15px] px-7 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  Consulta Gratuita
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.0 }}
                className="flex flex-wrap gap-x-8 gap-y-4"
              >
                {[
                  { val: '20+', label: 'Años de Experiencia' },
                  { val: '$0', label: 'Riesgo Financiero', prefix: true },
                  { val: '100%', label: 'Marco Legal VE' }
                ].map((stat) => (
                  <React.Fragment key={stat.label}>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {stat.prefix ? <span className="text-copper">$</span> : null}
                        {stat.val.replace('$', '')}
                      </div>
                      <div className="text-[10px] text-white/30 font-medium mt-1 uppercase tracking-widest">{stat.label}</div>
                    </div>
                    {stat.label !== 'Marco Legal VE' && <div className="w-px bg-white/10 hidden sm:block" />}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 xl:col-span-5 relative hidden md:flex items-center justify-center min-h-[420px] xl:min-h-[480px]">
              <div className="relative">
                <div className="w-44 h-44 xl:w-52 xl:h-52 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <ShieldCheck size={52} className="text-copper/80 mb-2 mx-auto block" />
                    <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold">Protegido</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-[2rem] border border-copper/20 pulse-ring" />
                <div className="absolute -inset-4 rounded-[2.5rem] border border-copper/10 pulse-ring" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating Icons */}
              <motion.div animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-4 right-0">
                <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl bg-gradient-to-br from-navy-light/80 to-navy-dark/80 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <Scale size={32} className="text-white/80" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-8 left-0">
                <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 border border-copper/15 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <FileSignature size={32} className="text-copper/80" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-1/3 -left-6 xl:-left-10">
                <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <Lock size={26} className="text-copper/60" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-4 right-8">
                <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <TrendingUp size={26} className="text-white/60" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative border-b border-navy-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12"
          >
            {[
              { icon: Landmark, text: 'Colegio de Abogados Lara' },
              { icon: BookOpen, text: 'Código de Comercio VE' },
              { icon: FileText, text: 'Letra de Cambio & Pagaré' },
              { icon: Cpu, text: 'IA + Firebase' }
            ].map((item, i) => (
              <React.Fragment key={item.text}>
                <div className="flex items-center gap-2.5 text-gray-400">
                  <item.icon size={18} />
                  <span className="text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap">{item.text}</span>
                </div>
                {i < 3 && <div className="w-px h-5 bg-navy-50 hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="que-hacemos" className="relative py-16 sm:py-24 dot-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="accent-line mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight leading-[1.15] mb-5">
                Recuperamos tu capital con estrategia legal y tecnología
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light mb-8">
                Express Borges no es una agencia de cobranza convencional. Somos una firma con respaldo jurídico especializado que digitaliza cada etapa del proceso de recuperación.
              </p>
              <div className="space-y-4">
                {[
                  { num: '01', title: 'Consulta Gratuita', desc: 'Evaluamos tu caso sin costo ni compromiso.' },
                  { num: '02', title: 'Gestión Extrajudicial', desc: 'Negociación, firma de compromisos con Letra de Cambio y seguimiento.' },
                  { num: '03', title: 'Escalamiento Judicial', desc: 'Cuando la conciliación no es efectiva, judicializamos con ejecución de garantías.' },
                  { num: '04', title: 'Recuperación y Cierre', desc: 'Entrega del monto, liquidación de comisión y documentación final.', color: 'navy' }
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4 group">
                    <div className={`w-10 h-10 rounded-xl ${item.color === 'navy' ? 'bg-navy/10 group-hover:bg-navy/20' : 'bg-copper/10 group-hover:bg-copper/20'} flex items-center justify-center shrink-0 transition-colors`}>
                      <span className={`text-sm font-bold ${item.color === 'navy' ? 'text-navy' : 'text-copper-dark'}`}>{item.num}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-copper/15 via-navy-light/10 to-transparent blur-[80px] pointer-events-none -z-10 rounded-full" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Handshake, val: 'Cero', label: 'Costo anticipado', color: 'copper' },
                  { icon: Scale, val: '100%', label: 'Legal y transparente', color: 'navy' },
                  { icon: Smartphone, val: 'PWA', label: 'App en tu bolsillo', color: 'copper' },
                  { icon: ShieldCheck, val: 'Log', label: 'Auditoría inmutable', color: 'navy' }
                ].map((item, i) => (
                  <div key={i} className="glass glass-interactive rounded-2xl p-6 text-center cursor-default">
                    <item.icon size={28} className={`mx-auto mb-3 ${item.color === 'copper' ? 'text-copper' : 'text-navy'}`} />
                    <h4 className="text-2xl font-bold text-navy mb-1">{item.val}</h4>
                    <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 glass glass-interactive rounded-2xl p-5 cursor-default">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Afíliate por</p>
                    <p className="text-2xl font-bold text-navy">$20<span className="text-sm font-normal text-gray-400">/año</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Tu comisión baja a</p>
                    <p className="text-2xl font-bold text-copper">10%</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-navy-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '67%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full" 
                  />
                </div>
                <p className="text-[10px] text-gray-300 mt-1.5">Ahorro del 50-67% en comisiones como afiliado</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* PLATAFORMA (CAROUSEL) */}
      <section id="plataforma" className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14 relative z-10"
          >
            <div className="accent-line mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight mb-4">La Plataforma en Acción</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-light mb-10">
              Instalación PWA instantánea. Tu panel de gestión de cobranzas funciona en tiempo real desde cualquier navegador.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-2xl mx-auto mb-16 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1rJFtFIYZtkgqq8QIhueKzVBC86f-OrbL" 
              alt="Plataforma Líder de Inversión"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* DYNAMIC TEXT FOR CAROUSEL */}
          <div className="relative z-30 w-full max-w-xl text-center px-4 sm:px-6 mx-auto flex flex-col items-center justify-center min-h-[100px] sm:min-h-[140px] mb-2 sm:mb-8">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, filter: 'blur(16px)', y: 30, scale: 0.9, rotateX: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, filter: 'blur(16px)', y: -30, scale: 1.05, rotateX: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
                style={{ transformPerspective: 1000 }}
              >
                <h4 className="text-copper font-bold text-[1.1rem] sm:text-3xl tracking-tight mb-1.5 sm:mb-3 leading-tight drop-shadow-sm">
                  {carouselSlides[carouselIndex].headline}
                </h4>
                <p className="text-navy/70 text-[11px] sm:text-base font-medium leading-relaxed max-w-md mx-auto line-clamp-4">
                  {carouselSlides[carouselIndex].subheadline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CAROUSEL CONTAINER */}
          <div className="relative pb-4 sm:pb-12 px-4 sm:px-0">
            <div className="relative mx-auto h-[310px] sm:h-[460px] w-full z-10 -mt-2 sm:mt-0">
              {carouselSlides.map((slide: any, i) => {
                let offset = i - carouselIndex;
                const total = carouselSlides.length;
                if (offset > Math.floor(total / 2)) offset -= total;
                if (offset < -Math.floor(total / 2)) offset += total;

                const isCenter = offset === 0;
                const isNear = Math.abs(offset) === 1;
                const isFar = Math.abs(offset) === 2;

                if (Math.abs(offset) > 2) return null;

                const getTransform = () => {
                  const mobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const baseX = mobile ? 180 : 260;
                  const edgeX = mobile ? 280 : 440;
                  const baseScale = mobile ? 0.55 : 0.85;
                  const edgeScale = mobile ? 0.4 : 0.7;
                  const baseRot = mobile ? -8 : -8;
                  const edgeRot = mobile ? -15 : -14;

                  if (isCenter) return `translate(-50%, -50%) translateX(0) scale(1) rotateY(0)`;
                  if (isNear) return `translate(-50%, -50%) translateX(${offset * baseX}px) scale(${baseScale}) rotateY(${-offset * baseRot}deg)`;
                  if (isFar) return `translate(-50%, -50%) translateX(${offset * edgeX}px) scale(${edgeScale}) rotateY(${-offset * edgeRot}deg)`;
                  return '';
                };

                return (
                  <motion.div
                    key={i}
                    onClick={() => {
                      if (isCenter && slide.image) {
                        const gallerySlides = carouselSlides.filter(s => s.image);
                        const indexInGallery = gallerySlides.findIndex(s => s.image === slide.image);
                        setLightboxIndex(indexInGallery);
                      } else {
                        setCarouselIndex(i);
                      }
                    }}
                    style={{ cursor: isCenter && slide.image ? 'zoom-in' : 'pointer' }}
                    animate={{
                      transform: getTransform(),
                      opacity: isCenter ? 1 : isNear ? 0.85 : 0.4,
                      zIndex: isCenter ? 20 : isNear ? 10 : 5
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="carousel-slide absolute left-1/2 top-1/2"
                  >
                    <div className="w-[140px] h-[290px] sm:w-[200px] sm:h-[400px] bg-charcoal rounded-[24px] sm:rounded-[32px] p-1.5 sm:p-2 shadow-[0_25px_60px_rgba(27,58,95,0.2),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
                      <div className="w-full h-full bg-navy-50 rounded-[20px] sm:rounded-[26px] overflow-hidden flex flex-col relative">
                        {slide.image ? (
                          <div className="absolute inset-0 z-10">
                            <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-navy/5 pointer-events-none" />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between px-2.5 sm:px-4 pt-5 sm:pt-7 pb-1 sm:pb-2 relative z-20">
                              <span className={`text-[8px] sm:text-[10px] font-bold text-navy`}>9:41</span>
                            </div>
                            <div className="screenshot-placeholder flex-1 mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5 rounded-[14px] sm:rounded-[18px] border-[1.5px] border-dashed border-navy/20 relative z-20 overflow-hidden">
                              <slide.icon size={28} className="text-navy/30 mb-2" />
                              <span className="text-[8px] sm:text-[10px] font-bold text-navy/70 text-center px-1">{slide.label}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Controls */}
            <button 
              onClick={() => setCarouselIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass glass-interactive flex items-center justify-center shadow-lg hover:shadow-xl transition-all group"
            >
              <ChevronLeft className="text-navy group-hover:text-copper transition-colors" size={20} />
            </button>
            <button 
              onClick={() => setCarouselIndex((prev) => (prev + 1) % carouselSlides.length)}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass glass-interactive flex items-center justify-center shadow-lg hover:shadow-xl transition-all group"
            >
              <ChevronRight className="text-navy group-hover:text-copper transition-colors" size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-[200px] mx-auto sm:max-w-none">
            {carouselSlides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === carouselIndex ? 'bg-copper w-6 sm:w-7 h-2 sm:h-2.5' : 'bg-navy-100 w-2 sm:w-2.5 h-2 sm:h-2.5 hover:bg-navy-100/80'}`}
              />
            ))}
          </div>

          {/* INSTALL STEPS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto relative z-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-copper/10 via-transparent to-navy/10 blur-[80px] pointer-events-none -z-10 rounded-full" />
            <div className="glass glass-interactive rounded-3xl p-6 sm:p-8 cursor-default">
              <h3 className="text-base font-bold text-navy mb-6 text-center">Instalación en 3 pasos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'Entra al enlace', desc: 'Safari o Chrome', icon: Globe },
                  { step: '2', title: 'Abre el menú', desc: 'Menú navegador', icon: MoreHorizontal },
                  { step: '3', title: 'Instalar App', desc: 'Pantalla inicio', icon: Download }
                ].map((item) => (
                  <div key={item.step} className="text-center group">
                    <div className="w-12 h-12 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-copper/20 transition-colors">
                      <item.icon size={22} className="text-copper" />
                    </div>
                    <div className="text-[10px] font-bold text-copper uppercase tracking-widest mb-1">Paso {item.step}</div>
                    <p className="text-sm font-semibold text-navy">{item.title}</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 text-center">
                <a href="https://express-borges.vercel.app/" target="_blank" rel="noreferrer" className="btn-copper text-sm px-7 py-3.5 rounded-xl inline-flex items-center gap-2.5">
                  <ExternalLink size={16} />
                  Ir a la Plataforma
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="seguridad" className="relative py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="w-full aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 hero-grid opacity-30" />
                  <div className="relative z-10 text-center p-8">
                    <div className="w-24 h-24 rounded-full border-2 border-copper/30 flex items-center justify-center mx-auto mb-4 pulse-ring">
                      <div className="w-16 h-16 rounded-full bg-copper/10 flex items-center justify-center">
                        <ShieldCheck size={36} className="text-copper" />
                      </div>
                    </div>
                    <p className="text-white/60 text-xs uppercase tracking-[0.25em] font-semibold mb-1">Infraestructura</p>
                    <p className="text-white text-lg font-bold">Firebase Secure</p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      {['AES-256', 'SOC 2', 'GDPR'].map(tag => (
                        <div key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-[10px] text-white/50 font-semibold">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="accent-line mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight leading-[1.15] mb-5">
                Infraestructura de seguridad de nivel empresarial
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light mb-8">
                Protegida bajo estándares internacionales de protección de datos.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Logs inmutables de auditoría', desc: 'Registros que no pueden ser modificados ni eliminados' },
                  { title: 'Cifrado de extremo a extremo', desc: 'Comunicaciones y documentos con encriptación estándar' },
                  { title: 'Respaldo automatizado', desc: 'Copias de seguridad en tiempo real sobre cloud de Google' },
                  { title: 'Evidencia con valor probatorio', desc: 'Metadatos verificables para instancias judiciales' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-copper-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="text-copper" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{item.title}</p>
                      <p className="text-xs text-gray-400 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reseñas" className="relative py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="accent-line mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight mb-4">Reseñas Verificadas</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
              Únicamente reseñas de clientes reales cuyos casos han sido verificados y cerrados.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {reviews.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-lg mx-auto text-center"
              >
                <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-5">
                  <MessageSquareDashed size={32} className="text-navy-100" />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">Aún no hay reseñas publicadas</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-1">
                  Las reseñas se publican después de verificar la autenticidad del caso y la identidad del cliente.
                </p>
                <p className="text-xs text-gray-300 mb-8">Protegemos la privacidad. Las reseñas usan iniciales y datos anonimizados.</p>
                <button 
                  onClick={() => document.getElementById('reviewForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-6 py-3 rounded-xl border border-navy-100 text-navy font-semibold text-sm transition-all hover:bg-white hover:border-navy hover:shadow-lg inline-flex items-center gap-2"
                >
                  <PenLine size={16} />
                  Dejar mi Reseña
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
                {reviews.map((review, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-3xl p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className={`text-xl ${j < review.rating ? 'text-copper' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
                    <div>
                      <p className="text-navy font-bold text-sm">{review.name}</p>
                      {review.case && <p className="text-xs text-gray-400 mt-0.5">Caso: {review.case}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          <div id="reviewForm" className="max-w-2xl mx-auto mt-20 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-navy/5 via-navy-light/10 to-copper/10 blur-[80px] pointer-events-none -z-10 rounded-full" />
            <div className="glass glass-interactive rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                  <PenLine size={20} className="text-copper" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">Comparte tu experiencia</h3>
                  <p className="text-[11px] text-gray-400">Solo clientes verificados. Revisión previa a publicación.</p>
                </div>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  
                  const target = e.target as HTMLFormElement;
                  const nameInput = target.elements.namedItem('name') as HTMLInputElement;
                  const caseInput = target.elements.namedItem('case') as HTMLInputElement;
                  const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
                  
                  // get radio group value
                  const ratingNode = Array.from(target.elements).find(el => (el as HTMLInputElement).name === 'rating' && (el as HTMLInputElement).checked) as HTMLInputElement;
                  const rating = ratingNode ? parseInt(ratingNode.value) : 5;

                  const newReview: Review = {
                    name: nameInput.value,
                    case: caseInput.value,
                    rating,
                    text: textInput.value
                  };

                  const updatedReviews = [newReview, ...reviews];
                  setReviews(updatedReviews);
                  localStorage.setItem('express-borges-reviews', JSON.stringify(updatedReviews));

                  addToast('Tu reseña ha sido publicada exitosamente.', 'success');
                  target.reset();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Nombre completo *</label>
                    <input required name="name" type="text" placeholder="Tu nombre" className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm text-navy placeholder-gray-300 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Número de caso</label>
                    <input name="case" type="text" placeholder="Ej: #1247" className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm text-navy placeholder-gray-300 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Tu calificación *</label>
                  <div className="flex flex-row-reverse justify-end gap-1">
                    {[5, 4, 3, 2, 1].map(num => (
                      <React.Fragment key={num}>
                        <input type="radio" name="rating" id={`star${num}`} value={num} className="hidden peer" defaultChecked={num === 5} />
                        <label htmlFor={`star${num}`} className="text-2xl cursor-pointer text-gray-300 peer-hover:text-copper peer-hover:next-all:text-copper peer-checked:text-copper peer-checked:next-all:text-copper transition-colors">★</label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Tu reseña *</label>
                  <textarea required name="text" rows={4} placeholder="Describe tu experiencia con Express Borges..." className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm text-navy placeholder-gray-300 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all resize-none" />
                </div>
                <div className="flex items-start gap-2">
                  <input required type="checkbox" id="consent" className="mt-1 w-4 h-4 rounded border-navy-100 text-copper focus:ring-copper/20" />
                  <label htmlFor="consent" className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Autorizo a Express Borges a publicar mi reseña con iniciales y datos anonimizados, previa verificación. *
                  </label>
                </div>
                <button type="submit" className="btn-copper text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <Send size={16} />
                  Enviar para Verificación
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-navy/5 via-navy-light/10 to-copper/10 blur-[80px] pointer-events-none -z-10 rounded-full" />
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight mb-4">Preguntas Frecuentes</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
              Respuestas claras a las dudas más comunes de nuestros clientes.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { 
                q: "¿Qué sucede si no logran recuperar mi dinero?", 
                a: "En Express Borges trabajamos bajo el modelo a éxito. Si después de agotar todas las vías extrajudiciales y judiciales no logramos la recuperación, no debes pagar honorarios. Asumimos el riesgo operativo." 
              },
              { 
                q: "¿Cuánto tiempo toma el proceso de recuperación?", 
                a: "El tiempo varía según cada caso y la disposición de pago del deudor. Muchos casos se resuelven en la fase extrajudicial (30 a 90 días). Si requiere escalamiento judicial, los plazos dependen de los tribunales." 
              },
              { 
                q: "¿Debo entregar el documento original de la deuda (letra, factura)?", 
                a: "Solo al momento de iniciar la fase judicial formal o firmar un acuerdo definitivo. En la evaluación inicial trabajamos con copias digitalizadas subidas a nuestra plataforma." 
              },
              { 
                q: "¿Puedo darle seguimiento diario al estado de mi caso?", 
                a: "Sí. Nuestra plataforma te proporciona actualizaciones en tiempo real y una vista transparente a las gestiones que realizan los agentes y abogados día a día." 
              },
              { 
                q: "¿Trabajan en todo el territorio venezolano?", 
                a: "Nuestra sede está en Barquisimeto, Estado Lara, pero aceptamos casos a nivel nacional dependiendo del monto, viabilidad y el soporte documental." 
              }
            ].map((faq, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden transition-all duration-300 shadow-sm border border-navy-50/50">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/40 transition-colors"
                >
                  <span className="font-bold text-navy text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`shrink-0 text-copper transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-gray-500 font-light text-sm sm:text-base leading-relaxed border-t border-navy-50/30 mx-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section id="presentacion" className="relative py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-navy tracking-tight mb-4">Presentación Corporativa</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
              Conoce nuestra propuesta de valor, servicios y modelo de negocio.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass glass-interactive rounded-3xl overflow-hidden cursor-default">
              <div className="relative min-h-[400px] sm:min-h-[480px] sm:aspect-video overflow-hidden rounded-2xl flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark">
                <div className="hero-grid absolute inset-0 opacity-30 pointer-events-none" />
                <div className="relative z-10 text-center p-6 sm:p-8 w-full max-w-lg mx-auto flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <Presentation size={36} className="text-copper sm:scale-100 scale-75" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Presentación Corporativa</h3>
                  <p className="text-xs sm:text-sm text-white/40 font-light max-w-sm mx-auto mb-6 sm:mb-8">
                    Conoce nuestra visión estratégica y modelo de negocio en detalle.
                  </p>
                  <div className="flex flex-col w-full sm:flex-row justify-center gap-3">
                    <a 
                      href="https://drive.google.com/file/d/1FtTG7Mxo456fa4k2j8pR95UsZ4freoSC/view?usp=sharing" 
                      target="_blank"
                      rel="noreferrer"
                      className="btn-copper text-[11px] sm:text-sm px-4 sm:px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Presentation size={16} />
                      Ver Presentación
                    </a>
                    <a 
                      href="https://drive.google.com/file/d/1YCkcYhblgyJ8nLKa2O6R4beMHOqqr8cA/view?usp=sharing" 
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline border border-white/20 text-[11px] sm:text-sm text-white px-4 sm:px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 w-full sm:w-auto hover:bg-white/10 transition-colors"
                    >
                      <FileText size={16} />
                      Documentación
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-navy-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Info size={14} />
                  <span>Documentos oficiales de Express Borges</span>
                </div>
                <button 
                  onClick={() => setIsModalManualOpen(true)}
                  className="text-xs text-copper hover:text-copper-dark font-semibold transition-colors flex items-center gap-1"
                >
                  Manual de Identidad <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-dark" />
            <div className="absolute inset-0 hero-grid opacity-20" />
            <div className="absolute w-64 h-64 bg-copper/[0.08] -top-20 -right-20 rounded-full blur-[80px]" />
            <div className="absolute w-48 h-48 bg-navy-light/30 bottom-0 -left-16 rounded-full blur-[60px]" />
            
            <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                ¿Tienes capital estancado<br className="hidden sm:block" /> por morosidad?
              </h2>
              <p className="text-sm sm:text-base text-white/45 max-w-lg mx-auto leading-relaxed font-light mb-9">
                La primera consulta es gratuita y sin compromiso. Analizamos tu caso y te presentamos las opciones legales.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://wa.me/584245655849" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-copper text-sm sm:text-[15px] px-8 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle size={20} />
                  Consulta Gratuita por WhatsApp
                </a>
                <a 
                  href="https://express-borges.vercel.app/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-outline text-sm sm:text-[15px] px-8 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={18} />
                  Ir a la Plataforma
                </a>
              </div>
              <p className="text-[10px] text-white/20 mt-6 uppercase tracking-widest font-bold">Barquisimeto, Estado Lara – Venezuela · 0424-5655849</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-navy bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-copper/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <img src="https://z-cdn-media.chatglm.cn/files/a763293d-ae2d-4f9c-bc7d-dc64f457fbfe.png?auth_key=1876989270-365afbf34afb402a96fff1a447105b8f-0-805f3c22748200796b6621255598960e" alt="Express Borges" className="h-9 w-auto mb-4 brightness-0 invert opacity-90" />
              <p className="text-xs text-navy-50/70 leading-relaxed mb-3 font-light italic">"Justicia en movimiento, resultados en mano."</p>
              <p className="text-[10px] text-navy-50/50 font-medium">BORGES & ASOCIADOS · Barquisimeto, Estado Lara – Venezuela</p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4">Servicios</h4>
              <ul className="space-y-2.5">
                {['Cobranza Extrajudicial', 'Cobranza Judicial', 'Asesoría Legal Preventiva', 'Programa de Afiliación'].map(s => (
                  <li key={s}><a href="#" className="text-xs text-navy-50/60 hover:text-white transition-colors font-light">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4">Recursos</h4>
              <ul className="space-y-2.5">
                <li><a href="https://express-borges.vercel.app/" target="_blank" rel="noreferrer" className="text-xs text-copper hover:text-copper-light transition-colors font-semibold flex items-center gap-1.5"><ExternalLink size={11} />Plataforma</a></li>
                <li><button onClick={() => setIsModalManualOpen(true)} className="text-xs text-copper hover:text-copper-light transition-colors font-semibold flex items-center gap-1.5 cursor-pointer"><BookOpen size={11} />Manual de Identidad</button></li>
                <li><a href="#presentacion" className="text-xs text-navy-50/60 hover:text-white transition-colors font-light">Presentación Corporativa</a></li>
                <li><a href="#reseñas" className="text-xs text-navy-50/60 hover:text-white transition-colors font-light">Reseñas Verificadas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4">Contacto</h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2"><MapPin size={12} className="text-navy-50/40 mt-0.5 shrink-0" /><span className="text-xs text-navy-50/60 font-light">Av. Los Leones, Torre BEL, Piso 17, Barquisimeto 3001</span></li>
                <li className="flex items-center gap-2"><Phone size={12} className="text-navy-50/40 shrink-0" /><a href="tel:+584245655849" className="text-xs text-navy-50/60 hover:text-white transition-colors font-light">0424-5655849</a></li>
                <li className="flex items-center gap-2"><MessageCircle size={12} className="text-navy-50/40 shrink-0" /><a href="https://wa.me/584245655849" target="_blank" rel="noreferrer" className="text-xs text-navy-50/60 hover:text-white transition-colors font-light">WhatsApp Directo</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-navy-50/40 font-light">© 2025 Express Borges – Asesoría y Gestión de Cobranzas. Todos los derechos reservados.</p>
            <div className="flex items-center gap-1.5 text-[10px] text-navy-50/40 font-medium"><Cpu size={11} />Tecnología impulsada por Inteligencia Artificial y Firebase</div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a 
        href="https://wa.me/584245655849" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M11.97 22.03c-1.63 0-3.23-.42-4.66-1.21L2 22l1.24-5.2A9.9 9.9 0 0 1 2.03 12C2.03 6.5 6.5 2 11.97 2S21.91 6.5 21.91 12A9.95 9.95 0 0 1 11.97 22.03zM5.56 19.34a7.96 7.96 0 0 0 12.38-6.19 8.01 8.01 0 0 0-8.01-8.01c-4.43 0-8.01 3.58-8.01 8.01 0 1.48.4 2.87 1.13 4.04l-.69 2.91 3.01-.69l.19.1v-.01zM16.98 15.35c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.19.29-.71.9-.87 1.09-.16.19-.32.22-.59.08-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.64-1.54-1.92-.16-.29-.02-.45.12-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.09-.2.05-.38-.02-.52-.07-.15-.62-1.51-.85-2.07-.23-.55-.46-.48-.62-.48l-.54-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.45s1.02 2.86 1.16 3.05c.14.2 2.01 3.19 4.95 4.39 2.09.85 2.76.94 3.4.89.86-.07 1.62-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.06-.11-.25-.18-.52-.31z"/></svg>
        <span className="absolute -top-10 right-0 bg-navy text-white text-[10px] font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">Chat WhatsApp</span>
      </a>

      {/* TOASTS */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-lg max-w-sm ${
                toast.type === 'success' ? 'bg-copper-50 border-copper-100 text-copper-dark' : 
                toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : 
                'bg-navy-50 border-navy-100 text-navy'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : 
               toast.type === 'error' ? <AlertCircle size={18} className="shrink-0 mt-0.5" /> : 
               <Info size={18} className="shrink-0 mt-0.5" />}
              <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
              <button 
                onClick={() => removeToast(toast.id)}
                className="shrink-0 mt-0.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <span className="sr-only">Cerrar</span>
              <X size={20} />
            </button>

            {/* Gallery Navigation - Left */}
            <button 
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((prev) => {
                  const galleryCount = carouselSlides.filter(s => s.image).length;
                  return (prev! - 1 + galleryCount) % galleryCount;
                });
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Gallery Navigation - Right */}
            <button 
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((prev) => {
                  const galleryCount = carouselSlides.filter(s => s.image).length;
                  return (prev! + 1) % galleryCount;
                });
              }}
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg aspect-[9/19.5] sm:aspect-auto sm:max-h-[85vh] flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipePower = (offset: number, velocity: number) => {
                  return Math.abs(offset) * velocity;
                };
                const swipe = swipePower(offset.x, velocity.x);
                const threshold = 10000;
                
                if (swipe < -threshold || offset.x < -60) {
                  setLightboxIndex((prev) => {
                    const galleryCount = carouselSlides.filter(s => s.image).length;
                    return (prev! + 1) % galleryCount;
                  });
                } else if (swipe > threshold || offset.x > 60) {
                  setLightboxIndex((prev) => {
                    const galleryCount = carouselSlides.filter(s => s.image).length;
                    return (prev! - 1 + galleryCount) % galleryCount;
                  });
                }
              }}
            >
              {carouselSlides.filter(s => s.image).length > 0 && (
                <img
                  src={carouselSlides.filter(s => s.image)[lightboxIndex!].image}
                  alt={carouselSlides.filter(s => s.image)[lightboxIndex!].label}
                  className="w-full h-full object-contain rounded-[2rem] shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing select-none"
                  draggable={false}
                />
              )}
            </motion.div>
            
            {/* Indicators */}
            {carouselSlides.filter(s => s.image).length > 1 && (
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-navy-dark/40 backdrop-blur-md border border-white/10">
                {carouselSlides.filter(s => s.image).map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === lightboxIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONSULTA */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md" 
              onClick={() => setIsConsultationModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 flex flex-col z-10"
            >
              <button 
                onClick={() => setIsConsultationModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-navy-50/50 hover:bg-navy-50 flex items-center justify-center transition-colors text-navy cursor-pointer"
              >
                <X size={16} />
              </button>

              <h2 className="text-xl font-bold text-navy tracking-tight mb-2">Solicitar Evaluación Gratuita</h2>
              <p className="text-sm text-gray-500 font-light mb-6">Déjanos tus datos y un especialista jurídico evaluará tu caso sin costo alguno.</p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsConsultationModalOpen(false);
                  addToast('Tu solicitud ha sido enviada. Te contactaremos en breve.', 'success');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Nombre completo</label>
                  <input required placeholder="Ej: Juan Pérez" className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm focus:outline-none focus:border-copper bg-white/50" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Teléfono / WhatsApp</label>
                  <input required type="tel" placeholder="Ej: +58 424 0000000" className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm focus:outline-none focus:border-copper bg-white/50" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Monto aproximado a recuperar (Opcional)</label>
                  <input placeholder="Ej: $5,000" className="w-full px-4 py-3 rounded-xl border border-navy-100 text-sm focus:outline-none focus:border-copper bg-white/50" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full btn-copper py-3.5 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Enviar Solicitud
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4 font-light">Tus datos están protegidos por el secreto profesional.</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL MANUAL */}
      <AnimatePresence>
        {isModalManualOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalManualOpen(false)}
              className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              className="relative glass rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
                    <BookOpen size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy">Manual de Identidad Corporativa</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Express Borges – Marzo 2026</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalManualOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-navy-50 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="text-center mb-8 pb-8 border-b border-navy-50">
                  <img src="https://z-cdn-media.chatglm.cn/files/a763293d-ae2d-4f9c-bc7d-dc64f457fbfe.png?auth_key=1876989270-365afbf34afb402a96fff1a447105b8f-0-805f3c22748200796b6621255598960e" alt="Logo" className="h-14 w-auto mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-navy mb-1 uppercase tracking-tight">Express Borges</h2>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Asesoría y Gestión de Cobranzas</p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-copper to-navy mx-auto my-4" />
                  <p className="text-lg font-semibold text-navy">Manual de Identidad Corporativa</p>
                  <p className="text-sm text-gray-400 italic mt-1 font-light">"Justicia en movimiento, resultados en mano."</p>
                  <p className="text-xs text-gray-300 mt-3 font-medium uppercase tracking-wider">Borges & Asociados · Barquisimeto, Lara – Venezuela</p>
                </div>
                <div className="grid gap-8">
                  <section>
                    <h3 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-copper" />
                      Historia y Filosofía
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light mb-4">
                      Fundada por Rafael Borges. Filosofía central: <strong className="text-navy font-bold">si el cliente no recupera su dinero, Express Borges no cobra.</strong> Respaldo del Colegio de Abogados del Estado Lara.
                    </p>
                  </section>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/50">
                      <h4 className="text-[10px] font-bold text-navy uppercase tracking-widest mb-2">Misión</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-light">Recuperar el capital mediante soluciones legales y modelo de cobro basado exclusivamente en resultados.</p>
                    </div>
                    <div className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/50">
                      <h4 className="text-[10px] font-bold text-navy uppercase tracking-widest mb-2">Visión</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-light">Ser la firma líder en recuperación de cuentas del Centro-Occidente de Venezuela mediante innovación digital.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
