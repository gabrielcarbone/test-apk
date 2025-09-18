import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from '../../src/components/Sidebar';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del hook useLogout
const mockLogout = {
  mutate: vi.fn(),
  isPending: false
};

vi.mock('../../src/hooks/useAuth', () => ({
  useLogout: vi.fn(() => mockLogout)
}));

// Mock functions para las props
const mockOnClose = vi.fn();

// Wrapper con todos los providers necesarios
const SidebarWrapper = ({ isOpen }: { isOpen: boolean }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Sidebar isOpen={isOpen} onClose={mockOnClose} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Sidebar Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Reset mocks before each test
    mockOnClose.mockClear();
    mockNavigate.mockClear();
    mockLogout.mutate.mockClear();
    mockLogout.isPending = false;
  });

  afterEach(() => {
    cleanup();
  });

  test('renders without crashing', () => {
    expect(() => {
      render(<SidebarWrapper isOpen={true} />);
    }).not.toThrow();
  });

  test('displays all navigation items', () => {
    render(<SidebarWrapper isOpen={true} />);
    
    expect(screen.getByText('Mis pólizas')).toBeInTheDocument();
    expect(screen.getByText('Tarjeta de circulación')).toBeInTheDocument();
    expect(screen.getByText('Mi calendario')).toBeInTheDocument();
    expect(screen.getByText('Mi cuenta')).toBeInTheDocument();
    expect(screen.getByText('Mi cobertura')).toBeInTheDocument();
    expect(screen.getByText('Preguntas frecuentes')).toBeInTheDocument();
    expect(screen.getByText('Denunciar')).toBeInTheDocument();
    expect(screen.getByText('Denuncias')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  test('displays close button', () => {
    render(<SidebarWrapper isOpen={true} />);
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  test('applies correct CSS class when open', () => {
    const { container } = render(<SidebarWrapper isOpen={true} />);
    expect(container.querySelector('.sidebar-overlay')).toHaveClass('open');
  });

  test('does not apply open class when closed', () => {
    const { container } = render(<SidebarWrapper isOpen={false} />);
    expect(container.querySelector('.sidebar-overlay')).not.toHaveClass('open');
  });

  test('calls navigate when clicking menu items', async () => {
    render(<SidebarWrapper isOpen={true} />);
    
    await user.click(screen.getByText('Mis pólizas'));
    expect(mockNavigate).toHaveBeenCalledWith('/mis-polizas');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls navigate with correct paths for different items', async () => {
    render(<SidebarWrapper isOpen={true} />);
    
    await user.click(screen.getByText('Mi calendario'));
    expect(mockNavigate).toHaveBeenCalledWith('/calendario');
    
    await user.click(screen.getByText('Denunciar'));
    expect(mockNavigate).toHaveBeenCalledWith('/denunciar');
  });

  test('calls logout when clicking logout button', async () => {
    render(<SidebarWrapper isOpen={true} />);
    
    await user.click(screen.getByText('Cerrar sesión'));
    expect(mockLogout.mutate).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking close button', async () => {
    render(<SidebarWrapper isOpen={true} />);
    
    await user.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('shows loading state when logout is pending', () => {
    mockLogout.isPending = true;
    
    render(<SidebarWrapper isOpen={true} />);
    expect(screen.getByText('Cerrando sesión...')).toBeInTheDocument();
    
    const logoutButton = screen.getByRole('button', { name: /cerrando sesión/i });
    expect(logoutButton).toBeDisabled();
  });

  test('shows normal logout text when not pending', () => {
    mockLogout.isPending = false;
    
    render(<SidebarWrapper isOpen={true} />);
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    
    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
    expect(logoutButton).not.toBeDisabled();
  });
});