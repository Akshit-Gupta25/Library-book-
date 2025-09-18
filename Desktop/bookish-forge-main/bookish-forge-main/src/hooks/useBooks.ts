import { useState, useEffect } from 'react';
import { Book, BorrowRecord } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock books data - in real app this would come from Supabase
const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic Literature',
    totalCopies: 5,
    availableCopies: 3,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    publishedYear: 1925,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    totalCopies: 4,
    availableCopies: 2,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    publishedYear: 1960,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    totalCopies: 6,
    availableCopies: 0,
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    publishedYear: 1949,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    totalCopies: 3,
    availableCopies: 1,
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    publishedYear: 1813,
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Coming of Age',
    totalCopies: 4,
    availableCopies: 4,
    description: 'A controversial novel about teenage rebellion and alienation.',
    publishedYear: 1951,
  },
  {
    id: '6',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    totalCopies: 8,
    availableCopies: 5,
    description: 'The first book in the beloved Harry Potter series about a young wizard\'s adventures.',
    publishedYear: 1997,
  },
];

let mockBorrowRecords: BorrowRecord[] = [];

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(mockBorrowRecords);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addBook = (bookData: Omit<Book, 'id' | 'availableCopies'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      availableCopies: bookData.totalCopies,
    };
    
    setBooks(prev => [...prev, newBook]);
    toast({
      title: "Book added successfully",
      description: `"${newBook.title}" has been added to the library`,
    });
  };

  const updateBook = (bookId: string, bookData: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { 
            ...book, 
            ...bookData,
            availableCopies: bookData.totalCopies !== undefined 
              ? bookData.totalCopies - (book.totalCopies - book.availableCopies)
              : book.availableCopies
          }
        : book
    ));
    
    toast({
      title: "Book updated successfully",
      description: "The book information has been updated",
    });
  };

  const deleteBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    setBooks(prev => prev.filter(book => book.id !== bookId));
    // Remove related borrow records
    setBorrowRecords(prev => prev.filter(record => record.bookId !== bookId));
    
    toast({
      title: "Book deleted",
      description: `"${book?.title}" has been removed from the library`,
    });
  };

  const borrowBook = (bookId: string) => {
    if (!user) return;

    const book = books.find(b => b.id === bookId);
    if (!book || book.availableCopies === 0) {
      toast({
        title: "Cannot borrow book",
        description: "This book is not available",
        variant: "destructive",
      });
      return;
    }

    // Check if user already has this book borrowed
    const existingBorrow = borrowRecords.find(
      record => record.userId === user.id && record.bookId === bookId && !record.returnDate
    );

    if (existingBorrow) {
      toast({
        title: "Already borrowed",
        description: "You have already borrowed this book",
        variant: "destructive",
      });
      return;
    }

    // Create borrow record
    const borrowRecord: BorrowRecord = {
      id: Date.now().toString(),
      userId: user.id,
      bookId,
      borrowDate: new Date().toISOString(),
      book,
    };

    setBorrowRecords(prev => [...prev, borrowRecord]);
    mockBorrowRecords = [...mockBorrowRecords, borrowRecord];

    // Update book availability
    setBooks(prev => prev.map(b => 
      b.id === bookId 
        ? { ...b, availableCopies: b.availableCopies - 1 }
        : b
    ));

    toast({
      title: "Book borrowed successfully",
      description: `You have borrowed "${book.title}"`,
    });
  };

  const returnBook = (bookId: string) => {
    if (!user) return;

    const borrowRecord = borrowRecords.find(
      record => record.userId === user.id && record.bookId === bookId && !record.returnDate
    );

    if (!borrowRecord) {
      toast({
        title: "Cannot return book",
        description: "No active borrow record found",
        variant: "destructive",
      });
      return;
    }

    // Update borrow record
    const updatedRecord = { ...borrowRecord, returnDate: new Date().toISOString() };
    setBorrowRecords(prev => prev.map(record => 
      record.id === borrowRecord.id ? updatedRecord : record
    ));
    mockBorrowRecords = mockBorrowRecords.map(record => 
      record.id === borrowRecord.id ? updatedRecord : record
    );

    // Update book availability
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, availableCopies: book.availableCopies + 1 }
        : book
    ));

    toast({
      title: "Book returned successfully",
      description: `You have returned "${borrowRecord.book.title}"`,
    });
  };

  const getUserBorrowedBooks = () => {
    if (!user) return [];
    return borrowRecords.filter(
      record => record.userId === user.id && !record.returnDate
    );
  };

  return {
    books,
    borrowRecords,
    loading,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getUserBorrowedBooks,
  };
}