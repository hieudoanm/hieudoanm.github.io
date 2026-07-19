package headless

import (
	"context"
	"errors"
	"image"
	"runtime"
	"time"

	"github.com/go-webengine/engine"
)

const (
	DefaultViewportWidth  = 1280
	DefaultViewportHeight = 720
	DefaultLoadTimeout    = 30 * time.Second
)

type Config struct {
	ViewportWidth  int
	ViewportHeight int
	LoadTimeout    time.Duration
}

func DefaultConfig() Config {
	return Config{
		ViewportWidth:  DefaultViewportWidth,
		ViewportHeight: DefaultViewportHeight,
		LoadTimeout:    DefaultLoadTimeout,
	}
}

func (c Config) viewport() image.Rectangle {
	return image.Rect(0, 0, c.ViewportWidth, c.ViewportHeight)
}

type ScrapeResult struct {
	HTML       string
	URL        string
	Title      string
	TimedOut   bool
	DurationMS int64
	MemoryKB   uint64
}

type ScreenshotResult struct {
	PNG        []byte
	URL        string
	Title      string
	TimedOut   bool
	DurationMS int64
	MemoryKB   uint64
}

type Browser struct {
	config Config
	engine *engine.Engine
}

func New(config Config) *Browser {
	return &Browser{config: config, engine: engine.New()}
}

func (b *Browser) Render(ctx context.Context, rawurl string) (*image.RGBA, *engine.RenderInfo, error) {
	return b.engine.Render(ctx, rawurl, b.config.viewport())
}

func (b *Browser) Scrape(ctx context.Context, rawurl string) (ScrapeResult, error) {
	start := time.Now()
	beforeKB := heapKB()

	ctx, cancel := context.WithTimeout(ctx, b.config.LoadTimeout)
	defer cancel()

	doc, err := b.engine.Fetch(ctx, rawurl)
	if err != nil {
		if IsTimeout(err) {
			return ScrapeResult{}, &TimeoutError{Err: err}
		}
		return ScrapeResult{}, err
	}

	return ScrapeResult{
		HTML:       doc.HTML,
		URL:        doc.URL,
		Title:      doc.Title,
		TimedOut:   false,
		DurationMS: time.Since(start).Milliseconds(),
		MemoryKB:   heapKB() - beforeKB,
	}, nil
}

func (b *Browser) Screenshot(ctx context.Context, rawurl string) (ScreenshotResult, error) {
	start := time.Now()
	beforeKB := heapKB()

	ctx, cancel := context.WithTimeout(ctx, b.config.LoadTimeout)
	defer cancel()

	img, info, err := b.engine.Render(ctx, rawurl, b.config.viewport())
	if err != nil {
		if IsTimeout(err) {
			return ScreenshotResult{}, &TimeoutError{Err: err}
		}
		return ScreenshotResult{}, err
	}

	pngBytes, err := engine.EncodePNG(img)
	if err != nil {
		return ScreenshotResult{}, err
	}

	return ScreenshotResult{
		PNG:        pngBytes,
		URL:        info.URL,
		Title:      info.Title,
		TimedOut:   false,
		DurationMS: time.Since(start).Milliseconds(),
		MemoryKB:   heapKB() - beforeKB,
	}, nil
}

type TimeoutError struct {
	Err error
}

func (e *TimeoutError) Error() string {
	return "render timed out"
}

func (e *TimeoutError) Unwrap() error {
	return e.Err
}

func IsTimeout(err error) bool {
	return errors.Is(err, context.DeadlineExceeded)
}

func heapKB() uint64 {
	var ms runtime.MemStats
	runtime.ReadMemStats(&ms)
	return ms.HeapAlloc / 1024
}
