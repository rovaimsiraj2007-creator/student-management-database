import { Pool } from 'pg'
import "dotenv/config"

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


// export const db = new Pool({
//     name: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

