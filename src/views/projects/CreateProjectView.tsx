import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {

    const navigate = useNavigate()

    const intialValues : ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: intialValues })

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })
    
    const handleForm =  (formData : ProjectFormData) => mutate(formData)        
    
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Projecto</h1>
                <p className="text-2xl font-light">Llena el siguiente formulario para crear un projecto</p>

                <nav className="my-5">
                    <Link
                        to='/'
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >
                        Volver a projectos
                    </Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    <input
                        className="bg-fuchsia-600 w-full hover:bg-fuchsia-700 p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                        type="submit" value="Crear Proyecto" />

                </form>
            </div>
        </>
    )
}
