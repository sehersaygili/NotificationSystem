"use client";
import React from 'react';
import '../../../globals.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function News() {
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const form = event.currentTarget;
    const formData = new FormData(form);
    const newsData = Object.fromEntries(formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/news/', newsData);
      toast.success('News created successfully!', {
        onClose: () => {
          router.push('/Admin/news'); 
        }
      });
    } catch (error) {
      console.error('An error occurred while adding the news:', error);
      toast.error('Haber eklenirken bir hata oluştu'); 
    }
  };

  return (
    <div className='createContainer'>
       
    <ToastContainer /> 
    
      <h1 className='createHeader'>Create News</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='createLabel'>Title</label>
          <input type="text" name="title" className='createInput' required />
        </div>
        <div>
          <label className='createLabel'>Content</label>
          <textarea name="content" className='createTextarea' required></textarea>
        </div>
        <div>
          <label className="createLabel">Create Date</label>
          <input type="date" name="created_at" className="createInput" />
        </div>
        <button type="submit" className='createButton'>Send</button>
      </form>
    </div>
  );
}
