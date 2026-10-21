// Baut eine Unterseite im Design der Landingpage (src/landingpage/index.html):
// Head, Kopfzeile, Kontakt-Block und Footer werden von dort übernommen, der
// Inhalt der Seite kommt als HTML-Fragment dazwischen.
interface Meta {
  title: string;
  description: string;
}

export function baueSeite(landingpage: string, sektion: string, meta: Meta): string {
  const teil = (von: string, bis: string) => {
    const a = landingpage.indexOf(von);
    return landingpage.slice(a, landingpage.indexOf(bis, a) + bis.length);
  };

  // Links auf Abschnitte der Startseite zeigen von hier aus auf "/#...".
  const aufStartseite = (html: string) =>
    html
      .replace(/href="#"/g, 'href="/"')
      .replace(/href="#(?!kontakt)/g, 'href="/#')
      .replace(/src="assets\//g, 'src="/assets/');

  const kopf = landingpage
    .slice(0, landingpage.indexOf('</head>'))
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta.description}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${meta.title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${meta.description}">`);

  const header = aufStartseite(teil('<header', '</header>'));
  const kontaktUndFooter = aufStartseite(
    landingpage.slice(
      landingpage.indexOf('  <!-- ── FINAL CTA'),
      landingpage.indexOf('</footer>') + '</footer>'.length
    )
  );

  return `${kopf}</head>
<body>
<div lang="de" style="width: 100%;">
${header}
${sektion}
${kontaktUndFooter}
</div>
</body>
</html>`;
}
