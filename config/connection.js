const pool = 
        {
            user: 'postgres',
            host: 'localhost',
            database: 'example',
            password: '',
            port: 5432,
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
              }
        }

module.exports = pool;