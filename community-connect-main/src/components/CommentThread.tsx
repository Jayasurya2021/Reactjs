import React, { useState } from 'react';
import { Comment } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Shield, User, Send, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentThread: React.FC<CommentThreadProps> = ({ 
  comments, 
  onAddComment,
  isLoading = false 
}) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Comments & Updates</h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Add a comment or update..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="resize-none"
        />
        <Button type="submit" disabled={!newComment.trim() || isSubmitting} size="sm">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Post Comment
        </Button>
      </form>

      {/* Comments list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No comments yet. Be the first to add one!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                'rounded-lg border p-4',
                comment.userRole === 'admin' && 'border-primary/30 bg-accent/30'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    comment.userRole === 'admin' ? 'bg-primary' : 'bg-muted'
                  )}>
                    {comment.userRole === 'admin' ? (
                      <Shield className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {comment.userName}
                      {comment.userRole === 'admin' && (
                        <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread;
