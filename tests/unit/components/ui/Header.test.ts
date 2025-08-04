import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Header from '~/components/ui/Header.vue'

describe('Header', () => {
  it('renders with default slot content', () => {
    const { getByText } = render(Header, {
      slots: {
        default: '<div>Header Content</div>',
      },
    })

    expect(getByText('Header Content')).toBeInTheDocument()
  })

  it('renders with multiple slot elements', () => {
    const { getByText } = render(Header, {
      slots: {
        default: `
          <div>Left Content</div>
          <div>Right Content</div>
        `,
      },
    })

    expect(getByText('Left Content')).toBeInTheDocument()
    expect(getByText('Right Content')).toBeInTheDocument()
  })

  it('renders with empty slot', () => {
    const { container } = render(Header, {
      slots: {
        default: '',
      },
    })

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('header')
  })

  it('passes through additional attributes', () => {
    const { container } = render(Header, {
      attrs: {
        id: 'main-header',
        'data-testid': 'header-component',
        class: 'custom-header',
      },
    })

    const header = container.querySelector('header')
    expect(header).toHaveAttribute('id', 'main-header')
    expect(header).toHaveAttribute('data-testid', 'header-component')
    expect(header).toHaveClass('custom-header')
    expect(header).toHaveClass('header')
  })

  it('renders with complex slot content', () => {
    const { getByText, getByRole } = render(Header, {
      slots: {
        default: `
          <nav role="navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
          <div class="user-menu">
            <span>Welcome, User</span>
            <button>Logout</button>
          </div>
        `,
      },
    })

    expect(getByRole('navigation')).toBeInTheDocument()
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('About')).toBeInTheDocument()
    expect(getByText('Welcome, User')).toBeInTheDocument()
    expect(getByText('Logout')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    const { container } = render(Header, {
      slots: {
        default: '<div>Content</div>',
      },
    })

    const header = container.querySelector('header')
    expect(header).toHaveClass('header')
  })

  it('renders with HTML elements in slot', () => {
    const { getByRole } = render(Header, {
      slots: {
        default: `
          <h1>Page Title</h1>
          <button aria-label="Menu">Menu</button>
        `,
      },
    })

    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('renders with nested components', () => {
    const { getByText } = render(Header, {
      slots: {
        default: `
          <div class="logo">
            <img src="/logo.png" alt="Logo" />
            <span>Company Name</span>
          </div>
          <div class="actions">
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
        `,
      },
    })

    expect(getByText('Company Name')).toBeInTheDocument()
    expect(getByText('Action 1')).toBeInTheDocument()
    expect(getByText('Action 2')).toBeInTheDocument()
  })

  it('handles dynamic content', () => {
    const { getByText, rerender } = render(Header, {
      slots: {
        default: '<div>Initial Content</div>',
      },
    })

    expect(getByText('Initial Content')).toBeInTheDocument()

    rerender({
      // Re-render with new slot content
    })

    // The content should still be there since we're not changing the slot
    expect(getByText('Initial Content')).toBeInTheDocument()
  })
})
