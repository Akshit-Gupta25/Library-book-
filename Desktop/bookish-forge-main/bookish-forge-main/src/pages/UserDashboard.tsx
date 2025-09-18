import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCard } from '@/components/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { useAuth } from '@/contexts/AuthContext';
import { Search, BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function UserDashboard() {
  const { books, borrowBook, returnBook, getUserBorrowedBooks } = useBooks();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const borrowedBooks = getUserBorrowedBooks();
  const availableBooks = books.filter(book => book.availableCopies > 0);
  const genres = [...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">Discover and borrow from our collection of books</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-book">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{borrowedBooks.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently reading
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-book">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Books</CardTitle>
            <BookOpen className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{availableBooks.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to borrow
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-book">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{books.length}</div>
            <p className="text-xs text-muted-foreground">
              Unique titles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Currently Borrowed Books */}
      {borrowedBooks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Currently Borrowed</h2>
            <Link to="/borrowed">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.slice(0, 3).map((record) => (
              <BookCard
                key={record.id}
                book={record.book}
                borrowRecord={record}
                onReturn={returnBook}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Catalog */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Book Catalog {searchTerm || selectedGenre ? `(${filteredBooks.length} results)` : ''}
        </h2>
        
        {filteredBooks.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No books found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedGenre 
                ? "Try adjusting your search criteria" 
                : "No books available in the library yet"
              }
            </p>
            {(searchTerm || selectedGenre) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const borrowRecord = borrowedBooks.find(record => record.bookId === book.id);
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  borrowRecord={borrowRecord}
                  onBorrow={borrowBook}
                  onReturn={returnBook}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}