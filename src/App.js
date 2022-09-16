import { useState } from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Editor from "./components/Editor";

export default function App({ store }) {
  const [notes, setNotes] = useState(store.notes || []);
  const [isGridView, setIsGridView] = useState(store.isGridView || true);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const viewClass = isGridView ? "ui-view-grid" : "ui-view-list";

  const findActiveNote = () => {
    const note = notes.find((item) => item.id === activeNoteId);
    return note;
  };

  const createNewNote = () => {
    /**
     * create new Note
     * set new Note to the state and update localStorage
     * set new Note as active (by changing state for 'isEditorOpened')
     * open modal with editor for new Note
     */
    // const newNote = {
    //     id: nanoid(),
    //     body: "# Type your markdown note's title here"
    // }
    // setNotes(prevNotes => [newNote, ...prevNotes])
    // setActiveNoteId(newNote.id)
  };

  const updateNote = (text) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        return note.id === activeNoteId ? { ...note, content: text } : note;
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
      <Header handleViewClick={handleViewClick} isGridView={isGridView} />

      <div className="container">
        <div className={`app-previews ${viewClass}`}>
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
