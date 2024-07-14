import { getTaskById } from "@/api/TaskApi"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParms = new URLSearchParams(location.search)
    const taskId = queryParms.get('editTask')!

    const { data } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId
    })

    if(data) return <EditTaskModal />
}
