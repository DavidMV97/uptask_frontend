import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectForm = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectForm ) {

    const navigate = useNavigate()

    const intialValues : ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: intialValues })

    const queryClient = useQueryClient()


    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Projecto</h1>
                <p className="text-2xl font-light">Llena el siguiente formulario para editar el projecto</p>

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
                        type="submit" value="Guardar Cambios" />
                </form>
            </div>
        </>
    )
}
