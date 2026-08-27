import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Neha Goyal",
  description: "Everything I've shipped, sorted by kind.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-wide px-6 py-16">
        <p className="mb-2 font-mono text-sm text-accent">All projects</p>
        <h1 className="mb-10 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Things I&apos;ve shipped
        </h1>
        <ProjectsClient />
      </div>
      <Footer />
    </main>
  );
}
