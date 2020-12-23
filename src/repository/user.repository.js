
import rethinkdb from 'rethinkdb';
import { getConnection } from '../config/rethinkdb.config.js';

const TABLE_PROJECTS = 'users';


export const register = async (user) => {
    const connection = await getConnection();
    if (connection) {
        const result = await rethinkdb.table(TABLE_PROJECTS).insert(user).run(connection);
        return await rethinkdb.table(TABLE_PROJECTS).get(result.generated_keys[0]).run(connection);
    }
};

export const addProjectContent = async (idProjectId, content) => {
    const connection = await getConnection();

    if (connection) {
        await rethinkdb.table(TABLE_PROJECTS).get(idProjectId)
            .update({ contents: rethinkdb.row('contents').append(content) }).run(connection);
        return await rethinkdb.table(TABLE_PROJECTS).get(idProjectId).run(connection);
    }
};

export const updateDescription = async (idProjectId, description) => {
    const connection = await getConnection();

    if (connection) {
        await rethinkdb.table(TABLE_PROJECTS).get(idProjectId)
            .update({ description }).run(connection);
        return await rethinkdb.table(TABLE_PROJECTS).get(idProjectId).run(connection);
    }
};

export const updateTitle = async (idProjectId, title) => {
    const connection = await getConnection();

    if (connection) {
        await rethinkdb.table(TABLE_PROJECTS).get(idProjectId)
            .update({ title }).run(connection);
        return await rethinkdb.table(TABLE_PROJECTS).get(idProjectId).run(connection);
    }
};

export const getProjects = async () => {
    const connection = await getConnection();

    if (connection) {
        return await rethinkdb.table(TABLE_PROJECTS).run(connection);
    }
};

export const getProjectByID = async (idProjectId) => {
    if (!idProjectId) return;

    const connection = await getConnection();

    if (connection) {
        return await rethinkdb.table(TABLE_PROJECTS).get(idProjectId).run(connection);
    }
};

export const getContentByID = async (idProjectId, contentID) => {
    if (!idProjectId) return;

    const connection = await getConnection();

    if (connection) {

        return await rethinkdb.table(TABLE_PROJECTS).get(idProjectId)("contents").filter({ "id": contentID }).nth(0).run(connection);

        //return result[0];
    }
};



export const deleteProjectByID = async (idProjectId) => {
    if (!idProjectId) return;
    const connection = await getConnection();

    if (connection) {
        await rethinkdb.table(TABLE_PROJECTS).get(idProjectId)
            .delete().run(connection);
    }
};


export const deleteProjectContentByID = async (idProjectId, contentID) => {

    if (!idProjectId || !contentID) return;
    const connection = await getConnection();
    if (connection) {
      await rethinkdb.table(TABLE_PROJECTS).get(idProjectId).update(function(doc) {
        return {
            contents: doc('contents').filter(function(content) {
            return content('id').ne(contentID);
          })
        };
      }).run(connection);
    }
};

