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

    
    
    


    return (
        <div className='createContainer'>
            <h1>News Detail</h1>
            <ToastContainer /> 
            <form>
                <div className='createContainer'>
                    <div>
                        <label className='createLabel'>Title</label>
                        <input
                            type="text"
                            name="title"
                            className='createInput'
                            value={news.title}
                            required
                            disabled
                        />
                    </div>
                    <div>
                        <label className='createLabel'>Content</label>
                        <textarea
                            name="content"
                            className='createTextarea'
                            value={news.content}
                            required
                            disabled
                        ></textarea>
                    </div> 
                    <div>
                        <label className='createLabel'>Created Date</label>
                        <input
                            type="text"
                            name="date"
                            className='createInput'
                            value={news.created_at} 
                            required
                            disabled
                        />
                    </div>
                    <div>
                        <label className='createLabel'>Updated Date</label>
                        <input
                            type="text"
                            name="updated_at"
                            className='createInput'
                            value={news.updated_at}
                            required
                            disabled
                        />
                    </div>
                   
                </div>
            </form>
        </div>
    );
}
