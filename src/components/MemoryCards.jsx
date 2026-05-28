import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

export default function MemoryCards() {
  const values = useMemo(() => ["栗", "提", "R", "i", "t", "星", "花", "月"], []);
  const createCards = () =>
    shuffle([...values, ...values]).map((value, index) => ({
      id: `${value}-${index}-${Math.random()}`,
      value,
      open: false,
      done: false,
    }));

  const [cards, setCards] = useState(createCards);
  const [picked, setPicked] = useState([]);
  const [moves, setMoves] = useState(0);
  const doneCount = cards.filter((card) => card.done).length / 2;

  function reset() {
    setCards(createCards());
    setPicked([]);
    setMoves(0);
  }

  function flip(index) {
    if (cards[index].open || cards[index].done || picked.length === 2) {
      return;
    }

    const next = cards.map((card, cardIndex) => (cardIndex === index ? { ...card, open: true } : card));
    const nextPicked = [...picked, index];
    setCards(next);
    setPicked(nextPicked);

    if (nextPicked.length === 2) {
      setMoves((value) => value + 1);
      window.setTimeout(() => {
        setCards((current) => {
          const [first, second] = nextPicked;
          const matched = current[first].value === current[second].value;

          return current.map((card, cardIndex) => {
            if (cardIndex === first || cardIndex === second) {
              return { ...card, open: matched, done: matched };
            }

            return card;
          });
        });
        setPicked([]);
      }, 560);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">可玩小实验</p>
          <h2 className="text-2xl font-semibold text-ink">记忆翻牌</h2>
          <p className="mt-1 text-sm leading-6 text-muted">翻开两张，相同就留下。已配对 {doneCount}/8。</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Moves {moves}</span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow"
          >
            <RotateCcw size={15} />
            重开
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-lg grid-cols-4 gap-3 rounded-lg bg-cream p-3">
        {cards.map((card, index) => {
          const visible = card.open || card.done;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(index)}
              className={`flex aspect-square items-center justify-center rounded-lg text-2xl font-bold shadow-sm transition duration-300 ${
                visible ? "rotate-0 bg-blue-600 text-white" : "bg-white text-transparent hover:-translate-y-1 hover:bg-blue-50"
              }`}
            >
              {card.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
