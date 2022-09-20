const getNotesByDateModified = (notes) => {
    const sorted = notes.sort((note1, note2)  =>  {
        const noteDate1 = Date.parse(note1.dateModified);
        const noteDate2 = Date.parse(note2.dateModified);

        return noteDate1 - noteDate2;
    });
    return sorted.reverse();
};

export default getNotesByDateModified;
