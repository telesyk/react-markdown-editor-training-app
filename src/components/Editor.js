import { useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import helpers from "../helpers";
import Button from "./Button";

const { getDigitalDateFormat } = helpers;

const Editor = ({ note, handleClose, handleNoteUpdate }) => {
  const { title, content, dateCreated, dateModified } = note;
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <div className="editor">
      <article className="editor__wrapper container">
        <header className="editor__header">
          <div className="editor__header-date">
            <div className="editor__header-created">
              <strong>Created</strong> <time>{getDigitalDateFormat(dateCreated)}</time>
            </div>
            <div className="editor__header-modified">
              <strong>Modified</strong> <time>{getDigitalDateFormat(dateModified)}</time>
            </div>
          </div>
          <h1 className="editor__header-title">{title}</h1>
        </header>
        <div className="editor__mde ui-editor">
          <ReactMde
            value={content}
            onChange={handleNoteUpdate}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown children={markdown} />)
            }
            minEditorHeight={400}
            heightUnits="px"
          />
        </div>
        <footer className="editor__footer">
          <Button className="editor__close-bottom" onClick={handleClose}>Back to list</Button>
        </footer>
      </article>
      <Button className="editor__close" onClick={handleClose} icon={faXmark} />
    </div>
  );
};

export default Editor;
