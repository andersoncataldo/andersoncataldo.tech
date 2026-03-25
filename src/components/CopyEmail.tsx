import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/projects.css';
import '../styles/scrollbar.css';
import '../styles/animations.css';
import '../styles/hoverEffects.css';
import '../styles/responsive.css';

const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-primary-500/50 transition-all group w-full text-left"
    >
      <div className="bg-primary-500/10 p-4 rounded-2xl text-primary-500 group-hover:scale-110 transition-transform">
        <Mail className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">E-mail</p>
        <p className="text-lg font-medium truncate">{email}</p>
      </div>
      <div className="bg-zinc-800 p-2 rounded-xl text-zinc-400">
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </div>
    </button>
  );
};

export default CopyEmail;
