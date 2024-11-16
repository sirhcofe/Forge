import { createContext } from 'react';
import exampleProjects from '../examples/projects.json';

interface Project {
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
}

// Create the data context
export const AppDataContext = createContext<AppDataContext | undefined>(undefined);

// Create the data object
const appData: AppDataContext = {
    projects: exampleProjects
};


// Provider component to wrap your app and provide the data context
export const AppDataProvider = ({ children }: any) => {
    return (
        <AppDataContext.Provider value={appData}>
            {children}
        </AppDataContext.Provider>
    );
};