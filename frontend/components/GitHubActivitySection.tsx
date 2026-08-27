import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import GitHubActivity from "./GitHubActivity";

export default function GitHubActivitySection() {
  return (
    <section className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="activity" title="What I've been up to" />
        <GitHubActivity />
      </Reveal>
    </section>
  );
}
