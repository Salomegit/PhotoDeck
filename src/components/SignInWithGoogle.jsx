// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth,db } from "../services/firebase";
// import { doc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
// import { setDoc } from "firebase/firestore";

// const SignInWithGoogle = () => {
//     const navigate = useNavigate();

//     const handleSignInWithGoogle = async () => {
//         try {
//             const result = await signInWithPopup(auth, new GoogleAuthProvider());
//             console.log(result);

//             if (result.user) {
//                 await setDoc(doc(db, 'users', result.user.uid), {
//                     email: result.user.email,
//                     firstName: result.user.displayName,
//                     photo: result.user.photoURL,
//                 });
//                 toast.success('User is logged in successfully', {
//                     position: 'top-center',
//                     autoClose: 2000,
//                 });
//                 }
//                 navigate('/dashboard');
            
//         } catch (error) {
//             console.error(error.message);
//             toast.error('Failed to sign in with Google', {
//                 position: 'top-center',
//                 autoClose: 2000,
//             });
//         }
//     };

//     return (
//         <div className="flex flex-col items-center mt-4">
//             <p>--or continue with--</p>
//             <div className="flex flex-col items-center mt-4" onClick={handleSignInWithGoogle}>
//                 <img src="/google.png" alt="Google Logo" width={"60%"} />
//             </div>
//         </div>
//     );
// };

// export default SignInWithGoogle;