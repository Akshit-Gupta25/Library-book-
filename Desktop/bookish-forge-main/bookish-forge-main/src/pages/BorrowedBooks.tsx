import { BookCard } from '@/components/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BorrowedBooks() {
  const { returnBook, getUserBorrowedBooks } = useBooks();
  const { user } = useAuth();
  const borrowedBooks = getUserBorrowedBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Borrowed Books</h1>
          <p className="text-muted-foreground mt-2">
            {borrowedBooks.length} book{borrowedBooks.length !== 1 ? 's' : ''} currently borrowed
          </p>
        </div>
      </div>

      {borrowedBooks.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No borrowed books</h3>
          <p className="text-muted-foreground mb-4">
            You haven't borrowed any books yet. Browse our collection to get started!
          </p>
          <Link to="/dashboard">
            <Button variant="library">
              Browse Books
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {borrowedBooks.map((record) => (
            <BookCard
              key={record.id}
              book={record.book}
              borrowRecord={record}
              onReturn={returnBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}