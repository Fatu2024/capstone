
import { useState, useEffect } from 'react';

const JournalEntry = ({ entry, onEdit, onDelete, isEditing, setIsEditing, editedContent, setEditedContent }) => {
    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    return (
        <div className="journal-entry">
            {isEditing ? (
                <textarea
                    className="journal-textarea"
                    value={editedContent}
                    onChange={handleContentChange}
                />
            ) : (
                <p className="journal-content">{entry.content}</p>
            )}
            <div className="actions">
                {isEditing ? (
                    <>
                        <button onClick={() => onEdit(entry.id, editedContent)}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(entry.id)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
};

const MyJournal = () => {
    const [entries, setEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    const handleAddEntry = () => {
        const newEntry = {
            id: Date.now(),
            title: 'New Entry',
            content: ''
        };
        setEntries([...entries, newEntry]);
        //set the editedContent to an empty string for the new entry
        setEditedContent('');
        //set isEditing to true so the textarea for the new entry shows up
        setIsEditing(true);
    };


    const handleEditEntry = (id, newContent) => {
        const updatedEntries = entries.map((entry) =>
            entry.id === id ? { ...entry, content: newContent } : entry
        );
        setEntries(updatedEntries);
        setIsEditing(false);
    };

    const handleDeleteEntry = (id) => {
        const updatedEntries = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
    };

    useEffect(() => {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries'));
        if (savedEntries) {
            setEntries(savedEntries);
        }
    }, []);

    return (
        <div className="journal-container">
            <button onClick={handleAddEntry}>Add Entry</button>
            {entries.map((entry) => (
                <JournalEntry
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editedContent={editedContent}
                    setEditedContent={setEditedContent}
                />
            ))}
        </div>
    );
};

export default MyJournal;