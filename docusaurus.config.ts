import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '清华大学自动化系学生科协',
  tagline: 'ASTAers are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://thuasta.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'thuasta', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          editUrl: ({ locale, docPath }) =>
            locale === 'zh' ?
              `https://github.com/thuasta/website/tree/main/docs/${docPath}` : `https://github.com/thuasta/website/tree/main/i18n/en/docusaurus-plugin-content-docs/current/${docPath}`,
          sidebarPath: './src/components/HomepageFeatures/sidebars.ts',
        },
        blog: {
          // editUrl: 'https://github.com/thuasta/website/tree/main/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/thuasta-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '自动化系学生科协',
      logo: {
        alt: '自动化系学生科协',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        { to: '/blog', label: '推送', position: 'left' },
        {
          href: 'https://github.com/thuasta',
          label: 'GitHub',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          html: `
            <a href="https://github.com/thuasta" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="20px" style="vertical-align:text-bottom;"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          `,
        },
        {
          html: `
            <a href="https://space.bilibili.com/676450636" target="_blank" rel="noopener noreferrer" aria-label="Bilibili">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="20px" style="vertical-align:text-bottom;"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M488.6 104.1C505.3 122.2 513 143.8 511.9 169.8V372.2C511.5 398.6 502.7 420.3 485.4 437.3C468.2 454.3 446.3 463.2 419.9 464H92C65.6 463.2 43.8 454.2 26.7 436.8C9.7 419.4 .8 396.5 0 368.2V169.8C.8 143.8 9.7 122.2 26.7 104.1C43.8 87.8 65.6 78.8 92 78H121.4L96.1 52.2C90.3 46.5 87.4 39.2 87.4 30.4C87.4 21.6 90.3 14.3 96.1 8.6C101.8 2.9 109.1 0 117.9 0C126.7 0 134 2.9 139.8 8.6L213.1 78H301.1L375.6 8.6C381.7 2.9 389.2 0 398 0C406.8 0 414.1 2.9 419.9 8.6C425.6 14.3 428.5 21.6 428.5 30.4C428.5 39.2 425.6 46.5 419.9 52.2L394.6 78L423.9 78C450.3 78.8 471.9 87.8 488.6 104.1H488.6zM449.8 173.8C449.4 164.2 446.1 156.4 439.1 150.3C433.9 144.2 425.1 140.9 416.4 140.5H96.1C86.5 140.9 78.6 144.2 72.5 150.3C66.3 156.4 63.1 164.2 62.7 173.8V368.2C62.7 377.4 66 385.2 72.5 391.7C79 398.2 86.9 401.5 96.1 401.5H416.4C425.6 401.5 433.4 398.2 439.7 391.7C446 385.2 449.4 377.4 449.8 368.2L449.8 173.8zM185.5 216.5C191.8 222.8 195.2 230.6 195.6 239.7V273C195.2 282.2 191.9 289.9 185.8 296.2C179.6 302.5 171.8 305.7 162.2 305.7C152.6 305.7 144.7 302.5 138.6 296.2C132.5 289.9 129.2 282.2 128.8 273V239.7C129.2 230.6 132.6 222.8 138.9 216.5C145.2 210.2 152.1 206.9 162.2 206.5C171.4 206.9 179.2 210.2 185.5 216.5H185.5zM377 216.5C383.3 222.8 386.7 230.6 387.1 239.7V273C386.7 282.2 383.4 289.9 377.3 296.2C371.2 302.5 363.3 305.7 353.7 305.7C344.1 305.7 336.3 302.5 330.1 296.2C323.1 289.9 320.7 282.2 320.4 273V239.7C320.7 230.6 324.1 222.8 330.4 216.5C336.7 210.2 344.5 206.9 353.7 206.5C362.9 206.9 370.7 210.2 377 216.5H377z"/></svg>
            </a>
          `,
        },
        {
          html: `
            <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkxMzUyMzU4OQ==" target="_blank" rel="noopener noreferrer" aria-label="WeChat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24px" height="20px" style="vertical-align:text-bottom;"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M385.2 167.6c6.4 0 12.6 .3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2 .1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3 .1 10-9.9 19.6-24.4 19.6z"/></svg>
            </a>
          `,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ASTA. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'cmake', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      ({
        hashed: true,
        language: ["zh", "en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],
};

export default config;
