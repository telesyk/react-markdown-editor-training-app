import constants from "../constants";
const { LIMIT_PREVIEW_TEXT } = constants;

const correctPreview = (text) => {
  const cuttedPreview =
    text.length > LIMIT_PREVIEW_TEXT ? text.slice(0, LIMIT_PREVIEW_TEXT) : text;
  const dottedText =
    cuttedPreview.length === LIMIT_PREVIEW_TEXT
      ? cuttedPreview + "..."
      : cuttedPreview;

  return dottedText;
};

export default correctPreview;
