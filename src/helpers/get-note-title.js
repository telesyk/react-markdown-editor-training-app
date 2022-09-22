import constants from "../constants";
const { LIMIT_PREVIEW_TITLE } = constants;

const getNoteTitle = (title) => {
  const regex = /#/g;
  const trimedTitle = title.replace(regex, "").trim();

  const correctTitle =
    trimedTitle.length > LIMIT_PREVIEW_TITLE
      ? trimedTitle.slice(0, LIMIT_PREVIEW_TITLE)
      : trimedTitle;
  return correctTitle;
};

export default getNoteTitle;
