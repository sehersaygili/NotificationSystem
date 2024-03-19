import { fetchData } from "../../api";
import '../../globals.css';
import { IoCreateOutline } from 'react-icons/io5';
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
      

    return (
        <div className="appContainer">
            <div className="sidebar">  
            <Link href="/Admin/news/create/" passHref>
        
          <IoCreateOutline size="32px" />
        
      </Link>            </div>
            <div className="newsContainer">
                <h1 className="newsTitle">Latest News</h1>
                <ul className="newsList">
                    {data.map((item: NewsItem, index: number) => (
                    <li key={index} className="newsItem">
                        <span className="newsDate">
                        {formatDate(item.created_at)}
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