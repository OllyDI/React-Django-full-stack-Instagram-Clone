// React modules
import { useState } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

// External modules
// 비동기 요청을 위한 모듈
import axios from 'axios';
 
const SignupForm = () => {
    const emailOpts: RegisterOptions = {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }
    const usernameOpts: RegisterOptions = {
        required: true,
        minLength: 6
    }
    const passwordOpts: RegisterOptions = {
        required: true,
        minLength: 6
    }
    
    const [ errorMsg, setErrorMsg ] = useState("");

    // 검증 후 isValid 값 변경
    // handleSubmit(성공, 실패) : 요청을 보내기위해 사용, 모든 옵션 만족시 성공 실행, 불만족시 실패 실행
    const { register, handleSubmit, formState: { isValid } } = useForm( { mode: 'onChange' } );
    const nav = useNavigate();

    const submit = (data: any) => {
        console.log(data);
        axios.post('/users/signup', data)
            .then((resp)=>{
                console.log(resp);
                localStorage.setItem("userId", resp.data.pk);
                nav("/", {replace: true});
            })
            .catch((error)=>{
                console.log(error);
                let errorArray: string[] = [];
                Object.keys(error.response.data).map((key) => {
                    errorArray = [...errorArray.concat(error.response.data[key])];
                    return null;
                })
                setErrorMsg(errorArray.join(" "));
            })
        // 비동기 요청 처리를 위해 핸들러사용 -> then, catch
    }


    /*
    disabled={!isValid} -> RegisterOption이
    모두 만족해야만 가입 버튼이 활성화됨
    */
    return ( 
        <form className="signup-form" onSubmit={handleSubmit(submit)}>
            <img className="form-logo" src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="instagram"/>
            <input className="form-input" type="text" {...register("email", emailOpts)} placeholder="이메일"/>
            <input className="form-input" type="text" {...register("username", usernameOpts)} placeholder="사용자이름"/>
            <input className="form-input" type="password" {...register("password", passwordOpts)} placeholder="비밀번호"/>
            <button className="form-btn form-btn-blue" type="submit" disabled={!isValid}>가입</button>
            { errorMsg !=="" && <div className='form-error'>{errorMsg}</div> }
        </form>
    )
}

export default SignupForm;