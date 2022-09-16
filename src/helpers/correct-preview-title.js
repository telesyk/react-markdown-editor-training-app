import constants from "../constants";
const { LIMIT_PREVIEW_TITLE } = constants;

const correctPreviewTitle = (title) => {
  const correctTitle =
    title.length > LIMIT_PREVIEW_TITLE
      ? title.slice(0, LIMIT_PREVIEW_TITLE)
      : title;
  return correctTitle;
};

export default correctPreviewTitle;
