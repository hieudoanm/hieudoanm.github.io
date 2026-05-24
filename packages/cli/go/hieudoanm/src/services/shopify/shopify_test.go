package shopify

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCheckShopify(t *testing.T) {
	tests := []struct {
		name      string
		headers   map[string]string
		body      string
		isShopify bool
		isPlus    bool
	}{
		{
			name:      "Not Shopify",
			headers:   map[string]string{"Content-Type": "text/html"},
			body:      "<html><body>Hello World</body></html>",
			isShopify: false,
			isPlus:    false,
		},
		{
			name:      "Shopify via Header",
			headers:   map[string]string{"X-Shopify-Shop-Id": "12345"},
			body:      "<html><body>Store</body></html>",
			isShopify: true,
			isPlus:    false,
		},
		{
			name:      "Shopify Plus via Header",
			headers:   map[string]string{"X-Shopify-Stage": "plus"},
			body:      "<html><body>Store</body></html>",
			isShopify: true,
			isPlus:    true,
		},
		{
			name:      "Shopify via HTML",
			headers:   map[string]string{"Content-Type": "text/html"},
			body:      "<html><body><script src='https://cdn.shopify.com/foo.js'></script></body></html>",
			isShopify: true,
			isPlus:    false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				for k, v := range tt.headers {
					w.Header().Set(k, v)
				}
				w.WriteHeader(http.StatusOK)
				w.Write([]byte(tt.body))
			}))
			defer ts.Close()

			isShopify, isPlus, _, err := CheckShopify(ts.URL)
			if err != nil {
				t.Fatalf("CheckShopify failed: %v", err)
			}

			if isShopify != tt.isShopify {
				t.Errorf("Expected isShopify=%v, got %v", tt.isShopify, isShopify)
			}
			if isPlus != tt.isPlus {
				t.Errorf("Expected isPlus=%v, got %v", tt.isPlus, isPlus)
			}
		})
	}
}
