import { useEffect, useState } from "react";
import { Calendar, Clock, ExternalLink, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  url: string;
  cover_image: string | null;
  user: {
    name: string;
    profile_image: string;
  };
}

const getCategoryColor = (tag: string) => {
  const colors: Record<string, string> = {
    javascript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    react: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    webdev: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ai: "bg-green-500/10 text-green-400 border-green-500/20",
    machinelearning: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    python: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    typescript: "bg-blue-600/10 text-blue-500 border-blue-600/20",
    programming: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    tutorial: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    beginners: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  };
  return colors[tag.toLowerCase()] || "bg-primary/10 text-primary border-primary/20";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Blog = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch top articles from dev.to (free API, no key needed)
      const response = await fetch(
        "https://dev.to/api/articles?per_page=12&top=7"
      );
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Layout>
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Tech Blog</h1>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Latest updates, tutorials, and insights from the developer community.
                Powered by dev.to — auto-updated with fresh content daily.
              </p>
              {lastUpdated && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
                  <span className="text-xs text-muted-foreground">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={fetchArticles}
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50 w-fit"
                  >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                    Refresh
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {loading && articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading latest articles...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchArticles}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {articles[0] && (
                <ScrollReveal delay={0.1}>
                  <div className="mb-8 sm:mb-12">
                    <a
                      href={articles[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block project-card group p-4 sm:p-6 md:p-8 cursor-pointer hover:border-primary/50 transition-all"
                    >
                      {articles[0].cover_image && (
                        <img
                          src={articles[0].cover_image}
                          alt={articles[0].title}
                          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg mb-4 sm:mb-6"
                        />
                      )}
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {articles[0].tag_list.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`inline-block px-2 sm:px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors leading-tight">
                        {articles[0].title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-3xl text-sm sm:text-base line-clamp-3">
                        {articles[0].description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <img
                              src={articles[0].user.profile_image}
                              alt={articles[0].user.name}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                            />
                            <span className="truncate max-w-[100px] sm:max-w-none">{articles[0].user.name}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                            {formatDate(articles[0].published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
                            {articles[0].reading_time_minutes} min
                          </span>
                        </div>
                        <span className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all text-sm">
                          Read Article
                          <ExternalLink size={16} />
                        </span>
                      </div>
                    </a>
                  </div>
                </ScrollReveal>
              )}

              {/* Other Posts Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {articles.slice(1).map((article, index) => (
                  <ScrollReveal key={article.id} delay={(index + 2) * 0.05}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block project-card group h-full cursor-pointer hover:border-primary/50 transition-all"
                    >
                      {article.cover_image && (
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-full h-32 sm:h-36 object-cover rounded-lg mb-3 sm:mb-4"
                        />
                      )}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        {article.tag_list.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={`inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full border ${getCategoryColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} className="sm:w-[12px] sm:h-[12px]" />
                            {formatDate(article.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} className="sm:w-[12px] sm:h-[12px]" />
                            {article.reading_time_minutes} min
                          </span>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <ScrollReveal delay={0.6}>
            <div className="text-center mt-12 sm:mt-16">
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                Want to collaborate or discuss ideas?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] text-sm sm:text-base"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
