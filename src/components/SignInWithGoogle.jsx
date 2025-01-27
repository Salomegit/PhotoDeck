import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const SignInWithGoogle = () => {
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(result);

            if (result.user) {
                toast.success('User is logged in successfully', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to sign in with Google', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <p>--or continue with--</p>
            <div className="flex flex-col items-center mt-4" onClick={handleSignInWithGoogle}>
                <img src="/google.png" alt="Google Logo" width={"60%"} />
            </div>
        </div>
    );
};

export default SignInWithGoogle;