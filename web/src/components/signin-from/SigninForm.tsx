// React module
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// External modules
import axios from 'axios';

const SigninForm = () => {
    const emailOpts: RegisterOptions = {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        // ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
    }
    const passwordOpts: RegisterOptions = {
        required: true,
        minLength: 6
    }

    const [ errorMsg, setErrorMsg ] = useState("");

    const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' })

    const submit = (data: any) => {
        console.log(data);
        // 회원가입
        // axios.post('http://localhost:9998/users/signup') 
        // 로그인
        axios.post('/users/signin', data)
            .then((resp)=>{
                localStorage.setItem('userId', resp.data.pk);
                window.location.replace('/');
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
    }    
    return (
        <form className="signin-form" onSubmit={handleSubmit(submit)}>
            <img className="form-logo" src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="instagram"/>
            <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)} />
            <input className="form-input" type="password" placeholder="비밀번호"{...register("password", passwordOpts)} />
            <button className="form-btn form-btn-blue" type="submit" disabled={!isValid}>로그인</button>
            <Link className="password-link noline-link" to="/password">
                <span className="password-link-text">비밀번호를 잊으셨나요?</span>
            </Link>
            { errorMsg !== "" && <div className='form-error'>{errorMsg}</div> }
        </form>
    )
}

export default SigninForm;