import ScrollReveal from "./ScrollReveal";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const technologies: TechItem[] = [
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "from-indigo-500/20 to-purple-500/20" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "from-orange-500/20 to-red-500/20" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", color: "from-orange-500/20 to-yellow-500/20" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "from-blue-500/20 to-indigo-500/20" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-600/20 to-lime-500/20" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "from-yellow-500/20 to-orange-500/20" },
];

const TechStack = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
      {technologies.map((tech, index) => (
        <ScrollReveal key={tech.name} delay={index * 0.05} direction="scale">
          <div
            className={`group relative p-3 md:p-4 rounded-xl bg-gradient-to-br ${tech.color} border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer aspect-square flex items-center justify-center`}
          >
            <img 
              src={tech.icon} 
              alt={tech.name}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default TechStack;
