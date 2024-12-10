import api from '../ax/axiosSetting';

/**
 * 아이디 중복 체크
 * @param {Object} obj - 검사할 아이디 객체 { id: '아이디' }
 * @returns {Promise} Axios Promise 객체
 */
export const memberIdCheck = (obj) => {
    return api.post('/member/findId', obj, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

/**
 * 지역 리스트 불러오기
 * @returns {Promise} Axios Promise 객체
 */
export const areaList = () => {
    return api.get('/area/list', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

/**
 * 회원가입 기능
 * @param {Object} obj - 회원가입 데이터 객체
 * @returns {Promise} Axios Promise 객체
 */
export const memberRegist = (obj) => {
    return api.post('/member/regist', obj, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

/**
 * 로그인 기능
 * @param {Object} obj - 로그인 데이터 객체
 * @returns {Promise} Axios Promise 객체
 */
export const memberLogin = (obj) => {
    return api.post('/member/login', obj, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
