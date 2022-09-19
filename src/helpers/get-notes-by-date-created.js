const getNotesByDateCreated = (notes) => {
    return notes.sort((note1, note2)  =>  {
        const noteDate1 = new Date(note1.dateCreated).getUTCMilliseconds;
        const noteDate2 = new Date(note2.dateCreated).getUTCMilliseconds;

        return noteDate1 - noteDate2;
    });
};

export default getNotesByDateCreated;
