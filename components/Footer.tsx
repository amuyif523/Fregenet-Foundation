export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-ink">Fregenet Foundation</div>
          <div>Serving Ethiopian students since 2004</div>
        </div>
        <div className="flex flex-col items-start gap-1 text-left md:items-end md:text-right">
          <div>Whole-child education for Addis Ababa and Bishoftu students</div>
          <div>Registered Ethiopian Foreign Charity - US 501(c)(3)</div>
        </div>
      </div>
    </footer>
  );
}
