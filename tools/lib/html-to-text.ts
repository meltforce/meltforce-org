const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&#x27;": "'",
  "&#x2F;": "/",
};

export function htmlToText(html: string): string {
  let text = html;
  // Convert <br> and <br/> to newlines
  text = text.replace(/<br\s*\/?>/gi, "\n");
  // Convert </p> to double newline (paragraph breaks)
  text = text.replace(/<\/p>/gi, "\n\n");
  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");
  // Decode HTML entities
  text = text.replace(
    /&(?:#x[\da-fA-F]+|#\d+|\w+);/g,
    (match) => ENTITY_MAP[match] ?? match,
  );
  // Decode numeric entities
  text = text.replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(Number(code)),
  );
  text = text.replace(/&#x([\da-fA-F]+);/g, (_, code) =>
    String.fromCharCode(parseInt(code, 16)),
  );
  // Collapse multiple blank lines
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}
