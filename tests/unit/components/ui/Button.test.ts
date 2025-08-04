import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Button from '~/components/ui/Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Click me',
      },
    })

    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveClass('button--secondary')
    expect(button).toHaveClass('button--md')
  })

  it('renders with custom label and aria-label', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Submit',
        ariaLabel: 'Submit form button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Submit form button')
  })

  it('applies primary variant correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Primary Button',
        variant: 'primary',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass('button--primary')
    expect(button).not.toHaveClass('button--secondary')
  })

  it('applies ghost variant correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Ghost Button',
        variant: 'ghost',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass('button--ghost')
  })

  it('applies different sizes correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Small Button',
        size: 'sm',
      },
    })

    let button = getByRole('button')
    expect(button).toHaveClass('button--sm')

    const { container } = render(Button, {
      props: {
        label: 'Large Button',
        size: 'lg',
      },
    })

    button = container.querySelector('button')
    expect(button).toHaveClass('button--lg')
  })

  it('handles disabled state correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Disabled Button',
        disabled: true,
      },
    })

    const button = getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('button--disabled')
  })

  it('emits click event when not disabled', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        label: 'Clickable Button',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).toHaveProperty('click')
    expect(emitted().click).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        label: 'Disabled Button',
        disabled: true,
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).not.toHaveProperty('click')
  })

  it('renders slot content when provided', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Default Label',
      },
      slots: {
        default: '<span>Custom Content</span>',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveTextContent('Custom Content')
    expect(button).not.toHaveTextContent('Default Label')
  })

  it('renders label when no slot content is provided', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Default Label',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveTextContent('Default Label')
  })

  it('passes through additional attributes', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Button with ID',
      },
      attrs: {
        id: 'test-button',
        'data-testid': 'custom-button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('id', 'test-button')
    expect(button).toHaveAttribute('data-testid', 'custom-button')
  })

  it('combines multiple props correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Complex Button',
        variant: 'primary',
        size: 'lg',
        disabled: true,
        ariaLabel: 'Complex button with multiple props',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass('button--primary')
    expect(button).toHaveClass('button--lg')
    expect(button).toHaveClass('button--disabled')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute(
      'aria-label',
      'Complex button with multiple props'
    )
  })
})
