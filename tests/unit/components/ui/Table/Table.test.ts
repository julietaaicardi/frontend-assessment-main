import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/vue'
import Table from '~/components/ui/Table/Table.vue'

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    computed: vi.fn(fn => ({ value: fn() })),
    provide: vi.fn(),
  }
})

const mockColumns = [
  { key: 'id', label: 'ID', width: '10%' },
  { key: 'name', label: 'Name', width: '30%' },
  { key: 'email', label: 'Email', width: '40%' },
  { key: 'status', label: 'Status', width: '20%' },
]

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
]

describe('Table', () => {
  it('renders with basic props', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      slots: {
        default: '<div>Table Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
    expect(tableWrapper).toHaveTextContent('Table Content')
  })

  it('renders with default props', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with custom rowKey', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
        rowKey: 'email',
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with pagination enabled', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
        pagination: true,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with loading state', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
        loading: true,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with custom empty message', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: [],
        emptyMessage: 'No records found',
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with external pagination', () => {
    const externalPagination = {
      currentPage: 2,
      totalPages: 5,
      startIndex: 11,
      endIndex: 20,
      totalItems: 100,
      hasNext: true,
      hasPrevious: true,
      handlePrevPage: () => {},
      handleNextPage: () => {},
    }

    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
        externalPagination,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with empty data', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: [],
      },
      slots: {
        default: '<div>Empty Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
    expect(tableWrapper).toHaveTextContent('Empty Content')
  })

  it('renders with single column', () => {
    const singleColumn = [{ key: 'name', label: 'Name' }]
    const { container } = render(Table, {
      props: {
        columns: singleColumn,
        data: mockData,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with many columns', () => {
    const manyColumns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'ZIP' },
    ]
    const { container } = render(Table, {
      props: {
        columns: manyColumns,
        data: mockData,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })

  it('renders with complex slot content', () => {
    const { getByText } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      slots: {
        default: `
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john@example.com</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    })

    expect(getByText('ID')).toBeInTheDocument()
    expect(getByText('Name')).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
    expect(getByText('John Doe')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toHaveClass('table-wrapper')
  })

  it('passes through additional attributes', () => {
    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      attrs: {
        id: 'data-table',
        'data-testid': 'table-component',
        class: 'custom-table',
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toHaveAttribute('id', 'data-table')
    expect(tableWrapper).toHaveAttribute('data-testid', 'table-component')
    expect(tableWrapper).toHaveClass('custom-table')
    expect(tableWrapper).toHaveClass('table-wrapper')
  })

  it('renders with different data types', () => {
    const mixedData = [
      { id: 1, name: 'John', active: true, score: 95.5 },
      { id: 2, name: 'Jane', active: false, score: 87.2 },
      { id: 3, name: 'Bob', active: true, score: 92.8 },
    ]

    const { container } = render(Table, {
      props: {
        columns: mockColumns,
        data: mixedData,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    const tableWrapper = container.querySelector('.table-wrapper')
    expect(tableWrapper).toBeInTheDocument()
  })
})
