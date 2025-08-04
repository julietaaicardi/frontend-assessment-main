import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import DatePicker from '~/components/ui/DatePicker.vue'

// Mock the @vuepic/vue-datepicker component
vi.mock('@vuepic/vue-datepicker', () => ({
  default: {
    name: 'Datepicker',
    props: [
      'modelValue',
      'placeholder',
      'disabled',
      'ariaLabel',
      'id',
      'range',
      'minDate',
      'maxDate',
    ],
    emits: ['update:modelValue', 'focus', 'blur'],
    template: `
      <input
        :id="id"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-label="ariaLabel"
        :value="modelValue"
        class="dp__input"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    `,
  },
}))

describe('DatePicker', () => {
  it('renders with default props', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Select date')
    expect(input).toHaveAttribute('aria-label', 'Date picker')
  })

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(DatePicker, {
      props: {
        modelValue: '',
        placeholder: 'Choose a date',
      },
    })

    const input = getByPlaceholderText('Choose a date')
    expect(input).toBeInTheDocument()
  })

  it('renders with custom aria-label', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        ariaLabel: 'Custom date picker',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('aria-label', 'Custom date picker')
  })

  it('renders with custom id', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        id: 'date-input',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('id', 'date-input')
  })

  it('handles disabled state correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('displays modelValue correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '2024-01-15',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('2024-01-15')
  })

  it('emits update:modelValue event on input', async () => {
    const { getByRole, emitted } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    await fireEvent.update(input, '2024-01-15')

    expect(emitted()).toHaveProperty('update:modelValue')
    expect(emitted()['update:modelValue']).toEqual([['2024-01-15']])
  })

  it('emits focus event', async () => {
    const { getByRole, emitted } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    await fireEvent.focus(input)

    expect(emitted()).toHaveProperty('focus')
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur event', async () => {
    const { getByRole, emitted } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    await fireEvent.blur(input)

    expect(emitted()).toHaveProperty('blur')
    expect(emitted().blur).toHaveLength(1)
  })

  it('updates value when modelValue changes', async () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '2024-01-01',
      },
    })

    let input = getByRole('textbox')
    expect(input).toHaveValue('2024-01-01')

    const { container } = render(DatePicker, {
      props: {
        modelValue: '2024-12-31',
      },
    })

    input = container.querySelector('input')
    expect(input).toHaveValue('2024-12-31')
  })

  it('handles range mode correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        range: true,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('handles minDate prop', () => {
    const minDate = new Date('2024-01-01')
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        minDate,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('handles maxDate prop', () => {
    const maxDate = new Date('2024-12-31')
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
        maxDate,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('combines multiple props correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '2024-06-15',
        placeholder: 'Select your birthday',
        disabled: false,
        ariaLabel: 'Birthday picker',
        id: 'birthday-input',
        range: false,
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Select your birthday')
    expect(input).not.toBeDisabled()
    expect(input).toHaveAttribute('aria-label', 'Birthday picker')
    expect(input).toHaveAttribute('id', 'birthday-input')
    expect(input).toHaveValue('2024-06-15')
  })

  it('handles empty modelValue correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('handles null modelValue correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: null,
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('handles undefined modelValue correctly', () => {
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: undefined,
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('renders with Date object modelValue', () => {
    const date = new Date('2024-01-15')
    const { getByRole } = render(DatePicker, {
      props: {
        modelValue: date,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    const { container } = render(DatePicker, {
      props: {
        modelValue: '',
      },
    })

    const datePickerContainer = container.querySelector('.date-picker')
    expect(datePickerContainer).toBeInTheDocument()

    const input = container.querySelector('.date-picker__input')
    expect(input).toBeInTheDocument()
  })
})
