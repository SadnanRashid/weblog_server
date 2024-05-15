const pg = require("pg");
import config from "./config";

const pool = new Pool({
  connectionString: config.supabase.url,
});

const DB = {
  query: function (query: string, callback: CallableFunction) {
    pool.connect((err: Error, client: any, done: Function) => {
      if (err) return callback(err);
      client.query(query, (err: Error, results: Object) => {
        done();
        if (err) {
          console.error("ERROR: ", err);
        }
        if (err) {
          return callback(err);
        }
        callback(null, results.rows);
      });
    });
  },
};
