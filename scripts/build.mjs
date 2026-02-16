import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const pages = [
  {
    slug: "",
    key: "home",
    type: "home",
    pageId: 2,
    title: "Boken Mitt Hjärta",
    heading: "Välkommen",
    canonical: "/",
    bodyClass: "home page page-id-2 custom-background",
    description:
      "Boken Mitt Hjärta är en berättelse om kärlek, kamp och livet i skuggan av sjukdom.",
    ogType: "website",
  },
  {
    slug: "sten",
    key: "sten",
    type: "inner",
    pageId: 37,
    title: "Varför jag skrev boken &#8211; Boken Mitt Hjärta",
    heading: "Varför jag skrev boken",
    canonical: "/sten/",
    bodyClass: "page page-id-37 custom-background",
    description:
      "Sten Jeansson berättar varför han skrev boken Mitt Hjärta och om resan bakom berättelsen.",
    ogType: "article",
  },
  {
    slug: "birgitta",
    key: "birgitta",
    type: "inner",
    pageId: 35,
    title: "Birgitta &#8211; Boken Mitt Hjärta",
    heading: "Birgitta",
    canonical: "/birgitta/",
    bodyClass: "page page-id-35 custom-background",
    description:
      "Läs om Birgitta, hennes liv och den personliga berättelsen som boken Mitt Hjärta bygger på.",
    ogType: "article",
  },
  {
    slug: "medicin",
    key: "medicin",
    type: "inner",
    pageId: 43,
    title: "Medicinska frågor som berörs i boken &#8211; Boken Mitt Hjärta",
    heading: "Medicinska frågor som berörs i boken",
    canonical: "/medicin/",
    bodyClass: "page page-id-43 custom-background",
    description:
      "Medicinska frågor, källor och länkar relaterade till sjukdomstemat i boken Mitt Hjärta.",
    ogType: "article",
  },
  {
    slug: "lasarkommentarer",
    key: "lasarkommentarer",
    type: "inner",
    pageId: 39,
    title: "Läsarkommentarer &#8211; Boken Mitt Hjärta",
    heading: "Läsarkommentarer",
    canonical: "/lasarkommentarer/",
    bodyClass: "page page-id-39 custom-background",
    description:
      "Ta del av läsarkommentarer och reaktioner på boken Mitt Hjärta.",
    ogType: "article",
  },
  {
    slug: "lasarservice",
    key: "lasarservice",
    type: "inner",
    pageId: 41,
    title: "Läsarservice &#8211; Boken Mitt Hjärta",
    heading: "Läsarservice",
    canonical: "/lasarservice/",
    bodyClass: "page page-id-41 custom-background",
    description:
      "Information om läsarservice, stöd och kontaktmöjligheter kopplade till boken Mitt Hjärta.",
    ogType: "article",
  },
  {
    slug: "kop",
    key: "kop",
    type: "inner",
    pageId: 45,
    title: "Köp boken! &#8211; Boken Mitt Hjärta",
    heading: "Köp boken!",
    canonical: "/kop/",
    bodyClass: "page page-id-45 custom-background",
    description:
      "Köp boken Mitt Hjärta via återförsäljare eller beställ direkt från författaren.",
    ogType: "product",
  },
  {
    slug: "kontakt",
    key: "kontakt",
    type: "inner",
    pageId: 47,
    title: "Kontakt &#8211; Boken Mitt Hjärta",
    heading: "Kontakt",
    canonical: "/kontakt/",
    bodyClass: "page page-id-47 custom-background",
    description:
      "Kontaktuppgifter för frågor och funderingar om boken Mitt Hjärta.",
    ogType: "article",
  },
];

const topMenu = [
  { key: "home", id: 56, pageId: 2, href: "/", label: "Välkommen", home: true },
  {
    key: "info",
    id: 17,
    href: "#",
    label: "Info",
    children: [
      {
        key: "sten",
        id: 54,
        pageId: 37,
        href: "/sten/",
        label: "Varför jag skrev boken",
      },
      { key: "birgitta", id: 55, pageId: 35, href: "/birgitta/", label: "Birgitta" },
      {
        key: "medicin",
        id: 51,
        pageId: 43,
        href: "/medicin/",
        label: "Medicinska frågor",
      },
    ],
  },
  {
    key: "lasarkommentarer",
    id: 53,
    pageId: 39,
    href: "/lasarkommentarer/",
    label: "Läsarkommentarer",
  },
  { key: "lasarservice", id: 52, pageId: 41, href: "/lasarservice/", label: "Läsarservice" },
  { key: "kop", id: 50, pageId: 45, href: "/kop/", label: "Köp boken!" },
  { key: "kontakt", id: 49, pageId: 47, href: "/kontakt/", label: "Kontakt" },
];

const footerMenu = [
  { key: "birgitta", pageId: 35, href: "/birgitta/", label: "Birgitta" },
  { key: "kontakt", pageId: 47, href: "/kontakt/", label: "Kontakt" },
  { key: "kop", pageId: 45, href: "/kop/", label: "Köp boken!" },
  { key: "lasarkommentarer", pageId: 39, href: "/lasarkommentarer/", label: "Läsarkommentarer" },
  { key: "lasarservice", pageId: 41, href: "/lasarservice/", label: "Läsarservice" },
  {
    key: "medicin",
    pageId: 43,
    href: "/medicin/",
    label: "Medicinska frågor som berörs i boken",
  },
  { key: "home", pageId: 2, href: "/", label: "Välkommen" },
  { key: "sten", pageId: 37, href: "/sten/", label: "Varför jag skrev boken" },
];

const innerPagesInInfo = new Set(["sten", "birgitta", "medicin"]);

function renderMainMenu(activeKey) {
  const infoActive = innerPagesInInfo.has(activeKey);
  const html = topMenu
    .map((item) => {
      if (item.key === "info") {
        const classes = [
          "menu-item",
          "menu-item-type-custom",
          "menu-item-object-custom",
          ...(infoActive ? ["current-menu-ancestor", "current-menu-parent"] : []),
          "menu-item-has-children",
          `menu-item-${item.id}`,
        ].join(" ");

        const children = item.children
          .map((child) => {
            const isCurrent = child.key === activeKey;
            const childClasses = [
              "menu-item",
              "menu-item-type-post_type",
              "menu-item-object-page",
              ...(isCurrent
                ? ["current-menu-item", "page_item", `page-item-${child.pageId}`, "current_page_item"]
                : []),
              `menu-item-${child.id}`,
            ].join(" ");
            const aria = isCurrent ? ' aria-current="page"' : "";
            return `\t<li id="menu-item-${child.id}" class="${childClasses}"><a href="${child.href}"${aria}>${child.label}</a></li>`;
          })
          .join("\n");

        return `<li id="menu-item-${item.id}" class="${classes}">
<a href="#">Info</a>
<ul class="sub-menu">
${children}
</ul>
</li>`;
      }

      const isCurrent = item.key === activeKey;
      const classes = [
        "menu-item",
        "menu-item-type-post_type",
        "menu-item-object-page",
        ...(item.home ? ["menu-item-home"] : []),
        ...(isCurrent ? ["current-menu-item", "page_item", `page-item-${item.pageId}`, "current_page_item"] : []),
        `menu-item-${item.id}`,
      ].join(" ");
      const aria = isCurrent ? ' aria-current="page"' : "";
      return `<li id="menu-item-${item.id}" class="${classes}"><a href="${item.href}"${aria}>${item.label}</a></li>`;
    })
    .join("\n");

  return `<div class="menu-top-container"><ul id="primary-menu" class="menu">
${html}
</ul></div>`;
}

function renderFooterMenu(activeKey) {
  const html = footerMenu
    .map((item) => {
      const isCurrent = item.key === activeKey;
      const classes = ["page_item", `page-item-${item.pageId}`, ...(isCurrent ? ["current_page_item"] : [])].join(
        " "
      );
      const aria = isCurrent ? ' aria-current="page"' : "";
      return `<li class="${classes}"><a href="${item.href}"${aria}>${item.label}</a></li>`;
    })
    .join("\n");

  return `<div id="footer-menu" class="menu"><ul>
${html}
</ul></div>`;
}

function replaceOne(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`Failed replacement for ${label}`);
  }
  return html.replace(regex, replacement);
}

function addExternalLinkAttrs(html) {
  return html.replace(/<a\b([^>]*?)>/gi, (fullMatch, attrs) => {
    const hrefMatch = attrs.match(/\bhref="([^"]+)"/i);
    if (!hrefMatch) {
      return fullMatch;
    }

    const href = hrefMatch[1];
    if (!/^https?:\/\//i.test(href)) {
      return fullMatch;
    }

    let nextAttrs = attrs;

    if (!/\btarget=/i.test(nextAttrs)) {
      nextAttrs += ' target="_blank"';
    }

    const relMatch = nextAttrs.match(/\brel="([^"]*)"/i);
    if (!relMatch) {
      nextAttrs += ' rel="noopener noreferrer"';
    } else {
      const relValues = relMatch[1].split(/\s+/).filter(Boolean);
      if (!relValues.includes("noopener")) {
        relValues.push("noopener");
      }
      if (!relValues.includes("noreferrer")) {
        relValues.push("noreferrer");
      }
      nextAttrs = nextAttrs.replace(/\brel="([^"]*)"/i, `rel="${relValues.join(" ")}"`);
    }

    return `<a${nextAttrs}>`;
  });
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSeoBlock(page, origin) {
  const titleText = decodeHtmlEntities(page.title);
  const canonicalUrl = page.canonical === "/" ? origin : `${origin}${page.canonical}`;
  const imageUrl = `${origin}/assets/img/omslag3d.jpg`;
  const descriptionText = page.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": page.canonical === "/" ? "WebSite" : "WebPage",
    name: titleText,
    url: canonicalUrl,
    inLanguage: "sv-SE",
    description: page.description,
  };

  return [
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    `<meta name="description" content="${escapeHtmlAttr(descriptionText)}">`,
    '<link rel="alternate" hreflang="sv-SE" href="' + canonicalUrl + '">',
    '<link rel="alternate" hreflang="x-default" href="' + canonicalUrl + '">',
    `<meta property="og:title" content="${escapeHtmlAttr(titleText)}">`,
    `<meta property="og:description" content="${escapeHtmlAttr(descriptionText)}">`,
    '<meta property="og:site_name" content="Boken Mitt Hjärta">',
    `<meta property="og:type" content="${page.ogType || "website"}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    '<meta property="og:image:alt" content="Omslag till boken Mitt Hjärta">',
    '<meta property="og:locale" content="sv_SE">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtmlAttr(titleText)}">`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(descriptionText)}">`,
    `<meta name="twitter:url" content="${canonicalUrl}">`,
    `<meta name="twitter:image" content="${imageUrl}">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n");
}

async function buildPage(page, homeSeed, innerSeed) {
  const template = page.type === "home" ? homeSeed : innerSeed;
  const contentPath = path.join(ROOT, "src", "content", `${page.key}.html`);
  const entryContent = (await readFile(contentPath, "utf8")).trim();
  const articleClass = `post-${page.pageId} page type-page status-publish hentry clearfix`;
  const origin = await getSiteOrigin();
  const canonicalUrl = page.canonical === "/" ? origin : `${origin}${page.canonical}`;

  let html = template;
  html = replaceOne(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`, "title");
  html = replaceOne(
    html,
    /<meta name="robots" content="[^"]+">/,
    buildSeoBlock(page, origin),
    "seo-meta"
  );
  html = replaceOne(
    html,
    /<link rel="canonical" href="[^"]+">/,
    `<link rel="canonical" href="${canonicalUrl}">`,
    "canonical"
  );
  html = replaceOne(html, /<body class="[^"]+">/, `<body class="${page.bodyClass}">`, "body-class");
  html = replaceOne(
    html,
    /<article id="post-\d+" class="[^"]+">/,
    `<article id="post-${page.pageId}" class="${articleClass}">`,
    "article"
  );
  html = replaceOne(
    html,
    /<h1 class="entry-title">[\s\S]*?<\/h1>/,
    `<h1 class="entry-title">${page.heading}</h1>`,
    "entry-title"
  );
  html = replaceOne(
    html,
    /<div class="entry-content">[\s\S]*?<\/div>\s*<!-- \.entry-content -->/,
    `<div class="entry-content">\n\t\t${entryContent.replace(/\n/g, "\n\t\t")}\n\t</div>\n<!-- .entry-content -->`,
    "entry-content"
  );

  const navRegex = /<div class="menu-top-container"><ul id="primary-menu" class="menu">[\s\S]*?<\/ul><\/div>/;
  html = replaceOne(html, navRegex, renderMainMenu(page.key), "main-menu");
  const footerRegex = /<div id="footer-menu" class="menu"><ul>[\s\S]*?<\/ul><\/div>/;
  html = replaceOne(html, footerRegex, renderFooterMenu(page.key), "footer-menu");
  html = addExternalLinkAttrs(html);

  const outPath =
    page.slug === "" ? path.join(ROOT, "index.html") : path.join(ROOT, page.slug, "index.html");
  await writeFile(outPath, html, "utf8");
}

async function getSiteOrigin() {
  try {
    const cname = (await readFile(path.join(ROOT, "CNAME"), "utf8")).trim();
    if (cname) {
      return `https://${cname}`;
    }
  } catch {
    // Ignore and fall back to default origin.
  }
  return "https://www.bokenmitthjarta.se";
}

async function buildSitemap() {
  const origin = await getSiteOrigin();
  const urls = pages.map((page) => {
    const loc = page.canonical === "/" ? origin : `${origin}${page.canonical}`;
    return `  <url><loc>${loc}</loc></url>`;
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  await writeFile(path.join(ROOT, "sitemap.xml"), xml, "utf8");
}

async function buildRobotsTxt() {
  const origin = await getSiteOrigin();
  const content = [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${origin}/sitemap.xml`, ``].join("\n");
  await writeFile(path.join(ROOT, "robots.txt"), content, "utf8");
}

async function main() {
  const homeSeed = await readFile(path.join(ROOT, "src", "templates", "home.seed.html"), "utf8");
  const innerSeed = await readFile(path.join(ROOT, "src", "templates", "inner.seed.html"), "utf8");

  for (const page of pages) {
    await buildPage(page, homeSeed, innerSeed);
  }
  await buildSitemap();
  await buildRobotsTxt();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
