import { Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { photoRecords } from "../data/homeContent.js";
import SectionTitle from "./SectionTitle.jsx";

export default function HomePhotographySection() {
  return (
    <section id="摄影记录" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle
        eyebrow="摄影记录"
        title="森林、湖泊、水果和小路，都是栗提认真生活的证据"
        action={
          <a
            href="#找到栗提"
            className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
          >
            看看栗提最近在忙什么
            <Camera size={18} />
          </a>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {photoRecords.map((item, index) => (
          <motion.article
            key={item.title}
            className="group overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="overflow-hidden border-b border-line bg-blue-50">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <MapPin size={16} />
                  {item.place}
                </p>
                <span className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted">
                  {item.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold leading-7 text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
