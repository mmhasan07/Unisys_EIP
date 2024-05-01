export const host = "http://localhost:8080";

export const signupRoute = `${host}/api/auth/signup`
export const loginRoute = `${host}/api/auth/login`



export const sqlCreateRowRoute = `${host}/api/sql/tables/data/create`
export const sqlEditRowRoute = `${host}/api/sql/tables/data/edit`
export const sqlDeleteRowRoute = `${host}/api/sql/tables/data/delete`


export const pgsqlCreateRowRoute = `${host}/api/pgsql/pgtables/data/create`
export const pgsqlDeleteRowRoute = `${host}/api/pgsql/pgtables/data/delete`
export const pgsqlEditRowRoute = `${host}/api/pgsql/pgtables/data/edit` 


export const mongoCreateDocumentRoute = `${host}/api/mongo/documents/data/create`
export const mongoEditDocumentRoute =   `${host}/api/mongo/documents/data/edit`
export const mongoDeleteDocumentRoute = `${host}/api/mongo/documents/data/delete`




