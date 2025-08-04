import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import TableEmptyState from '~/components/ui/Table/TableEmptyState.vue'

describe('TableEmptyState', () => {
  it('renders with default message', () => {
    const { getByText } = render(TableEmptyState)

    expect(getByText('No data available')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'No records found in the database',
      },
    })

    expect(getByText('No records found in the database')).toBeInTheDocument()
  })

  it('renders with empty message', () => {
    const { container } = render(TableEmptyState, {
      props: {
        message: '',
      },
    })

    const emptyStateText = container.querySelector('.empty-state-text')
    expect(emptyStateText).toBeInTheDocument()
    expect(emptyStateText).toHaveTextContent('')
  })

  it('has correct HTML structure', () => {
    const { container } = render(TableEmptyState)

    const tr = container.querySelector('tr.empty-state-row')
    const td = container.querySelector('td.empty-state-cell')
    const emptyStateContent = container.querySelector('.empty-state-content')
    const emptyStateIcon = container.querySelector('.empty-state-icon')
    const emptyStateText = container.querySelector('.empty-state-text')

    expect(tr).toBeInTheDocument()
    expect(td).toBeInTheDocument()
    expect(emptyStateContent).toBeInTheDocument()
    expect(emptyStateIcon).toBeInTheDocument()
    expect(emptyStateText).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    const { container } = render(TableEmptyState)

    const tr = container.querySelector('tr')
    const td = container.querySelector('td')
    const emptyStateContent = container.querySelector('.empty-state-content')
    const emptyStateIcon = container.querySelector('.empty-state-icon')
    const emptyStateText = container.querySelector('.empty-state-text')

    expect(tr).toHaveClass('empty-state-row')
    expect(td).toHaveClass('empty-state-cell')
    expect(emptyStateContent).toHaveClass('empty-state-content')
    expect(emptyStateIcon).toHaveClass('empty-state-icon')
    expect(emptyStateText).toHaveClass('empty-state-text')
  })

  it('has correct colspan attribute', () => {
    const { container } = render(TableEmptyState)

    const td = container.querySelector('td')
    expect(td).toHaveAttribute('colspan', '100%')
  })

  it('renders with default icon', () => {
    const { container } = render(TableEmptyState)

    const emptyStateIcon = container.querySelector('.empty-state-icon')
    expect(emptyStateIcon).toHaveTextContent('⚠️')
  })

  it('renders with custom slot content', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'Custom empty message',
      },
      slots: {
        default: `
          <template #default="{ message }">
            <div class="custom-empty-state">
              <div class="custom-icon">📭</div>
              <p class="custom-text">{{ message }}</p>
            </div>
          </template>
        `,
      },
    })

    expect(getByText('Custom empty message')).toBeInTheDocument()
    expect(getByText('📭')).toBeInTheDocument()
  })

  it('renders with complex slot content', () => {
    const { getByText, getByRole } = render(TableEmptyState, {
      props: {
        message: 'No data available',
      },
      slots: {
        default: `
          <div class="complex-empty-state">
            <div class="empty-icon">📊</div>
            <h3 class="empty-title">No Data Found</h3>
            <p class="empty-description">There are no records to display at this time.</p>
            <button class="refresh-btn">Refresh</button>
          </div>
        `,
      },
    })

    expect(getByText('No Data Found')).toBeInTheDocument()
    expect(
      getByText('There are no records to display at this time.')
    ).toBeInTheDocument()
    expect(getByText('Refresh')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('renders with different message types', () => {
    const messages = [
      'No data available',
      'No records found',
      'Empty table',
      'No items to display',
      'No results found',
    ]

    messages.forEach(message => {
      const { getByText } = render(TableEmptyState, {
        props: { message },
      })

      expect(getByText(message)).toBeInTheDocument()
    })
  })

  it('renders with special characters in message', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'No data available 📊 📈 📉',
      },
    })

    expect(getByText('No data available 📊 📈 📉')).toBeInTheDocument()
  })

  it('renders with long message', () => {
    const longMessage =
      'This is a very long empty state message that should be displayed properly without any issues or truncation. It contains multiple sentences and should wrap correctly.'
    const { getByText } = render(TableEmptyState, {
      props: {
        message: longMessage,
      },
    })

    expect(getByText(longMessage)).toBeInTheDocument()
  })

  it('renders with HTML entities in message', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'No data & results available &amp; found',
      },
    })

    expect(
      getByText('No data & results available &amp; found')
    ).toBeInTheDocument()
  })

  it('renders with numbers in message', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'No data available (0 items)',
      },
    })

    expect(getByText('No data available (0 items)')).toBeInTheDocument()
  })

  it('renders with unicode characters in message', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'Nenhum dado disponível... áéíóú ñ ç',
      },
    })

    expect(getByText('Nenhum dado disponível... áéíóú ñ ç')).toBeInTheDocument()
  })

  it('updates message when prop changes', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'Initial message',
      },
    })

    expect(getByText('Initial message')).toBeInTheDocument()

    const { getByText: getByText2 } = render(TableEmptyState, {
      props: {
        message: 'Updated message',
      },
    })

    expect(getByText2('Updated message')).toBeInTheDocument()
  })

  it('renders without default content when custom slot is provided', () => {
    const { container } = render(TableEmptyState, {
      slots: {
        default: '<div class="custom-content">Custom empty state</div>',
      },
    })

    // Should not render default icon and text
    const defaultIcon = container.querySelector('.empty-state-icon')
    const defaultText = container.querySelector('.empty-state-text')

    expect(defaultIcon).not.toBeInTheDocument()
    expect(defaultText).not.toBeInTheDocument()
    expect(container.querySelector('.custom-content')).toBeInTheDocument()
  })

  it('provides message to slot', () => {
    const { getByText } = render(TableEmptyState, {
      props: {
        message: 'Custom empty message',
      },
      slots: {
        default: `
          <template #default="{ message }">
            <div class="slot-test">
              <span>Message: {{ message }}</span>
            </div>
          </template>
        `,
      },
    })

    expect(getByText('Message: Custom empty message')).toBeInTheDocument()
  })

  it('renders with different icons in custom slot', () => {
    const icons = ['📭', '📊', '📈', '📉', '❌', '⚠️', 'ℹ️', '💡']

    icons.forEach(icon => {
      const { getByText } = render(TableEmptyState, {
        slots: {
          default: `<div class="custom-icon">${icon}</div>`,
        },
      })

      expect(getByText(icon)).toBeInTheDocument()
    })
  })

  it('renders with action buttons in slot', () => {
    const { getByText, getByRole } = render(TableEmptyState, {
      slots: {
        default: `
          <div class="empty-state-with-actions">
            <p>No data available</p>
            <button>Add New Item</button>
            <button>Refresh</button>
          </div>
        `,
      },
    })

    expect(getByText('No data available')).toBeInTheDocument()
    expect(getByText('Add New Item')).toBeInTheDocument()
    expect(getByText('Refresh')).toBeInTheDocument()

    const buttons = getByRole('button', { name: 'Add New Item' })
    expect(buttons).toBeInTheDocument()
  })
})
