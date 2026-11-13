import knowledgeData from '../../data/knowledgeIndex.json';
import { normalizeText } from './guardrails';
import type { KnowledgeIndexFile } from './types';

const index = knowledgeData as unknown as KnowledgeIndexFile;

/** Termos de domÃ­nio extras que merecem correÃ§Ã£o ortogrÃ¡fica (sem acentos, minÃºsculos) */
const EXTRA_VOCABULARY = [
  'anderson',
  'cataldo',
  'experiencia',
  'certificacao',
  'faculdade',
  'universidade',
  'curriculo',
  'linkedin',
  'github',
  'whatsapp',
  'automacao',
  'arquitetura',
  'semestre',
  'portfolio',
  'portifolio',
  'inteligencia',
];

function buildVocabulary(): string[] {
  const words = new Set<string>(EXTRA_VOCABULARY);
  for (const tech of index.knownTechnologies) {
    const norm = normalizeText(tech);
    // Apenas termos de uma palavra, sem pontuaÃ§Ã£o especial (ex.: "typescript", "playwright")
    if (/^[a-z]{6,}$/.test(norm)) words.add(norm);
  }
  return Array.from(words);
}

const VOCABULARY = buildVocabulary();
const VOCABULARY_SET = new Set(VOCABULARY);

/**
 * DistÃ¢ncia de Damerau-Levenshtein restrita (OSA): inserÃ§Ã£o, remoÃ§Ã£o, substituiÃ§Ã£o e transposiÃ§Ã£o
 * adjacente contam como 1 ediÃ§Ã£o. Interrompe cedo ao ultrapassar o limite.
 */
export function editDistance(a: string, b: string, maxDistance: number): number {
  if (Math.abs(a.length - b.length) > maxDistance) return maxDistance + 1;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));
  for (let i = 0; i < rows; i += 1) d[i][0] = i;
  for (let j = 0; j < cols; j += 1) d[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    let rowMin = Number.POSITIVE_INFINITY;
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, d[i - 2][j - 2] + 1);
      }
      d[i][j] = value;
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > maxDistance) return maxDistance + 1;
  }
  return d[a.length][b.length];
}

/**
 * Corrige erros de digitaÃ§Ã£o em termos do domÃ­nio do portfÃ³lio (ex.: "pythom" -> "python",
 * "typscript" -> "typescript") sem tocar em palavras comuns ou desconhecidas.
 * SÃ³ corrige quando hÃ¡ um Ãºnico candidato mais prÃ³ximo (evita correÃ§Ãµes ambÃ­guas).
 */
export function correctDomainTypos(rawQuery: string): string {
  return rawQuery.replace(/[\p{L}\p{N}]+/gu, (word) => {
    const norm = normalizeText(word);
    if (norm.length < 6 || VOCABULARY_SET.has(norm) || /\d/.test(norm)) return word;

    const maxDistance = norm.length >= 9 ? 2 : 1;
    let best: string | null = null;
    let bestDistance = maxDistance + 1;
    let tie = false;

    for (const candidate of VOCABULARY) {
      const dist = editDistance(norm, candidate, maxDistance);
      if (dist < bestDistance) {
        best = candidate;
        bestDistance = dist;
        tie = false;
      } else if (dist === bestDistance && dist <= maxDistance && candidate !== best) {
        tie = true;
      }
    }

    return best && !tie ? best : word;
  });
}
