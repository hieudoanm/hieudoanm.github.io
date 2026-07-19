//go:build gui

package gui

import (
	"fmt"
	"log/slog"
	"strings"
)

func (c *controller) doSet() {
	key := c.keyEntry.Text
	if strings.TrimSpace(key) == "" {
		c.setStatus("enter a key first")
		return
	}
	_, existed := c.kv.Get(key)
	c.kv.Set(key, c.valueEntry.Text)
	if existed {
		slog.Info("updated key", "key", key)
		c.setStatus("updated " + key)
	} else {
		slog.Info("added key", "key", key)
		c.setStatus("set " + key)
	}
	c.render()
	c.syncSelection()
}

func (c *controller) doCopyKey(key string) {
	value, ok := c.kv.Get(key)
	if !ok {
		c.setStatus("key not found: " + key)
		return
	}
	c.clipboard.SetContent(value)
	c.setStatus("value copied to clipboard")
}

// refresh clears the editor inputs and forces a full reload and re-render.
func (c *controller) refresh() {
	c.setKeyText("")
	c.valueEntry.SetText("")
	c.selectedKey = ""
	c.lastRender = ""
	c.render()
}

// confirmDelete shows a confirmation dialog and deletes key if confirmed.
func (c *controller) confirmDelete(key string) {
	if strings.TrimSpace(key) == "" {
		return
	}
	c.confirm("Delete key", fmt.Sprintf("Delete %q?", key), func(confirmed bool) {
		if !confirmed {
			return
		}
		if !c.kv.Del(key) {
			c.setStatus("key not found: " + key)
			return
		}
		slog.Info("deleted key", "key", key)
		if c.selectedKey == key {
			c.selectedKey = ""
		}
		c.keyEntry.SetText("")
		c.valueEntry.SetText("")
		c.setStatus("deleted " + key)
		c.render()
	})
}

// confirmDeleteAll shows a confirmation dialog and clears every key.
func (c *controller) confirmDeleteAll() {
	c.confirm("Delete all keys", "Delete all keys? This cannot be undone.", func(confirmed bool) {
		if !confirmed {
			return
		}
		keys := c.kv.Keys()
		for _, k := range keys {
			c.kv.Del(k)
		}
		c.selectedKey = ""
		c.setKeyText("")
		c.valueEntry.SetText("")
		c.setStatus(fmt.Sprintf("deleted %d keys", len(keys)))
		slog.Info("deleted all keys", "count", len(keys))
		c.render()
	})
}
