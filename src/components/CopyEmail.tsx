import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';

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
      className="flex items-center gap-4 p-6 apple-card rounded-3xl hover:shadow-lg transition-all group w-full text-left"
      aria-label={`Copiar e-mail: ${email}`}
    >
      <div className="bg-apple-accent/10 p-4 rounded-2xl text-apple-accent group-hover:scale-110 transition-transform" aria-hidden="true">
        <Mail className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-apple-secondary uppercase tracking-widest">E-mail</p>
        <p className="text-lg font-medium truncate">{email}</p>
      </div>
      <div 
        className="bg-apple-bg p-2 rounded-xl text-apple-secondary" 
        role="status" 
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span className="sr-only">E-mail copiado!</span>
          </>
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
      </div>
    </button>
  );
};

export default CopyEmail;
