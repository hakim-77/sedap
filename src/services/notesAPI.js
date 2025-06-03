import axios from 'axios'

const API_URL = "https://xopxahspjcwhvolrgcna.supabase.co/rest/v1/note"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvcHhhaHNwamN3aHZvbHJnY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDgxMTQsImV4cCI6MjA2NDQ4NDExNH0.s3qN_Y1KI8DPnWDBYazM-EJdMYtb8sCPOuokDUyMBSo"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },
    async updateNote(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data;
    }

}