const express = require('express')
const app = express()
const cors = require('cors')
const { sequelize } = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 모든 서버에서 보내는 요청 수락
app.use(cors())     // CORS 미들웨어 사용, router 위에다가 선언

const todoRouter = require('./routes/todo')
app.use('/api', todoRouter)

app.get('/', (_, res) => {
    res.send('hello')
})

app.get('*', (_, res) => {
    res.send('404 Error!!')
})

const PORT = process.env.PORT || 8080

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })

})

/**
 * sequelize.sync({ force: false })
 * - 이미 존재하는 테이블이 있다면 그 테이블을 지우지 않고 유지.
 * - 새로운 테이블을 추가하거나 필요한 경우 스키마를 업데이트.
 *
 * - 서버가 시작되기 전에 Sequelize를 사용하여 DB와 모델 간의 동기화 수행
 *   sync가 완료 되고 난 후에야 then 실행.
 */

/**
 * SOP(동일 출처 정책)
 * CORS 를 사용하는 방법
 * 
 * 1. 모든 출처에서의 요청 허용
 * app.use(cors())
 * 
 * 2. 특정 출처에서의 요청만 허용
 * app.use(cors({
 *  origin : 'https://ex.com'
 * }))
 * 
 * 3. 특정 옵션 설정
 * app.use(cors({
 *  origin : ['https://ex.com', 'https://ex2.com'],
 *  methods : ['GET', 'POST'],
 *  allowedHeaders : ['Content-Type', 'Authorization']
 * }))
 */