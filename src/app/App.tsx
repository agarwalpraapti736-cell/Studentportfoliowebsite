import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Microscope,
  Atom,
  Code,
  Award,
  MapPin,
  Download,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Cpu,
} from "lucide-react";

type SectionId = "about" | "research" | "skills" | "contact";

const TABS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "research", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

const directionClasses = {
  bottom: { hidden: "translate-y-8", shown: "translate-y-0" },
  top: { hidden: "-translate-y-8", shown: "translate-y-0" },
  left: { hidden: "-translate-x-8", shown: "translate-x-0" },
  right: { hidden: "translate-x-8", shown: "translate-x-0" },
  none: { hidden: "", shown: "" },
};

function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: keyof typeof directionClasses;
  className?: string;
}) {
  const [ref, visible] = useInView();
  const dir = directionClasses[from];
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? `opacity-100 ${dir.shown}` : `opacity-0 ${dir.hidden}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "The Midnight Sun — Thermoelectric Generator",
    category: "Physics · Renewable Energy",
    description:
      "Designed a thermoelectric generator that produces electricity at night by harnessing temperature differences between surfaces and the surrounding environment. Won 1st place in the International First Lobachevsky Competition (Lomonosov Moscow State University, Russia), with an invitation to compete in the next round in Russia.",
    tags: ["Physics", "Thermodynamics", "Renewable Energy", "Engineering"],
    Icon: Atom,
    year: "2024",
    status: "Award Won" as const,
  },
  {
    id: 2,
    title: "Eco-Catalyst — Reimagined Car Exhaust System",
    category: "Chemistry",
    description:
      "Redesigned the catalytic converter to convert CO₂ emissions into reusable methane fuel, combining pollution reduction with on-board energy recovery. Advanced to Round 2 of INSEF (Indian National Science & Engineering Fair) after clearing the initial selection round.",
    tags: ["Chemistry", "Catalysis", "Sustainability", "CO₂ Capture"],
    Icon: FlaskConical,
    year: "2024",
    status: "Advanced" as const,
  },
  {
    id: 3,
    title: "Agricultural Drone System",
    category: "Engineering · AgriTech",
    description:
      "Developed affordable drones for crop monitoring and field spraying, designed to reduce manual labour and improve accessibility for small-scale farmers. Won 1st place at India Rising Techventure (Vidyashilp University) in a Shark Tank-style competition.",
    tags: ["Drone Tech", "AgriTech", "Engineering", "Pitching"],
    Icon: Cpu,
    year: "2024",
    status: "Award Won" as const,
  },
];

const statusStyles: Record<"Award Won" | "Advanced" | "Participated", string> = {
  "Award Won": "border-emerald-300/50 text-emerald-700 bg-emerald-50",
  Advanced: "border-amber-300/50 text-amber-700 bg-amber-50",
  Participated: "border-border text-muted-foreground bg-muted",
};

const skillCategories = [
  {
    name: "Sciences",
    Icon: Atom,
    skills: ["Chemistry", "Physics", "Biology", "Astronomy", "Psychology", "AI & Technology"],
  },
  {
    name: "Creative Arts",
    Icon: Code,
    skills: ["Drawing", "Painting", "Textured Art", "Crochet", "Knitting", "Macramé", "Dance", "Piano"],
  },
  {
    name: "Research & Innovation",
    Icon: FlaskConical,
    skills: [
      "Project Design",
      "Experimental Design",
      "Pitching & Presenting",
      "Scientific Writing",
      "Renewable Energy",
      "Drone Technology",
    ],
  },
  {
    name: "Strategy & Leadership",
    Icon: Microscope,
    skills: [
      "Chess",
      "Debating",
      "Public Speaking",
      "Math Tutoring",
      "Event Volunteering",
      "Teamwork",
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionId>("about");
  const [navSolid, setNavSolid] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    about: null,
    research: null,
    skills: null,
    contact: null,
  });

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 130;
      const order: SectionId[] = ["contact", "skills", "research", "about"];
      for (const id of order) {
        const el = sectionRefs.current[id];
        if (el && y >= el.offsetTop) {
          setActiveTab(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setRef =
    (id: SectionId) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    };

  const scrollTo = (id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroDelay = (ms: number) =>
    `transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          navSolid
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-lg font-semibold tracking-tight text-primary">
            Praapti Agarwal
          </span>

          <div className="hidden sm:flex items-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md ${
                  activeTab === tab.id
                    ? navSolid
                      ? "text-accent"
                      : "text-white"
                    : navSolid
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>

          <a
            href="#"
            className={`hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              navSolid
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border border-white/30 text-white hover:bg-white/10"
            }`}
          >
            <Download size={13} />
            CV
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent/8 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="max-w-2xl">
            <div
              className={heroDelay(100)}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="inline-flex items-center gap-3 text-accent font-mono text-xs tracking-[0.2em] uppercase mb-8">
                <span className="w-10 h-px bg-accent" />
                Grade 10 IB · Chaman Bhartiya School
              </span>
            </div>

            <h1
              className={`font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] text-white ${heroDelay(200)}`}
              style={{ transitionDelay: "200ms" }}
            >
              Praapti Agarwal
            </h1>

            <p
              className={`mt-4 font-display text-2xl md:text-3xl text-white/55 italic ${heroDelay(300)}`}
              style={{ transitionDelay: "320ms" }}
            >
              Science, Innovation &amp; Creative Curiosity
            </p>

            <p
              className={`mt-7 text-white/55 text-base md:text-lg leading-relaxed max-w-xl ${heroDelay(400)}`}
              style={{ transitionDelay: "440ms" }}
            >
              It started with a small astronomy booklet at age seven. Now I build
              projects, compete internationally, and ask how the universe works —
              then try to fix what isn't.
            </p>

            <div
              className={`mt-10 flex flex-wrap gap-4 ${heroDelay(500)}`}
              style={{ transitionDelay: "560ms" }}
            >
              <button
                onClick={() => scrollTo("research")}
                className="group flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/90 transition-all duration-200 hover:gap-3"
              >
                View Projects <ArrowRight size={15} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-medium rounded-md hover:bg-white/8 transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>

            <div
              className={`mt-12 flex items-center gap-6 ${heroDelay(600)}`}
              style={{ transitionDelay: "680ms" }}
            >
              {[
                { Icon: Github, label: "GitHub", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Mail, label: "Email", href: "mailto:agarwalpraapti736@gmail.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-white/40 hover:text-white/75 transition-colors duration-200"
                >
                  <Icon size={17} />
                  <span className="font-mono text-xs tracking-wide">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            className={`mt-20 flex gap-10 ${heroDelay(700)}`}
            style={{ transitionDelay: "800ms" }}
          >
            {[
              { value: "6+", label: "Competitions" },
              { value: "2", label: "First Places" },
              { value: "2", label: "Countries" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l border-white/15 pl-5">
                <div className="font-display text-3xl font-semibold text-white">{value}</div>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/35 hover:text-white/65 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* ── About ── */}
      <section
        ref={setRef("about")}
        id="about"
        className="py-28 bg-background"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">01</span>
              <h2 className="font-display text-3xl font-semibold">About Me</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal delay={80}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5">
                  When I was in second grade, my uncle brought home a DIY solar system kit. We spent
                  the afternoon painting the models, but it was the small booklet at the bottom of
                  the box — page after page of raw astronomy — that changed everything. For a
                  seven-year-old, it was mind-blowing. That was the exact moment I realised there is
                  a massive, complex system governing the universe, and we can actually understand it.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-9">
                  I have changed schools seven times, spending most of my childhood in Canada before
                  moving to Bangalore at thirteen. Restarting so many times taught me something
                  critical: I approach new environments exactly the way I approach science — observe,
                  find the patterns, and figure out the mechanics. Growing up in a Marwari family
                  where business and problem-solving are dinner-table conversations gave me a second
                  lens: the scientific curiosity to obsess over how things work, and the practical
                  instinct to build things that actually fix problems.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: MapPin, text: "Bangalore, India" },
                    { Icon: BookOpen, text: "Grade 10, IB Programme" },
                    { Icon: Award, text: "Multiple Award Winner" },
                    { Icon: Atom, text: "Science & Innovation" },
                  ].map(({ Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <Icon size={14} className="text-accent flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal from="right" delay={120}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=700&fit=crop&auto=format"
                  alt="Science laboratory with glassware and equipment"
                  className="w-full rounded-xl object-cover aspect-[4/5] bg-muted"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/8" />
                <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-xl p-4 shadow-xl">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                    Latest Achievement
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    1st Place · Lobachevsky International
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Lomonosov Moscow State University
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Education */}
          <Reveal delay={150} className="mt-24">
            <h3 className="font-display text-xl font-semibold mb-10">Education</h3>
            <div className="space-y-7 border-l-2 border-border pl-7">
              {[
                {
                  year: "2024 – Present",
                  title: "Grade 10, IB Programme",
                  institution: "Chaman Bhartiya School, Bangalore",
                  note: "Sciences, Mathematics, Business · Bangalore, India",
                },
                {
                  year: "2019 – 2024",
                  title: "Primary & Middle School",
                  institution: "Multiple Schools — Canada & India",
                  note: "Attended 7 schools across Canada and India · developed strong adaptability and cross-cultural perspective",
                },
              ].map((edu, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[35px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background" />
                  <div className="font-mono text-xs text-muted-foreground mb-1 tracking-wide">
                    {edu.year}
                  </div>
                  <div className="font-semibold text-foreground">{edu.title}</div>
                  <div className="text-accent text-sm mt-0.5">{edu.institution}</div>
                  <div className="text-muted-foreground text-sm mt-0.5">{edu.note}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        ref={setRef("research")}
        id="research"
        className="py-28 bg-secondary/40"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">02</span>
              <h2 className="font-display text-3xl font-semibold">Projects</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-muted-foreground mb-14 max-w-lg text-sm">
              Selected competition projects spanning renewable energy, chemistry, and agricultural
              technology.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 110} from="bottom">
                <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/25 transition-all duration-300 h-full flex flex-col cursor-default">
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <project.Icon size={19} className="text-accent" />
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                        statusStyles[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] mb-2">
                    {project.category} · {project.year}
                  </div>

                  <h3 className="font-display text-[15px] font-semibold leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 bg-muted text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="mt-5 flex items-center gap-1.5 text-xs text-accent font-medium hover:gap-3 transition-all duration-200">
                    Read more <ExternalLink size={11} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        ref={setRef("skills")}
        id="skills"
        className="py-28 bg-background"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">03</span>
              <h2 className="font-display text-3xl font-semibold">Skills</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-muted-foreground mb-14 max-w-lg text-sm">
              Scientific curiosity, creative expression, and strategic thinking — all feeding
              into the same engine.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 90}>
                <div className="p-6 bg-card border border-border rounded-xl hover:border-accent/20 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <cat.Icon size={17} className="text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-[15px]">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[12px] px-2.5 py-1.5 bg-secondary text-secondary-foreground border border-border rounded-md hover:border-accent/40 hover:text-accent transition-colors duration-150 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Awards */}
          <Reveal delay={180} className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <Award size={16} className="text-accent" />
              <h3 className="font-display text-xl font-semibold">Awards &amp; Honours</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  year: "2024",
                  title: "Harvard Crimson Business Competition",
                  org: "Advanced to next round — invitation to Harvard University, USA",
                },
                {
                  year: "2024",
                  title: "Best Speaker — Interhouse Debate",
                  org: "Chaman Bhartiya School, Bangalore",
                },
                {
                  year: "2024",
                  title: "2nd Place — CBS Triumph Chess Competition",
                  org: "Chaman Bhartiya School, Bangalore",
                },
              ].map((award, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="p-5 bg-muted/60 border border-border rounded-xl hover:border-accent/20 transition-colors duration-200">
                    <div className="font-mono text-[11px] text-accent mb-2 tracking-wide">
                      {award.year}
                    </div>
                    <div className="font-semibold text-sm text-foreground leading-snug">
                      {award.title}
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-1.5">{award.org}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        ref={setRef("contact")}
        id="contact"
        className="py-28 bg-primary relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">04</span>
              <h2 className="font-display text-3xl font-semibold text-white">Contact</h2>
              <div className="flex-1 h-px bg-white/15" />
            </div>
            <p className="text-white/50 mb-16 max-w-lg text-sm">
              Interested in collaboration, competitions, or just want to talk about science?
              I would love to hear from you.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16">
            <Reveal from="left" delay={80}>
              <div className="space-y-6">
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "agarwalpraapti736@gmail.com",
                    href: "mailto:agarwalpraapti736@gmail.com",
                  },
                  {
                    Icon: BookOpen,
                    label: "School",
                    value: "Chaman Bhartiya School, Bangalore",
                    href: null,
                  },
                  {
                    Icon: Github,
                    label: "GitHub",
                    value: "github.com/praaptiagarwal",
                    href: "#",
                  },
                  {
                    Icon: MapPin,
                    label: "Location",
                    value: "Bangalore, India",
                    href: null,
                  },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-white/10 flex-shrink-0">
                      <Icon size={17} className="text-white/70" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-white/35 uppercase tracking-widest">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-white/80 hover:text-accent transition-colors text-sm"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-white/80 text-sm">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal from="right" delay={120}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Name", type: "text", placeholder: "Your name" },
                    { label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map(({ label, type, placeholder }) => (
                    <div key={label}>
                      <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-white/8 border border-white/15 text-white rounded-md px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Collaboration enquiry"
                    className="w-full bg-white/8 border border-white/15 text-white rounded-md px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project or enquiry..."
                    className="w-full bg-white/8 border border-white/15 text-white rounded-md px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/90 hover:gap-3 transition-all duration-200"
                >
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-5 bg-primary border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-white/30 text-sm">© 2025 Praapti Agarwal</span>
          <span className="font-mono text-white/20 text-xs">
            Chaman Bhartiya School · Grade 10 IB · Bangalore
          </span>
        </div>
      </footer>
    </div>
  );
}
