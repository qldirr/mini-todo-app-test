// .env 파일을 사용하지 않는 경우 app-config.js 파일 사용
// - 애플리케이션 전체에서 사용되는 구성 정보 관리에 사용

// 배포 전
// const backendHost = 'http://localhost:8080'


// 배포 후
let backendHost
const hostname = window && window.location && window.location.hostname

if(hostname === 'localhost'){
    backendHost = 'http://localhost:8080'   // 로컬 주소
} else {
    backendHost = 'http://3.36.63.93:8080'   // 배포 주소 예시
}
export const API_BASE_URL = `${backendHost}`

/**
 * 참고)
 * window && window.location && window.location.hostname 하는 이유??
 * - 안정성 높이기 위함
 * 
 * window 가 존재하지 않는 경우
 * - ex. 서버측 코드(node.js)에서 실행되는 경우 = window 객체는 존재하지 않음
 * 
 * window.location 이 존재하지 않는 경우
 * - ex. 브라우저 환경이 아닌 경우 = window.location 존재하지 않을 수 있음
 * 
 * window.location.hostname 이 존재하지 않는 경우
 * - ex. 브라우저 환경이지만 window.location 객체에 hostname 속성이 없는 경우
 * 
 * 이렇게 단계적으로 확인하면 안전하게 호스트 이름을 가져올 수 있음
 */