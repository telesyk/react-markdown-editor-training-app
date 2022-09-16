import { useState } from "react";
import { nanoid } from "nanoid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Button from "./components/Button";

const EMPTY_TEXT = "Looks like you weren't create any notes, yet";

export default function App({ store }) {
  const [notes, setNotes] = useState(store.notes || []);
  const [isGridView, setIsGridView] = useState(store.isGridView || true);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const viewClassName = isGridView ? "ui-view-grid" : "ui-view-list";

  const findActiveNote = () => {
    const note = notes.find((item) => item.id === activeNoteId);
    return note;
  };

  const createNewNote = () => {
    const newDate = new Date().toLocaleString();

    const newNote = {
      id: nanoid(),
      dateCreated: newDate,
      dateModified: newDate,
      title: `New note ${notes.length + 1}`,
      content: `### This just in! Note ${notes.length + 1}`
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
    setIsEditorOpened(prevState => !prevState);
    // console.log("create new note", newNote);
    /**
     * create new Note
     * set new Note to the state and update localStorage
     * set new Note as active (by changing state for 'isEditorOpened')
     * open modal with editor for new Note
     */
  };

  const updateNote = (text) => {
    const newDate = new Date().toLocaleString();
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        return note.id === activeNoteId ? { 
          ...note, 
          dateModified: newDate, 
          content: text 
        } : note;
      })
    );
  };

  const handleViewClick = () => setIsGridView((prevView) => !prevView);
  const handleEditorClose = () => setIsEditorOpened((prevState) => !prevState);
  const handleEditorOpen = (id) => {
    setIsEditorOpened((prevState) => !prevState);
    setActiveNoteId(id);
  };

  return (
    <div className="app">
      <Header
        isGridView={isGridView}
        isNotesLoaded={Boolean(notes.length > 0)}
        handleViewClick={handleViewClick}
        handleAddNote={createNewNote}
      />

      <div className="container">
        {
          notes.length > 0 
          ? 
          <div className={`app-previews ${viewClassName}`}>
            {notes.map((item) => (
              <Preview
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                date={item.dateModified}
                handleClick={handleEditorOpen}
              />
            ))}
          </div> 
          : 
          <>
            <h1 className="app-previews empty">{EMPTY_TEXT}</h1>
            <Button onClick={createNewNote} icon={faPlus}>Create Note</Button>
          </>
        }
      </div>
      {isEditorOpened && activeNoteId && (
        <Editor
          note={findActiveNote()}
          handleNoteUpdate={updateNote}
          handleClose={handleEditorClose}
        />
      )}
    </div>
  );
}
