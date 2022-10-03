import { SECTIONS } from "./constants";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function mapJSONtoRichText(json) {
  let richText = "<h1>Feedback</h1>";

  richText += "<hr />";
  richText += `<h2>Overall Feedback :</h2>`;
  richText += `<p>${json.overallFeedback}</p>`;

  richText += "<hr />";
  richText += `<h2>Introduction :</h2>`;
  richText += `<p>${json.introduction}</p>`;

  Object.values(SECTIONS).forEach((section) => {
    richText += "<hr />";
    richText += `<h2>${capitalize(section)} Stage :</h2>`;

    json[section]?.mistakes.forEach((mistake, idx) => {
      const { explanationText, overcomeText, screenshot } = mistake;

      richText += `<h3>Mistake ${idx + 1} :</h3>`;
      richText += `<img src=${screenshot} alt="${capitalize(
        section
      )} Mistake Image ${idx + 1}" width="400" />`;
      richText += `<h4>Explanation :</h4>`;
      richText += `<p>${explanationText}</p>`;
      richText += `<h4>How can you correct it :</h4>`;
      richText += `<p>${overcomeText}</p>`;
    });

    json[section]?.didWell.forEach((elem, idx) => {
      const { text, screenshot } = elem;

      richText += `<h3>Here's what you did well ${idx + 1} :</h3>`;
      richText += `<img src="${screenshot}" alt="${capitalize(
        section
      )} Did Well Image ${idx + 1}" width="400" />`;
      richText += `<h4>Explanation :</h4>`;
      richText += `<p>${text}</p>`;
    });
  });

  return richText;
}
