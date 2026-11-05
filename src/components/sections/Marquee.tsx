const ITEMS = ["NAMMA DABBA", "GOOD FOOD", "HAPPY MOOD", "HOME-STYLE TIFFIN", "HSR LAYOUT", "FRESHLY PREPARED"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="max-w-full overflow-hidden bg-tomato text-cream" aria-hidden="true">
      <div className="marquee-track py-3 md:py-4">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-4 flex items-center gap-4 text-xl font-bold md:text-2xl">
            {item}
            <span className="text-haldi">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
