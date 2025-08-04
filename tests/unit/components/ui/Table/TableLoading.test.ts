import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import TableLoading from '~/components/ui/Table/TableLoading.vue'

describe('TableLoading', () => {
  it('renders with default message', () => {
    const { getByText } = render(TableLoading)

    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Please wait while we fetch the data...',
      },
    })

    expect(
      getByText('Please wait while we fetch the data...')
    ).toBeInTheDocument()
  })

  it('renders with empty message', () => {
    const { container } = render(TableLoading, {
      props: {
        message: '',
      },
    })

    const loadingText = container.querySelector('.loading-text')
    expect(loadingText).toBeInTheDocument()
    expect(loadingText).toHaveTextContent('')
  })

  it('has correct HTML structure', () => {
    const { container } = render(TableLoading)

    const tr = container.querySelector('tr.loading-row')
    const td = container.querySelector('td.loading-cell')
    const loadingContent = container.querySelector('.loading-content')
    const loadingSpinner = container.querySelector('.loading-spinner')
    const spinner = container.querySelector('.spinner')
    const loadingText = container.querySelector('.loading-text')

    expect(tr).toBeInTheDocument()
    expect(td).toBeInTheDocument()
    expect(loadingContent).toBeInTheDocument()
    expect(loadingSpinner).toBeInTheDocument()
    expect(spinner).toBeInTheDocument()
    expect(loadingText).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    const { container } = render(TableLoading)

    const tr = container.querySelector('tr')
    const td = container.querySelector('td')
    const loadingContent = container.querySelector('.loading-content')
    const loadingSpinner = container.querySelector('.loading-spinner')
    const spinner = container.querySelector('.spinner')
    const loadingText = container.querySelector('.loading-text')

    expect(tr).toHaveClass('loading-row')
    expect(td).toHaveClass('loading-cell')
    expect(loadingContent).toHaveClass('loading-content')
    expect(loadingSpinner).toHaveClass('loading-spinner')
    expect(spinner).toHaveClass('spinner')
    expect(loadingText).toHaveClass('loading-text')
  })

  it('has correct colspan attribute', () => {
    const { container } = render(TableLoading)

    const td = container.querySelector('td')
    expect(td).toHaveAttribute('colspan', '100%')
  })

  it('renders with custom slot content', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Custom loading message',
      },
      slots: {
        default: `
          <template #default="{ message }">
            <div class="custom-loading">
              <div class="custom-spinner">⏳</div>
              <p class="custom-text">{{ message }}</p>
            </div>
          </template>
        `,
      },
    })

    expect(getByText('Custom loading message')).toBeInTheDocument()
    expect(getByText('⏳')).toBeInTheDocument()
  })

  it('renders with complex slot content', () => {
    const { getByText, getByRole } = render(TableLoading, {
      props: {
        message: 'Loading data...',
      },
      slots: {
        default: `
          <div class="complex-loading">
            <div class="progress-bar">
              <div class="progress" style="width: 50%"></div>
            </div>
            <p class="status-text">Processing...</p>
            <button class="cancel-btn">Cancel</button>
          </div>
        `,
      },
    })

    expect(getByText('Processing...')).toBeInTheDocument()
    expect(getByText('Cancel')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('renders with different message types', () => {
    const messages = [
      'Loading...',
      'Please wait...',
      'Fetching data...',
      'Processing request...',
      'Loading data from server...',
    ]

    messages.forEach(message => {
      const { getByText } = render(TableLoading, {
        props: { message },
      })

      expect(getByText(message)).toBeInTheDocument()
    })
  })

  it('renders with special characters in message', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Loading... ⏳ 🔄 📊',
      },
    })

    expect(getByText('Loading... ⏳ 🔄 📊')).toBeInTheDocument()
  })

  it('renders with long message', () => {
    const longMessage =
      'This is a very long loading message that should be displayed properly without any issues or truncation. It contains multiple sentences and should wrap correctly.'
    const { getByText } = render(TableLoading, {
      props: {
        message: longMessage,
      },
    })

    expect(getByText(longMessage)).toBeInTheDocument()
  })

  it('renders with HTML entities in message', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Loading & processing data &amp; results',
      },
    })

    expect(
      getByText('Loading & processing data &amp; results')
    ).toBeInTheDocument()
  })

  it('renders with numbers in message', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Loading 123 items...',
      },
    })

    expect(getByText('Loading 123 items...')).toBeInTheDocument()
  })

  it('renders with unicode characters in message', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Carregando dados... áéíóú ñ ç',
      },
    })

    expect(getByText('Carregando dados... áéíóú ñ ç')).toBeInTheDocument()
  })

  it('updates message when prop changes', () => {
    const { getByText } = render(TableLoading, {
      props: {
        message: 'Initial message',
      },
    })

    expect(getByText('Initial message')).toBeInTheDocument()

    const { getByText: getByText2 } = render(TableLoading, {
      props: {
        message: 'Updated message',
      },
    })

    expect(getByText2('Updated message')).toBeInTheDocument()
  })

  it('has spinner element', () => {
    const { container } = render(TableLoading)

    const spinner = container.querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner')
  })

  it('renders without default slot content when custom slot is provided', () => {
    const { container } = render(TableLoading, {
      slots: {
        default: '<div class="custom-content">Custom loading</div>',
      },
    })

    // Should not render default spinner and text
    const defaultSpinner = container.querySelector('.loading-spinner')
    const defaultText = container.querySelector('.loading-text')

    expect(defaultSpinner).not.toBeInTheDocument()
    expect(defaultText).not.toBeInTheDocument()
    expect(container.querySelector('.custom-content')).toBeInTheDocument()
  })
})
