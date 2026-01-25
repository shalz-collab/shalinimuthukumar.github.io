import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import NebulaRush from "@/components/NebulaRush";
const Contact = () => {
  return <Layout>
      <section className="py-20 min-h-[calc(100vh-12rem)]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="section-title font-mono">Get in Touch</h1>
              <p className="text-muted-foreground leading-relaxed font-mono">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-lg mx-auto">
            <div className="space-y-6">
              {/* Email */}
              <ScrollReveal delay={0.1} direction="left">
                <a href="mailto:shalinimuthukumar1434@gmail.com" className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Email</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors font-mono">
                      shalinimuthukumar1434@gmail.com
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* Phone */}
              <ScrollReveal delay={0.2} direction="left">
                <a href="tel:+918220911995" className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Phone</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      +91 82209 11995
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* GitHub */}
              <ScrollReveal delay={0.3} direction="left">
                <a href="https://github.com/shalz-collab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Github className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">GitHub</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors font-mono">
                      github.com/shalz-collab
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* LinkedIn */}
              <ScrollReveal delay={0.4} direction="left">
                <a href="https://www.linkedin.com/in/shalini-mk-b3b67b273" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">LinkedIn</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors font-mono">
                      linkedin.com/in/shalini-mk
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.5}>
              <NebulaRush />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Contact;