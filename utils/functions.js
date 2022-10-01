import { SECTIONS } from "./constants";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function mapJSONtoRichText(json) {
  let richText = "<h1>Feedback</h1>";

  richText += `<h2>Overall Feedback :</h2>`;
  richText += `<p>${json.overallFeedback}</p>`;

  richText += `<h2>Introduction</h2>`;
  richText += `<p>${json.introduction}</p>`;

  Object.values(SECTIONS).forEach((section) => {
    richText += `<h2>${capitalize(section)} Stage :</h2>`;

    json[section].mistakes.forEach((mistake, idx) => {
      const { explanationText, overcomeText } = mistake;

      richText += `<h3>Mistake ${idx + 1} :</h3>`;
      richText += `<h4>Explanation :</h4>`;
      richText += `<p>${explanationText}</p>`;
      richText += `<h4>How can you correct it :</h4>`;
      richText += `<p>${overcomeText}</p>`;
    });

    json[section].didWell.forEach((elem, idx) => {
      const { text } = elem;

      richText += `<h3>Here's what you did well ${idx + 1} :</h3>`;
      richText += `<h4>Explanation :</h4>`;
      richText += `<p>${text}</p>`;
    });

    richText += "<hr />";
  });

  return richText;
}
