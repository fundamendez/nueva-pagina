import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type { LoadContext, Plugin } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { readdirSync, readFileSync, existsSync, statSync } from "fs";
import { join, extname } from "path";
import { getCronogramaDataForPlugin, DEFAULT_YEAR } from "./lib/cronograma/parse";
import { getBadgeVariant, getModalityVariant } from "./lib/cronograma/html";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "FundaMendez",
  tagline: "Fundamentos de Programación - FIUBA - Curso Mendez",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://fundamendez.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/nueva-pagina/",

  // GitHub pages deployment config.
  organizationName: "fundamendez",
  projectName: "nueva-pagina",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  plugins: [
    async function pluginMaterialFiles(context: LoadContext): Promise<Plugin> {
      return {
        name: "plugin-material-files",
        async loadContent() {
          const materialDir = join(context.siteDir, "static", "material");
          if (!existsSync(materialDir)) return [];

          function sortByPrefix(a: string, b: string) {
            const numA = parseInt(a.split("_")[0] ?? "0", 10);
            const numB = parseInt(b.split("_")[0] ?? "0", 10);
            return numA - numB;
          }

          function stripPrefix(name: string) {
            return name.replace(/^\d+_/, "");
          }

          // Discover categories from subdirectories
          const categories = readdirSync(materialDir)
            .filter(
              (entry) =>
                !entry.startsWith(".") &&
                statSync(join(materialDir, entry)).isDirectory(),
            )
            .sort(sortByPrefix);

          function scanDir(dirPath: string) {
            if (!existsSync(dirPath)) return [];
            return readdirSync(dirPath)
              .filter((f) => !f.startsWith("."))
              .sort(sortByPrefix)
              .map((name) => ({
                name,
                extension: extname(name).slice(1).toUpperCase(),
              }));
          }

          return categories.map((cat) => ({
            name: stripPrefix(cat),
            dir: cat,
            files: scanDir(join(materialDir, cat)),
          }));
        },
        async contentLoaded({ content, actions }) {
          actions.setGlobalData(content);
        },
      };
    },
    async function pluginCronograma(context: LoadContext): Promise<Plugin> {
      return {
        name: "plugin-cronograma",
        async loadContent() {
          const csvPath = join(context.siteDir, "data", "cronograma.csv");
          if (!existsSync(csvPath)) {
            return { rows: [], startDate: null, endDate: null };
          }
          const content = readFileSync(csvPath, "utf-8");
          const data = getCronogramaDataForPlugin(content, DEFAULT_YEAR);
          const rows = data.rows.map((row) => ({
            weekLabel: row.weekLabel,
            theory: {
              date: row.theory.date,
              modality: row.theory.modality,
              modalityVariant: getModalityVariant(row.theory.modality),
              topicLines: row.theory.topicLines,
              badgeItems: row.theory.badgeLabels.map((label) => ({
                label,
                variant: getBadgeVariant(label),
              })),
            },
            practice: {
              date: row.practice.date,
              modality: row.practice.modality,
              modalityVariant: getModalityVariant(row.practice.modality),
              topicLines: row.practice.topicLines,
              badgeItems: row.practice.badgeLabels.map((label) => ({
                label,
                variant: getBadgeVariant(label),
              })),
            },
          }));
          return {
            rows
          };
        },
        async contentLoaded({ content, actions }) {
          actions.setGlobalData(content);
        },
      };
    },
  ],

  presets: [
    [
      "classic",

      {
        // If enabled, usefule information is displayed in `/__docusaurus/debug`
        debug: process.env.NODE_ENV !== "production",
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    navbar: {
      title: "FundaMendez",
      logo: {
        alt: "Logo FundaMendez",
        src: "img/dona.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Apuntes",
        },
        {
          to: "/material",
          label: "Material",
          position: "left",
        },
        {
          to: "/cronograma",
          label: "Cronograma",
          position: "left",
        },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `Hecho con ❤️ por el equipo de FundaMendez.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

