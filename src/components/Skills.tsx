import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout, Server, Database, Bot, ShieldCheck, Search, Sparkles } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import type { SkillLevel } from '../types';

const categoryIcons: Record<string, typeof Layout> = {
  Layout,
  Server,
  Database,
  Bot,
  ShieldCheck,
};

const levelStyles: Record<SkillLevel, string> = {
  advanced: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
  intermediate: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30',
  growing: 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
};

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryFilters: { id: string; label: string }[] = [
    { id: 'all', label: t.skills.filters.all },
    { id: 'frontend', label: t.skills.filters.frontend },
    { id: 'backend', label: t.skills.filters.backend },
    { id: 'database', label: t.skills.filters.database },
    { id: 'automation', label: t.skills.filters.automation },
    { id: 'engineering', label: t.skills.filters.engineering },
  ];

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => {
        if (selectedCategory === 'all') return true;
        return cat.id === selectedCategory;
      })
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const q = searchQuery.toLowerCase();
        const matchedSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.keyword[language].toLowerCase().includes(q) ||
            t.skills.levels[s.level].toLowerCase().includes(q),
        );
        return {
          ...cat,
          skills: matchedSkills,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [searchQuery, selectedCategory, language, t]);

  return (
    <section id="habilidades" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="skills-title">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
            >
              {t.skills.eyebrow}
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="skills-title"
              className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
            >
              {t.skills.title}
            </motion.h2>
          </div>

          {/* Search Input Filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-apple-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.skills.searchPlaceholder}
              aria-label={t.skills.searchAria}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-apple-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedCategory(filter.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === filter.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group, index) => {
            const Icon = categoryIcons[group.iconName] || Layout;

            return (
              <motion.div
                key={group.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.08 }}
                className="apple-card p-6 sm:p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-apple-text tracking-tight">{group.title[language]}</h3>
                      <p className="text-xs text-apple-secondary line-clamp-1">{group.description[language]}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`p-3 rounded-xl border transition-all ${
                          skill.highlight
                            ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/80 dark:border-indigo-800/40'
                            : 'bg-slate-50/60 dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm text-apple-text flex items-center gap-1.5">
                            {skill.highlight && <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />}
                            {skill.name}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-medium shrink-0 ${levelStyles[skill.level]}`}>
                            {t.skills.levels[skill.level]}
                          </span>
                        </div>
                        <p className="text-[11px] text-apple-secondary mt-1 font-mono leading-tight">
                          {skill.keyword[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 apple-card p-8 border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-apple-secondary">{t.skills.noResults.replace('{query}', searchQuery)}</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 underline"
            >
              {t.skills.clearFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
