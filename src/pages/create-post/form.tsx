import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";



interface CreateFormData {
    title: string;
    description: string;
}
export const CreateForm = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add title"),
        description: yup.string().required("you must add description"),
    })

    const { register, handleSubmit, formState: { errors }, } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })

        navigate("/")
    }
    return (
        <form className="create-form" onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title.." {...register("title")} />
            <p className="error-message">{errors.title?.message}</p>
            <textarea placeholder="Description.." {...register('description')} />
            <p className="error-message">{errors.description?.message}</p>
            <input type="submit" />
        </form>
    );
}