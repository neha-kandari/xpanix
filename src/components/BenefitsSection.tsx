import { Zap, Handshake, Clock, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import FadeInOnScroll from "./FadeInOnScroll";
import Tilt from "react-parallax-tilt";

const benefits = [
  {
    icon: < Zap size={28} className="text-blue-400" />,
    title: "Enhanced Brand Visibility",
    desc: "Stand out in the digital crowd with tailor-made websites, apps, and listings that reflect your brand identity and capture attention.",
  },
  {
    icon: <Handshake size={28} className="text-purple-400" />,
    title: "Better User Experience",
    desc: "We design intuitive and engaging interfaces that keep users hooked and coming back — from first click to final conversion.",
  },
  {
    icon: <Clock size={28} className="text-pink-400" />,
    title: "Round-the-Clock Reachability",
    desc: "Your online presence never sleeps. Our optimized solutions ensure your brand stays active, accessible, and high-performing 24/7.",
  },
  {
    icon: <DollarSign size={28} className="text-green-400" />,
    title: "Cost-Effective Solutions",
    desc: "We blend modern tools with efficient workflows to deliver high-quality digital solutions without breaking your budget.",
  },
  {
    icon: <TrendingUp size={28} className="text-yellow-400" />,
    title: "Performance-Focused Strategy",
    desc: "From traffic to engagement to conversion, we build with data in mind to help you grow smarter and scale faster.",
  },
  {
    icon: <BarChart3 size={28} className="text-indigo-400" />,
    title: "Scalable Digital Growth",
    desc: "Whether you're a startup or scaling enterprise, our solutions grow with your business — seamlessly and sustainably.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full py-16 px-2 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center bg-transparent">
      <div className="mb-4">
        <span className="px-4 py-1.5 rounded-full bg-black/80 text-white text-sm font-medium shadow border border-white/10">
          Benefits
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg leading-tight">
        The Key Benefits of Building<br className="hidden md:block" /> Your Digital Presence with Us
      </h2>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
        Discover how our IT services empower your brand online — by boosting visibility, enhancing user engagement, and driving smart digital growth
      </p>
      <div className="w-full max-w-6xl">
        {/* Timeline for small screens */}
        <div className="flex flex-col gap-8 relative md:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/30 via-white/10 to-purple-500/30 z-0" />
          {benefits.map((b, i) => (
            <FadeInOnScroll key={i} delay={i * 0.1}>
              <div className="relative pl-14">
                {/* Timeline dot */}
                <span className="absolute left-2 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-black z-10 shadow-lg animate-pulse" />
                <div className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 flex flex-col gap-3 shadow-lg backdrop-blur-md">
                  <div>{b.icon}</div>
                  <div className="text-lg font-semibold text-white">{b.title}</div>
                  <div className="text-gray-300 text-sm">{b.desc}</div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
        {/* Grid for medium and up */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <FadeInOnScroll key={i} delay={i * 0.1}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.15}
                scale={1.04}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                transitionSpeed={250}
                className="w-full h-full"
              >
                <div className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 flex flex-col gap-3 shadow-lg backdrop-blur-md">
                  <div>{b.icon}</div>
                  <div className="text-lg font-semibold text-white">{b.title}</div>
                  <div className="text-gray-300 text-sm">{b.desc}</div>
                </div>
              </Tilt>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
} 