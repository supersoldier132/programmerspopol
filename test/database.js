const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'your-database-host', // 데이터베이스 호스트
    user: 'your-username',      // 사용자 이름
    password: 'your-password',  // 비밀번호
    database: 'your-database',  // 데이터베이스 이름
    connectionLimit: 5          // 최대 연결 수
});

module.exports = {
    query: async (sql, params) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, params);
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }
};