import { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

export function getArticles() {
  const articleDir = path.join(process.cwd(), "/articles");

  const dirs: string[] = readdirSync(articleDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => d.name.includes("_"))
    .sort((a, b) => Number(a.name.split("_")[0]) - Number(b.name.split("_")[0]))
    .map((f) => f.name);

  let sidebar: {}[] = [];

  for (const dir of dirs) {
    const group = dir.split("_")[1];

    const fullDir = path.join(articleDir, dir);
    let items = generateItems(fullDir, dir);

    if (items.length == 0) {
      continue;
    }

    const name = group.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    sidebar.push({
      text: name,
      items: items,
      collapsed: name != "Getting Started",
    });
  }

  return sidebar;
}

function generateItems(fullDir: string, dir: string) {
  const articles = readdirSync(fullDir, { withFileTypes: true });

  let items: any[] = [];
  for (var article of articles) {
    const currentPath = path.join(fullDir, article.name);
    if (article.isDirectory() && article.name.toLowerCase() != "assets") {
      items.push({
        text: article.name.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
        items: generateItems(currentPath, `${dir}/${article.name}`),
        collapsed: true,
      });
    }

    if (article.isFile() && article.name.toLowerCase().endsWith(".md")) {
      const { data } = matter.read(currentPath);
      if (data.exclude === true) {
        continue;
      }

      items.push({
        text: data.title.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
        link: `/articles/${dir}/${article.name}`,
        time: +new Date(data.date).getTime(),
      });
    }
  }

  items.sort((a, b) => (a as any).time - (b as any).time);
  return items;
}
