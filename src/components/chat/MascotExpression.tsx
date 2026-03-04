import { useEffect, useState } from "react";

type Expression = "idle" | "thinking" | "laughing" | "confused" | "excited" | "sleeping";

interface MascotExpressionProps {
  expression?: Expression;
  size?: number;
}

const expressionMap: Record<Expression, { face: string; animate: string }> = {
  idle: { face: "🐕", animate: "animate-float" },
  thinking: { face: "🤔", animate: "animate-wiggle" },
  laughing: { face: "🤣", animate: "animate-bounce-in" },
  confused: { face: "😵‍💫", animate: "animate-wiggle" },
  excited: { face: "🤩", animate: "animate-bounce-in" },
  sleeping: { face: "😴", animate: "animate-float" },
};

const MascotExpression = ({ expression = "idle", size = 48 }: MascotExpressionProps) => {
  const { face, animate } = expressionMap[expression];

  return (
    <div
      className={`inline-flex items-center justify-center ${animate}`}
      style={{ width: size, height: size, fontSize: size * 0.65 }}
    >
      {face}
    </div>
  );
};

export default MascotExpression;
