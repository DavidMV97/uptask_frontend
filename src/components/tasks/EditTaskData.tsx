import { getTaskById } from "@/api/TaskApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParms = new URLSearchParams(location.search)
    const taskId = queryParms.get('editTask')!

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    if (isError) return <Navigate to={'/404'} />

    if(data) return <EditTaskModal  data={data} taskId={taskId} />
}
