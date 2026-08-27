import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return { title: `${post.title} — Neha Goyal`, description: post.excerpt };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <article className="mx-auto max-w-content px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-ink-soft transition-colors hover:text-accent"
        >
          <LuArrowLeft className="h-3.5 w-3.5" /> All notes
        </Link>
        <p className="mb-2 font-mono text-xs text-ink-soft">{post.date}</p>
        <h1 className="mb-8 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {post.title}
        </h1>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-prose prose-strong:text-ink prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-card-alt prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-line/40 prose-pre:bg-card prose-blockquote:border-accent prose-blockquote:text-ink-soft prose-li:text-prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <Footer />
    </main>
  );
}
