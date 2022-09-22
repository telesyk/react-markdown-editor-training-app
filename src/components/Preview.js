import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import helpers from "../helpers";
import Button from "./Button";

const {
  getNoteSummury,
  getReadableDateFormat,
} = helpers;

const Preview = ({ 
  id,
  title,
  content,
  date,
  handleClick,
  handleDelete
}) => {
  const previewSummury = getNoteSummury(content);
  const readableDate = getReadableDateFormat(date);

  return (
    <article className="preview ui-editor" onClick={() => handleClick(id)}>
      <header className="preview__header">
        <h1 className="preview__title">{title}</h1>
        <div className="preview__date">
          <span className="preview__date-icon">
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>
          <time className="preview__date-text">{readableDate}</time>
        </div>
        <Button
          onClick={(e) => handleDelete(e, id)}
          icon={faTrash}
          className="preview__delete"
        />
      </header>
      <div className="preview__content">
        <p>{previewSummury}</p>
      </div>
    </article>
  );
};

export default Preview;
