/// <reference lib="es5" />
import plugin from 'tailwindcss/plugin';

interface ParsedValue {
  operator: string;
  value1: number;
  value2: number | null;
}

export = plugin(function ({ matchVariant, e }) {
  // Function to parse the bracketed syntax
  const parseValue = (query: string): ParsedValue | null => {
    // Match for <, >, or a range (e.g., 6-8)
    const match = query.match(/(>|<)?(\d+)(?:-(\d+))?/);
    if (match) {
      const operator = match[1] || ''; // Default to empty string if no operator
      const value1 = parseInt(match[2], 10);
      const value2 = match[3] ? parseInt(match[3], 10) : null;

      return { operator, value1, value2 };
    }
    return null;
  };

  const parseSelector = (query: string): string => {
    const parsed = parseValue(query);
    if (!parsed || parsed.value1 === undefined) return ''; // Handle case where parsing fails

    const { operator, value1, value2 } = parsed;

    switch (operator) {
      case '<':
        return `:has(>:nth-last-child(-n+${value1 - 1}):first-child)`;
      case '>':
        return `:has(>:nth-child(${value1 + 1}))`;
      default:
        if (value2 !== null) {
          return `:has(>:nth-last-child(n+${value1}):nth-last-child(-n+${value2}):first-child)`; // Between value1 and value2
        } else {
          return `:has(>:nth-last-child(${value1}):first-child)`; // Exact match
        }
    }
  };

  const extra: any = {
    sort(a, z) {
      const parsedA = parseValue(a.value);
      const parsedZ = parseValue(z.value);
      return (parsedA?.value1 || 0) - (parsedZ?.value1 || 0); // Handle potential undefined
    },
    values: {},
  };

  matchVariant('children', (value) => `&${parseSelector(value)}`, extra);
  matchVariant(
    'group-children',
    (value, { modifier }) =>
      modifier
        ? `:merge(.group\\/${modifier})${parseSelector(value)} &`
        : `:merge(.group)${parseSelector(value)} &`,
    extra,
  );
});
