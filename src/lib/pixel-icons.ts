// 16×16 bitmaps for the GEM skin on the landing page.
// x = ink, o = paper, space = transparent. Rows shorter than 16 are padded.
const bitmaps: Record<string, string[]> = {
  video: ['', '', 'xxxxxxxxxxxxxxxx', 'xoooooooooooooox', 'xoooooxoooooooox', 'xoooooxxooooooox', 'xoooooxxxoooooox', 'xoooooxxxxooooox', 'xoooooxxxoooooox', 'xoooooxxooooooox', 'xoooooxoooooooox', 'xoooooooooooooox', 'xxxxxxxxxxxxxxxx', '     xxxxxx     '],
  heart: ['', '   xxx    xxx   ', '  xooox  xooox  ', ' xoooooxxooooox ', ' xoooooooooooox ', ' xoooooooooooox ', '  xoooooooooox  ', '   xoooooooox   ', '    xoooooox    ', '     xoooox     ', '      xoox      ', '       xx       '],
  mic: ['', '      xxxx      ', '     xoooox     ', '     xoooox     ', '     xoooox     ', '     xoooox     ', '     xoooox     ', '     xoooox     ', '  x  xoooox  x  ', '  x   xxxx   x  ', '   xx      xx   ', '    xxxxxxxx    ', '       xx       ', '       xx       ', '    xxxxxxxx    '],
  mail: ['', '', 'xxxxxxxxxxxxxxxx', 'xxooooooooooooxx', 'xoxooooooooooxox', 'xooxooooooooxoox', 'xoooxooooooxooox', 'xooooxooooxoooox', 'xoooooxxxxooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xxxxxxxxxxxxxxxx'],
  doc: ['  xxxxxxxxx     ', '  xoooooooxx    ', '  xoooooooxox   ', '  xoooooooxxxx  ', '  xoooooooooox  ', '  xoxxxxxxxoox  ', '  xoooooooooox  ', '  xoxxxxxxooox  ', '  xoooooooooox  ', '  xoxxxxxxxoox  ', '  xoooooooooox  ', '  xoxxxxooooox  ', '  xoooooooooox  ', '  xxxxxxxxxxxx  '],
  net: ['', '      xxxx      ', '      xoox      ', '      xoox      ', '      xxxx      ', '       xx       ', '       xx       ', '   xxxxxxxxxx   ', '   xx      xx   ', '   xx      xx   ', ' xxxxxx  xxxxxx ', ' xoooox  xoooox ', ' xoooox  xoooox ', ' xxxxxx  xxxxxx '],
  floppy: ['', 'xxxxxxxxxxxxxxx ', 'xxxoooooooxooxxx', 'xxxoooooooxooxxx', 'xxxoooooooxooxxx', 'xxxooooooooooxxx', 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', 'xxooooooooooooxx', 'xxoxxxxxxxxxxoxx', 'xxooooooooooooxx', 'xxoxxxxxxxxoooxx', 'xxooooooooooooxx', 'xxooooooooooooxx', 'xxooooooooooooxx', 'xxxxxxxxxxxxxxxx'],
  trash: ['', '      xxxx      ', ' xxxxxxxxxxxxxx ', ' xoooooooooooox ', ' xxxxxxxxxxxxxx ', '  xoooooooooox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoxooxooxoox  ', '  xoooooooooox  ', '   xxxxxxxxxx   '],
  person: ['', '     xxxxxx     ', '    xoooooox    ', '    xoooooox    ', '    xoooooox    ', '    xoooooox    ', '     xxxxxx     ', '', '   xxxxxxxxxx   ', '  xoooooooooox  ', ' xoooooooooooox ', ' xoooooooooooox ', ' xoooooooooooox ', ' xoooooooooooox ', ' xxxxxxxxxxxxxx '],
  folder: ['', ' xxxxx          ', 'xoooooxxxxxxxxxx', 'xoooooooooooooox', 'xxxxxxxxxxxxxxxx', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xoooooooooooooox', 'xxxxxxxxxxxxxxxx'],
  bubble: ['', ' xxxxxxxxxxxxxx ', 'xoooooooooooooox', 'xooxxxxxxxxxxoox', 'xoooooooooooooox', 'xooxxxxxxxooooox', 'xoooooooooooooox', 'xoooooooooooooox', ' xxxoxxxxxxxxxx ', '   xox          ', '   xx           '],
  lock: ['', '     xxxxxx     ', '    xx    xx    ', '    x      x    ', '    x      x    ', '  xxxxxxxxxxxx  ', '  xoooooooooox  ', '  xooooxxoooox  ', '  xooooxxoooox  ', '  xoooooooooox  ', '  xoooooooooox  ', '  xxxxxxxxxxxx  '],
  cloud: ['', '', '', '', '      xxxx      ', '    xxooooxx    ', '   xoooooooox   ', '  xxooooooooxx  ', ' xoooooooooooox ', 'xoooooooooooooox', 'xoooooooooooooox', ' xxxxxxxxxxxxxx '],
};

// Returns the bitmap as an SVG data URI. Inverted icons get a solid ink
// square with ink and paper swapped, like a selected icon on the GEM desktop.
export function pixelIcon(name: string, inverted = false): string {
  const rows = bitmaps[name] ?? bitmaps.doc;
  const ink = inverted ? '#fff' : '#111';
  const paper = inverted ? '#111' : '#fff';
  let rects = inverted ? '<rect width="16" height="16" fill="#111"/>' : '';
  rows.forEach((row, y) => {
    [...row.padEnd(16).slice(0, 16)].forEach((c, x) => {
      if (c === 'x' || c === 'o') {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c === 'x' ? ink : paper}"/>`;
      }
    });
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">${rects}</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}
