import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { defaultSchema } from "hast-util-sanitize";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a || []),
      ["rel", "nofollow noopener noreferrer"],
      ["target", "_blank"]
    ]
  }
};

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
