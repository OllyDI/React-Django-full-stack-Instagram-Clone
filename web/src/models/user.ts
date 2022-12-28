export interface User {
    pk?: number;
    email?: string;
    username?: string;
    description?: string;
    profile?: any;
    updated: string;
}

export const InitUser: User = {
    pk: 0,
    email: '',
    username: '',
    description: '',
    profile: null,
    updated: ''
}

// 리듀서 전체 상태
export interface UserState {
    user: User,
    error: any,
    loading: boolean,    // 데이터를 가져왔는지, 가져오는 중인지 확인
}

export const InitUserState: UserState = {
    user: InitUser,
    error: null,
    loading: false
}