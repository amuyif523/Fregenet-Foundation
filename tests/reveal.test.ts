import assert from "node:assert";
import test from "node:test";
import { renderMarkdown } from "../lib/markdown";

test("sanitizer still strips scripts after layout additions", async () => {
  const html = await renderMarkdown("<div>safe</div><script>alert('x')</script>");
  assert(!html.includes("<script"), "script tags should be removed");
});
