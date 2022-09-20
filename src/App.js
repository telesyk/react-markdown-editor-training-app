import { useState } from "react";
import { nanoid } from "nanoid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import constants from "./constants";
import helpers from "./helpers";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Button from "./components/Button";

const EMPTY_TEXT = "Looks like you weren't create any notes, yet";
const { FILTERS } = constants;
const { getNotesByDateCreated, getNotesByDateModified } = helpers;

export default function App({ store }) {
  const [notes, setNotes] = useState(store.notes || []);
  const [isGridView, setIsGridView] = useState(store.isGridView || true);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [filteredByCreate, setFilteredByCreate] = useState(true);

  const showDate = filteredByCreate ? FILTERS[0] : FILTERS[1];

  const viewClassName = isGridView ? "ui-view-grid" : "ui-view-list";

  const findActiveNote = () => {
    const note = notes.find((item) => item.id === activeNoteId);
    return note;
  };

  const createNote = () => {
    const newDate = new Date().toISOString();

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
    const newDate = new Date().toISOString();
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

  const handleNotesFilter = () => {
    setNotes(prevNotes => 
      filteredByCreate 
      ? getNotesByDateModified(prevNotes)
      : getNotesByDateCreated(prevNotes)
    )
    setFilteredByCreate(prevFilter => !prevFilter);
  };

  return (
    <div className="app">
      <Header
        isGridView={isGridView}
        isNotesLoaded={Boolean(notes.length > 0)}
        handleViewClick={handleViewClick}
        handleAddNote={createNote}
        handleNotesFilter={handleNotesFilter}
      />

      <div className="container">
        {
          notes.length > 0 
          ? 
          <div className={`app-previews ${viewClassName}`}>
            {notes.map((note) => (
              <Preview
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                date={note[showDate]}
                handleClick={handleEditorOpen}
              />
            ))}
          </div> 
          : 
          <>
            <h1 className="app-previews empty">{EMPTY_TEXT}</h1>
            <Button onClick={createNote} icon={faPlus}>Create Note</Button>
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
