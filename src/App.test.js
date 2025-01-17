import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import data from './frontend-assignment.json';

describe('App Component', () => {
  test('renders the table with the correct headers', () => {
    render(<App />);
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();
  });

  test('displays the correct number of rows per page', () => {
    render(<App />);
    const rows = screen.getAllByRole('row');
    const rowsPerPage = 5;
    // +1 for header row
    expect(rows.length).toBe(rowsPerPage + 1);
  });

  test('renders pagination controls', () => {
    render(<App />);
    expect(screen.getByLabelText('Previous Page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next Page')).toBeInTheDocument();
  });

  test('handles pagination - navigate to next page', () => {
    render(<App />);
    const nextButton = screen.getByLabelText('Next Page');
    fireEvent.click(nextButton);
    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent(data[5]['s.no'] + 1); // First record of the second page
  });

  test('handles pagination - navigate to previous page', () => {
    render(<App />);
    const nextButton = screen.getByLabelText('Next Page');
    const previousButton = screen.getByLabelText('Previous Page');
    fireEvent.click(nextButton);
    fireEvent.click(previousButton);
    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent(data[0]['s.no'] + 1); // First record of the first page
  });

  test('displays dots in pagination for large datasets', () => {
    render(<App />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  test('disables previous button on the first page', () => {
    render(<App />);
    const previousButton = screen.getByLabelText('Previous Page');
    expect(previousButton).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    render(<App />);
    const nextButton = screen.getByLabelText('Next Page');
    const totalPages = Math.ceil(data.length / 5);
    for (let i = 1; i < totalPages; i++) {
      fireEvent.click(nextButton);
    }
    expect(nextButton).toBeDisabled();
  });
});
