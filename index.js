import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const connectDB = new pg.Client({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
  })

export const handler = async (event) => {

     try {
          await connectDB.connect();

          const result = await connectDB.query("SELECT datname FROM pg_database WHERE datname = $1", ["posgresql"]);

          if (result.rows.length === 0) {

            await connectDB.query('CREATE DATABASE posgresql');
            console.log('Database created');
          } else {
            console.log('Database already exists');
            return {
                status : 200,
                message : "Success"
            }
          }
        } catch (error) {
          console.error('Error creating database:', error);
          return {
              status : 500,
              message : "Cant connect to database"
          }
        } finally {
          await connectDB.end();
        }
}

handler().then(() => {
  console.log("Completed");
})