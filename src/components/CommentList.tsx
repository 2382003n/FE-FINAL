import { useState } from 'react';
import { commentApi } from '../utils/api';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

interface CommentListProps {
  postId: string;
  comments: Comment[];
  onCommentsChange: () => void;
}

const CommentList = ({ postId, comments, onCommentsChange }: CommentListProps) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await commentApi.create(postId, { content: newComment });
      setNewComment('');
      onCommentsChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentApi.delete(postId, commentId);
        onCommentsChange();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete comment');
      }
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By {comment.author.name} on {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList; 