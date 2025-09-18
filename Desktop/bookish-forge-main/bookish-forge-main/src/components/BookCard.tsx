import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BorrowRecord } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Edit, Trash2, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
  borrowRecord?: BorrowRecord;
  onBorrow?: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: string) => void;
  showActions?: boolean;
}

export function BookCard({ 
  book, 
  borrowRecord,
  onBorrow, 
  onReturn, 
  onEdit, 
  onDelete, 
  showActions = true 
}: BookCardProps) {
  const { user } = useAuth();
  const isAvailable = book.availableCopies > 0;
  const isBorrowed = !!borrowRecord && !borrowRecord.returnDate;

  const handleBorrow = () => {
    if (!isAvailable) {
      toast({
        title: "Book unavailable",
        description: "This book is currently out of stock",
        variant: "destructive",
      });
      return;
    }
    onBorrow?.(book.id);
  };

  const handleReturn = () => {
    if (!isBorrowed) return;
    onReturn?.(book.id);
  };

  const getAvailabilityBadge = () => {
    if (book.availableCopies === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (book.availableCopies <= 2) {
      return <Badge className="bg-warning text-warning-foreground">Limited ({book.availableCopies} left)</Badge>;
    }
    return <Badge className="bg-success text-success-foreground">Available ({book.availableCopies})</Badge>;
  };

  return (
    <Card className="group hover:shadow-book transition-all duration-300 h-full flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">by {book.author}</p>
          </div>
          <BookOpen className="h-5 w-5 text-accent shrink-0 ml-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>
          {getAvailabilityBadge()}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {book.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {book.description}
          </p>
        )}
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total Copies:</span>
            <span className="font-medium">{book.totalCopies}</span>
          </div>
          <div className="flex justify-between">
            <span>Available:</span>
            <span className="font-medium">{book.availableCopies}</span>
          </div>
          {book.publishedYear && (
            <div className="flex justify-between">
              <span>Published:</span>
              <span className="font-medium">{book.publishedYear}</span>
            </div>
          )}
        </div>

        {isBorrowed && borrowRecord && (
          <div className="mt-3 p-2 bg-accent/10 rounded-md">
            <div className="flex items-center space-x-2 text-xs text-accent-foreground">
              <Calendar className="h-3 w-3" />
              <span>Borrowed on {new Date(borrowRecord.borrowDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="pt-3">
          {user?.role === 'admin' ? (
            <div className="flex space-x-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(book)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(book.id)}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          ) : user?.role === 'user' ? (
            <div className="w-full">
              {isBorrowed ? (
                <Button
                  variant="accent"
                  onClick={handleReturn}
                  className="w-full"
                >
                  Return Book
                </Button>
              ) : (
                <Button
                  variant={isAvailable ? "library" : "outline"}
                  onClick={handleBorrow}
                  disabled={!isAvailable}
                  className="w-full"
                >
                  {isAvailable ? "Borrow Book" : "Not Available"}
                </Button>
              )}
            </div>
          ) : null}
        </CardFooter>
      )}
    </Card>
  );
}