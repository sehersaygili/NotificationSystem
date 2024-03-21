'use client'

import { fetchData } from "../../api";
import '../../globals.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { BiSolidEditAlt } from "react-icons/bi";
import Link from 'next/link';

export default async function News() {
    const data = await fetchData('http://127.0.0.1:8000/api/news');

    interface NewsItem {
        id: number;
        title: string;
        created_at: string;
        content:string;
    }
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
      
      const handleDelete = async(id:any) => {
        const response = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
        method:'DELETE'
    });

    if (!response.ok) {
        throw new Error('Post could not be deleted.');
    }
    else {
        const text = await response.text();
        const data = await fetchData('http://127.0.0.1:8000/api/news');
        alert("Deleted Successfully!");
    }
    


      };
    return (
            <div className="newsContainer">
                <h1 className="newsTitle">Latest News</h1>
               <Link href="/Admin/news/create/" passHref>
                    <LiaEdit size="32px" />
                </Link>                    
            <div className="appContainer">

                <ul className="newsList">
                    {data.map((item: NewsItem, index: number) => (
                    <li key={index} className="newsItem">
                        
                         <span className="newsDate">
                                    {formatDate(item.created_at)}
                                </span>
                                <span className="editButton">
                                    <Link href={`/Admin/news/edit/${item.id}`} passHref>
                                        <BiSolidEditAlt size="20px" />
                                    </Link>
                                    
                                    <button className="deleteButton" onClick={()=>handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} ><RiDeleteBin6Line size="20px" /></button>
                                  
                                </span>
                        <div className="newsTitleText">
                        {item.title}
                        </div>
                        <div className="newsContent">
                        {item.content}
                        </div>
                    </li>
                    ))}
                </ul>   
            </div>
</div>
    );
}