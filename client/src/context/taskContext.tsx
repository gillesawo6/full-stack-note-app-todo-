/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TaskContextProviderType {
    children: React.ReactNode
}

const greetUser = (user: string) => {

    return `Hello, ${user}! Welcome to the Task Manager.`;
}

export interface Note {
    _id: string,
    task: string,
    priority: 'high' | 'medium' | 'low',
    category: 'Work' | 'Personal' | 'Other',
    completed: boolean
}

interface UpdateNoteParams {
    id: string;
    task: string;
    completed: boolean;
}

interface TaskContextType {
    getNotes: () => Promise<Note[] | undefined>
    addNote: ({ task, priority, category, completed }: Note) => Promise<Note | undefined>
    deleteNote: (id: string) => Promise<void>
    updateNote: (params: UpdateNoteParams) => Promise<void>

}

const TaskContext = createContext<TaskContextType | null>(null)

export const TaskContextProvider: React.FC<TaskContextProviderType> = ({ children }) => {
    const addNote = async ({ task, priority, category, completed }: Omit<Note, '_id'>): Promise<Note | undefined> => {
        try {
            const res = await axios.post('http://localhost:3000/api/notes/new', {
                task: task,
                priority: priority,
                category: category,
                completed: completed
            })
            if (!res.data.success) {
                console.log(res.data.msg)
            }
            return res.data.content
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async (id: string) => {
        try {
            const res = await axios.delete('http://localhost:3000/api/notes/' + id)
            if (res.data.success) {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateNote = async (note: UpdateNoteParams) => {
        try {
            const res = await axios.patch('http://localhost:3000/api/notes/' + note.id, note)
            if (res.data.success) {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getNotes = async (): Promise<Note[] | undefined> => {
        try {
            const res = await axios.get(`http://localhost:3000/api/notes`)
            if (!res.data.success) {
                throw new Error("something went wrong")
            }

            return res.data.content
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{ getNotes, addNote, deleteNote, updateNote }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const ctx = useContext(TaskContext)
    if (!ctx) {
        throw new Error("useTask can only be used inside TaskContextProvider")
    }
    return ctx
} 