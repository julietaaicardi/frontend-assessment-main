import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Input from '~/components/ui/Input.vue'

describe('Input', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(Input, {
      props: {
        modelValue: '',
        placeholder: 'Enter your name',
      },
    })

    const input = getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
  })

  it('renders with different input types', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        type: 'email',
      },
    })

    let input = getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')

    const { container } = render(Input, {
      props: {
        modelValue: '',
        type: 'password',
      },
    })

    input = container.querySelector('input')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('handles disabled state correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })

    const input = getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles readonly state correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: 'Readonly value',
        readonly: true,
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveValue('Readonly value')
  })

  it('renders with custom id and aria-label', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        id: 'name-input',
        ariaLabel: 'Name input field',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('id', 'name-input')
    expect(input).toHaveAttribute('aria-label', 'Name input field')
  })

  it('emits update:modelValue event on input', async () => {
    const { getByRole, emitted } = render(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    await fireEvent.update(input, 'test value')

    expect(emitted()).toHaveProperty('update:modelValue')
    expect(emitted()['update:modelValue']).toEqual([['test value']])
  })

  it('emits focus event', async () => {
    const { getByRole, emitted } = render(Input, {
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
    const { getByRole, emitted } = render(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    await fireEvent.blur(input)

    expect(emitted()).toHaveProperty('blur')
    expect(emitted().blur).toHaveLength(1)
  })

  it('displays modelValue correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: 'Initial value',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('Initial value')
  })

  it('updates value when modelValue changes', async () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: 'Initial',
      },
    })

    let input = getByRole('textbox')
    expect(input).toHaveValue('Initial')

    const { container } = render(Input, {
      props: {
        modelValue: 'Updated',
      },
    })

    input = container.querySelector('input')
    expect(input).toHaveValue('Updated')
  })

  it('handles number input type', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        type: 'number',
      },
    })

    const input = getByRole('spinbutton')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('handles tel input type', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        type: 'tel',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('type', 'tel')
  })

  it('handles url input type', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
        type: 'url',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('type', 'url')
  })

  it('combines multiple props correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: 'Complex input',
        type: 'email',
        placeholder: 'Enter email',
        disabled: true,
        readonly: false,
        id: 'email-input',
        ariaLabel: 'Email input field',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Enter email')
    expect(input).toBeDisabled()
    expect(input).not.toHaveAttribute('readonly')
    expect(input).toHaveAttribute('id', 'email-input')
    expect(input).toHaveAttribute('aria-label', 'Email input field')
    expect(input).toHaveValue('Complex input')
  })

  it('handles empty modelValue correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('handles undefined modelValue correctly', () => {
    const { getByRole } = render(Input, {
      props: {
        modelValue: undefined,
      },
    })

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
  })
})
