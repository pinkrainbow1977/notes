import { update, get } from '@reshuffle/db';
import { getCurrentUser } from '@reshuffle/server-function';

/**
 * From the frontend we pass a newNote object conaining the id, color
 *  and about of the new Note. It then updates the Notes document by adding
 * latest newNote
 *
 * @param {Object} newNote - {id: {String}, color: {String}, about: {String}}
 *
 * @return {Object} - updated version of voteState
 */
// @expose
export async function addNotesToBackend(newNote) {
  const { id } = getCurrentUser(true);

  return update('savedNotes', (savedNotes = {}) => {
    const allNotes = JSON.parse(JSON.stringify(savedNotes));

    if (!allNotes[id]) {
      allNotes[id] = [newNote];
    } else {
      allNotes[id].push(newNote);
    }

    return allNotes;
  });
}

/**
 * @return {Array} of Objects - updated version of NoteState
 */
// @expose
export async function getNotes() {
  const profile = getCurrentUser(false);

  if (profile === undefined) {
    return [];
  }

  const { id } = getCurrentUser(true);

  let allNotes = await get('savedNotes');

  if (allNotes[id]) {
    return allNotes[id];
  }
}

/**
 * Given the noteId that we want to delete, This function removes that
 * Note from the document and returns the updated document
 *
 * @param {String} noteId -
 *
 * @return {Object} - updated version of NoteState
 */
// @expose
export async function removeNote(noteId) {
  const { id } = getCurrentUser(true);

  return update('savedNotes', savedNotes => {
    const allNotes = JSON.parse(JSON.stringify(savedNotes));

    allNotes[id] = allNotes[id].filter(note => note.id !== noteId);

    return allNotes;
  });
}
