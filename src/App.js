import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import constants from "./constants";
import helpers from "./helpers";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Button from "./components/Button";

const captions = {
  newNote: {
    title: "New note ",
    untitled: "Untitled ",
    content: "### This just in! Note ",
  },
  addButton: "New note",
  returnButton: "Return to list"
};

const { FILTERS, EMPTY_TEXT } = constants;
const { 
  getNotesByDateCreated,
  getNotesByDateModified,
  setStore,
  getStore,
  getNoteTitle,
} = helpers;

export default function App() {
  const [notes, setNotes] = useState(
    () => getStore("notes") || [] // run function for lazy state
  );
  const [isGridView, setIsGridView] = useState(true);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [filteredByCreate, setFilteredByCreate] = useState(false);

  useEffect(() => {
    setStore("notes", notes);
  }, [notes]);

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
      title: captions.newNote.title + (notes.length + 1),
      content: captions.newNote.content + (notes.length + 1)
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
    setIsEditorOpened(prevState => !prevState);
  };

  const updateNote = (text) => {
    const newDate = new Date().toISOString();
    const splitedText = text.split("\n");
    const newTitle = getNoteTitle(splitedText[0]);

    setNotes((prevNotes) => 
      prevNotes.map((note) => {
        return note.id === activeNoteId ? { 
          ...note, 
          dateModified: newDate, 
          content: text,
          title: newTitle || captions.newNote.untitled + note.id
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

  const handleNoteDelete = (event, id) => {
    event.stopPropagation();
    
    setNotes(prevNotes => prevNotes.filter(n => n.id !== id));
  };

  const isEmptyClass = !notes.length > 0 && "is-empty";
  const mainBlockClass = "app-main container " + isEmptyClass;
  const viewClassName = isGridView ? "ui-view-grid" : "ui-view-list";
  const showDate = filteredByCreate ? FILTERS[0] : FILTERS[1];
  const filteredNotes = filteredByCreate 
    ? getNotesByDateCreated(notes)
    : getNotesByDateModified(notes);

  return (
    <div className="app">
      <Header
        isGridView={isGridView}
        isNotesLoaded={Boolean(notes.length > 0)}
        handleViewClick={handleViewClick}
        handleAddNote={createNote}
        handleNotesFilter={handleNotesFilter}
      />

      <main className={mainBlockClass}>
        {
          notes.length > 0 
          ? 
          <div className={`app-previews ${viewClassName}`}>
            {filteredNotes.map((note) => (
              <Preview
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                date={note[showDate]}
                handleClick={handleEditorOpen}
                handleDelete={handleNoteDelete}
              />
            ))}
          </div> 
          : 
          <>
            <h1 className="app-previews">{EMPTY_TEXT}</h1>
            <Button onClick={createNote} icon={faPlus}>{captions.addButton}</Button>
          </>
        }
      </main>
      {isEditorOpened && activeNoteId && (
        <Editor
          note={findActiveNote()}
          handleNoteUpdate={updateNote}
          handleClose={handleEditorClose}
          captions={captions}
        />
      )}
    </div>
  );
}
