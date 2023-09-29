import { Dispatch, SetStateAction } from "react";

export default function EndGameStats({
  score,
  setIsGameOver,
  setScore,
}: {
  setScore: Dispatch<SetStateAction<number>>;
  score: number;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: "60px",
      }}
    >
      <div
        style={{
          color: "#fff",
          backgroundColor: "#dfd795",
          fontSize: "72px",
          textShadow: "2px 2px 4px black",
          display: "flex",
          flexDirection: "row",
          gap: "50px",
          padding: "25px",
          borderRadius: "25px",
          border: "2px solid black",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "32px", color: "#fe785a" }}>score</span>
          <span>{score}</span>
        </div>
        <div
          style={{
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "32px", color: "#fe785a" }}>best</span>
          <span>{score}</span>
        </div>
      </div>
      <div>
        <img
          alt="play"
          onClick={() => {
            setIsGameOver(false);
            setScore(0);
          }}
          src="./assets/imgs/play.png"
        ></img>
      </div>
    </div>
  );
}
