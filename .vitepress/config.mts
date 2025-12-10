import { defineConfig } from 'vitepress'
import { getArticles } from './data/sidebar';

const isCI_GitHub = typeof process.env.GITHUB_REPOSITORY === "string";

export default defineConfig({
  title: "Xinanju Blog",
  description: "Things About Xinanju",

  base: isCI_GitHub ? `/${process.env.GITHUB_REPOSITORY!.split("/")[1]}/` : "/",
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: "📖 Archive",
        link: "/articles/archive",
        activeMatch: "/articles/",
      },
    ],

    sidebar: getArticles(),

    editLink: {
      pattern:
        "https://github.com/Xinanju07/EAP2-Project-4/edit/main/:path",
      text: "Edit Page",
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xinanju07' }
    ]
  }
})
