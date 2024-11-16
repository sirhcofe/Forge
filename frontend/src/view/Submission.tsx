import { useContext } from "react"
import { AppDataContext } from "../components/DataProviders"

const Submission = () => {
    const appData = useContext(AppDataContext);

    return (
        <div className="bg-gray-200 p-4">
            <h1 className="text-2xl font-bold mb-4">Submission</h1>


            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">{appData?.selectedProject?.title}</h2>
                <p className="mb-2">{appData?.selectedProject?.description}</p>
            </div>

            <div className="mt-4">
                <label htmlFor="projectLink" className="block font-bold mb-2">Project Link</label>
                <input type="text" id="projectLink" className="border border-gray-300 rounded px-4 py-2 w-full" />

                <label htmlFor="fileInput" className="block font-bold mt-4 mb-2">File Input</label>
                <input type="file" id="fileInput" className="border border-gray-300 rounded px-4 py-2 w-full" />
            </div>
        </div>
    )
}

export default Submission