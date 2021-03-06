import { notify } from '../utils.js';

// MAKE GUARD FOR ADD ACTIVITIES WITHOUT USERUID

const database = firebase.database();

let userUID;
const listenUserTasks = (user) => {
    userUID = user.uid;
}

function addTask(task) {
    if (!userUID) return;
    if(!task) return notify('The format of the task is invalid', 'danger');
    const newPostKey = database.ref().child('users').child(userUID).push().key;
    const updates = {};
    updates[`/users/${userUID}/${newPostKey}`] = { task, done: false };

    return database.ref().update(updates, err => {
        if (err) return notify(err.message, 'danger');
        notify('Successfully added task!', 'success');
    });
}

function doneTask(id, type = false) {
    if (!userUID) return;
    const updates = {};
    updates[`/users/${userUID}/${id}/done`] = !!type;

    return database.ref().update(updates, err => {
        if (err) return notify(err.message, 'danger');
        notify(`Successfully ${type ? 'done' : 'undo'} task!`, 'success');
    });
}

function deleteTask(id) {
    return database.ref(`/users/${userUID}/${id}`)
        .remove()
        .then(() => notify('You delete the task!', 'success'))
        .catch(err => notify(err.message, 'error'))
}

export { database, listenUserTasks, addTask, doneTask, deleteTask }
