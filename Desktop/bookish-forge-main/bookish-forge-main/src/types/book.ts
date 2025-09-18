export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  coverUrl?: string;
  publishedYear?: number;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  returnDate?: string;
  book: Book;
}