export const metadata = {
  title: "Ghostopedia",
  description: "Under Construction Ghostopedia page",
};

export default function GhostopediaPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white px-4 py-8 sm:p-8">
      {/* Pulsing golden icon */}
      <div className="text-5xl sm:text-6xl mb-4 animate-pulse" style={{ color: "#d4af37" }}>
        &#x1F52E;{/* crystal ball */}
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold mb-2 tracking-wider text-center" style={{ color: "#d4af37", fontFamily: "Cinzel, serif" }}>
        GHOSTOPEDIA
      </h1>
      <p className="italic mb-6 text-center text-sm sm:text-base" style={{ color: "#c0c0c0" }}>
        The archive is being compiled…
      </p>
      <p className="text-xs sm:text-sm text-center max-w-xs sm:max-w-md" style={{ color: "#888888" }}>
        This archive will eventually link to the completed theoretical database.
      </p>
    </section>
  );
}
