import pg from "pg"
// import dotenv from "dotenv"
// dotenv.config()

// const body = {
//   "name": "UNIIX",
//   "userInfo": {
//     "team": "MAC",
//     "company": "AppMan"
//   }
// }

const connectDB = new pg.Client({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: process.env.RDS_DATABASE
  })

async function createTable() {
    try {
      await connectDB.connect();
  
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS RDS (
          id SERIAL PRIMARY KEY,
          name VARCHAR(20),
          team VARCHAR(20),
          company VARCHAR(20)
        );
      `;
  
      await connectDB.query(createTableQuery);
      console.log('Table created succfully eiei');
    } catch (error) {
      console.error('Error creating table -> ', error);
    }
  }

  async function insertData() {
    try {
      const insertQuery = `
        INSERT INTO your_table_name (name, team, company)
        VALUES ($1, $2, $3);
      `;
      const values = [body.name, body.userInfo.team, body.userInfo.company];
  
      await connectDB.query(insertQuery, values);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data ->', error);
    }
  }

export const handler = async (event) => {
     try {
          await createTable()
          await insertData()
          const result = await connectDB.query("SELECT datname FROM pg_database WHERE datname = $1", ["posgresql"]);

          if (result.rows.length === 0) {
            await connectDB.query('CREATE DATABASE posgresql');
            console.log('Database created');
          } else {
            console.log('Database already exists');
            return {
              statusCode: 200,
              body: JSON.stringify({
                user: event.name,
                userInfo: event.userInfo,
                message: "Success"
              })
            }
          }
        } catch (error) {
          console.error('Error creating database:', error);
          return {
              status : 500,
              message : "Cant connect to database"
          }
        } finally {
          connectDB.end()
          console.log('end handler');
        }
        
      }
      

// handler().then(() => {
//   console.log("Completed");
// }).finally(async () => {
//   await connectDB.end(); // Close the client connection after all operations are completed
//   console.log('end func');
// });