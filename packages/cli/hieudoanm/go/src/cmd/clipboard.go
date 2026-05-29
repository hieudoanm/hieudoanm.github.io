package cmd

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/atotto/clipboard"
	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/cobra"
)

var clipboardCmd = &cobra.Command{
	Use:   "clipboard",
	Short: "Listen to clipboard changes and store them",
	Run: func(cmd *cobra.Command, args []string) {
		runClipboardWatcher()
	},
}

func init() {
	rootCmd.AddCommand(clipboardCmd)
}

// ── Core logic ───────────────────────────────────────────────

func runClipboardWatcher() {
	db, err := sql.Open("sqlite3", "~/.hieudoanm/hieudoanm.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTable(db)

	fmt.Println("📋 Clipboard watcher started... (Ctrl+C to stop)")

	var lastText string

	for {
		text, err := clipboard.ReadAll()
		if err != nil {
			time.Sleep(1 * time.Second)
			continue
		}

		// skip empty or same
		if text == "" || text == lastText {
			time.Sleep(500 * time.Millisecond)
			continue
		}

		err = insertClip(db, text)
		if err != nil {
			log.Println("insert error:", err)
		} else {
			fmt.Println("Saved:", preview(text))
		}

		lastText = text
		time.Sleep(500 * time.Millisecond)
	}
}

// ── DB ──────────────────────────────────────────────────────

func createTable(db *sql.DB) {
	query := `
	CREATE TABLE IF NOT EXISTS clips (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		content TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}

func insertClip(db *sql.DB, content string) error {
	_, err := db.Exec(
		`INSERT INTO clips (content) VALUES (?)`,
		content,
	)
	return err
}

// ── Utils ───────────────────────────────────────────────────

func preview(text string) string {
	if len(text) > 40 {
		return text[:40] + "..."
	}
	return text
}
