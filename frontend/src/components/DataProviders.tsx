import { createContext, useState } from 'react';
import exampleProjects from '../examples/projects.json';

export interface Project {
    title: string;
    description: string;
    link: string;
    image: string;
    tags: string[];
}

// Define the data context
interface AppDataContext {
    // Define your data properties here
    // For example:
    // username: string;
    // isLoggedIn: boolean;
    projects: Project[];
    selectedProject?: Project;
    setSelectedProject?: (project: Project) => void;
}

// Create the data context
export const AppDataContext = createContext<AppDataContext | undefined>(undefined);

// Create the data object
const appData: AppDataContext = {
    projects: exampleProjects
};


// Provider component to wrap your app and provide the data context
export const AppDataProvider = ({ children }: any) => {
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

    return (
        <AppDataContext.Provider value={{
            ...appData,
            selectedProject,
            setSelectedProject
        }}>
            {children}
        </AppDataContext.Provider>
    );
};