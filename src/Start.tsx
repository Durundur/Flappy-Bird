import { Dispatch, SetStateAction } from "react";

export default function Start({
  setIsGameRunning,
}: {
  setIsGameRunning: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "60px",
        alignItems: "stretch",
        height: '100%'
      }}
    >
      <img
        width={"70%"}
        style={{ alignSelf: "center" }}
        src="./assets/imgs/logo.png"
        alt="flappy bird"
      ></img>
      <img
        width={"25%"}
        style={{ alignSelf: "center" }}
        onClick={() => setIsGameRunning(true)}
        alt="play"
        src="./assets/imgs/play.png"
      ></img>
    </div>
  );
}
