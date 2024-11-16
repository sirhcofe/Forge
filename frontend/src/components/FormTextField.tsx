import React from 'react'

export const FormTextField = () => {
    return (
        <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="border border-gray-300 rounded-md p-2" />
        </div>
    )
}
