import * as React from "react";
import ReactMarkdown from "react-markdown";
import { NextPage } from "next";
import { MarkdownFile, useLocalMarkdownForm } from "next-tinacms-markdown";
import grayMatter from "gray-matter";

const Post: NextPage<{ post: MarkdownFile }> = props => {
  const [post, form] = useLocalMarkdownForm(props.post, {
    fields: [
      { name: "frontmatter.title", component: "text" },
      { name: "markdownBody", component: "markdown" }
    ]
  });

  return (
    <article>
      <header>
        <h1>{post.frontmatter.title}</h1>
      </header>
      <ReactMarkdown>{post.markdownBody}</ReactMarkdown>
    </article>
  );
};

Post.getInitialProps = async function(ctx) {
  const { slug } = ctx.query;
  const rawContent = await import(`../../content/blog/${slug}.md`);
  const { data: frontmatter = {}, content: markdownBody } = grayMatter(
    rawContent.default
  );

  return {
    post: {
      fileRelativePath: `src/content/blog/${slug}.md`,
      frontmatter,
      markdownBody
    }
  };
};

export default Post;