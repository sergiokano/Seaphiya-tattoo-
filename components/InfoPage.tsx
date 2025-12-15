import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, Plus, Minus, Shield, Sparkles, AlertCircle, Check, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';

interface InfoPageProps {
  onBack: () => void;
}

// Accordion Item Component
const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: 'sage' | 'coral' | 'sunflower' | 'petal';
  defaultOpen?: boolean;
  index: number;
}> = ({ title, children, icon, accentColor = 'sage', defaultOpen = false, index }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    sage: 'bg-sage/10 border-sage/30 text-sage',
    coral: 'bg-coral/10 border-coral/30 text-coral',
    sunflower: 'bg-sunflower/10 border-sunflower/30 text-sunflower',
    petal: 'bg-petal/20 border-petal/40 text-coral',
  };

  return (
    <motion.div
      className="border-b border-black/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses[accentColor]}`}>
              {icon}
            </div>
          )}
          <span className="font-display text-lg md:text-xl text-ink-black/80 group-hover:text-ink-black transition-colors duration-300 text-left">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black/40 group-hover:bg-black/5 transition-all duration-300"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-0 md:pl-12">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Timeline Phase Component
const TimelinePhase: React.FC<{
  phase: string;
  title: string;
  description: string;
  items: string[];
  warnings?: string[];
  tips?: string[];
  isActive: boolean;
  onClick: () => void;
  index: number;
}> = ({ phase, title, description, items, warnings, tips, isActive, onClick, index }) => {
  return (
    <motion.div
      className={`relative cursor-pointer group ${isActive ? 'z-10' : 'z-0'}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute -left-[25px] top-2 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
          isActive
            ? 'bg-coral border-coral scale-125'
            : 'bg-paper-white border-chrome group-hover:border-ink-black'
        }`}
        animate={isActive ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      />

      {/* Glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-petal"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <div className={`pl-4 pb-8 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-full transition-colors duration-300 ${
            isActive ? 'bg-coral/20 text-coral' : 'bg-black/5 text-black/40'
          }`}>
            {phase}
          </span>
        </div>

        <h4 className={`font-editorial italic text-xl md:text-2xl mb-2 transition-colors duration-300 ${
          isActive ? 'text-ink-black' : 'text-black/60'
        }`}>
          {title}
        </h4>

        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-body text-sm text-black/60 mb-4 leading-relaxed">
                {description}
              </p>

              <ul className="space-y-2 mb-4">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-black/70"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              {warnings && warnings.length > 0 && (
                <div className="bg-coral/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-coral" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral">Evita</span>
                  </div>
                  <ul className="space-y-1">
                    {warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-coral/80">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {tips && tips.length > 0 && (
                <div className="bg-sunflower/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-sunflower" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sunflower">Pro tip</span>
                  </div>
                  <ul className="space-y-1">
                    {tips.map((tip, i) => (
                      <li key={i} className="text-sm text-black/60">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// FAQ Item Component
const FAQItem: React.FC<{
  question: string;
  answer: string;
  index: number;
}> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-black/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start justify-between group text-left"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-2 h-2 rounded-full mt-2 transition-colors duration-300 ${
            isOpen ? 'bg-coral' : 'bg-black/20 group-hover:bg-black/40'
          }`} />
          <span className={`font-body text-base md:text-lg transition-colors duration-300 ${
            isOpen ? 'text-ink-black' : 'text-black/70 group-hover:text-ink-black'
          }`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 mt-1"
        >
          <Plus className={`w-5 h-5 transition-colors duration-300 ${
            isOpen ? 'text-coral' : 'text-black/30 group-hover:text-black/50'
          }`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-6 pr-10">
              <p className="font-body text-sm text-black/60 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InfoPage: React.FC<InfoPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.0,
      lerp: 0.03,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const beforeAppointmentData = [
    {
      title: 'Prepara tu cuerpo',
      icon: <Shield className="w-4 h-4" />,
      accentColor: 'sage' as const,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-black/60 leading-relaxed font-editorial italic">
            "Un cuerpo descansado sana mejor. Dale a tu piel las mejores condiciones."
          </p>
          <ul className="space-y-2">
            {[
              'Duerme bien la noche anterior, mínimo 7 horas',
              'Come algo sustancioso antes de venir, nunca en ayunas',
              'Hidrátate bien los días previos',
              'Hidrata la zona a tatuar con crema sin perfume',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-black/70">
                <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: 'Qué evitar antes',
      icon: <AlertCircle className="w-4 h-4" />,
      accentColor: 'coral' as const,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-black/60 leading-relaxed font-editorial italic">
            "Tu piel necesita estar en su mejor momento. Evita todo lo que pueda afectarla."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-coral/5 rounded-lg p-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral mb-2 block">24-48h antes</span>
              <ul className="space-y-1 text-sm text-black/60">
                <li>Alcohol</li>
                <li>Cafeína en exceso</li>
                <li>Aspirina o ibuprofeno</li>
              </ul>
            </div>
            <div className="bg-coral/5 rounded-lg p-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral mb-2 block">1 semana antes</span>
              <ul className="space-y-1 text-sm text-black/60">
                <li>Exposición solar intensa</li>
                <li>Depilación con cera en la zona</li>
                <li>Exfoliantes agresivos</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Qué traer a la cita',
      icon: <Sparkles className="w-4 h-4" />,
      accentColor: 'sunflower' as const,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-black/60 leading-relaxed font-editorial italic">
            "Prepárate para estar cómoda durante la sesión."
          </p>
          <ul className="space-y-2">
            {[
              'Ropa cómoda que dé acceso fácil a la zona',
              'Snacks y bebida para sesiones largas (más de 2h)',
              'Entretenimiento: música, podcast, serie en el móvil',
              'Documento de identidad',
              'Llega 10 minutos antes para relajarte',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-black/70">
                <Check className="w-4 h-4 text-sunflower mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-petal/20 rounded-lg p-4 mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral/80 mb-1 block">Nota</span>
            <p className="text-sm text-black/60">
              Si vienes acompañada, consúltalo antes. Depende del estudio y el espacio disponible.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const aftercarePhases = [
    {
      phase: '0-4h',
      title: 'Film protector',
      description: 'Las primeras horas son las más delicadas. Tu piel está procesando una herida que también es arte.',
      items: [
        'Mantén el film protector puesto durante 2-4 horas',
        'No toques ni levantes el film para "ver cómo va"',
        'Es normal que se acumule algo de tinta y plasma',
      ],
      warnings: ['Quitar el film antes de tiempo', 'Tocar el tatuaje con las manos sucias'],
    },
    {
      phase: 'Día 1',
      title: 'Primer lavado',
      description: 'El momento de limpiar tu tatuaje por primera vez. Hazlo con cariño y delicadeza.',
      items: [
        'Lava con agua tibia y jabón neutro (sin perfume)',
        'Usa las yemas de los dedos, nunca esponja',
        'Seca con toques suaves usando papel de cocina limpio',
        'Aplica una capa fina de crema hidratante',
      ],
      warnings: ['Frotar o rascar', 'Sumergir en agua', 'Usar toalla de tela'],
      tips: ['Bepanthen o crema específica para tatuajes funcionan muy bien'],
    },
    {
      phase: 'Día 2-7',
      title: 'Primera semana',
      description: 'Tu piel está sanando activamente. La constancia en el cuidado marca la diferencia.',
      items: [
        'Lava el tatuaje 2 veces al día',
        'Aplica crema hidratante 3-4 veces al día en capa fina',
        'Deja que respire, no lo cubras innecesariamente',
        'Viste ropa suelta y de algodón sobre la zona',
      ],
      warnings: ['Piscina, mar, jacuzzi', 'Gimnasio intenso', 'Exposición directa al sol', 'Rascarte aunque pique'],
    },
    {
      phase: 'Sem 2-4',
      title: 'Descamación',
      description: 'Es completamente normal que tu tatuaje descame. Es parte del proceso de curación.',
      items: [
        'Continúa hidratando regularmente',
        'Deja que las escamas caigan solas',
        'El color puede verse más claro temporalmente, es normal',
        'La piel puede picar un poco, resiste',
      ],
      warnings: ['Arrancar escamas o pellejitos', 'Dejar de hidratar porque "ya está curado"'],
      tips: ['Si ves que el color no es uniforme tras 4 semanas, escríbeme para valorar un retoque'],
    },
    {
      phase: 'Siempre',
      title: 'Cuidado permanente',
      description: 'Un tatuaje bien cuidado envejece con gracia. Estos hábitos lo mantendrán bonito toda la vida.',
      items: [
        'Usa protector solar SPF 50+ siempre que expongas la zona',
        'Mantén la piel hidratada como parte de tu rutina',
        'Evita la exposición solar prolongada sin protección',
        'El tatuaje es parte de ti, cuídalo como cuidas tu piel',
      ],
      tips: ['El sol es el mayor enemigo de la tinta. Un buen SPF es la mejor inversión para tu tatuaje.'],
    },
  ];

  const faqData = [
    {
      question: '¿Cuánto cuesta un tatuaje?',
      answer: 'El precio depende del tamaño, complejidad, ubicación y tiempo estimado. Cada pieza es única, por eso prefiero que me escribas con tu idea y te doy un presupuesto personalizado. No trabajo con precios fijos porque cada tatuaje merece una valoración individual.',
    },
    {
      question: '¿Duele mucho tatuarse?',
      answer: 'El dolor varía según la zona y tu tolerancia personal. Las zonas con más hueso o nervios (costillas, pies, codos) suelen ser más sensibles. El fine line que hago es generalmente menos doloroso que estilos más densos. La mayoría de mis clientas lo describen como "molesto pero soportable".',
    },
    {
      question: '¿Puedo traer mi propio diseño?',
      answer: 'Por supuesto. Me encanta trabajar con ideas propias. Podemos usarlo como base y adaptarlo juntas para que funcione mejor como tatuaje, o recrearlo fielmente si ya está pensado para piel. Lo importante es que el resultado final te represente.',
    },
    {
      question: '¿Hacen retoques?',
      answer: 'Sí, el primer retoque está incluido si es necesario. La piel de cada persona cicatriza diferente, y a veces alguna línea necesita repaso. El retoque se hace pasadas 4-6 semanas desde la sesión original. Retoques posteriores por causas externas (sol, mal cuidado) se valoran aparte.',
    },
    {
      question: '¿Cuánto tiempo tarda en sanar?',
      answer: 'La curación superficial tarda unas 2-3 semanas. La curación completa de todas las capas de la piel puede llevar 1-2 meses. Durante este tiempo es crucial seguir los cuidados que te indico.',
    },
    {
      question: '¿Qué pasa si me arrepiento?',
      answer: 'Un tatuaje es permanente, por eso es importante que estés segura antes de hacértelo. Si tienes dudas durante el proceso de diseño, hablemos. Prefiero que te tomes tu tiempo a que te tatúes algo de lo que no estés 100% convencida.',
    },
    {
      question: '¿Cómo funciona el depósito?',
      answer: 'Para reservar tu cita pido un depósito que se descuenta del precio final. Esto asegura tu hueco en mi agenda y cubre el tiempo de diseño. El depósito no es reembolsable si cancelas con menos de 48h de antelación, pero sí es transferible a otra fecha.',
    },
    {
      question: '¿Puedo tatuarme si estoy embarazada o lactando?',
      answer: 'No tatúo a personas embarazadas por precaución. Durante la lactancia, recomiendo esperar al menos 3-6 meses después del parto. Ante cualquier duda médica, consulta siempre con tu médico primero.',
    },
    {
      question: '¿Qué pasa si estoy enferma el día de la cita?',
      answer: 'Si estás enferma, con fiebre, o tu sistema inmune está comprometido, mejor reprogramamos. Tatuarse en ese estado afecta la cicatrización y no es recomendable. Avísame lo antes posible para buscar otra fecha.',
    },
    {
      question: '¿Cómo funcionan los guest spots?',
      answer: 'Viajo regularmente a diferentes ciudades para tatuar como invitada en otros estudios. Anuncio las fechas en mi Instagram con antelación. Si quieres tatuarte conmigo en tu ciudad, escríbeme y te aviso cuando tenga algo cerca.',
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-paper-white min-h-screen text-ink-black cursor-none"
    >
      <Navbar showBackButton onBack={onBack} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        {/* Background decorative element */}
        <motion.div
          className="absolute top-20 right-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M100,10 Q150,50 140,100 Q130,150 100,190 Q70,150 60,100 Q50,50 100,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M100,30 Q130,60 125,100 Q120,140 100,170 Q80,140 75,100 Q70,60 100,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] mb-6">
              <span className="text-ink-black">Gently,</span>
              <br />
              <span className="font-editorial italic text-black/60">cared</span>
            </h1>
          </motion.div>

          <motion.p
            className="font-body text-lg md:text-xl text-black/60 max-w-xl leading-relaxed mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Todo lo que necesitas saber para cuidar algo que llevarás para siempre.
            Antes, durante y después de tu tatuaje.
          </motion.p>

          {/* Quick nav */}
          <motion.div
            className="flex flex-wrap gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { label: 'Antes de tu cita', href: '#antes' },
              { label: 'Cuidados post-tatuaje', href: '#cuidados' },
              { label: 'Preguntas frecuentes', href: '#faq' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="px-4 py-2 border border-black/15 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-black/50 hover:border-black/40 hover:text-ink-black hover:bg-black/5 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section: Antes de tu cita */}
      <section id="antes" className="border-t border-black/10">
        <div className="px-6 py-6 flex justify-between items-center border-b border-black/10">
          <span className="font-mono text-xs uppercase tracking-widest text-black/60">[ Antes de tu cita ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">01/03</span>
        </div>

        <div className="px-6 md:px-16 lg:px-24 py-16">
          <div className="max-w-3xl">
            <motion.p
              className="font-editorial italic text-2xl md:text-3xl text-black/70 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "La preparación es parte del ritual. Un cuerpo cuidado recibe mejor la tinta."
            </motion.p>

            <div className="space-y-0">
              {beforeAppointmentData.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  accentColor={item.accentColor}
                  index={index}
                  defaultOpen={index === 0}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Cuidados post-tatuaje */}
      <section id="cuidados" className="border-t border-black/10 bg-pure-white">
        <div className="px-6 py-6 flex justify-between items-center border-b border-black/10">
          <span className="font-mono text-xs uppercase tracking-widest text-black/60">[ Cuidados post-tatuaje ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">02/03</span>
        </div>

        <div className="px-6 md:px-16 lg:px-24 py-16">
          <div className="max-w-4xl">
            <motion.p
              className="font-editorial italic text-2xl md:text-3xl text-black/70 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "Tu tatuaje es una herida que también es arte. Cuídalo como merece."
            </motion.p>

            {/* Timeline navigation pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {aftercarePhases.map((phase, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                    activePhase === i
                      ? 'bg-coral text-white'
                      : 'bg-black/5 text-black/50 hover:bg-black/10 hover:text-black/70'
                  }`}
                >
                  {phase.phase}
                </button>
              ))}
            </motion.div>

            {/* Timeline */}
            <div className="relative pl-6 md:pl-8">
              {/* Vertical line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-coral via-coral/50 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ originY: 0 }}
              />

              <div className="space-y-0">
                {aftercarePhases.map((phase, index) => (
                  <TimelinePhase
                    key={index}
                    {...phase}
                    isActive={activePhase === index}
                    onClick={() => setActivePhase(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="border-t border-black/10">
        <div className="px-6 py-6 flex justify-between items-center border-b border-black/10">
          <span className="font-mono text-xs uppercase tracking-widest text-black/60">[ Preguntas frecuentes ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">03/03</span>
        </div>

        <div className="px-6 md:px-16 lg:px-24 py-16">
          <div className="max-w-3xl">
            <motion.p
              className="font-editorial italic text-2xl md:text-3xl text-black/70 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "No hay preguntas tontas. Prefiero que me preguntes todo antes de tatuarte."
            </motion.p>

            <div className="space-y-0">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-black/10 bg-ink-black text-paper-white">
        <div className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-editorial italic text-3xl md:text-5xl mb-6">
                ¿Más preguntas?
              </h2>
              <p className="font-body text-lg text-white/60 mb-10">
                Si tienes alguna duda que no he respondido aquí, escríbeme directamente.
                Prefiero una pregunta de más que una preocupación de menos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/seaphiya.tat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-paper-white text-ink-black rounded-full font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-petal transition-all duration-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Escríbeme</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <button
                  onClick={onBack}
                  className="group flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 hover:border-white hover:text-white transition-all duration-500"
                >
                  <span>Volver al inicio</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer mini */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>© Seaphiya 2025</span>
          <span>Gently, forever</span>
        </div>
      </section>
    </motion.div>
  );
};

export default InfoPage;
