import assert from "node:assert";
import test from "node:test";
import { renderMarkdown } from "../lib/markdown";

test("strips script tags and event handlers", async () => {
  const html = await renderMarkdown(`Hello <script>alert('xss')</script> <img src="x" onerror="alert(1)">`);
  assert(!html.includes("<script"), "script tags should be removed");
  assert(!html.includes("onerror"), "event handlers should be removed");
  assert(html.includes("Hello"), "content should remain");
});

test("keeps basic formatting", async () => {
  const html = await renderMarkdown("**Bold** and [Link](https://example.com)");
  assert(html.includes("<strong>Bold</strong>"), "bold formatting should remain");
  assert(html.includes("<a"), "links should remain");
});
