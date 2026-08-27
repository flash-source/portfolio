import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Neha Goyal",
  description: "Notes on what I'm building.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-content px-6 py-16">
        <p className="mb-2 font-mono text-sm text-accent">Blog</p>
        <h1 className="mb-10 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Notes
        </h1>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-ink-soft">
            Nothing published yet.
          </p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-line/30 pb-8">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <span className="shrink-0 font-mono text-xs text-ink-soft">
                      {post.date}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="mt-2 text-[15px] leading-relaxed text-prose">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  );
}
