import {SignUpDto} from "@/features/authentication/dtos";
import {authenticationAxiosInstance, axiosErrorHandler} from "@/features/authentication/api/axios";
import {redirect} from "react-router";

export default async function signUp(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const password_confirmation = formData.get('password_confirmation');

    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof password_confirmation !== 'string'
    ) {
        throw new Error('Missing required form fields');
    }
    const signUpDto: SignUpDto = new SignUpDto(name, email, password, password_confirmation);

   return authenticationAxiosInstance.post('/sign-up', signUpDto)
        .then(response => {
            const responseData = response.data;
            if(responseData.success){
                sessionStorage.setItem('user_id', responseData.data.userId);
                return redirect("/")
            }
        })
        .catch(axiosErrorHandler);

}