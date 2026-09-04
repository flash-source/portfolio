import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import QuoteRotator from "./QuoteRotator";
import { marvelQuotes } from "@/data/quotes";

export default function QuotesSection() {
  return (
    <section className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <QuoteRotator quotes={marvelQuotes} />
      </Reveal>
    </section>
  );
}