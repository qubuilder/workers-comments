import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '@rocketseat/gatsby-theme-docs/src/components/Layout';
import SEO from '@rocketseat/gatsby-theme-docs/src/components/SEO';
import EditGithub from '@rocketseat/gatsby-theme-docs/src/components/Docs/EditGithub';
import PostNav from '@rocketseat/gatsby-theme-docs/src/components/Docs/PostNav';
import Comments from '../../../../components/Comments';

export default function Docs({ mdx, pageContext }) {
  const { prev, next, repositoryEditUrl, repositoryProvider } = pageContext;
  const { title, description, image, disableTableOfContents } = mdx.frontmatter;
  const { headings, body } = mdx;
  const { slug } = mdx.fields;

  console.log('wtf');

  return (
    <>
      <SEO title={title} description={description} slug={slug} image={image} />
      <Layout disableTableOfContents={disableTableOfContents} title={title} headings={headings}>
        <MDXRenderer>{body}</MDXRenderer>
        <EditGithub repositoryEditUrl={repositoryEditUrl} repositoryProvider={repositoryProvider} />
        <PostNav prev={prev} next={next} />
        <Comments article={slug} />
      </Layout>
    </>
  );
}

Docs.propTypes = {
  mdx: PropTypes.shape({
    body: PropTypes.string,
    headings: PropTypes.array,
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      disableTableOfContents: PropTypes.bool,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    prev: PropTypes.shape({}),
    next: PropTypes.shape({}),
    repositoryEditUrl: PropTypes.string,
    repositoryProvider: PropTypes.string,
  }).isRequired,
};
