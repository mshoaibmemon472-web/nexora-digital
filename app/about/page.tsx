import Image from "next/image";

export default function AboutPage() {
  const skills = [
    "AI Development",
    "Content Creation",
    "Story Writing",
    "Prompt Engineering",
    "Web Development",
    "Digital Products",
  ];

  const journey = [
    {
      year: "The Spark",
      title: "Discovering AI",
      description: "As a student, I fell in love with AI and its endless possibilities for creation and development.",
    },
    {
      year: "The Learning",
      title: "Essential AI Course",
      description: "Completed the Essential AI course, gaining hands-on skills in AI tools, prompt engineering, and development.",
    },
    {
      year: "The Vision",
      title: "Nexora Digital",
      description: "Launched Nexora Digital to share AI-powered products, write stories, and help beginners start their journey.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Get to know the person behind Nexora Digital</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50">
              <Image
                src="/profile.jpg"
                alt="H.M. Shoaib Memon"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-4xl font-bold mb-2 text-white">H.M. Shoaib Memon</h2>
            <p className="text-purple-400 text-lg mb-6">Founder of Nexora Digital</p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Hi! I&apos;m <strong className="text-white">Shoaib</strong> — a student, creator, and storyteller 
              with a deep passion for <strong className="text-purple-300">AI creation and development</strong>. 
              I believe technology and imagination together can change the world.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              After completing the <strong className="text-cyan-300">Essential AI course</strong>, I realized 
              how powerful AI can be — not just for experts, but for everyone. That&apos;s why I started 
              <strong className="text-white"> Nexora Digital</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My goal is simple: build AI-powered products, write stories that inspire, and help 
              beginners like me take their first step into coding and development.
            </p>
          </div>
        </div>

        {/* My Journey */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10 text-center text-white">My Journey</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {journey.map((item, index) => (
              <div
                key={index}
                className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
              >
                <p className="text-purple-400 text-sm font-semibold mb-2">{item.year}</p>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">What I Do</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-6 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <span className="text-gray-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mb-20 p-8 md:p-12 border border-purple-500/30 rounded-3xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              My Mission
            </span>
          </h3>
          <p className="text-gray-300 text-center leading-relaxed max-w-3xl mx-auto text-lg">
            To make AI accessible for beginners, share powerful digital products, 
            and craft stories — fictional and non-fictional — that spark imagination 
            and inspire others to create.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Want to work together or have a question?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50"
          >
            ✉️ Get in Touch
          </a>
        </div>

      </div>
    </main>
  );
}