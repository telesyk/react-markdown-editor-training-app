import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import helpers from "../helpers";

const {
  correctPreview,
  correctPreviewTitle,
  convertDateToReadableFormat,
} = helpers;

const Preview = ({ id, title, content, date, handleClick }) => {
  const correctedPreview = correctPreview(content);
  const correctedPreviewTitle = correctPreviewTitle(title);
  const convertedDate = convertDateToReadableFormat(date);

  return (
    <article className="preview ui-editor" onClick={() => handleClick(id)}>
      <header className="preview__header">
        <h1 className="preview__title">{correctedPreviewTitle}</h1>
        <div className="preview__date">
          <span className="preview__date-icon">
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>
          <time className="preview__date-text">{convertedDate}</time>
        </div>
      </header>
      <div className="preview__content">
        <p>{correctedPreview}</p>
      </div>
    </article>
  );
};

export default Preview;
