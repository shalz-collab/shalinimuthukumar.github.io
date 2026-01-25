import Layout from "@/components/Layout";
import SkillBadge from "@/components/SkillBadge";
import ScrollReveal from "@/components/ScrollReveal";
import grootAvatar from "@/assets/groot-avatar.png";

const skills = [
  "HTML",
  "CSS",
  "TypeScript",
  "React",
  "GIT",
  "Firebase",
  "Python",
  "Node.js",
];

const About = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* About Me */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <ScrollReveal>
              <h1 className="section-title font-mono">Know Me</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-mono">
                  I'm a passionate creative developer with experience building
                  digital products that users love. I believe in the power of
                  good design and clean code to solve real problems.
                </p>
                <p className="font-mono">
                  When I'm not coding, you'll find me exploring new design
                  trends, contributing to open-source projects, or sharing my
                  knowledge through writing and speaking at conferences.
                </p>
                <p className="font-mono">
                  I'm always excited to work on projects that challenge me to
                  grow and learn something new. Currently exploring the
                  intersection of AI and healthcare with my upcoming project,
                  PreCare.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      alt="Groot avatar"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      draggable={false}
                      src={grootAvatar}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-glow" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary/60 rounded-full" />
                  <div className="absolute top-1/2 -right-8 w-3 h-3 border border-primary rounded-full" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Languages & Technologies */}
          <ScrollReveal delay={0.1}>
            <div className="mb-20">
              <h2 className="section-title font-mono">
                Languages & Technologies
              </h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Developer
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <ScrollReveal
                      key={skill}
                      delay={index * 0.05}
                      direction="scale"
                    >
                      <SkillBadge skill={skill} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Experience Timeline */}
          <ScrollReveal delay={0.2}>
            <h2 className="section-title">Experience</h2>
            <div className="space-y-8">
              <ScrollReveal delay={0.3} direction="left" className="">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot">​2025</div>
                    <div className="w-px h-full bg-border mt-4" />
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-semibold text-foreground font-mono">
                      Developer
                    </h3>
                    <p className="text-primary text-sm mb-2">
                      Building innovative projects
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed font-mono">
                      Currently working on PreCare — an Agentic AI project for
                      pregnant women's healthcare. Focused on creating
                      intelligent systems that provide proactive care and
                      automate medical report analysis.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="left">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot">2024</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground font-mono">
                      Full Stack Developer
                    </h3>
                    <p className="text-primary text-sm mb-2">
                      Web Development & UI/UX
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed font-mono">
                      Built multiple projects including Homomorphic Data Spark
                      for privacy-preserving analytics, portfolio websites, and
                      mobile app prototypes. Specialized in React, TypeScript,
                      and modern web technologies.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
