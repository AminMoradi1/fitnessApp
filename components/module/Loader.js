import { BeatLoader } from "react-spinners";

function Loader() {
  return (
    <BeatLoader
      color="rgb(124, 58, 237)"
      cssOverride={{ margin: "auto" }}
      margin={1}
      size={10}
      speedMultiplier={1}
    />
  );
}

export default Loader;
