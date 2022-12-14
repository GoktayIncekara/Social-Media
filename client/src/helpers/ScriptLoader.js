export default function loadScript(src, dispatch) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => dispatch({ type: "LOAD" });
  script.onerror = () => new Error(`Script load error for ${src}`);

  document.head.append(script);
}
