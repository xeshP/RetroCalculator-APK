import { useState } from "react";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1));
  const percent = () => setDisplay(String(parseFloat(display) / 100));

  const calculate = (prev, next, op) => {
    switch (op) {
      case "+": return prev + next;
      case "-": return prev - next;
      case "×": return prev * next;
      case "÷": return next === 0 ? "ERROR" : prev / next;
      default: return next;
    }
  };

  const performOperation = (nextOp) => {
    const inputValue = parseFloat(display);
    if (previous === null) {
      setPrevious(inputValue);
    } else if (operation) {
      const result = calculate(previous, inputValue, operation);
      if (result === "ERROR") {
        setDisplay("ERROR");
        setPrevious(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }
      const formatted = Number(result.toPrecision(12)).toString();
      setDisplay(formatted);
      setPrevious(result);
    }
    setWaitingForOperand(true);
    setOperation(nextOp === "=" ? null : nextOp);
  };

  const formatDisplay = (val) => {
    if (val === "ERROR") return "Error";
    if (val.length > 12) return parseFloat(val).toExponential(5);
    return val;
  };

  const Btn = ({ label, onClick, variant = "num", wide = false }) => {
    const [isPressed, setIsPressed] = useState(false);
    const release = () => setTimeout(() => setIsPressed(false), 130);

    const variants = {
      num: {
        bg: "linear-gradient(180deg, #ede3cc 0%, #d9cdb0 100%)",
        bgPressed: "linear-gradient(180deg, #c8bc9e 0%, #b5a88a 100%)",
        color: "#2a2419",
        shadow: "#a89876",
      },
      op: {
        bg: "linear-gradient(180deg, #d97540 0%, #b85828 100%)",
        bgPressed: "linear-gradient(180deg, #a34820 0%, #7d3614 100%)",
        color: "#fff5e8",
        shadow: "#8a3f18",
      },
      clear: {
        bg: "linear-gradient(180deg, #c43e2e 0%, #8f2819 100%)",
        bgPressed: "linear-gradient(180deg, #7a1f14 0%, #521109 100%)",
        color: "#ffe8de",
        shadow: "#5f1a10",
      },
      equals: {
        bg: "linear-gradient(180deg, #3d6b4a 0%, #264a33 100%)",
        bgPressed: "linear-gradient(180deg, #1e3a26 0%, #122818 100%)",
        color: "#e8f5d8",
        shadow: "#162d1e",
      },
      fn: {
        bg: "linear-gradient(180deg, #6b6352 0%, #4a4337 100%)",
        bgPressed: "linear-gradient(180deg, #3a3428 0%, #26221a 100%)",
        color: "#e8dcc4",
        shadow: "#2a2519",
      },
    };
    const v = variants[variant];

    return (
      <button
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          setIsPressed(true);
        }}
        onPointerUp={release}
        onPointerCancel={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onClick={onClick}
        className={`relative select-none rounded-[8px] ${wide ? "col-span-2" : ""}`}
        style={{
          background: isPressed ? v.bgPressed : v.bg,
          color: v.color,
          fontFamily: "'DM Mono', monospace",
          fontWeight: variant === "equals" ? 600 : variant === "fn" ? 400 : 500,
          boxShadow: isPressed
            ? `0 0 0 ${v.shadow}, inset 0 4px 8px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(0,0,0,0.2)`
            : `0 5px 0 ${v.shadow}, 0 6px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)`,
          transform: isPressed ? "translateY(5px)" : "translateY(0)",
          transition: "transform 70ms cubic-bezier(0.2,0,0.3,1), box-shadow 70ms cubic-bezier(0.2,0,0.3,1), background 70ms ease-out",
          height: "68px",
          fontSize: variant === "fn" ? "13px" : "26px",
          border: "1px solid rgba(0,0,0,0.2)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span
          style={{
            textShadow: variant === "num" ? "0 1px 0 rgba(255,255,255,0.4)" : "0 -1px 0 rgba(0,0,0,0.2)",
            opacity: isPressed ? 0.85 : 1,
            transition: "opacity 70ms ease-out",
          }}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div
      className="w-full flex flex-col"
      style={{
        minHeight: "100dvh",
        background: "radial-gradient(ellipse at 50% 10%, #e8dcc0 0%, #d4c5a3 40%, #b8a682 100%)",
        fontFamily: "'DM Mono', monospace",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* Inner bezel */}
      <div
        className="flex-1 flex flex-col m-3 rounded-[20px] p-5"
        style={{
          background: "linear-gradient(145deg, #c8b995 0%, #a89674 100%)",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(255,255,255,0.15), 0 1px 0 rgba(255,255,255,0.3)",
          border: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        {/* Brand strip */}
        <div className="flex items-end justify-between mb-4 px-1">
          <div>
            <div style={{ fontFamily: "'Major Mono Display', monospace", fontSize: "18px", color: "#3a2e1d", letterSpacing: "0.05em", lineHeight: 1 }}>
              retro—80
            </div>
            <div style={{ fontSize: "9px", color: "#5a4a32", letterSpacing: "0.3em", marginTop: "3px" }}>
              ELECTRONIC CALCULATOR
            </div>
          </div>
          <div
            className="flex gap-[3px] p-[4px] rounded-[4px]"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-[10px] h-[15px]"
                style={{ background: "linear-gradient(180deg, #2a3a4a 0%, #1a2532 100%)", border: "0.5px solid #0a0a0a" }}
              />
            ))}
          </div>
        </div>

        {/* LCD Screen - Neon Green CRT */}
        <div
          className="relative rounded-[6px] p-4 mb-4 overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #0a1f0a 0%, #050d05 80%, #020602 100%)",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,255,80,0.15), 0 1px 0 rgba(255,255,255,0.4), 0 0 12px rgba(60,255,90,0.2)",
            border: "1px solid #0a2a12",
            minHeight: "110px",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)" }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none opacity-10"
            style={{ background: "linear-gradient(180deg, rgba(120,255,150,0.4) 0%, transparent 100%)" }}
          />

          <div
            className="absolute inset-4 flex items-center justify-end pointer-events-none"
            style={{ fontFamily: "'VT323', monospace", fontSize: "60px", color: "rgba(60,255,100,0.06)", letterSpacing: "0.05em", lineHeight: 1 }}
          >
            88888888
          </div>

          <div
            className="relative flex justify-between items-center text-[10px] mb-1"
            style={{ color: "#3dff6a", letterSpacing: "0.15em", textShadow: "0 0 4px rgba(60,255,100,0.8)" }}
          >
            <div className="flex gap-2">
              <span style={{ opacity: memory !== 0 ? 1 : 0.15 }}>M</span>
              <span style={{ opacity: operation ? 1 : 0.15 }}>
                {operation === "+" ? "+" : operation === "-" ? "−" : operation === "×" ? "×" : operation === "÷" ? "÷" : "="}
              </span>
            </div>
            <span style={{ opacity: 0.35 }}>DEG</span>
          </div>

          <div
            className="relative flex items-center justify-end"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "60px",
              color: "#4aff6e",
              letterSpacing: "0.05em",
              lineHeight: 1,
              textShadow: "0 0 4px rgba(74,255,110,0.9), 0 0 10px rgba(60,255,100,0.6), 0 0 20px rgba(60,255,100,0.3)",
            }}
          >
            {formatDisplay(display)}
          </div>
        </div>

        <div className="text-right text-[8px] mb-3 pr-1" style={{ color: "#5a4a32", letterSpacing: "0.2em" }}>
          MODEL · SR-2600 · 12 DIGIT
        </div>

        <div className="grid grid-cols-4 gap-[8px] flex-1">
          <Btn label="MC" variant="fn" onClick={() => setMemory(0)} />
          <Btn label="MR" variant="fn" onClick={() => { setDisplay(String(memory)); setWaitingForOperand(true); }} />
          <Btn label="M+" variant="fn" onClick={() => setMemory(memory + parseFloat(display))} />
          <Btn label="M−" variant="fn" onClick={() => setMemory(memory - parseFloat(display))} />

          <Btn label="AC" variant="clear" onClick={clearAll} />
          <Btn label="±" variant="op" onClick={toggleSign} />
          <Btn label="%" variant="op" onClick={percent} />
          <Btn label="÷" variant="op" onClick={() => performOperation("÷")} />

          <Btn label="7" onClick={() => inputDigit(7)} />
          <Btn label="8" onClick={() => inputDigit(8)} />
          <Btn label="9" onClick={() => inputDigit(9)} />
          <Btn label="×" variant="op" onClick={() => performOperation("×")} />

          <Btn label="4" onClick={() => inputDigit(4)} />
          <Btn label="5" onClick={() => inputDigit(5)} />
          <Btn label="6" onClick={() => inputDigit(6)} />
          <Btn label="−" variant="op" onClick={() => performOperation("-")} />

          <Btn label="1" onClick={() => inputDigit(1)} />
          <Btn label="2" onClick={() => inputDigit(2)} />
          <Btn label="3" onClick={() => inputDigit(3)} />
          <Btn label="+" variant="op" onClick={() => performOperation("+")} />

          <Btn label="0" wide onClick={() => inputDigit(0)} />
          <Btn label="." onClick={inputDecimal} />
          <Btn label="=" variant="equals" onClick={() => performOperation("=")} />
        </div>

        <div className="flex justify-between items-center mt-3 px-1 text-[8px]" style={{ color: "#5a4a32", letterSpacing: "0.15em" }}>
          <span>© 1983 RETRO CORP.</span>
          <span>MADE IN JAPAN</span>
        </div>
      </div>
    </div>
  );
}
