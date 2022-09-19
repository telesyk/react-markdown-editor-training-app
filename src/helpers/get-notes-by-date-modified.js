const getNotesByDateModified = (notes) => {
    return notes.sort((note1, note2)  =>  {
        const noteDate1 = new Date(note1.dateModified).getUTCMilliseconds;
        const noteDate2 = new Date(note2.dateModified).getUTCMilliseconds;

        return noteDate1 - noteDate2;
    });
};

export default getNotesByDateModified;
