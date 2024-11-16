import { createContext, useState } from 'react';
import exampleProjects from '../examples/projects.json';

export interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
    tags: string[];
}

export interface ChatMessage {
    message: string;
    sender: string;
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
    chats: ChatMessage[];
    setChats?: (chats: ChatMessage[]) => void;
}

// Create the data context
export const AppDataContext = createContext<AppDataContext | undefined>(undefined);

// Create the data object
const appData = {
    projects: exampleProjects,
};


// Provider component to wrap your app and provide the data context
export const AppDataProvider = ({ children }: any) => {
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
    const [chats, setChats] = useState<ChatMessage[]>([]);

    return (
        <AppDataContext.Provider value={{
            ...appData,
            selectedProject,
            setSelectedProject,
            chats,
            setChats
        }}>
            {children}
        </AppDataContext.Provider>
    );
};