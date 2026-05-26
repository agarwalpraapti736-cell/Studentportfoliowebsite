import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Atom,
  Code,
  MapPin,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Cpu,
  MessageSquare,
  Target,
  Activity,
  Lightbulb,
  Award
} from "lucide-react";

type SectionId = "intro" | "about" | "experiences" | "future" | "contact";

const TABS: { id: SectionId; label: string }[] = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About Me" },
  { id: "experiences", label: "Experiences & Achievements" },
  { id: "future", label: "Future Goals" },
  { id: "contact", label: "Contact Info" },
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

const experiences = [
  {
    id: 1,
    title: "India Rising Techventure – Vidyashilp University",
    category: "Engineering",
    description: "Secured first place in the India Rising Techventure competition, in a Shark Tank. Our project was based on developing agricultural drones designed to be more accessible and practical for farmers while reducing the manual effort and improving productivity. Developed affordable agricultural drones designed to help farmers monitor crops, and spray fields. The project focused heavily on accessibility and reducing costs compared to existing agricultural drone systems.",
    tag: "AgriTech",
    Icon: Cpu,
  },
  {
    id: 2,
    title: "INSEF (Indian National Science & Engineering Fair)",
    category: "Chemistry",
    description: "Successfully cleared the first round of INSEF and progressed to the second round with a project I created called the Eco-Catalyst. The project focused in the field of chemistry on redesigning the catalytic converter system used in car exhausts. Instead of only reducing harmful gases, the Eco-Catalyst aimed to convert carbon dioxide emissions into methane, which could potentially be reused as fuel for the vehicle itself. Participating in the competition gave me exposure to how scientific projects are created in research-focused environments.",
    tag: "Chemistry",
    Icon: FlaskConical,
  },
  {
    id: 3,
    title: "The Midnight Sun — Lomonosov Moscow State University",
    category: "Physics",
    description: "Won first place in the initial round of an international competition with a project called The Midnight Sun. Built on a strict ₹1,400 budget, this is a thermoelectric generator, focused on physics and generating electricity at night by using temperature differences between surfaces and the surrounding environment. The project explored alternative approaches to renewable energy generation and energy sustainability beyond traditional solar power systems. Following the competition, I was invited to participate in the next round in Russia.",
    tag: "Physics",
    Icon: Atom,
  },
  {
    id: 4,
    title: "Tinkerfest – Chaman Bhartiya School",
    category: "Innovation",
    description: "Volunteered at Tinkerfest and also participated by creating a project that received an investment of ₹15,000 in a Shark. The event involved presenting ideas, interacting with judges and participants, and working collaboratively with your teammates. Volunteering also allowed me to observe how large-scale events are organized and managed.",
    tag: "Leadership",
    Icon: Lightbulb,
  },
  {
    id: 5,
    title: "Stonehill Science Bowl",
    category: "Sciences",
    description: "Participated in the Stonehill Science Bowl, which had fast-paced scientific questioning and collaborative problem solving across multiple areas of science. The competition required quick thinking, teamwork, and the ability to apply scientific knowledge under pressure.",
    tag: "Sciences",
    Icon: Atom,
  },
  {
    id: 6,
    title: "Stonehill Technofest",
    category: "Technology",
    description: "Participated in Stonehill Technofest with a project about a smart dog collar capable of detecting seizures in dogs. The collar is designed to monitor changes in movement and behavior patterns that could indicate seizure activity, helping owners respond more quickly during emergencies. Working on the project allowed me to further explore how technology can be applied to health and safety even for animals. This competition showed me how to be able to work under pressure with a time limit.",
    tag: "Hardware",
    Icon: Activity,
  },
  {
    id: 7,
    title: "Harvard Crimson Business Competition",
    category: "Business",
    description: "Won a Harvard-associated competition and received an invitation related to the event. Successfully cleared the second round of the Harvard Crimson Business Competition and received an invitation to participate in the next round at Harvard University in the United States. Participating in the competition motivated me to continue exploring opportunities that combine innovation, entrepreneurship, and practical problem solving.",
    tag: "Business",
    Icon: Award,
  },
  {
    id: 8,
    title: "Interhouse Debate – Chaman Bhartiya School",
    category: "Debate",
    description: "Received the “Best Speaker” award in an interhouse debate competition. This competition improved my ability to present ideas clearly in front of an audience. Winning this made me realize that being confident doesn't mean being sure you're right, it means being okay with saying what you think out loud.",
    tag: "Public Speaking",
    Icon: MessageSquare,
  },
  {
    id: 9,
    title: "CBS Triumph Chess Competition",
    category: "Strategy",
    description: "Won second place in the CBS Triumph Chess Competition. Participating in chess competitions are a funny kind of stressful, they are completely silent, and completely in your head. Every mistake is yours. I kind of like that, though.",
    tag: "Strategy",
    Icon: Target,
  },
  {
    id: 10,
    title: "Extra Match Classes",
    category: "Teaching",
    description: "Helped teach math concepts to sixth graders after school under the guidance of my math teacher. Teaching younger students helped me better understand mathematical concepts and improve my communication skills.",
    tag: "Education",
    Icon: BookOpen,
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionId>("intro");
  const [navSolid, setNavSolid] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    intro: null,
    about: null,
    experiences: null,
    future: null,
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
      const order: SectionId[] = ["contact", "future", "experiences", "about", "intro"];
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
        </div>
      </nav>

      {/* ── Hero / Intro ── */}
      <section ref={setRef("intro")} id="intro" className="relative min-h-screen flex items-center bg-primary overflow-hidden py-24">
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div
              className={heroDelay(100)}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="inline-flex items-center gap-3 text-accent font-mono text-xs tracking-[0.2em] uppercase mb-8">
                <span className="w-10 h-px bg-accent" />
                Grade 10, IB · Chaman Bhartiya School
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
                onClick={() => scrollTo("experiences")}
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
          </div>

          {/* Interactive Intro Section */}
          <div className={`mt-20 max-w-3xl ${heroDelay(700)}`} style={{ transitionDelay: "700ms" }}>
            <button 
              onClick={() => setIntroOpen(!introOpen)}
              className="flex items-center gap-3 text-white/80 hover:text-white font-display text-xl transition-colors border-b border-white/20 pb-2 w-full text-left"
            >
              Read My Intro {introOpen ? <ChevronUp size={20} className="text-accent"/> : <ChevronDown size={20} className="text-accent"/>}
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${introOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-6 text-white/60 leading-relaxed text-sm md:text-base pr-4">
                <p>
                  When I was in second grade, my uncle brought home a DIY solar system kit for my brother and me. We spent the afternoon painting the models, but what actually changed everything was the small booklet I found at the bottom of the box. It was entirely about space—page after page of raw facts and astronomy. For a seven-year-old, it was mind-blowing. It was the first thing that showed me something real outside of my own bubble. That was the exact moment my brain clicked. It wasn't just about planets—it was the sudden realization that there is a massive, complex system governing the universe, and we can actually understand it. That little paper booklet is where my obsession with science started; it turned me into a kid who constantly needed to know the mechanics behind how our physical world works.
                </p>
                <p>
                  That drive to deconstruct and understand things became my greatest survival tool. I've changed schools seven times in my life, spending most of my childhood in Canada before making the biggest jump—moving to Bangalore when I was thirteen. Going from a familiar neighborhood to a completely new city and school system was jarring. But having to restart so many times taught me something critical: I approach new environments exactly the way I approach science. I observe, look for the patterns, and figure out the mechanics of my surroundings. Even when I'm dropped into a situation where nothing makes sense yet, I know how to break it down, adapt, and find my footing.
                </p>
                <p>
                  Being from a Marwari family, I grew up around people who think about how the world works in a very practical way. Business talk at family dinners, questions about value and ideas and "what problem does this solve?" That's just normal in my house. I think that's where my brain for building things and pitching projects comes from — it's been around me my whole life, even before I knew what entrepreneurship meant. Today, that's exactly where my two sides meet: I have the scientific curiosity to obsess over how the universe works, and the ingrained, practical business sense to build things that actually fix problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Me ── */}
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
                <p className="text-base leading-relaxed text-muted-foreground mb-5">
                  Science is what I keep coming back to, especially fields such as chemistry, physics, biology, astronomy, and psychology. I have developed interests in these subjects because all of my curiosity comes from wanting to learn about the world deeply, and these subjects help me understand everything from the formation of matter and life to human behavior and all the complex systems. I love exploring how different branches of science are interconnected and work together to explain the universe we exist in. Learning how discoveries across multiple scientific fields collectively shape our understanding of existence, the laws of nature, and the processes that have created the world around us is what really excited me.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-base leading-relaxed text-muted-foreground mb-5">
                  Alongside science, I've also been paying a lot of attention to AI lately. I really like exploring how AI is transforming fields such as medicine, engineering, research, and scientific development. What interests me about technology is its ability to expand human capabilities, improve efficiency, increase the speed of discovery significantly, and create entirely new possibilities for many different fields. I want to understand how that happens, not just hear about it. I never looked at the world from one perspective. I enjoy learning through different fields because each one explains the reality we live in, in a different way.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="text-base leading-relaxed text-muted-foreground mb-9">
                  But I'm not just a science person, I am also deeply interested in art. I draw, paint, do textured art, crochet, knit, macramé, dance, and play the piano. Honestly, I think my creative side and my science side help each other. When I'm crocheting something tricky, I'm problem-solving. When I'm painting, I notice tiny details I'd miss otherwise. The patience I build doing art is the same patience I need during a chess game or when a science project isn't working. I read a lot too. Science books, psychology, some self-improvement, and fantasy fiction when I need a break from reality. Everything I do kind of comes from the same reason — I just really like understanding how things work. And then there's badminton — which is the opposite of patience. It's fast and loud and my brain kind of shuts off in a good way, it helps me stay active and focused. Chess is the other end — slow, quiet, everything happening inside your head. It challenges me to think strategically, stay patient, and analyze situations carefully. I like that I need both.
                </p>
              </Reveal>
              <Reveal delay={380}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: MapPin, text: "Bangalore, India" },
                    { Icon: BookOpen, text: "Grade 10, IB Programme" },
                    { Icon: Code, text: "Creative Arts" },
                    { Icon: Atom, text: "Sciences" },
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
                  src="/galaxy-math.jpg"
                  alt="Galaxy with mathematical equations"
                  className="w-full rounded-xl object-cover aspect-[4/5] bg-muted shadow-lg"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/8" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Experiences & Achievements ── */}
      <section
        ref={setRef("experiences")}
        id="experiences"
        className="py-28 bg-secondary/40"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-14">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">02</span>
              <h2 className="font-display text-3xl font-semibold">Experiences & Achievements</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={(i % 3) * 110} from="bottom">
                <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/25 transition-all duration-300 h-full flex flex-col cursor-default">
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <exp.Icon size={19} className="text-accent" />
                    </div>
                  </div>

                  <div className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] mb-2">
                    {exp.category}
                  </div>

                  <h3 className="font-display text-[15px] font-semibold leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {exp.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-muted text-muted-foreground rounded">
                      {exp.tag}
                    </span>
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

      {/* ── Future Goals ── */}
      <section
        ref={setRef("future")}
        id="future"
        className="py-28 bg-background relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">03</span>
              <h2 className="font-display text-4xl font-semibold">Future Goals</h2>
              <div className="w-12 h-px bg-border" />
            </div>
          </Reveal>

          <Reveal delay={80} from="bottom">
            <div className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                I hope to continue exploring scientific research.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I don't have one specific career picked out yet, and I'm okay with that. But the question I keep coming back to is: how can we use what we already know in smarter ways to fix the things that aren't working? Climate, energy, healthcare — I don't know where exactly I'll end up. But in five years, I want to be deep into research and drive new discoveries, shape the future of technology and science, create long-term impact on both humanity and the world around us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Info ── */}
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

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className="font-mono text-accent text-sm tracking-[0.15em]">04</span>
              <h2 className="font-display text-4xl font-semibold text-white">Contact Info</h2>
              <div className="w-12 h-px bg-white/15" />
            </div>
          </Reveal>

          <Reveal delay={160} from="bottom">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 md:p-14 backdrop-blur-sm shadow-xl">
              <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12 max-w-2xl mx-auto">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Name</span>
                  <span className="text-white font-medium text-lg">Praapti Agarwal</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Education</span>
                  <span className="text-white font-medium text-lg">Grade 10, IB</span>
                  <span className="text-white/70 text-sm">Chaman Bhartiya School</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Email</span>
                  <a href="mailto:agarwalpraapti736@gmail.com" className="text-accent hover:text-white transition-colors text-lg">
                    agarwalpraapti736@gmail.com
                  </a>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Phone</span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:8019867512" className="text-white hover:text-accent transition-colors text-lg">8019867512</a>
                    <a href="tel:8074214378" className="text-white hover:text-accent transition-colors text-lg">80742 14378</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-5 bg-primary border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-white/30 text-sm">© 2026 Praapti Agarwal</span>
          <span className="font-mono text-white/20 text-xs">
            Chaman Bhartiya School · Grade 10 IB · Bangalore
          </span>
        </div>
      </footer>
    </div>
  );
}
