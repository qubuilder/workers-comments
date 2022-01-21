module.exports = {
  siteMetadata: {
    siteTitle: `Workers Comments Docs`,
    defaultTitle: `Workers Comments Docs`,
    siteTitleShort: `Workers Comments Docs`,
    siteDescription: `Simple Comments API you can host yourself on cloudflare workers.`,
    siteUrl: `https://comments.qubs.space`,
    siteAuthor: `@qubuilder`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    themeColor: `#8257E6`,
    basePath: `/`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        repositoryUrl: `https://github.com/qubuilder/workers-comments`,
        baseDir: `docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Workers Comments Docs`,
        short_name: `Workers Comments Docs`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `YOUR_ANALYTICS_ID`,
    //   },
    // },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://comments.qubs.space`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`
  ],
};
