import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";

export default function CreateProjectView() {

    const intialValues : ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: intialValues })

    const handleForm = (data : ProjectFormData) => {
        createProject(data)
    }

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
