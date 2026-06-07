import { Section } from './Section';

export const ExtraSection = () => (
  <Section
    id="extra"
    label="Extra"
    title="More building blocks"
    sub="Chat, carousel, dividers, indicators — finishing touches that make interfaces feel complete.">
    <div className="mb-10 grid grid-cols-2 gap-10">
      <div>
        <p className="text-base-content/50 mb-4 text-sm">Chat</p>
        <div className="flex flex-col gap-2">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi{' '}
              <time className="text-base-content/60 text-xs">12:45</time>
            </div>
            <div className="chat-bubble">It&apos;s over Anakin.</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi{' '}
              <time className="text-base-content/60 text-xs">12:45</time>
            </div>
            <div className="chat-bubble">I have the high ground.</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin <time className="text-base-content/60 text-xs">12:46</time>
            </div>
            <div className="chat-bubble">You underestimate my power!</div>
            <div className="chat-footer text-base-content/60">
              Seen at 12:46
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-base-content/50 mb-4 text-sm">Divider</p>
        <div className="flex flex-col gap-2">
          <div className="divider">OR</div>
          <div className="divider divider-neutral">Neutral</div>
          <div className="divider divider-primary">Primary</div>
          <div className="divider divider-secondary">Secondary</div>
          <div className="divider divider-accent">Accent</div>
          <div className="divider divider-success">Success</div>
          <div className="divider divider-warning">Warning</div>
          <div className="divider divider-error">Error</div>
        </div>
      </div>
    </div>
    <div className="mb-10 grid grid-cols-2 gap-10">
      <div>
        <p className="text-base-content/50 mb-4 text-sm">Carousel</p>
        <div className="carousel rounded-box w-full">
          <div id="slide1" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
              alt="Slide 1"
              className="w-full"
            />
          </div>
          <div id="slide2" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
              alt="Slide 2"
              className="w-full"
            />
          </div>
          <div id="slide3" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
              alt="Slide 3"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#slide1" className="btn btn-xs">
            1
          </a>
          <a href="#slide2" className="btn btn-xs">
            2
          </a>
          <a href="#slide3" className="btn btn-xs">
            3
          </a>
        </div>
      </div>
      <div>
        <p className="text-base-content/50 mb-4 text-sm">Indicator</p>
        <div className="flex flex-wrap gap-4">
          <div className="indicator">
            <span className="indicator-item badge badge-primary">3</span>
            <button className="btn">Notifications</button>
          </div>
          <div className="indicator">
            <span className="indicator-item indicator-start badge badge-secondary">
              !
            </span>
            <button className="btn">Alerts</button>
          </div>
        </div>
      </div>
    </div>
  </Section>
);
