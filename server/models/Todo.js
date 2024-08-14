// todo 테이블 구조 정의
// sequelize 모델과 mysql table 연결

const Todo = function (Sequelize, DataTypes) {
    // Sequelize - model/index.js 에서의 sequelize
    // DataTypes - model/index.js 에서의 Sequelize

    const model = Sequelize.define(
        'todo',    // param1. 모델 이름 설정
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },    // param2. 컬럼 정의
        {
            tableName: 'todo',    // 실제 DB 테이블 이름
            freezeTableName: true,    // Sequelize 가 테이블 이름을 자동으로 복수형으로 만들지 않도록 설정
            timestamps: false   // 테이블에 createdAt과 updatedAt 타임스탬프 컬럼을 자동으로 추가하지 않도록 설정
        }    // param3. 모델 옵션 정의
    )

    return model;
}

module.exports = Todo
// sequelize 는 기본적으로 다음과 같이 사용
// - 모델 이름 : 단수형
// - 테이블 이름 : 복수형