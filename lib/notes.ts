import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const NOTES_DIR = path.join(process.cwd(), "content/notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
};

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? file,
        date: data.date ?? "",
        tag: data.tag ?? "note",
        excerpt: data.excerpt ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNote(slug: string) {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    tag: data.tag ?? "note",
    html,
  };
}
