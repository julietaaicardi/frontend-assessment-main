import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

describe('SectionTitle', () => {
  it('renders with provided text', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Welcome to our application',
      },
    })

    expect(getByText('Welcome to our application')).toBeInTheDocument()
  })

  it('renders with short text', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Home',
      },
    })

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('renders with long text', () => {
    const longText =
      'This is a very long section title that should be displayed properly without any issues or truncation'
    const { getByText } = render(SectionTitle, {
      props: {
        text: longText,
      },
    })

    expect(getByText(longText)).toBeInTheDocument()
  })

  it('renders with special characters', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Section Title with @#$%^&*()_+-=[]{}|;:,.<>?',
      },
    })

    expect(
      getByText('Section Title with @#$%^&*()_+-=[]{}|;:,.<>?')
    ).toBeInTheDocument()
  })

  it('renders with numbers', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Section 123 with numbers 456',
      },
    })

    expect(getByText('Section 123 with numbers 456')).toBeInTheDocument()
  })

  it('renders with emojis', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Section Title with 🚀 emojis 🌟',
      },
    })

    expect(getByText('Section Title with 🚀 emojis 🌟')).toBeInTheDocument()
  })

  it('renders with empty text', () => {
    const { container } = render(SectionTitle, {
      props: {
        text: '',
      },
    })

    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('')
  })

  it('renders with whitespace-only text', () => {
    const { container } = render(SectionTitle, {
      props: {
        text: '   ',
      },
    })

    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toBeInTheDocument()
  })

  it('has correct HTML structure', () => {
    const { container } = render(SectionTitle, {
      props: {
        text: 'Test Title',
      },
    })

    const sectionTitle = container.querySelector('.section-title')
    const h1 = container.querySelector('h1.section-title-text')

    expect(sectionTitle).toBeInTheDocument()
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Test Title')
  })

  it('has correct CSS classes', () => {
    const { container } = render(SectionTitle, {
      props: {
        text: 'Test Title',
      },
    })

    const sectionTitle = container.querySelector('.section-title')
    const h1 = container.querySelector('.section-title-text')

    expect(sectionTitle).toHaveClass('section-title')
    expect(h1).toHaveClass('section-title-text')
  })

  it('renders as h1 element', () => {
    const { getByRole } = render(SectionTitle, {
      props: {
        text: 'Test Title',
      },
    })

    const heading = getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Title')
  })

  it('updates text when prop changes', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Initial Title',
      },
    })

    expect(getByText('Initial Title')).toBeInTheDocument()

    const { getByText: getByText2 } = render(SectionTitle, {
      props: {
        text: 'Updated Title',
      },
    })

    expect(getByText2('Updated Title')).toBeInTheDocument()
  })

  it('handles HTML entities in text', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Section & Title with &amp; entities',
      },
    })

    expect(getByText('Section & Title with &amp; entities')).toBeInTheDocument()
  })

  it('renders with unicode characters', () => {
    const { getByText } = render(SectionTitle, {
      props: {
        text: 'Seção com caracteres especiais: áéíóú ñ ç',
      },
    })

    expect(
      getByText('Seção com caracteres especiais: áéíóú ñ ç')
    ).toBeInTheDocument()
  })

  it('renders with line breaks', () => {
    const { container } = render(SectionTitle, {
      props: {
        text: 'Multi-line\nTitle',
      },
    })

    const h1 = container.querySelector('h1')
    expect(h1).toHaveTextContent('Multi-line Title')
  })
})
