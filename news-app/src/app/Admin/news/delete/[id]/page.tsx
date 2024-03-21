
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function deletePostById(id:string) {
    const response = await fetch(`http://127.0.0.1:8000/api/news/${postId}`, {
        method:'DELETE'
    });
    if (!response.ok) {
        throw new Error('Post could not be deleted.');
    }
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (error) {
        return {};
    }

    
}

export default async function DeletePost({ params }) {
    const post = await deletePostById(params.id);

    
    return <main>post {params.id}
      return <main>Post {params.id} has been deleted successfully.</main>

    </main>
}