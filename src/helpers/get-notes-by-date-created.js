const getNotesByDateCreated = (notes) => {
    const sorted = notes.sort((note1, note2)  =>  {
        const noteDate1 = Date.parse(note1.dateCreated);
        const noteDate2 = Date.parse(note2.dateCreated);

        return noteDate1 - noteDate2;
    });
    return sorted.reverse();
};

export default getNotesByDateCreated;
