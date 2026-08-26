import { render, screen, act } from '@testing-library/react'

import PageTransitionTemplate from '../template'

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    render(
      <PageTransitionTemplate>
        <div>content</div>
      </PageTransitionTemplate>,
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('applies animate-page-in class after mount', async () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div />
      </PageTransitionTemplate>,
    )
    const wrapper = container.firstChild as HTMLElement
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    expect(wrapper.className).toContain('animate-page-in')
  })

  it('removes animation class on animationend', async () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div />
      </PageTransitionTemplate>,
    )
    const wrapper = container.firstChild as HTMLElement
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    expect(wrapper.className).toContain('animate-page-in')
    await act(async () => {
      wrapper.dispatchEvent(new Event('animationend'))
    })
    expect(wrapper.className).not.toContain('animate-page-in')
  })
})
