import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import TableHeader from '~/components/ui/Table/TableHeader.vue'

describe('TableHeader', () => {
  it('renders without crashing', () => {
    const { container } = render(TableHeader, {
      global: {
        provide: {
          tableContext: {
            columns: [
              { key: 'id', label: 'ID', width: '10%', align: 'left' },
              { key: 'name', label: 'Name', width: '30%', align: 'left' },
            ],
          },
        },
      },
    })

    expect(container).toBeInTheDocument()
  })

  it('renders with table context', () => {
    const { getByText } = render(TableHeader, {
      global: {
        provide: {
          tableContext: {
            columns: [
              { key: 'id', label: 'ID', width: '10%', align: 'left' },
              { key: 'name', label: 'Name', width: '30%', align: 'left' },
            ],
          },
        },
      },
    })

    expect(getByText('ID')).toBeInTheDocument()
    expect(getByText('Name')).toBeInTheDocument()
  })
})
