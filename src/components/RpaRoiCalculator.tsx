import { useState } from 'react';
import { Calculator, Clock, DollarSign, ShieldAlert, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WHATSAPP_URL } from '../config/links';

export const RpaRoiCalculator = () => {
  const { language } = useLanguage();

  const [monthlyVolume, setMonthlyVolume] = useState<number>(15000);
  const [manualMinutes, setManualMinutes] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(35);

  const monthlyHoursSaved = Math.round((monthlyVolume * manualMinutes) / 60);
  const annualHoursSaved = monthlyHoursSaved * 12;
  const annualFinancialSavings = Math.round(annualHoursSaved * hourlyRate);

  const formattedAnnualSavings = new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: language === 'pt' ? 'BRL' : 'USD',
    maximumFractionDigits: 0,
  }).format(language === 'pt' ? annualFinancialSavings : annualFinancialSavings / 5.5);

  const customWhatsAppUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(
    language === 'pt'
      ? `Olá Anderson, simulei no seu portfólio uma economia estimada de ${formattedAnnualSavings} (${monthlyHoursSaved}h/mês poupadas) com volume de ${monthlyVolume.toLocaleString('pt-BR')} itens. Gostaria de conversar sobre automação!`
      : `Hi Anderson, I calculated an estimated annual savings of ${formattedAnnualSavings} (${monthlyHoursSaved}h/mo saved) on your portfolio simulator. Let's discuss automation!`
  )}`;

  return (
    <div className="mt-12 p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {language === 'pt' ? 'Simulador Interativo SaaS' : 'Interactive SaaS Simulator'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" /> ROI Calculator
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'pt' ? 'Calculadora de ROI de Automação & RPA' : 'Automation & RPA ROI Calculator'}
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            {language === 'pt'
              ? 'Calcule em tempo real o impacto financeiro e operacional que um pipeline automatizado gera na sua empresa.'
              : 'Calculate in real-time the financial and operational impact an automated pipeline delivers to your operations.'}
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Slider 1: Volume */}
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="volume-slider" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'pt' ? 'Volume de Documentos / Mês' : 'Monthly Document Volume'}
              </label>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                {monthlyVolume.toLocaleString()}
              </span>
            </div>
            <input
              id="volume-slider"
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
              <span>1k</span>
              <span>15k (3corações)</span>
              <span>50k</span>
            </div>
          </div>

          {/* Slider 2: Manual Time */}
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="time-slider" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'pt' ? 'Tempo Manual por Item' : 'Manual Time per Item'}
              </label>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                {manualMinutes} min
              </span>
            </div>
            <input
              id="time-slider"
              type="range"
              min="1"
              max="15"
              step="1"
              value={manualMinutes}
              onChange={(e) => setManualMinutes(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
              <span>1 min</span>
              <span>5 min</span>
              <span>15 min</span>
            </div>
          </div>

          {/* Slider 3: Cost */}
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="cost-slider" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'pt' ? 'Custo da Hora Operacional' : 'Hourly Operational Cost'}
              </label>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                {language === 'pt' ? `R$ ${hourlyRate}/h` : `$${hourlyRate}/h`}
              </span>
            </div>
            <input
              id="cost-slider"
              type="range"
              min="15"
              max="120"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
              <span>{language === 'pt' ? 'R$ 15' : '$15'}</span>
              <span>{language === 'pt' ? 'R$ 35' : '$35'}</span>
              <span>{language === 'pt' ? 'R$ 120' : '$120'}</span>
            </div>
          </div>
        </div>

        {/* Calculated Results Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Hours */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200/70 dark:border-indigo-800/50">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'pt' ? 'Horas Poupadas / Mês' : 'Hours Saved / Month'}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {monthlyHoursSaved.toLocaleString()}h
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'pt'
                ? `Equivalente a ${annualHoursSaved.toLocaleString()}h anuais de retrabalho manual eliminadas.`
                : `Equivalent to ${annualHoursSaved.toLocaleString()}h per year of manual labor eradicated.`}
            </p>
          </div>

          {/* Card 2: Financial Savings */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200/70 dark:border-emerald-800/50">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'pt' ? 'Economia Anual Estimada' : 'Estimated Annual Savings'}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {formattedAnnualSavings}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'pt'
                ? 'Retorno direto sobre o investimento em automação.'
                : 'Direct return on automated software investment.'}
            </p>
          </div>

          {/* Card 3: Error Rate */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/40 dark:to-slate-900 border border-cyan-200/70 dark:border-cyan-800/50">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'pt' ? 'Redução de Erro Operacional' : 'Error Reduction Rate'}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              99.85%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'pt'
                ? 'Validação de schemas fiscais SEFAZ e EDI Pharma Link.'
                : 'Automated SEFAZ schemas & EDI Pharma Link validations.'}
            </p>
          </div>
        </div>

        {/* Action Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div>
            <p className="font-bold text-sm sm:text-base">
              {language === 'pt'
                ? `Quer atingir essa eficiência na sua operação?`
                : `Ready to unlock this efficiency in your operations?`}
            </p>
            <p className="text-xs text-slate-400">
              {language === 'pt'
                ? `Anderson Cataldo desenvolve pipelines sob medida em Python, APIs e robôs integrados ao seu ERP.`
                : `Anderson Cataldo delivers custom Python pipelines, robust APIs, and ERP integrations.`}
            </p>
          </div>
          <a
            href={customWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'pt' ? 'Conversar sobre Automação' : 'Discuss Automation'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RpaRoiCalculator;
