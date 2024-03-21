'use client'
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function News({ params }: { params: { id: string } }) {
    const [news, setNews] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/news/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news.');
                }
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [params.id]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/news/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(news)
            });
    
            if (!response.ok) {
                throw new Error('Post could not be updated.');
            }
    
            const responseData = await response.json(); // Sunucudan gelen yanıtı JSON olarak alıyoruz.
            console.log('Response from server:', responseData); // Yanıtı konsola yazdırıyoruz.
    
            alert('Updated Successfully!');
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };
    
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNews({ ...news, [e.target.name]: e.target.value });
    };

    return (
        <div className='createContainer'>
            <h1>Update News</h1>
            <ToastContainer /> 
            <form onSubmit={handleUpdate}>
                <div className='createContainer'>
                    <div>
                        <label className='createLabel'>Title</label>
                        <input
                            type="text"
                            name="title"
                            className='createInput'
                            value={news.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='createLabel'>Content</label>
                        <textarea
                            name="content"
                            className='createTextarea'
                            value={news.content}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className='createButton'>Send</button>
                </div>
            </form>
        </div>
    );
}
