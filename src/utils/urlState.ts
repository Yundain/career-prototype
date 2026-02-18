export function encodeStateToParams(
  selectedInterests: number[],
  answers: Record<number, number>
): string {
  const p = new URLSearchParams();
  if (selectedInterests.length) p.set('i', selectedInterests.join(','));
  const pairs = Object.entries(answers)
    .map(([k, v]) => `${k}:${v}`)
    .join(',');
  if (pairs) p.set('a', pairs);
  return p.toString();
}

export function decodeStateFromParams(search: string): {
  selectedInterests: number[];
  answers: Record<number, number>;
} | null {
  const p = new URLSearchParams(search);
  const i = p.get('i');
  const a = p.get('a');
  if (!i) return null;

  const selectedInterests = i.split(',').map(Number).filter((n) => !isNaN(n) && n > 0);
  const answers: Record<number, number> = {};
  if (a) {
    a.split(',').forEach((pair) => {
      const [k, v] = pair.split(':').map(Number);
      if (!isNaN(k) && !isNaN(v)) answers[k] = v;
    });
  }
  return { selectedInterests, answers };
}
